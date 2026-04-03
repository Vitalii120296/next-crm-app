"use client";

import { useEffect, useState } from "react";
import type { Client, ClientStatus } from "@/types";
import s from "./Kanban.module.scss";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { clientService } from "@/services/clientServices";
import { ProgressCard } from "./components/ProgressCard/ProgressCard";
// import { getProductsTestApi } from "@/api/products.test-api";
import { getClientsTestApi } from "@/api/clients.test-api";

type ColumnData = {
  id: ClientStatus;
  columnClients: string[];
};

type KanbanData = {
  clients: Record<string, Client>;
  columns: Record<ClientStatus, ColumnData>;
};

const KanbanPage = () => {
  const [columnsData, setColumnsData] = useState<KanbanData | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchAndTransformClients = async () => {
      try {
        const res = await getClientsTestApi();
        console.log(res);

        const clientsMap: Record<string, Client> = {};
        const columnsMap: Record<ClientStatus, ColumnData> = {
          new: { id: "new", columnClients: [] },
          in_progress: { id: "in_progress", columnClients: [] },
          done: { id: "done", columnClients: [] },
        };

        res.forEach((client) => {
          const idStr = client.id.toString();
          clientsMap[idStr] = client;
          columnsMap[client.status].columnClients.push(idStr);
        });

        setColumnsData({ clients: clientsMap, columns: columnsMap });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAndTransformClients();
  }, []);

  if (!columnsData) return <p>Loading...</p>;

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startColumn = columnsData.columns[source.droppableId as ClientStatus];
    const finishColumn =
      columnsData.columns[destination.droppableId as ClientStatus];

    const clientId = draggableId;

    // Перетягування всередині однієї колонки
    if (startColumn === finishColumn) {
      const newClientIds = Array.from(startColumn.columnClients);
      newClientIds.splice(source.index, 1);
      newClientIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, columnClients: newClientIds };

      setColumnsData({
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Перетягування між колонками
    const startClientIds = Array.from(startColumn.columnClients);
    startClientIds.splice(source.index, 1);

    const finishClientIds = Array.from(finishColumn.columnClients);
    finishClientIds.splice(destination.index, 0, draggableId);

    setColumnsData({
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [startColumn.id]: { ...startColumn, columnClients: startClientIds },
        [finishColumn.id]: { ...finishColumn, columnClients: finishClientIds },
      },
    });

    await clientService.updateClientStatus(clientId, finishColumn.id);
  };

  const updateColumnsData = (
    updatedClient: Client | ((prevState: Client) => Client),
  ) => {
    if (typeof updatedClient === "function") {
      // Handle function form (shouldn't happen in this context, but for type compatibility)
      return;
    }

    setColumnsData((prev) => {
      if (!prev) return prev;

      const clientIdStr = updatedClient.id.toString(); // ⚠️ конвертуємо у рядок
      const oldClient = prev.clients[clientIdStr];
      const newColumns = { ...prev.columns };

      if (oldClient.status !== updatedClient.status) {
        // видаляємо зі старої колонки
        newColumns[oldClient.status] = {
          ...newColumns[oldClient.status],
          columnClients: newColumns[oldClient.status].columnClients.filter(
            (id) => id !== clientIdStr, // ⚠️ порівнюємо рядки
          ),
        };

        // додаємо у нову колонку
        newColumns[updatedClient.status] = {
          ...newColumns[updatedClient.status],
          columnClients: [
            clientIdStr,
            ...newColumns[updatedClient.status].columnClients,
          ],
        };
      }

      return {
        ...prev,
        clients: {
          ...prev.clients,
          [clientIdStr]: updatedClient,
        },
        columns: newColumns,
      };
    });
  };

  return (
    <section className={`${s.wrapper}`}>
      <div className={`${s.kanban} mx-auto`}>
        {/* {selectedClient && (
          <ClientDetails
            client={selectedClient}
            exit={() => setSelectedClient(null)}
            setClient={updateColumnsData}
          />
        )} */}
        <DragDropContext onDragEnd={onDragEnd}>
          {(Object.keys(columnsData.columns) as ClientStatus[]).map(
            (status) => {
              const columnClients = columnsData.columns[
                status
              ].columnClients.map((id) => columnsData.clients[id]);

              return (
                <ProgressCard
                  key={status}
                  clients={columnClients}
                  columnId={status}
                  setSelectedClient={setSelectedClient}
                />
              );
            },
          )}
        </DragDropContext>
      </div>
    </section>
  );
};

export default KanbanPage;

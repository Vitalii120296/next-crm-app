"use client";

import { useEffect, useState } from "react";
import type { Client, ClientStatus } from "@/types";
import s from "./Kanban.module.scss";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";
import { useAuthStore } from "@/store/user";
import { useClients } from "@/services/clients/hooks/useClients";
import { useClientStore } from "@/store/client";
import { updateClientStatus } from "@/services/clients/updateClientStatus";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal from "@/components/Modal";
import { ClientDetails } from "@/components/ClientDetails";
import { Progress } from "@/components/Progress";

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

  const token = useAuthStore((state) => state.token);

  const { clientsPayload } = useClients(token);
  const clients = useClientStore((state) => state.clients);
  const updateClient = useClientStore((state) => state.updateClient);
  const setClients = useClientStore((state) => state.setClients);

  useEffect(() => {
    if (!clients && clientsPayload) {
      setClients(clientsPayload);
    }
  }, [clientsPayload, setClients, clients]);

  useEffect(() => {
    const fetchAndTransformClients = async () => {
      try {
        if (!clients) return;

        const clientsMap: Record<string, Client> = {};
        const columnsMap: Record<ClientStatus, ColumnData> = {
          NEW: { id: "NEW", columnClients: [] },
          IN_PROGRESS: { id: "IN_PROGRESS", columnClients: [] },
          DONE: { id: "DONE", columnClients: [] },
        };

        clients.forEach((client) => {
          const idStr = client.id!.toString();
          clientsMap[idStr] = client;
          columnsMap[client.status].columnClients.push(idStr);
        });

        setColumnsData({ clients: clientsMap, columns: columnsMap });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAndTransformClients();
  }, [clients]);

  if (!columnsData) return <Progress />;

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

    const client = clients?.find((cl) => cl.id === clientId);

    try {
      await updateClientStatus(clientId, finishColumn.id);
      if (client) {
        updateClient(clientId, { ...client, status: finishColumn.id });
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const updateColumnsData = (
    updatedClient: Client | ((prevState: Client) => Client),
  ) => {
    if (typeof updatedClient === "function") {
      return;
    }

    setColumnsData((prev) => {
      if (!prev || !updatedClient.id) return prev;

      const oldClient = prev.clients[updatedClient.id];
      const newColumns = { ...prev.columns };

      if (oldClient.status !== updatedClient.status) {
        // видаляємо зі старої колонки
        newColumns[oldClient.status] = {
          ...newColumns[oldClient.status],
          columnClients: newColumns[oldClient.status].columnClients.filter(
            (id) => id !== updatedClient.id,
          ),
        };

        // додаємо у нову колонку
        newColumns[updatedClient.status] = {
          ...newColumns[updatedClient.status],
          columnClients: [
            updatedClient.id,
            ...newColumns[updatedClient.status].columnClients,
          ],
        };
      }

      return {
        ...prev,
        clients: {
          ...prev.clients,
          [updatedClient.id]: updatedClient,
        },
        columns: newColumns,
      };
    });
  };

  return (
    <section className={`${s.wrapper}`}>
      <div className={`${s.kanban} mx-auto`}>
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
        {selectedClient && (
          <Modal
            open={!!selectedClient}
            onClose={() => setSelectedClient(null)}
            title="Client details"
          >
            <ClientDetails
              client={selectedClient}
              onClose={() => setSelectedClient(null)}
            />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default KanbanPage;

"use client";

import { useState } from "react";
import type { Client, ClientStatus } from "@/types";
import s from "./ProgressCard.module.scss";
import cn from "classnames";
import { ProgressCardList } from "../ProgressCardList/ProgressCardList";
import { Droppable } from "@hello-pangea/dnd";
import { statusFormat } from "@/utils/statusFormat";
import Modal from "@/components/Modal";
import { ClientCreate } from "@/components/ClientCreate";

type Props = {
  clients: Client[];
  columnId: ClientStatus;
  setSelectedClient: (client: Client) => void;
};

export const ProgressCard: React.FC<Props> = ({
  clients,
  columnId,
  setSelectedClient,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const status = statusFormat(columnId);

  return (
    <>
      <article className={s.progress_card}>
        <div className={s.progress_card__top_bar}>
          <h2 className={cn("h3", s.progress_card__status)}>{status}</h2>
          {columnId === "NEW" && (
            <button
              className={s.progress_card__add_client}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              + Add client
            </button>
          )}
        </div>
        <Droppable droppableId={columnId}>
          {(provided) => (
            <ProgressCardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              clients={clients}
              columnId={columnId}
              setSelectedClient={setSelectedClient}
            >
              {provided.placeholder}
            </ProgressCardList>
          )}
        </Droppable>
      </article>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create client"
      >
        <ClientCreate />
      </Modal>
    </>
  );
};

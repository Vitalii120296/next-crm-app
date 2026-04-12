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
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

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
      <Box
        className={s.progress_card}
        sx={{
          backgroundColor: "background.paper",
          borderColor: "divider",
          borderWidth: 1,
          borderStyle: "solid",
          maxHeight: screen,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 2,
            height: 50,
          }}
        >
          <h2 className={cn("h3", s.progress_card__status)}>{status}</h2>
          {columnId === "NEW" && (
            <Button
              variant="text"
              color="success"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              + Add client
            </Button>
          )}
        </Box>
        <Divider flexItem sx={{ borderColor: "divider", padding: 0 }} />

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
      </Box>
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

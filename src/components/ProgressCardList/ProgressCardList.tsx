"use client";

import { BsFillCircleFill } from "react-icons/bs";
import type { Client, ClientStatus } from "@/types";
import s from "./ProgressCardList.module.scss";
import cn from "classnames";
import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { gray } from "@/shared/themePrimitives";

type Props = {
  clients: Client[];
  columnId: ClientStatus;
  setSelectedClient: (client: Client) => void;
  children?: React.ReactNode;
};

export const ProgressCardList = React.forwardRef<HTMLDivElement, Props>(
  ({ clients, columnId, setSelectedClient, children }, ref) => {
    const selectClient = (client: Client) => {
      setSelectedClient(client);
    };

    return (
      <Box className={s.progress_card__column} ref={ref}>
        <List
          className={s.progress_card__list}
          sx={{ gap: 1, overflowY: "auto", height: "max-content" }}
        >
          {clients.map((client, i) => (
            <Draggable draggableId={client.id!} index={i} key={client.id}>
              {(provided, snapshot) => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={cn(s.progress_card__client, {
                    [s.isDraggin]: snapshot.isDragging,
                  })}
                  onClick={() => selectClient(client)}
                  sx={{
                    backgroundColor: "divider",
                    alignItems: "flex-start",
                    overflow: "hidden",
                    height: "content",
                  }}
                >
                  <Typography
                    className={s.progress_card__row}
                    color="textPrimary"
                  >
                    <BsFillCircleFill
                      aria-hidden="true"
                      className={cn(s.progress_card__icon, {
                        [s["progress_card__icon--green"]]: columnId === "NEW",
                        [s["progress_card__icon--yellow"]]:
                          columnId === "IN_PROGRESS",
                        [s["progress_card__icon--blue"]]: columnId === "DONE",
                      })}
                    />
                    {`${client.name} ${client.surname}`}
                  </Typography>
                  {client.email && (
                    <Typography
                      className={s.progress_card__row}
                      variant="body2"
                      color="textSecondary"
                    >
                      {client.email}
                    </Typography>
                  )}
                  {client.phone && (
                    <Typography
                      className={s.progress_card__row}
                      variant="body2"
                      color="textSecondary"
                    >
                      {client.phone}
                    </Typography>
                  )}
                  {/* {client.amount && (
                    <p className={s.progress_card__row}>
                      Amount: {client.amount}
                    </p>
                  )} */}
                  {client.notes && (
                    <Typography
                      className={s.progress_card__row}
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {client.notes}
                    </Typography>
                  )}
                </ListItem>
              )}
            </Draggable>
          ))}
          {children}
        </List>
      </Box>
    );
  },
);

ProgressCardList.displayName = "ProgressCardList";

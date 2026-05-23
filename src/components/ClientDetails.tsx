import { deleteClientsService } from "@/services/clients/deleteClient";
import { updateClientService } from "@/services/clients/updateClient";
import { useClientStore } from "@/store/client";
import { useAuthStore } from "@/store/user";
import { Client, ClientUpdateDto } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { Divider, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type Props = {
  client: Client;
  onClose: () => void;
};

export const ClientDetails: React.FC<Props> = ({ client, onClose }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const updateClient = useClientStore((state) => state.updateClient);
  const removeClient = useClientStore((state) => state.removeClient);

  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { register, handleSubmit, formState } = useForm<ClientUpdateDto>({
    mode: "onChange",
  });
  const { errors, isValid } = formState;

  const onSumbit: SubmitHandler<ClientUpdateDto> = async (data) => {
    setIsSending(true);
    setIsError(null);
    if (!currentUser || !client.id) return;

    try {
      const updatedClient = await updateClientService(client.id, data);

      updateClient(client.id, updatedClient);
      onClose();
    } catch {
      setIsError("Something went wrong");
    } finally {
      setIsSending(false);
      setIsSended(true);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClientsService(id);

      removeClient(id);
      onClose();
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-2 min-w-xs "
        onSubmit={handleSubmit(onSumbit)}
      >
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
            <label htmlFor="first_name" className="wrap-normal">
              {"Name "}
              <span className="text-red-500">*</span>
            </label>

            <TextField
              error={!!errors.first_name}
              id="first_name"
              defaultValue={client.first_name}
              sx={{ width: { xs: "full", md: "200px" } }}
              {...register("first_name", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 25,
                  message: "Name must be max 25 characters",
                },
              })}
            />
          </div>
          {errors.first_name && (
            <p className="text-xs text-red-500">{errors.first_name.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
            <label htmlFor="last_name" className="wrap-normal">
              {"Surname "}
              <span className="text-red-500">*</span>
            </label>

            <TextField
              error={!!errors.last_name}
              id="last_name"
              defaultValue={client.last_name}
              sx={{ width: { xs: "full", md: "200px" } }}
              {...register("last_name", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Surname must be at least 2 characters",
                },
                maxLength: {
                  value: 25,
                  message: "Surname must be max 25 characters",
                },
              })}
            />
          </div>
          {errors.last_name && (
            <p className="text-xs text-red-500">{errors.last_name.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
            <label htmlFor="email" className="wrap-normal">
              {"Email "}
              <span className="text-red-500">*</span>
            </label>

            <TextField
              error={!!errors.email}
              id="email"
              defaultValue={client.email}
              sx={{ width: { xs: "full", md: "200px" } }}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
            <label htmlFor="status" className="wrap-normal">
              {"Status "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              id="status"
              defaultValue={client.status}
              sx={{ width: { xs: "full", md: "200px" } }}
              {...register("status", {
                required: "This field is required",
                validate: (value) =>
                  ["new", "in_progress", "done"].includes(value) ||
                  "Invalid status",
              })}
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </div>
          {errors.status && (
            <p className="text-xs text-red-500">{errors.status.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
            <label htmlFor="phone" className="wrap-normal">
              {"Phone "}
            </label>

            <TextField
              type="phone"
              error={!!errors.phone}
              id="phone"
              defaultValue={client.phone}
              sx={{ width: { xs: "full", md: "200px" } }}
              {...register("phone", {
                pattern: {
                  value: /^\+[\d\s\-\(\)]{10,20}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
            <label htmlFor="notes" className="wrap-normal">
              {"Note "}
            </label>

            <Box
              sx={{
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "4px",
                boxSizing: "content-box",
                width: { xs: "full", md: "200px" },
              }}
            >
              <TextareaAutosize
                aria-label="minimum height"
                id="notes"
                minRows={3}
                maxRows={5}
                placeholder="Write something about client"
                style={{
                  outline: "none",
                  width: "100%",
                }}
                defaultValue={client.note || ""}
                {...register("note", {
                  minLength: {
                    value: 6,
                    message: "Note must be at least 6 characters",
                  },
                  maxLength: {
                    value: 220,
                    message: "Note must be max 220 characters",
                  },
                })}
              />
            </Box>
          </div>
          {errors.note && (
            <p className="text-xs text-red-500">{errors.note.message}</p>
          )}
        </div>
        <Divider sx={{ borderColor: "divider", my: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Edit />}
            disabled={!isValid || isSending}
            loading={isSending}
            type="submit"
          >
            Update client
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={!isValid || isSending}
            loading={isSending}
            onClick={() => {
              setIsDeleting(true);
            }}
          >
            <Delete />
          </Button>
        </Box>
        {isError && <p className="text-xs text-red-500">{`${isError}`}</p>}
        {isSended && !isError && (
          <p className="text-xs text-green-500">{`Client has been created successfully.`}</p>
        )}
      </form>
      <Modal
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        title="Confirm delete"
      >
        <Typography variant="body1">
          Are you sure you want to delete this client?
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
        >
          <Button onClick={() => setIsDeleting(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteClient(client.id);
              onClose();
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

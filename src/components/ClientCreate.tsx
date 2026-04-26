import { addClientService } from "@/services/clients/addClient";
import { useClientStore } from "@/store/client";
import { useAuthStore } from "@/store/user";
import { ClientStatus, ClientCreateDto } from "@/types";
import { Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const ClientCreate = () => {
  const token = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.currentUser);
  const addClient = useClientStore((state) => state.addClient);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<ClientCreateDto>(
    {
      mode: "onChange",
    },
  );

  const onSumbit: SubmitHandler<ClientCreateDto> = async (data) => {
    setIsSending(true);
    setIsError(null);
    if (!token || !currentUser) return;

    try {
      const payload = {
        ...data,
        status: "NEW" as ClientStatus,
        userId: currentUser.id,
      };
      const res = await addClientService(payload);

      addClient(res);
      reset();
    } catch {
      setIsError("Something went wrong");
    } finally {
      setIsSending(false);
      setIsSended(true);
    }
  };

  const { errors } = formState;

  return (
    <form
      className="flex flex-col gap-2 min-w-xs"
      onSubmit={handleSubmit(onSumbit)}
    >
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="name" className="wrap-normal">
            {"Name "}
            <span className="text-red-500">*</span>
          </label>

          <TextField
            error={!!errors.name}
            id="name"
            placeholder="John"
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("name", {
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
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="surname" className="wrap-normal">
            {"Surname "}
            <span className="text-red-500">*</span>
          </label>
          <TextField
            error={!!errors.surname}
            id="surname"
            placeholder="Snow"
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("surname", {
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
        {errors.surname && (
          <p className="text-xs text-red-500">{errors.surname.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="email" className="wrap-normal">
            {"Email "}
            <span className="text-red-500">*</span>
          </label>
          <TextField
            error={!!errors.email}
            type="email"
            id="email"
            placeholder="johnSnow@gmail.com"
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
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="phone" className="wrap-normal">
            {"Phone "}
          </label>
          <TextField
            error={!!errors.phone}
            type="phone"
            id="phone"
            placeholder="+380 (XX) XXX-XX-XX"
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
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row xs">
          <label htmlFor="notes" className="wrap-normal">
            {"Note "}
            {/* <span className="text-red-500">*</span> */}
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
              {...register("notes", {
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
        {errors.notes && (
          <p className="text-xs text-red-500">{errors.notes.message}</p>
        )}
      </div>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ marginTop: "20px" }}
        loading={isSending}
        type="submit"
      >
        Create client
      </Button>
      {isError && <p className="text-xs text-red-500">{`${isError}`}</p>}
      {isSended && !isError && (
        <p className="text-xs text-green-500">{`Client has been created successfully.`}</p>
      )}
    </form>
  );
};

import { addClientService } from "@/services/clients/addClient";
import { useClientStore } from "@/store/client";
import { useAuthStore } from "@/store/user";
import { ClientStatus } from "@/types";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  notes: string;
  status: ClientStatus;
  userId: string;
}
type Props = {
  onClose: () => void;
};

export const ClientCreate = ({ onClose }: Props) => {
  const token = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.currentUser);
  const addClient = useClientStore((state) => state.addClient);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<IForm>({
    mode: "onChange",
  });

  const onSumbit: SubmitHandler<IForm> = async (data) => {
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
      setIsError("Somesing went wrong");
    } finally {
      setIsSending(false);
      setIsSended(true);
    }
  };

  const { errors, isValid } = formState;

  return (
    <form
      className="flex flex-col min-w-xs gap-2"
      onSubmit={handleSubmit(onSumbit)}
    >
      <div className="w-full flex flex-col  ">
        <div className="w-full gap-y-2 flex flex-col sm:flex-row justify-between sm:items-center xs">
          <label htmlFor="name" className="wrap-normal">
            {"Name "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="John"
            className="bg-background px-4 py-1 rounded-sm min-w-50%"
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
      <div className="w-full flex flex-col  ">
        <div className="w-full gap-y-2 flex flex-col sm:flex-row justify-between sm:items-center xs">
          <label htmlFor="surname" className="wrap-normal">
            {"Surname "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="surname"
            placeholder="Snow"
            className="bg-background px-4 py-1 rounded-sm min-w-50%"
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
      <div className="w-full flex flex-col  ">
        <div className="w-full gap-y-2 flex flex-col sm:flex-row justify-between sm:items-center xs">
          <label htmlFor="email" className="wrap-normal">
            {"Email "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="johnSnow@gmail.com"
            className="bg-background px-4 py-1 rounded-sm min-w-50%"
            {...register("email", {
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 25,
                message: "Name must be max 25 characters",
              },
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: "Please enter a valid email address",
              // },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="w-full flex flex-col  ">
        <div className="w-full gap-y-2 flex flex-col sm:flex-row justify-between sm:items-center xs">
          <label htmlFor="phone" className="wrap-normal">
            {"Phone "}
            {/* <span className="text-red-500">*</span> */}
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+44 1111 222 333"
            className="bg-background px-4 py-1 rounded-sm min-w-50%"
            {...register("phone", {
              // pattern: {
              //   value: /^\+[\d\s\-\(\)]{10,20}$/,
              //   message: "Please enter a valid phone number",
              // },
            })}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="w-full flex flex-col  ">
        <div className="w-full gap-y-2 flex flex-col sm:flex-row justify-between  xs">
          <label htmlFor="notes" className="wrap-normal">
            {"Note "}
            {/* <span className="text-red-500">*</span> */}
          </label>
          <textarea
            id="notes"
            rows={5}
            placeholder="Write your note here..."
            className="bg-background px-4 py-1 rounded-sm min-w-50% resize-none"
            {...register("notes", {
              minLength: {
                value: 6,
                message: "Note must be at least 6 characters",
              },
              maxLength: {
                value: 220,
                message: "Name must be max 220 characters",
              },
            })}
          />
        </div>
        {errors.notes && (
          <p className="text-xs text-red-500">{errors.notes.message}</p>
        )}
      </div>
      <button
        className="modalSubmit mt-4 disabled:bg-gray-500"
        onClick={() => isSended ?? onClose()}
        disabled={!isValid || isSending}
      >
        {isSending ? "Creating..." : "Create"}
      </button>
      {isError && <p className="text-xs text-red-500">{`${isError}`}</p>}
      {isSended && !isError && (
        <p className="text-xs text-green-500">{`Client has been created successfully.`}</p>
      )}
    </form>
  );
};

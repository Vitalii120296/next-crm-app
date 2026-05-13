import { useAuthStore } from "@/store/user";
import { User } from "@/types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { defaultImageUrl } from "@/constants/defaultImage";
import { ModalImageViewer } from "./ModalImageViewer";
import { updateCurrentUser } from "@/services/auth/updateCurrentUser";
import { Edit } from "@mui/icons-material";
import { getImageUrl } from "@/utils/getImageUrl";
import { deleteImg } from "@/utils/deleteImg";

export const ProfileDetails = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const editUser = useAuthStore((state) => state.editUser);
  const [imagePreview, setImagePreview] = useState(
    currentUser?.avatar || defaultImageUrl,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<User>({
    mode: "onChange",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSumbit: SubmitHandler<User> = async (data) => {
    setIsSending(true);
    setIsError(null);
    setIsSended(false);
    if (!currentUser) return;

    try {
      let imgUrl: string | null = null;
      const fileName = currentUser.avatar?.split("/").at(-1) || null;

      if (imageFile) {
        imgUrl = await getImageUrl(imageFile, "profiles_img");

        if (imgUrl && fileName) {
          await deleteImg(fileName, "profiles_img");
        }
      }

      const payload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone || null,
        location: data.location || null,
        birth_date: data.birth_date || null,
        avatar: imgUrl,
        updated_at: new Date(),
      };

      const res = await updateCurrentUser(payload, currentUser.id);

      editUser(res);
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
        <ModalImageViewer
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
        />
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="email" className="wrap-normal">
            {"Email "}
            <span className="text-red-500">*</span>
          </label>

          <TextField
            error={!!errors.email}
            id="email"
            defaultValue={currentUser?.email}
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
              maxLength: {
                value: 25,
                message: "Name must be max 25 characters",
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
          <label htmlFor="first_name" className="wrap-normal">
            {"First Name "}
            <span className="text-red-500">*</span>
          </label>
          <TextField
            error={!!errors.first_name}
            id="first_name"
            defaultValue={currentUser?.first_name}
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("first_name", {
              required: "First Name is required",
              minLength: {
                value: 2,
                message: "First Name must be at least 2 characters",
              },
              maxLength: {
                value: 25,
                message: "First Name must be max 25 characters",
              },
            })}
          />
        </div>
        {errors.first_name && (
          <p className="text-xs text-red-500">{errors.first_name.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="last_name" className="wrap-normal">
            {"Last Name "}
            <span className="text-red-500">*</span>
          </label>
          <TextField
            error={!!errors.last_name}
            id="last_name"
            defaultValue={currentUser?.last_name}
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("last_name", {
              required: "Last Name is required",
              minLength: {
                value: 2,
                message: "Last Name must be at least 2 characters",
              },
              maxLength: {
                value: 25,
                message: "Last Name must be max 25 characters",
              },
            })}
          />
        </div>
        {errors.last_name && (
          <p className="text-xs text-red-500">{errors.last_name.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="phone" className="wrap-normal">
            {"Phone "}
          </label>
          <TextField
            error={!!errors.phone}
            type="text"
            id="phone"
            placeholder="Enter phone number"
            defaultValue={currentUser?.phone}
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
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="location" className="wrap-normal">
            {"Location "}
          </label>
          <TextField
            error={!!errors.location}
            type="text"
            id="location"
            placeholder="Enter location"
            defaultValue={currentUser?.location}
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("location", {
              minLength: {
                value: 2,
                message: "Location must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Location must be max 100 characters",
              },
            })}
          />
        </div>
        {errors.location && (
          <p className="text-xs text-red-500">{errors.location.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="birth_date" className="wrap-normal">
            {"Birth Date "}
          </label>
          <TextField
            error={!!errors.birth_date}
            type="date"
            id="birth_date"
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("birth_date", {})}
          />
        </div>
        {errors.birth_date && (
          <p className="text-xs text-red-500">{errors.birth_date.message}</p>
        )}
      </div>

      <Button
        variant="contained"
        startIcon={<Edit />}
        sx={{ marginTop: "20px" }}
        color="primary"
        type="submit"
      >
        {isSending ? "Editing..." : "Edit Profile"}
      </Button>
      {isError && <p className="text-xs text-red-500">{`${isError}`}</p>}
      {isSended && !isError && (
        <p className="text-xs text-green-500">{`Profile has been updated successfully.`}</p>
      )}
    </form>
  );
};

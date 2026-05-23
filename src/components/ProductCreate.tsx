import { addProductService } from "@/services/products/addProduct";
import { useProductsStore } from "@/store/products";
import { useAuthStore } from "@/store/user";
import { CreateProductDto } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Add } from "@mui/icons-material";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { defaultImageUrl } from "@/constants/defaultImage";
import { ModalImageViewer } from "./ModalImageViewer";
import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  onSuccess?: () => void;
};

export const ProductCreate = ({ onSuccess }: Props) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const addProduct = useProductsStore((state) => state.createProduct);
  const [imagePreview, setImagePreview] = useState(defaultImageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);
  const { register, handleSubmit, formState, reset } =
    useForm<CreateProductDto>({
      mode: "onChange",
    });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSumbit: SubmitHandler<CreateProductDto> = async (data) => {
    setIsSending(true);
    setIsError(null);
    setIsSended(false);
    if (!currentUser) return;

    try {
      let imgUrl: string | null = null;

      if (imageFile) {
        imgUrl = await getImageUrl(imageFile, "products_img");
      }

      const payload = {
        name: data.name,
        description: data.description === "" ? null : data.description || null,
        price: Number(data.price || 0),
        sku: data.sku === "" ? null : data.sku || null,
        clients: data.clients || null,
        image_url: imgUrl || defaultImageUrl,
        user_id: currentUser.id,
      };

      const res = await addProductService(payload);

      addProduct(res);
      reset();
      setImageFile(null);
      setImagePreview(defaultImageUrl);
      setIsSended(true);
      onSuccess?.();
    } catch (error) {
      setIsError(getErrorMessage(error));
    } finally {
      setIsSending(false);
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
          <label htmlFor="description" className="wrap-normal">
            {"Description "}
          </label>
          <TextField
            error={!!errors.description}
            id="description"
            placeholder="Enter product description"
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("description", {
              minLength: {
                value: 2,
                message: "Description must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Description must be max 100 characters",
              },
            })}
          />
        </div>
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="price" className="wrap-normal">
            {"Price "}
          </label>
          <TextField
            error={!!errors.price}
            id="price"
            placeholder="0.00"
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("price", {
              min: {
                value: 0,
                message: "Price must be a positive number",
              },
              pattern: {
                value: /^\d+(\.\d{2})?$/,
                message: "Price must be a valid number with 2 decimal places",
              },
            })}
          />
        </div>
        {errors.price && (
          <p className="text-xs text-red-500">{errors.price.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col justify-between w-full gap-y-2 sm:flex-row sm:items-center xs">
          <label htmlFor="sku" className="wrap-normal">
            {"SKU "}
          </label>
          <TextField
            error={!!errors.sku}
            type="text"
            id="sku"
            placeholder="Enter SKU number"
            sx={{ width: { xs: "full", md: "200px" } }}
            {...register("sku", {
              minLength: {
                value: 2,
                message: "SKU must be at least 2 characters",
              },
              maxLength: {
                value: 25,
                message: "SKU must be max 25 characters",
              },
            })}
          />
        </div>
        {errors.sku && (
          <p className="text-xs text-red-500">{errors.sku.message}</p>
        )}
      </div>

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ marginTop: "20px" }}
        color="primary"
        type="submit"
        disabled={isSending}
      >
        {isSending ? "Creating..." : "Create product"}
      </Button>
      {isError && <Alert severity="error">{isError}</Alert>}
      {isSended && !isError && !onSuccess && (
        <Alert severity="success">Product has been created successfully.</Alert>
      )}
    </form>
  );
};

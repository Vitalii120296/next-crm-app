import { addProductService } from "@/services/products/addProduct";
import { useProductsStore } from "@/store/products";
import { useAuthStore } from "@/store/user";
import { CreateProductDto } from "@/types";
import { Add } from "@mui/icons-material";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import { getImageServerUrlService } from "@/services/images/getImageServerUrl";
import { getImageUrlService } from "@/services/images/getImageUrl";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const defaultImageUrl = "/productImages/defaultProductImage.webp";

export const ProductCreate = () => {
  const token = useAuthStore((state) => state.token);
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
    if (!token || !currentUser) return;

    try {
      let imgUrl = defaultImageUrl;

      if (imageFile) {
        const serverUrl = await getImageServerUrlService();

        imgUrl = await getImageUrlService(serverUrl, imageFile);

        console.log(imgUrl);
      }

      const payload = {
        name: data.name,
        description: data.description === "" ? null : data.description || null,
        price: Number(data.price || 0),
        sku: data.sku === "" ? null : data.sku || null,
        userId: currentUser.id,
        clients: data.clients || null,
        image: imgUrl || defaultImageUrl,
      };

      const res = await addProductService(payload);

      addProduct(res);
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
        <CardMedia
          sx={{
            height: 180,
            borderRadius: 1,
            position: "relative",
          }}
          image={imagePreview}
          title={"Product image"}
        >
          <Button
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              opacity: "0.7",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
          </Button>
        </CardMedia>
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
      >
        {isSending ? "Creating..." : "Create product"}
      </Button>
      {isError && <p className="text-xs text-red-500">{`${isError}`}</p>}
      {isSended && !isError && (
        <p className="text-xs text-green-500">{`Product has been created successfully.`}</p>
      )}
    </form>
  );
};

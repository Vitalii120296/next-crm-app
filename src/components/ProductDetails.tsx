import { useAuthStore } from "@/store/user";
import { Product, UpdateProductDto } from "@/types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Divider } from "@mui/material";
import { useProductsStore } from "@/store/products";
import { updateProductService } from "@/services/products/updateProduct";
import { Edit } from "@mui/icons-material";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export const ProductDetails: React.FC<Props> = ({ product, onClose }) => {
  const token = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.currentUser);

  const updateProduct = useProductsStore((state) => state.updateProduct);

  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);
  const { register, handleSubmit, formState } = useForm<UpdateProductDto>({
    mode: "onChange",
  });
  const { errors } = formState;

  const onSumbit: SubmitHandler<UpdateProductDto> = async (data) => {
    setIsSending(true);
    setIsError(null);
    if (!token || !currentUser || !product?.id) return;

    try {
      const payload = {
        name: data.name,
        description: data.description === "" ? null : data.description || null,
        price: Number(data.price || 0),
        sku: data.sku === "" ? null : data.sku || null,
        clients: data.clients || null,
      };

      const updatedProduct = await updateProductService(product.id, payload);

      updateProduct(product.id, updatedProduct);
      onClose();
    } catch {
      setIsError("Something went wrong");
    } finally {
      setIsSending(false);
      setIsSended(true);
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
            <label htmlFor="name" className="wrap-normal">
              {"Name "}
              <span className="text-red-500">*</span>
            </label>

            <TextField
              error={!!errors.name}
              id="name"
              defaultValue={product?.name}
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
              defaultValue={product?.description}
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
              defaultValue={product?.price}
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
              defaultValue={product?.sku}
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

        <Divider sx={{ borderColor: "divider", my: 2 }} />

        <Button
          variant="contained"
          startIcon={<Edit />}
          sx={{ marginTop: "20px" }}
          color="primary"
          type="submit"
        >
          {isSending ? "Updating..." : "Update product"}
        </Button>
        {isError && <p className="text-xs text-red-500">{`${isError}`}</p>}
        {isSended && !isError && (
          <p className="text-xs text-green-500">{`Client has been created successfully.`}</p>
        )}
      </form>
    </>
  );
};

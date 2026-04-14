import { httpClient } from "@/api/httpClient";
import { Product, UpdateProductDto } from "@/types";

export const updateProductService = (
  id: string,
  payload: UpdateProductDto,
): Promise<Product> => {
  return httpClient.patch<UpdateProductDto, Product>(
    `/products/${id}`,
    payload,
  );
};

import { httpClient } from "@/api/httpClient";
import { Product, UpdateProductDto } from "@/types";

export const updateProductService = async (
  id: string,
  payload: UpdateProductDto,
): Promise<Product> => {
  const res = await httpClient.patch(`/products/${id}`, payload);

  return res.data;
};

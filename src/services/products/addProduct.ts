import { httpClient } from "@/api/httpClient";
import { CreateProductDto, Product } from "@/types";

export const addProductService = (
  payload: CreateProductDto,
): Promise<Product> => {
  return httpClient.post<CreateProductDto, Product>("/products", payload);
};

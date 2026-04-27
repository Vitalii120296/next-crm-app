import { httpClient } from "@/api/httpClient";
import { Product } from "@/types";

export const getProductsService = async (): Promise<Product[]> => {
  const res = await httpClient.get("/products");

  return res.data;
};

import { httpClient } from "@/api/httpClient";
import { Product } from "@/types";

export const getProductsService = (): Promise<Product[]> => {
  return httpClient.get("/products");
};

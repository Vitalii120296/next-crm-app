import { httpClient } from "@/api/httpClient";

export const deleteProductService = (productId: string): Promise<void> => {
  return httpClient.delete(`/products/${productId}`);
};

import { httpClient } from "@/api/httpClient";

export const deleteClientsService = (id: string) => {
  return httpClient.delete(`/clients/${id}`);
};

import { httpClient } from "@/api/httpClient";
import { Client } from "@/types";

export const unpdateClientService = (
  clientId: string,
  data: Partial<Client>,
): Promise<Client> => {
  return httpClient.patch<Client>(`/clients/${clientId}/`, data);
};

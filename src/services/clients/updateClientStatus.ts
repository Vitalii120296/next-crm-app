import { httpClient } from "@/api/httpClient";
import { Client, ClientStatus } from "@/types";

export const updateClientStatus = async (
  clientId: string,
  status: ClientStatus,
) => {
  return httpClient.patch<Client>(`/clients/${clientId}/`, { status });
};

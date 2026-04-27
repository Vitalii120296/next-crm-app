import { httpClient } from "@/api/httpClient";
import { Client } from "@/types";

export const updateClientService = async (
  clientId: string,
  data: Partial<Client>,
): Promise<Client> => {
  const res = await httpClient.patch<Client>(`/clients/${clientId}`, data);

  return res.data;
};

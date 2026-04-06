import { httpClient } from "@/api/httpClient";
import { Client } from "@/types";

export const addClientService = (data: Client) => {
  return httpClient.post<Client>("/clients", data);
};

import { httpClient } from "@/api/httpClient";
import { Client } from "@/types";

export const getClientsService = () => {
  return httpClient.get<Client[]>("/clients");
};

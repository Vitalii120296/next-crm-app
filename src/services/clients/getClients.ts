import { httpClient } from "@/api/httpClient";
import { Client } from "@/types";

export const getClientsService = async (): Promise<Client[]> => {
  const res = await httpClient.get("/clients");

  return res.data;
};

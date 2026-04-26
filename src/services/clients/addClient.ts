import { httpClient } from "@/api/httpClient";
import { Client, ClientCreateDto } from "@/types";

export const addClientService = (data: ClientCreateDto): Promise<Client> => {
  return httpClient.post<ClientCreateDto, Client>("/clients", data);
};

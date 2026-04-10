import { httpClient } from "@/api/httpClient";
import { Client, CreateClientDto } from "@/types";

export const addClientService = (data: CreateClientDto): Promise<Client> => {
  return httpClient.post<CreateClientDto, Client>("/clients", data);
};

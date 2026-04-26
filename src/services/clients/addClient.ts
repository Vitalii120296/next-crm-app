import { httpClient } from "@/api/httpClient";
import { ClientCreateDto, ClientResponseDto } from "@/types";

export const addClientService = (
  data: ClientCreateDto,
): Promise<ClientResponseDto> => {
  return httpClient.post<ClientCreateDto, ClientResponseDto>("/clients", data);
};

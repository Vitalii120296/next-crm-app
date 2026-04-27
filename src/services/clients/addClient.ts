import { httpClient } from "@/api/httpClient";
import { ClientCreateDto, ClientResponseDto } from "@/types";

export const addClientService = async (
  data: ClientCreateDto,
): Promise<ClientResponseDto> => {
  const res = await httpClient.post("/clients", data);

  return res.data;
};

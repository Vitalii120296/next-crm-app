import { httpClient } from "@/api/httpClient";

export const deleteClientsService = async (id: string) => {
  const res = await httpClient.delete(`/clients/${id}`);

  return res.data;
};

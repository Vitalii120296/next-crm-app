import { httpClient } from "@/api/httpClient";
import { ClientStatus } from "@/types";

export const updateClientStatus = async (
  clientId: string,
  status: ClientStatus,
) => {
  const res = await httpClient.patch(`/clients/${clientId}`, {
    status,
  });

  return res.data;
};

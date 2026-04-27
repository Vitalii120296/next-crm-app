import { httpClient } from "@/api/httpClient";
import { User } from "@/types";

export const patchCurrentUser = async (data: Partial<User>): Promise<User> => {
  const res = await httpClient.patch("/auth/me", data);

  return res.data;
};

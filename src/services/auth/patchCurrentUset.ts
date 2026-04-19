import { httpClient } from "@/api/httpClient";
import { User } from "@/types";

export const patchCurrentUser = (data: Partial<User>): Promise<User> => {
  return httpClient.patch("/auth/me", data);
};

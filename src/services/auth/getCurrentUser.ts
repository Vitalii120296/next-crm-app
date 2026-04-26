import { httpClient } from "@/api/httpClient";
import { User } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    const user = await httpClient.get<User>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

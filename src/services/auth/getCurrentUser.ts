import { httpClient } from "@/api/httpClient";
import { User } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    const user = await httpClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

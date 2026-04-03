import { FormData, User } from "@/types";
import { authClient as client } from "@/api/authClient";

export interface AuthData {
  token: string;
  user: User;
}

export const authService = {
  register: (data: FormData): Promise<AuthData> => {
    return client.post("auth/register", data);
  },

  login: (email: string, password: string): Promise<AuthData> => {
    return client.post("auth/login", { email, password });
  },

  // logout: () => client.post(""),
};

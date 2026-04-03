import { FormData, User } from "@/types";
import { authClient as client } from "@/api/authClient";

export interface AuthData {
  token: string;
  user: User;
}
export interface IRegisterRes {
  message: string;
}

export interface ILoginRes {
  acces_token: string;
}

export const authService = {
  register: (data: FormData): Promise<IRegisterRes> => {
    return client.post("auth/register", data);
  },

  login: (email: string, password: string): Promise<ILoginRes> => {
    return client.post("auth/login", { email, password });
  },

  // logout: () => client.post(""),
};

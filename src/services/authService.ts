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
  access_token: string;
}

export const authService = {
  register: (data: FormData): Promise<IRegisterRes> => {
    return client.post("auth/register", data);
  },

  login: async (
    data: Pick<FormData, "email" | "password">,
  ): Promise<ILoginRes> => {
    return fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((res) => {
      return res.json();
    });
  },

  // logout: () => client.post(""),
};

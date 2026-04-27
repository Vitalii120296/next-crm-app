import { authClient } from "@/api/authClient";

interface IToken {
  token: string;
}

export const getTokenService = async (): Promise<IToken> => {
  const res = await authClient.get("/api/auth/get-token");

  const { token } = res.data;

  return { token };
};

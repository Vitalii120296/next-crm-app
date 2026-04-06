import { authClient } from "@/api/authClient";

interface IToken {
  token: string;
}

export const getTokenService = async (): Promise<IToken> => {
  const { token } = await authClient.get<IToken>("/api/auth/get-token");

  return { token: token };
};

import { FormData, ILoginRes } from "@/types";
import { authClient } from "@/api/authClient";
import { httpClient } from "@/api/httpClient";
import { useAuthStore } from "@/store/user";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useAuth = () => {
  const { setToken, setCurrentUser } = useAuthStore();
  const login = (
    data: Pick<FormData, "email" | "password">,
  ): Promise<ILoginRes> => {
    return authClient.post("/api/auth/login", data);
  };

  const register = async (data: FormData) => {
    return httpClient.post("/auth/register", data);
  };

  const logout = async () => {
    try {
      await authClient.post("/api/auth/logout");

      setToken(null);
      setCurrentUser(null);
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }

    return;
  };

  return { login, logout, register };
};

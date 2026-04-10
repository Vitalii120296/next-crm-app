import {
  IRegisterFormData,
  LoginResponse,
  ILoginFormData,
  RegisterResponse,
} from "@/types";
import { authClient } from "@/api/authClient";
import { httpClient } from "@/api/httpClient";
import { useAuthStore } from "@/store/user";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { setToken, setCurrentUser } = useAuthStore();
  const router = useRouter();
  const login = (data: ILoginFormData): Promise<LoginResponse> => {
    return authClient.post("/api/auth/login", data);
  };

  const register = async (
    data: IRegisterFormData,
  ): Promise<RegisterResponse> => {
    return httpClient.post("/auth/register", data);
  };

  const logout = async () => {
    try {
      await authClient.post("/api/auth/logout");

      setToken(null);
      setCurrentUser(null);
      router.push("/");
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }

    return;
  };

  return { login, logout, register };
};

import { useAuthStore } from "@/store/user";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { AuthError, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { supabase } from "@/shared/lib/supabase/supabaseClient";

type SignUpData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

type SignInResponse = {
  data: AuthTokenResponsePassword["data"];
  error: AuthError | null;
};

export const useAuth = () => {
  const { setCurrentUser } = useAuthStore();
  const router = useRouter();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      setCurrentUser(null);
      localStorage.removeItem("auth-storage");

      router.push("/");
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }

    return;
  };

  return { logout };
};

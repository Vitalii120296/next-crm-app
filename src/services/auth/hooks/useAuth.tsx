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

  async function signIn(
    email: string,
    password: string,
  ): Promise<SignInResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }

  async function signUp({
    email,
    password,
    first_name,
    last_name,
  }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    return { data, error };
  }

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

  return { signIn, logout, signUp };
};

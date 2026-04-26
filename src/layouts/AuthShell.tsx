"use client";

import { useCurrentSession } from "@/services/auth/hooks/useCurentSession";
import { useGetToken } from "@/services/auth/hooks/useGetToken";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/services/auth/hooks/useAuth";

export const AuthShell = ({ children }: { children: React.ReactNode }) => {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setToken = useAuthStore((state) => state.setToken);
  const tokenExpiry = useAuthStore((state) => state.tokenExpiry);
  const { logout } = useAuth();
  const { token } = useGetToken();
  const { currentUser } = useCurrentSession(token);
  const router = useRouter();

  useEffect(() => {
    if (token && currentUser) {
      setToken(token);
      setCurrentUser(currentUser);
    }
  }, [token, setToken, currentUser, setCurrentUser]);

  useEffect(() => {
    if (!tokenExpiry) return;

    const timeout = tokenExpiry - Date.now();

    if (timeout <= 0) {
      return async () => {
        await logout();

        router.replace("/sign-in");
      };
    }

    const timer = setTimeout(async () => {
      await logout();

      router.replace("/sign-in");
    }, timeout);

    return () => clearTimeout(timer);
  }, [tokenExpiry, logout, router]);

  return children;
};

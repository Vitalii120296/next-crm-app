"use client";

import { useCurrentSession } from "@/services/auth/hooks/useCurentSession";
import { useGetToken } from "@/services/auth/hooks/useGetToken";
import { useAuthStore } from "@/store/user";
import { useEffect } from "react";

export const AuthShell = ({ children }: { children: React.ReactNode }) => {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setToken = useAuthStore((state) => state.setToken);
  const { token } = useGetToken();
  const { currentUser } = useCurrentSession(token);

  useEffect(() => {
    if (token && currentUser) {
      setToken(token);
      setCurrentUser(currentUser);
    }
  }, [token, setToken, currentUser, setCurrentUser]);

  return children;
};

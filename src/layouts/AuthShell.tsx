"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/user";
import { User } from "@/types";

export function AuthShell({
  initialProfile,
  children,
}: {
  initialProfile: User | null;
  children: React.ReactNode;
}) {
  const { setCurrentUser } = useAuthStore();

  useEffect(() => {
    if (initialProfile) {
      setCurrentUser(initialProfile);
    }
  }, [initialProfile, setCurrentUser]);

  return <>{children}</>;
}

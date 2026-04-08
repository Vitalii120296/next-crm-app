"use client";

import { useGetToken } from "@/services/auth/hooks/useGetToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function AuthCheck({ children }: Props) {
  const { token } = useGetToken();
  const router = useRouter();

  useEffect(() => {
    if (token) router.push("/crm");
  }, [router, token]);

  return children;
}

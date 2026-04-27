"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccess() {
    const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "")).get("token");

    if (token) {
      fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }).then(() => {
        window.history.replaceState(null, "", "/crm");
        router.push("/crm");
      });
    }
  }, [router]);
}
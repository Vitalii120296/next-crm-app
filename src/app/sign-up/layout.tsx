import { AuthCheck } from "@/layouts/AuthCheck";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCheck>{children}</AuthCheck>;
}

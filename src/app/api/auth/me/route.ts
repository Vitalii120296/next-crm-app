import { AuthTokenService } from "@/shared/lib/token/AuthTokenService";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await AuthTokenService.getToken();

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const res = await fetch(
    "https://fluxo-backend-production-bda1.up.railway.app/auth/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

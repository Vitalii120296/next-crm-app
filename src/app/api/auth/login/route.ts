import { AuthTokenService } from "@/shared/lib/token/AuthTokenService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!backendRes.ok) {
    return NextResponse.json({ status: "ERROR" }, { status: 401 });
  }

  const data = await backendRes.json();

  await AuthTokenService.setToken(data.access_token);

  return NextResponse.json({ status: "OK" });
}

import { httpClient } from "@/api/httpClient";
import { AuthTokenService } from "@/shared/lib/token/AuthTokenService";
import { NextResponse } from "next/server";

type LoginResponse = {
  access_token: string;
};

export async function POST(req: Request) {
  const payload = await req.json();

  const response = await httpClient.post<LoginResponse>("/auth/login", payload);

  if (!response.access_token) {
    return NextResponse.json({ status: "ERROR" }, { status: 401 });
  }

  await AuthTokenService.setToken(response.access_token);

  return NextResponse.json({ status: "OK" });
}

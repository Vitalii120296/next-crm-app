import { NextResponse } from "next/server";
import { AuthTokenService } from "@/shared/lib/token/AuthTokenService";

export async function POST(req: Request) {
  const { token } = await req.json();

  await AuthTokenService.setToken(token);

  return NextResponse.json({ ok: true });
}
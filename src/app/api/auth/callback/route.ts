import { getRequestOrigin } from "@/shared/lib/getRequestOrigin";
import { supabaseRouteHandlerClient } from "@/shared/lib/supabase/routHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const oauthError = req.nextUrl.searchParams.get("error");
  const next = req.nextUrl.searchParams.get("next") ?? "/crm";
  const origin = getRequestOrigin(req);

  if (oauthError || !code) {
    return NextResponse.redirect(
      new URL("/sign-in?error=auth", origin),
    );
  }

  const response = NextResponse.redirect(new URL(next, origin));
  const supabase = supabaseRouteHandlerClient(req, response);

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/sign-in?error=auth", origin),
    );
  }

  return response;
}

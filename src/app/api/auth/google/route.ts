import { supabaseRouteHandlerClient } from "@/shared/lib/supabase/routHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieResponse = new NextResponse();
  const supabase = supabaseRouteHandlerClient(req, cookieResponse);

  const redirectTo = new URL("/api/auth/callback", req.nextUrl.origin).toString();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(
      new URL("/sign-in?error=oauth", req.nextUrl.origin),
    );
  }

  return NextResponse.redirect(data.url, { headers: cookieResponse.headers });
}

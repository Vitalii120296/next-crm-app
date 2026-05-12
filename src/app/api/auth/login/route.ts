import { supabaseRouteHandlerClient } from "@/shared/lib/supabase/routHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  if (!payload.email || !payload.password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ message: "ok" }, { status: 200 });
  const supabase = supabaseRouteHandlerClient(req, response);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { message: error?.message ?? "Login failed" },
      { status: 401 },
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.session.user.id)
    .maybeSingle();

  // Куки вже записані в response через setAll
  return NextResponse.json(
    { profile },
    {
      status: 200,
      headers: response.headers,
    },
  );
}

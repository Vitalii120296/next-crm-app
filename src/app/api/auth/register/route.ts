import { supabaseRouteHandlerClient } from "@/shared/lib/supabase/routHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  if (
    !payload.email ||
    !payload.password ||
    !payload.first_name ||
    !payload.last_name
  ) {
    return NextResponse.json(
      { message: "Email, password, first name and last name are required" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ message: "ok" }, { status: 200 });
  const supabase = supabaseRouteHandlerClient(req, response);

  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        first_name: payload.first_name,
        last_name: payload.last_name,
      },
    },
  });

  if ( error ) {
    return NextResponse.json(
      { message: error?.message ?? "Registration failed" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      status: 200,
      headers: response.headers,
    },
  );
}

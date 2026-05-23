import type { NextRequest } from "next/server";

/** Public origin for the current request (works on Vercel and localhost). */
export function getRequestOrigin(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") ??
    req.nextUrl.protocol.replace(":", "");

  if (host) {
    return `${proto}://${host}`;
  }

  return req.nextUrl.origin;
}

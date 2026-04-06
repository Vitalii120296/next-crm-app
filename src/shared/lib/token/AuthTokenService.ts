import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

type CookieOptions = Partial<Omit<ResponseCookie, "name" | "value">>;

export class AuthTokenService {
  private static readonly tokenName = "access_token";

  private static readonly tokenOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1, // 1 hours
    sameSite: "lax",
    path: "/",
  };

  // ====== SET ======
  static async setToken(token: string) {
    const store = await cookies();
    store.set(this.tokenName, token, this.tokenOptions);
  }

  // ====== GET ======
  static async getToken() {
    const store = await cookies();
    return store.get(this.tokenName)?.value ?? null;
  }

  // ====== CLEAR ======
  static async clearToken() {
    const store = await cookies();
    store.set(this.tokenName, "", { maxAge: 0, path: "/" });
  }
}

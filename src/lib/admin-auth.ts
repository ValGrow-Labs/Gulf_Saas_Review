/**
 * Minimal password auth for the /admin CMS.
 * - Password comes from ADMIN_PASSWORD (.env.local). If unset, the admin is disabled.
 * - Session = "<expiryMs>.<hmac>" in an httpOnly cookie, signed with ADMIN_SESSION_SECRET
 *   (falls back to the password). Changing either value logs everyone out.
 * Server-only: import from Server Components, Server Actions and Route Handlers.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "gsr_admin";
const MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD is not set");
  return s;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("hex");

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare HMACs so the comparison is constant-time regardless of input length.
  return safeEqual(sign(`pw:${input}`), sign(`pw:${expected}`));
}

export async function startSession() {
  const expires = Date.now() + MAX_AGE_S * 1000;
  const token = `${expires}.${sign(String(expires))}`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_S,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [exp, mac] = token.split(".");
  if (!exp || !mac || Number(exp) < Date.now()) return false;
  return safeEqual(mac, sign(exp));
}

/** Use at the top of every admin page and Server Action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

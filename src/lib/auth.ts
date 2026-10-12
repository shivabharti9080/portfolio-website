import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.AUTH_SECRET || "fallback_shiva_bharti_secure_secret_key_2026_production";
const key = new TextEncoder().encode(SECRET_KEY);

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

export async function encryptToken(payload: Record<string, any>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminSession;
  } catch (err) {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function setAdminSession(user: { id: string; email: string; name: string; role: string }) {
  const token = await encryptToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export function unauthorizedResponse(message = "Unauthorized: Admin privileges required") {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}

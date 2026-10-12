import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AdminLoginSchema } from "@/validations";
import { setAdminSession, clearAdminSession, getAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = AdminLoginSchema.parse(body);

    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (e) {
      console.warn("DB offline during admin login verification");
    }

    // Default fallback admin check for local bootstrapping if DB isn't seeded yet
    const fallbackEmail = process.env.ADMIN_EMAIL || "shivaharti9080@gmail.com";
    const fallbackPassword = process.env.ADMIN_PASSWORD || "AdminSecurePassword2026!";

    if (!user) {
      if (email === fallbackEmail && password === fallbackPassword) {
        user = {
          id: "admin_root",
          email: fallbackEmail,
          name: "Shiva Bharti",
          role: "ADMIN",
        };
        await setAdminSession(user as any);
        return NextResponse.json({ success: true, user: { email: user.email, name: user.name, role: user.role } });
      }
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    await setAdminSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Authentication failed" }, { status: 400 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, session });
}

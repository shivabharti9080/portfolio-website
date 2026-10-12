import { NextResponse } from "next/server";
import { getProfileData } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { ProfileUpdateSchema } from "@/validations";

export async function GET() {
  try {
    const profile = await getProfileData();
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const body = await req.json();
    const validated = ProfileUpdateSchema.parse(body);

    const existing = await prisma.profile.findFirst();
    if (!existing) {
      const created = await prisma.profile.create({ data: validated as any });
      return NextResponse.json({ success: true, data: created });
    }

    const updated = await prisma.profile.update({
      where: { id: existing.id },
      data: validated,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { SkillSchema } from "@/validations";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();
    const validated = SkillSchema.partial().parse(body);

    const updated = await prisma.skill.update({
      where: { id },
      data: validated as any,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

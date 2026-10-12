import { NextResponse } from "next/server";
import { getSkillsData } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { SkillSchema } from "@/validations";

export async function GET() {
  try {
    const categories = await getSkillsData();
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const body = await req.json();
    const validated = SkillSchema.parse(body);

    const newSkill = await prisma.skill.create({
      data: {
        name: validated.name,
        categoryId: validated.categoryId,
        status: validated.status as any,
        ratingScore: validated.ratingScore,
        order: validated.order,
        isFeatured: validated.isFeatured,
      },
    });

    return NextResponse.json({ success: true, data: newSkill }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

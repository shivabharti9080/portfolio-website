import { NextResponse } from "next/server";
import { getTimelineData, getLearningMilestonesData } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { ExperienceSchema, MilestoneSchema } from "@/validations";

export async function GET() {
  try {
    const timeline = await getTimelineData();
    const milestones = await getLearningMilestonesData();
    return NextResponse.json({ success: true, data: { timeline, milestones } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const body = await req.json();
    if (body.isMilestone) {
      const validated = MilestoneSchema.parse(body);
      const milestone = await prisma.learningMilestone.create({
        data: {
          title: validated.title,
          description: validated.description,
          category: validated.category,
          milestoneDate: new Date(validated.milestoneDate),
          isVerified: validated.isVerified,
          order: validated.order,
        },
      });
      return NextResponse.json({ success: true, data: milestone }, { status: 201 });
    } else {
      const validated = ExperienceSchema.parse(body);
      const experience = await prisma.experience.create({
        data: {
          type: validated.type as any,
          title: validated.title,
          organization: validated.organization,
          location: validated.location,
          startDate: new Date(validated.startDate),
          endDate: validated.endDate ? new Date(validated.endDate) : null,
          isCurrent: validated.isCurrent,
          description: validated.description,
          skillsUsed: validated.skillsUsed,
          order: validated.order,
        },
      });
      return NextResponse.json({ success: true, data: experience }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

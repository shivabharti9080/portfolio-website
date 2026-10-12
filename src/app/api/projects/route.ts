import { NextResponse } from "next/server";
import { getProjectsData } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { ProjectSchema } from "@/validations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase();

    const session = await getAdminSession();
    // Non-admin can only see published projects
    const onlyPublished = !session;

    let projects: any[] = await getProjectsData({ onlyPublished });

    if (category && category !== "All") {
      projects = projects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (status && status !== "All") {
      projects = projects.filter((p) => p.status === status);
    }
    if (search) {
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.summary.toLowerCase().includes(search) ||
          p.technologies?.some((t: any) => t.name.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const body = await req.json();
    const validated = ProjectSchema.parse(body);

    const created = await prisma.project.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        summary: validated.summary,
        category: validated.category,
        status: validated.status as any,
        isFeatured: validated.isFeatured,
        isPublished: validated.isPublished,
        thumbnailUrl: validated.thumbnailUrl,
        githubUrl: validated.githubUrl,
        demoUrl: validated.demoUrl,
        problemStatement: validated.problemStatement,
        proposedSolution: validated.proposedSolution,
        systemArchitecture: validated.systemArchitecture,
        challengesLearned: validated.challengesLearned,
        futureRoadmap: validated.futureRoadmap,
        targetAudience: validated.targetAudience,
        order: validated.order,
        technologies: {
          create: validated.technologies?.map((t) => ({ name: t })) || [],
        },
        features: {
          create: validated.features?.map((f, i) => ({
            title: f.title,
            description: f.description,
            isCompleted: f.isCompleted,
            order: i,
          })) || [],
        },
      },
      include: {
        technologies: true,
        features: true,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

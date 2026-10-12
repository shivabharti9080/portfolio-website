import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { ProjectSchema } from "@/validations";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getAdminSession();
    const onlyPublished = !session;

    // Check by slug or id
    let project = await getProjectBySlug(id, { onlyPublished });
    if (!project) {
      try {
        project = await prisma.project.findUnique({
          where: { id },
          include: { technologies: true, features: true, images: true },
        }) as any;
      } catch (e) {}
    }

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();
    const validated = ProjectSchema.partial().parse(body);

    const { technologies, features, ...scalarFields } = validated;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(scalarFields as any),
        ...(technologies
          ? {
              technologies: {
                deleteMany: {},
                create: technologies.map((name) => ({ name })),
              },
            }
          : {}),
      },
      include: { technologies: true, features: true },
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
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

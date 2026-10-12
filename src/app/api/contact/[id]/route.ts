import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        isRead: body.isRead !== undefined ? Boolean(body.isRead) : undefined,
        isArchived: body.isArchived !== undefined ? Boolean(body.isArchived) : undefined,
      },
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
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { getServicesData } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import { ServiceSchema } from "@/validations";

export async function GET() {
  try {
    const services = await getServicesData();
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const body = await req.json();
    const validated = ServiceSchema.parse(body);

    const created = await prisma.service.create({
      data: validated,
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const resume = await prisma.resumeAsset.findFirst({
      where: { isCurrent: true },
      orderBy: { uploadedAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      data: resume || {
        filename: "Shiva_Bharti_Resume.pdf",
        filePath: "/resume.pdf",
        isCurrent: false,
        message: "No customized resume uploaded yet. Default preview placeholder active.",
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      data: {
        filename: "Shiva_Bharti_Resume.pdf",
        filePath: "/resume.pdf",
        isCurrent: false,
      },
    });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File exceeds 5MB size limit" }, { status: 400 });
    }

    // Verify MIME
    if (file.type !== "application/pdf") {
      return NextResponse.json({ success: false, error: "Only PDF resumes are accepted" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const safeFilename = `resume_${Date.now()}.pdf`;
    const destPath = path.join(uploadsDir, safeFilename);
    await fs.writeFile(destPath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;

    // Mark previous as non-current
    try {
      await prisma.resumeAsset.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      });

      const asset = await prisma.resumeAsset.create({
        data: {
          filename: file.name,
          filePath: publicUrl,
          fileSize: file.size,
          mimeType: file.type,
          isCurrent: true,
        },
      });

      return NextResponse.json({ success: true, data: asset }, { status: 201 });
    } catch (e) {
      return NextResponse.json({ success: true, data: { filePath: publicUrl, filename: file.name } }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

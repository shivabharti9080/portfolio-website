import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactFormSchema } from "@/validations";
import { getAdminSession, unauthorizedResponse } from "@/lib/auth";

// In-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 5; // 5 submissions per minute

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = ContactFormSchema.parse(body);

    let messageRecord;
    try {
      messageRecord = await prisma.contactMessage.create({
        data: {
          name: validated.name,
          email: validated.email,
          subject: validated.subject,
          message: validated.message,
          ipAddress: ip,
        },
      });
    } catch (dbErr) {
      console.warn("DB not connected, logging contact message safely:", {
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        timestamp: new Date().toISOString(),
      });
      messageRecord = { id: "simulated_id", ...validated };
    }

    // Email dispatch via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev",
            to: process.env.CONTACT_TO_EMAIL || "shivaharti9080@gmail.com",
            subject: `[Portfolio Contact] ${validated.subject} from ${validated.name}`,
            html: `
              <h3>New Portfolio Contact Submission</h3>
              <p><strong>Name:</strong> ${validated.name}</p>
              <p><strong>Email:</strong> ${validated.email}</p>
              <p><strong>Subject:</strong> ${validated.subject}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${validated.message}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Resend delivery failed:", (emailErr as any).message);
      }
    }

    return NextResponse.json(
      { success: true, message: "Thank you for reaching out! Your message has been received.", id: messageRecord.id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Invalid input" }, { status: 400 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

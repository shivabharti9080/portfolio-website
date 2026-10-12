import { describe, it, expect } from "vitest";
import { ContactFormSchema, AdminLoginSchema, ProjectSchema } from "../src/validations";

describe("Zod Validation Schemas", () => {
  it("validates valid contact form input correctly", () => {
    const validData = {
      name: "Alex Morgan",
      email: "alex@example.com",
      subject: "Collaboration Inquiry",
      message: "Hello Shiva, I would love to discuss a project with you.",
    };
    const parsed = ContactFormSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it("rejects contact form with short message or invalid email", () => {
    const invalidData = {
      name: "A",
      email: "invalid-email",
      subject: "Hi",
      message: "Short",
    };
    const parsed = ContactFormSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });

  it("validates admin login credentials correctly", () => {
    const validLogin = {
      email: "shivaharti9080@gmail.com",
      password: "SuperSecurePassword123!",
    };
    const parsed = AdminLoginSchema.safeParse(validLogin);
    expect(parsed.success).toBe(true);
  });

  it("validates project schema with allowed status enums", () => {
    const validProject = {
      title: "StayNest",
      slug: "staynest",
      summary: "A rental and local services platform concept.",
      category: "Full-Stack Development",
      status: "CONCEPT",
    };
    const parsed = ProjectSchema.safeParse(validProject);
    expect(parsed.success).toBe(true);
  });
});

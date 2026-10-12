import { describe, it, expect } from "vitest";
import { encryptToken, verifyToken } from "../src/lib/auth";

describe("Authentication JWT & Session Security", () => {
  it("encrypts and verifies admin token successfully", async () => {
    const payload = {
      userId: "admin_test_123",
      email: "shivaharti9080@gmail.com",
      name: "Shiva Bharti",
      role: "ADMIN",
    };

    const token = await encryptToken(payload);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);

    const verified = await verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe(payload.email);
    expect(verified?.role).toBe("ADMIN");
  });

  it("returns null on tampered or invalid token", async () => {
    const verified = await verifyToken("malicious.tampered.token");
    expect(verified).toBeNull();
  });
});

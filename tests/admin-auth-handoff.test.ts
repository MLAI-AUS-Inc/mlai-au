import { describe, expect, test } from "bun:test";

import {
  ADMIN_AUTH_COMPLETION_ORIGIN,
  getAuthCompletionLocation,
  getDefaultAuthNext,
  normalizeAdminAuthPath,
  normalizeAuthNextForApp,
  normalizeRelativeAuthPath,
} from "../app/lib/auth-return";

describe("preserved admin authentication handoff", () => {
  test("keeps a valid admin return path relative until fixed-origin completion", () => {
    const next = "/updates/42?tab=review";

    expect(getDefaultAuthNext("admin")).toBe("/");
    expect(normalizeRelativeAuthPath(next)).toBe(next);
    expect(normalizeAdminAuthPath(next)).toBe(next);
    expect(normalizeAuthNextForApp("admin", next)).toBe(next);
    expect(getAuthCompletionLocation("admin", next)).toBe(
      `${ADMIN_AUTH_COMPLETION_ORIGIN}${next}`,
    );
  });

  test("rejects absolute, protocol-relative, backslash, and encoded-slash redirects", () => {
    const unsafeNextValues = [
      "https://evil.example/phish",
      "//evil.example/phish",
      "/\\evil.example/phish",
      "/%2f%2fevil.example/phish",
      "/%5cevil.example/phish",
      "evil.example/phish",
      "\u0000/evil.example/phish",
    ];

    for (const next of unsafeNextValues) {
      expect(normalizeRelativeAuthPath(next)).toBeNull();
      expect(normalizeAdminAuthPath(next)).toBeNull();
      expect(normalizeAuthNextForApp("admin", next)).toBe("/");
      expect(getAuthCompletionLocation("admin", next)).toBe(
        `${ADMIN_AUTH_COMPLETION_ORIGIN}/`,
      );
    }
  });

  test("rejects raw, encoded, and repeatedly encoded admin fragments", () => {
    const unsafeAdminNextValues = [
      "/review#fragment",
      "/review%23fragment",
      "/review%2523fragment",
      "/review%252523fragment",
      "/review?focus=%23fragment",
      "/review?focus=%252523fragment",
      "/review%0d%0aLocation:evil",
      "/%25252f%25252fevil.example/phish",
      "/%25255cevil.example/phish",
    ];

    for (const next of unsafeAdminNextValues) {
      expect(normalizeAdminAuthPath(next)).toBeNull();
      expect(normalizeAuthNextForApp("admin", next)).toBe("/");
      expect(getAuthCompletionLocation("admin", next)).toBe(
        `${ADMIN_AUTH_COMPLETION_ORIGIN}/`,
      );
    }

    expect(
      normalizeAuthNextForApp("admin", "/review#fragment", {
        fallback: "/updates#also-unsafe",
      }),
    ).toBe("/");
  });

  test("never lets a caller-provided query value replace the ops origin", () => {
    const completion = getAuthCompletionLocation(
      "admin",
      "/?origin=https://evil.example&next=/phish",
    );
    const target = new URL(completion);

    expect(target.origin).toBe(ADMIN_AUTH_COMPLETION_ORIGIN);
    expect(target.pathname).toBe("/");
    expect(target.searchParams.get("origin")).toBe("https://evil.example");
  });

  test("preserves existing same-origin completion for non-admin apps", () => {
    const next = "/founder-tools/marketing/create?step=baseline&return=%2Ffounder-tools#draft";

    expect(normalizeRelativeAuthPath(next)).toBe(next);
    expect(normalizeAuthNextForApp("founder-tools", next)).toBe(next);
    expect(getAuthCompletionLocation("founder-tools", next)).toBe(next);
  });

  test("wires login and verification through the fixed completion helper", async () => {
    const loginRoute = await Bun.file("app/routes/platform.login.tsx").text();
    const verifyRoute = await Bun.file("app/routes/verify-email.tsx").text();
    const authClient = await Bun.file("app/lib/auth.ts").text();

    expect(authClient).toContain('| "admin"');
    expect(loginRoute).toContain('value === "admin"');
    expect(loginRoute).toContain("redirect(getAuthCompletionLocation(app, next, { fallback }))");
    expect(verifyRoute).toContain('headers.set("Location", completionLocation)');
    expect(verifyRoute).toContain('app === "admin" ? `${MAIN_SITE_AUTH_ORIGIN}${path}` : path');
    expect(loginRoute).not.toContain('searchParams.get("origin")');
    expect(verifyRoute).not.toContain('searchParams.get("origin")');
  });
});

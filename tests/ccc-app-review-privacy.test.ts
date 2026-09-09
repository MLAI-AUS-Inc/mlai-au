import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const policy = readFileSync(new URL("../app/routes/privacy.tsx", import.meta.url), "utf8");
const contact = readFileSync(new URL("../app/routes/contact.tsx", import.meta.url), "utf8");

describe("Carbon, Cost & Convenience App Review disclosures", () => {
  test("retains a distinct game policy within MLAI's broader policy", () => {
    for (const phrase of ["Carbon, Cost & Convenience", "Google user data", "Limited Use", "Vibe Raising", "does not send classroom information to the AI or marketing services"])
      expect(policy).toContain(phrase);
  });
  test("explains online identity, local solo play and SDK diagnostic data", () => {
    for (const phrase of ["Continue Solo Offline", "anonymous Firebase account", "Sign in with Apple", "Other Diagnostic Data", "no advertising", "asia-southeast1"])
      expect(policy).toContain(phrase);
  });
  test("documents optional local-only camera scanning and manual fallback", () => {
    for (const phrase of ["Scan QR code", "not saved or uploaded", "Enter code manually", "background"])
      expect(policy).toContain(phrase);
  });
  test("uses real deletion controls and distinguishes the two account roles", () => {
    expect(policy).toContain("Delete Account is available in the opening menu and teacher dashboard");
    expect(policy).toContain("all owned classrooms");
    expect(policy).toContain("90 days");
    expect(policy).not.toContain("from Privacy & Account");
  });
  test("uses the owner-confirmed address and provides app support", () => {
    for (const page of [policy, contact]) expect(page).toContain("Suite 350, 585 Little Collins Street");
    expect(contact).toContain("Carbon, Cost &amp; Convenience app support");
    expect(contact).toContain("mailto:hi@mlai.au");
    expect(contact).not.toContain("7 Curran Street");
  });
});

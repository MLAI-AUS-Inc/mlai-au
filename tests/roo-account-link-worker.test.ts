import { describe, expect, test } from "bun:test";
import {
  rejectedRooAccountLinkCapabilityResponse,
  rooAccountLinkCapabilityDisposition,
} from "../app/lib/roo-account-link-url";

describe("Roo account-link worker URL handling", () => {
  test("blocks token-bearing links without reflecting the capability", async () => {
    const disposition = rooAccountLinkCapabilityDisposition(
      new URL("https://www.mlai.au/founder-tools/link-roo?token=secret"),
    );
    const response = rejectedRooAccountLinkCapabilityResponse();

    expect(disposition).toBe("reject");
    expect(response?.status).toBe(400);
    expect(response?.headers.get("Location")).toBeNull();
    expect(response?.headers.get("Cache-Control")).toBe("no-store");
    expect(response?.headers.get("Referrer-Policy")).toBe("no-referrer");
    expect(await response?.text()).not.toContain("secret");
  });

  test("routes canonical token links before tracking redirects", () => {
    expect(
      rooAccountLinkCapabilityDisposition(
        new URL(
          "https://mlai.au/founder-tools/link-roo?token=secret&utm_source=slack",
        ),
      ),
    ).toBe("route");
  });

  test.each([
    "http://mlai.au/founder-tools/link-roo?token=secret",
    "https://mlai.au:444/founder-tools/link-roo?token=secret",
    "https://www.mlai.au/founder-tools/link-roo?token=secret",
  ])("rejects a token on every noncanonical origin: %s", (rawUrl) => {
    expect(rooAccountLinkCapabilityDisposition(new URL(rawUrl))).toBe(
      "reject",
    );
  });

  test.each([
    "https://www.mlai.au/founder-tools/link-roo",
    "https://www.mlai.au/another-route?token=secret",
  ])("does not interfere with unrelated URLs: %s", (rawUrl) => {
    expect(rooAccountLinkCapabilityDisposition(new URL(rawUrl))).toBeNull();
  });
});

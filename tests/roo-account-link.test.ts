import { describe, expect, test } from "bun:test";
import {
  clearRooAccountLinkCookie,
  createRooAccountLinkCookie,
  isPlausibleRooAccountLinkToken,
  pageStatusForLinkError,
  readRooAccountLinkToken,
  withoutRooAccountLinkCookie,
} from "../app/lib/roo-account-link";

const TOKEN = "A".repeat(43);

describe("Roo Founder Tools account-link security helpers", () => {
  test("accepts expected URL-safe tokens and rejects malformed values", () => {
    expect(isPlausibleRooAccountLinkToken(TOKEN)).toBe(true);
    expect(isPlausibleRooAccountLinkToken("too-short")).toBe(false);
    expect(isPlausibleRooAccountLinkToken(`${"A".repeat(42)}!`)).toBe(false);
  });

  test("stores the token in an HttpOnly route-scoped secure cookie", () => {
    const request = new Request("https://mlai.au/founder-tools/link-roo");
    const cookie = createRooAccountLinkCookie(TOKEN, request);

    expect(cookie).toContain("Path=/founder-tools/link-roo");
    expect(cookie).toContain("Max-Age=1800");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).toContain("Secure");
  });

  test("omits Secure only for local HTTP development", () => {
    const request = new Request("http://localhost:5173/founder-tools/link-roo");
    const cookie = createRooAccountLinkCookie(TOKEN, request);

    expect(cookie).not.toContain("Secure");
  });

  test("reads only a valid account-link token", () => {
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      headers: {
        Cookie: `other=value; roo_founder_link_token=${TOKEN}`,
      },
    });
    expect(readRooAccountLinkToken(request)).toBe(TOKEN);

    const invalid = new Request("https://mlai.au/founder-tools/link-roo", {
      headers: { Cookie: "roo_founder_link_token=bad" },
    });
    expect(readRooAccountLinkToken(invalid)).toBeNull();

    const malformed = new Request("https://mlai.au/founder-tools/link-roo", {
      headers: { Cookie: "roo_founder_link_token=%E0%A4%A" },
    });
    expect(readRooAccountLinkToken(malformed)).toBeNull();
  });

  test("does not forward the link token with auth cookies", () => {
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      method: "POST",
      headers: {
        Cookie: `sessionid=auth-session; roo_founder_link_token=${TOKEN}; theme=light`,
      },
    });

    const sanitized = withoutRooAccountLinkCookie(request);

    expect(sanitized.headers.get("Cookie")).toBe(
      "sessionid=auth-session; theme=light",
    );
    expect(sanitized.headers.get("Cookie")).not.toContain(TOKEN);
  });

  test("clears the route-scoped token cookie", () => {
    const request = new Request("https://mlai.au/founder-tools/link-roo");
    const cookie = clearRooAccountLinkCookie(request);

    expect(cookie).toContain("Max-Age=0");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
  });

  test("maps only terminal backend errors to terminal pages", () => {
    expect(pageStatusForLinkError("expired_token")).toBe("expired");
    expect(pageStatusForLinkError("token_already_used")).toBe("used");
    expect(pageStatusForLinkError("link_conflict")).toBe("conflict");
    expect(pageStatusForLinkError("invalid_token")).toBe("invalid");
    expect(pageStatusForLinkError("backend_unavailable")).toBeNull();
  });
});

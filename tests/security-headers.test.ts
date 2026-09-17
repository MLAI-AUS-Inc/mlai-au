import { describe, expect, test } from "bun:test";
import { applySecurityHeaders } from "../workers/security-headers";
import { rejectedRooAccountLinkCapabilityResponse } from "../app/lib/roo-account-link-url";

const production = new URL("https://mlai.au/articles");
const html = (headers: HeadersInit = {}) => new Response("<p>Streaming content</p>", {
  headers: { "Content-Type": "text/html; charset=utf-8", ...headers },
});

describe("worker security headers", () => {
  test("protects production documents without enforcing resource restrictions", async () => {
    const original = html();
    const response = applySecurityHeaders(original, production);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("<p>Streaming content</p>");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");
    expect(response.headers.get("Content-Security-Policy")).toBe("frame-ancestors 'self'");
    expect(response.headers.get("Content-Security-Policy-Report-Only")).toContain("default-src 'self'");
    expect(response.headers.get("Strict-Transport-Security")).toBe("max-age=31536000");
  });

  test.each(["https://cf-articles-run1.pages.dev/articles", "https://revision-mlai-au.example.workers.dev/articles"])(
    "allows only self and the trusted Founder Tools parent on preview %s", (url) => {
      const response = applySecurityHeaders(html(), new URL(url));
      expect(response.headers.get("X-Frame-Options")).toBeNull();
      expect(response.headers.get("Content-Security-Policy")).toBe("frame-ancestors 'self' https://mlai.au");
    },
  );

  test("passes chunks through before the SSR stream completes", async () => {
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    const stream = new ReadableStream<Uint8Array>({ start(value) { controller = value; } });
    const response = applySecurityHeaders(new Response(stream), production);
    const reader = response.body!.getReader();
    controller.enqueue(new TextEncoder().encode("first chunk"));
    expect(new TextDecoder().decode((await reader.read()).value)).toBe("first chunk");
    controller.enqueue(new TextEncoder().encode("last chunk"));
    controller.close();
    expect(new TextDecoder().decode((await reader.read()).value)).toBe("last chunk");
    expect((await reader.read()).done).toBe(true);
  });

  test("preserves stricter route policies and session cookies", () => {
    const original = html({
      "Referrer-Policy": "no-referrer", "Cache-Control": "no-store",
      "Content-Security-Policy": "frame-ancestors 'none'; default-src 'none'",
      "Permissions-Policy": "camera=(), microphone=()",
    });
    original.headers.append("Set-Cookie", "access_token=test; Secure; HttpOnly");
    original.headers.append("Set-Cookie", "refresh_token=test; Secure; HttpOnly");
    const response = applySecurityHeaders(original, production);
    expect(response.headers.get("Referrer-Policy")).toBe("no-referrer");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'; default-src 'none'");
    expect(response.headers.get("Permissions-Policy")).toBe("camera=(), microphone=()");
    expect(response.headers.getSetCookie()).toEqual(original.headers.getSetCookie());
    const rejected = applySecurityHeaders(rejectedRooAccountLinkCapabilityResponse(), production);
    expect(rejected.headers.get("Referrer-Policy")).toBe("no-referrer");
    expect(rejected.headers.get("Location")).toBeNull();
    expect(rejected.status).toBe(400);
  });

  test("keeps first-party update recording available", () => {
    expect(applySecurityHeaders(html(), production).headers.get("Permissions-Policy"))
      .toBe("camera=(self), microphone=(self), geolocation=(), payment=()");
  });

  test("decorates immutable redirects without changing their location", () => {
    const response = applySecurityHeaders(Response.redirect("https://mlai.au/terms", 301), production);
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe("https://mlai.au/terms");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  test.each([204, 205, 304])("preserves null bodies for status %s", (status) => {
    const response = applySecurityHeaders(new Response(null, { status }), production);
    expect(response.status).toBe(status);
    expect(response.body).toBeNull();
  });

  test("does not add HSTS on HTTP or document CSP to JSON and keeps cache markers", () => {
    const response = applySecurityHeaders(new Response("{}", { headers: {
      "Content-Type": "application/json", "X-MLAI-Homepage-Cache": "HIT",
    } }), new URL("http://localhost:5173/test"));
    expect(response.headers.get("Strict-Transport-Security")).toBeNull();
    expect(response.headers.get("Content-Security-Policy")).toBeNull();
    expect(response.headers.get("Content-Security-Policy-Report-Only")).toBeNull();
    expect(response.headers.get("X-MLAI-Homepage-Cache")).toBe("HIT");
  });
});

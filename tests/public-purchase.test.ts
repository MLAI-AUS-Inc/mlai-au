import { afterEach, expect, test } from "bun:test";
import { purchaseRequest, stripeCheckoutUrl } from "../app/lib/public-purchase";
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
test("review and checkout are separate cookie-free calls to the public purchase API", async () => {
  const calls: { url: string; init?: RequestInit }[] = [];
  const id = "12345678-1111-2222-aaaa-123456789012";
  globalThis.fetch = (async (url, init) => {
    calls.push({ url: String(url), init }); return Response.json(init?.method === "POST" ? { checkout_session_url: "https://checkout.stripe.com/c/pay/example" } : { id, amount_cents: 1999, points_amount: 10, currency: "aud", status: "pending" });
  }) as typeof fetch;
  await expect(purchaseRequest("../other")).rejects.toThrow();
  await purchaseRequest(id);
  await purchaseRequest(id, true);
  expect(calls.map(r => [r.init?.method ?? "GET", r.init?.credentials, r.init?.referrerPolicy, new URL(r.url).pathname])).toEqual([
    ["GET", "omit", "no-referrer", "/api/v1/points/purchases/" + id + "/"],
    ["POST", "omit", "no-referrer", "/api/v1/points/purchases/" + id + "/checkout/"],
  ]);
  expect(JSON.parse(String(calls[1].init?.body))).toEqual({ terms_version_accepted: "roo-points-terms-2026-05-04", privacy_version_accepted: "privacy-2026-05-04" });
  expect(stripeCheckoutUrl("https://checkout.stripe.com/c/pay/example")).toBe("https://checkout.stripe.com/c/pay/example");
  expect(() => stripeCheckoutUrl("https://checkout.stripe.com.example/c/pay/example")).toThrow();
});

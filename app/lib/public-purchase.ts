import { API_URL } from "./api";

import type { RooPurchaseTax } from "../components/RooPurchasePrice";

export type PointsPurchase = {
  id: string;
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded";
  pack_id: string;
  points_amount: number;
  amount_cents: number;
  currency: string;
  tax?: RooPurchaseTax | null;
  expires_at: string;
  paid_at: string | null;
  created_at: string;
  frontend_checkout_page_url: string;
};

export const PURCHASE_ID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
export const TERMS_VERSION = "roo-points-terms-2026-05-04";
export const PRIVACY_VERSION = "privacy-2026-05-04";

// A Roo purchase link is sufficient to review a pack. Neither request needs a
// website session, and only explicit acceptance may start Stripe Checkout.
export function purchaseRequest(id: string, checkout?: false, signal?: AbortSignal): Promise<PointsPurchase>;
export function purchaseRequest(id: string, checkout: true): Promise<{ checkout_session_url: string }>;
export async function purchaseRequest(id: string, checkout = false, signal?: AbortSignal) {
  if (!PURCHASE_ID.test(id)) throw Error("Open the top-up link from Roo.");
  const path = "/api/v1/points/purchases/" + id + "/" + (checkout ? "checkout/" : "");
  const response = await fetch(API_URL + path, {
    credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store", signal,
    ...(checkout ? {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ terms_version_accepted: TERMS_VERSION, privacy_version_accepted: PRIVACY_VERSION }),
    } : {}),
  });
  if (!response.ok) throw Error("This top-up is unavailable. Ask Roo for a fresh link.");
  const data = await response.json() as PointsPurchase & { checkout_session_url?: string };
  if (checkout) {
    return { checkout_session_url: stripeCheckoutUrl(data?.checkout_session_url) };
  }
  if (data?.id !== id || !Number.isSafeInteger(data.amount_cents) || data.amount_cents < 0 ||
      !Number.isSafeInteger(data.points_amount) || !/^[a-z]{3}$/i.test(data.currency) ||
      !["pending", "paid", "failed", "cancelled", "refunded"].includes(data.status)) {
    throw Error("Unexpected purchase details.");
  }
  return data;
}
export function stripeCheckoutUrl(value: unknown) {
  if (typeof value !== "string") throw Error("Stripe Checkout is unavailable.");
  const url = new URL(value);
  if (url.origin !== "https://checkout.stripe.com" || url.username || url.password) throw Error("Unexpected checkout destination.");
  return url.href;
}

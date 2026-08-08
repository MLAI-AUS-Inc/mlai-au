/**
 * Security response headers for mlai.au.
 *
 * The apex site previously served no security headers at all (the API origin,
 * api.mlai.au, already sets its own via Django's SecurityMiddleware). These are
 * applied at the worker's outermost layer so every response path — SSR renders,
 * 301 redirects, the cached homepage, and 404s — is covered uniformly.
 *
 * Applying them outside the homepage cache is deliberate: cached entries store
 * the un-decorated response, and headers are re-applied fresh on each cache HIT.
 * That way changing a header here takes effect immediately rather than being
 * frozen into cached entries for the life of their TTL.
 */

/** Statuses that must not carry a response body (per the fetch spec). */
const NULL_BODY_STATUSES = new Set([101, 103, 204, 205, 304]);

/**
 * Always-safe headers. None of these change what the site is allowed to load,
 * so they carry no breakage risk for the existing page set.
 */
const BASE_SECURITY_HEADERS: Record<string, string> = {
  // Stop MIME sniffing (e.g. a user-supplied file being reinterpreted as script).
  "X-Content-Type-Options": "nosniff",
  // Clickjacking protection for legacy browsers. SAMEORIGIN rather than DENY so
  // any first-party embed keeps working; CSP frame-ancestors below is the modern
  // equivalent and supersedes this where supported.
  "X-Frame-Options": "SAMEORIGIN",
  // Send the full URL same-origin, origin-only cross-origin, nothing on downgrade.
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Drop ambient access to powerful APIs the site does not use. `payment=()` is
  // safe here: the site links to stripe.com but never loads Stripe.js.
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

/**
 * HSTS.
 *
 * NOTE (read before merging): `includeSubDomains` applies to EVERY *.mlai.au
 * subdomain — api, chat, roo, and anything internal. Confirm they are all
 * HTTPS-only first. If any subdomain still needs plain HTTP, drop the
 * `; includeSubDomains` portion below.
 *
 * `preload` is intentionally omitted. Submitting to the browser preload list is
 * slow and painful to reverse, so it should be a separate, deliberate decision
 * once this has been running cleanly.
 */
const HSTS_VALUE = "max-age=31536000; includeSubDomains";

/**
 * Content-Security-Policy — REPORT-ONLY for now.
 *
 * This is deliberately not enforced yet. The site relies on inline scripts
 * (Google Tag Manager, Microsoft Clarity, the Facebook pixel) and React Router's
 * SSR hydration payload, so an enforcing policy without nonces would break
 * rendering and analytics on day one. Report-Only surfaces violations without
 * user impact; once the reports are clean (or the inline scripts are moved to
 * nonces), flip the header name to `Content-Security-Policy`.
 *
 * Origins below reflect what the app actually loads today:
 *   scripts  — GTM/GA, Ahrefs, Facebook pixel, Microsoft Clarity
 *   styles   — Google Fonts stylesheets
 *   fonts    — Google Fonts files
 *   images   — Firebase Storage, Unsplash, analytics tracking pixels
 *   frames   — YouTube, Loom, Google Docs embeds in articles
 *   connect  — the backend API plus analytics beacons
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  // 'unsafe-inline' + 'unsafe-eval' are required by GTM and the SSR hydration
  // payload. Replacing them with per-request nonces is the follow-up hardening
  // step, not something to change blind.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://analytics.ahrefs.com https://connect.facebook.net https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.loom.com https://docs.google.com",
  "connect-src 'self' https://api.mlai.au https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://connect.facebook.net",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

function isHtmlResponse(response: Response): boolean {
  return (response.headers.get("Content-Type") || "")
    .toLowerCase()
    .includes("text/html");
}

/**
 * Returns a copy of `response` with security headers applied.
 *
 * Rebuilding the Response is necessary rather than mutating in place: responses
 * produced by `Response.redirect()` have immutable headers and would throw.
 * Streaming bodies are passed straight through, so this does not buffer.
 */
export function applySecurityHeaders(response: Response, url: URL): Response {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(BASE_SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  // HSTS is only meaningful over TLS; browsers ignore it on plain HTTP.
  if (url.protocol === "https:") {
    headers.set("Strict-Transport-Security", HSTS_VALUE);
  }

  // Only send CSP on actual documents. Attaching it to JSON/asset responses adds
  // bytes and report noise without protecting anything.
  if (isHtmlResponse(response)) {
    headers.set("Content-Security-Policy-Report-Only", CSP_REPORT_ONLY);
  }

  const body = NULL_BODY_STATUSES.has(response.status) ? null : response.body;

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

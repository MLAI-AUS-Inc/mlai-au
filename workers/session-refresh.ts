/**
 * Silent session refresh at the worker edge.
 *
 * The backend issues two cookies: a short-lived `access_token` that every API call
 * carries, and a long-lived `refresh_token` (90 days) that can mint new access
 * tokens. SSR loaders forward the browser's cookies to the backend but have no way
 * to hand a *new* cookie back to the browser — so before this existed, the moment
 * the access token expired the user was bounced to the magic-link screen even
 * though a perfectly good refresh token was sitting in their browser.
 *
 * This middleware closes that loop. On any request that carries a refresh cookie
 * and a stale (or missing) access cookie it:
 *   1. POSTs the cookies to the backend refresh endpoint,
 *   2. rewrites the inbound request's Cookie header with the fresh access token so
 *      this render's loaders authenticate normally, and
 *   3. relays the backend's Set-Cookie headers to the browser.
 *
 * With refresh-token rotation on the backend, every visit slides the window
 * forward: keep using the site and you stay logged in indefinitely.
 */

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";
const REFRESH_PATH = "/api/v1/auth/token/refresh/";
const DEFAULT_BACKEND_BASE_URL = "https://api.mlai.au";

/**
 * Refresh this long before the access token actually expires, so a page rendered
 * near the boundary can't lose the race between our check and its own API calls.
 */
const REFRESH_SKEW_SECONDS = 30 * 60;

/** Never let a slow backend hold up a page render. */
const REFRESH_TIMEOUT_MS = 4000;

/**
 * Routes that manage the auth cookies themselves. Refreshing here would either be
 * pointless (verify-email is *creating* the session) or actively wrong (a Set-Cookie
 * appended after logout's clearing cookies would resurrect the session).
 */
function ownsItsOwnCookies(pathname: string): boolean {
  return pathname.startsWith("/verify-email") || pathname.endsWith("/logout");
}

function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const raw = part.trim();
    const eq = raw.indexOf("=");
    if (eq === -1) continue;
    if (raw.slice(0, eq).trim() === name) {
      return raw.slice(eq + 1).trim();
    }
  }
  return null;
}

/**
 * Read `exp` out of a JWT without verifying it. The signature is the backend's
 * problem — here we only need to know whether it is worth asking for a new token.
 */
function readJwtExpiry(token: string): number | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "=");
    const decoded = JSON.parse(atob(padded)) as { exp?: unknown };
    return typeof decoded.exp === "number" ? decoded.exp : null;
  } catch {
    return null;
  }
}

/** Cookie name of the first `Set-Cookie` entry, e.g. `access_token=abc; Path=/` → value `abc`. */
function valueFromSetCookie(setCookie: string, name: string): string | null {
  const [pair] = setCookie.split(";");
  const eq = pair.indexOf("=");
  if (eq === -1) return null;
  if (pair.slice(0, eq).trim() !== name) return null;
  const value = pair.slice(eq + 1).trim();
  return value || null;
}

/** Replace (or append) one cookie in a `Cookie` request header. */
function withCookie(cookieHeader: string | null, name: string, value: string): string {
  const kept = (cookieHeader || "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith(`${name}=`));
  kept.push(`${name}=${value}`);
  return kept.join("; ");
}

/** Drop cookies entirely — used when the backend tells us the session is dead. */
function withoutCookies(cookieHeader: string | null, names: string[]): string {
  return (cookieHeader || "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part && !names.some((name) => part.startsWith(`${name}=`)))
    .join("; ");
}

function isLocalhostRequest(url: URL): boolean {
  const { hostname } = url;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".localhost")
  );
}

/**
 * Production cookies are `Secure; Domain=.mlai.au; SameSite=None`, none of which a
 * plain-HTTP localhost browser will accept. Mirrors the same fix in the
 * verify-email route.
 */
function sanitizeCookieForLocalhost(cookie: string): string {
  return cookie
    .split(";")
    .map((part) => part.trim())
    .filter((part) => {
      const lower = part.toLowerCase();
      return lower !== "secure" && !lower.startsWith("domain=");
    })
    .map((part) => (part.toLowerCase().startsWith("samesite=") ? "SameSite=Lax" : part))
    .join("; ");
}

/** True when the request carries a refresh cookie whose access cookie needs renewing. */
export function needsSessionRefresh(cookieHeader: string | null): boolean {
  if (!readCookie(cookieHeader, REFRESH_COOKIE)) return false;

  const access = readCookie(cookieHeader, ACCESS_COOKIE);
  if (!access) return true;

  const expiry = readJwtExpiry(access);
  // An unreadable access token is treated as stale: worst case we spend one
  // refresh call and get a token we can read.
  if (expiry === null) return true;

  return expiry - REFRESH_SKEW_SECONDS <= Math.floor(Date.now() / 1000);
}

type RefreshOutcome =
  | { status: "refreshed"; setCookies: string[]; accessToken: string | null }
  | { status: "expired"; setCookies: string[] }
  | { status: "unavailable" };

async function requestRefresh(cookieHeader: string, env: Env): Promise<RefreshOutcome> {
  const baseUrl = String(env.BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL);
  const refreshToken = readCookie(cookieHeader, REFRESH_COOKIE);
  if (!refreshToken) return { status: "unavailable" };

  let response: Response;
  try {
    response = await fetch(new URL(REFRESH_PATH, baseUrl).toString(), {
      method: "POST",
      headers: {
        // This is an authentication boundary, not a transparent browser proxy.
        // Forward only the cookie the refresh endpoint needs so route-scoped
        // capabilities and unrelated browser state cannot cross into it.
        Cookie: `${REFRESH_COOKIE}=${refreshToken}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
    });
  } catch (error) {
    // Backend down or slow — render with whatever session the request already has.
    console.warn("[session-refresh] refresh request failed:", (error as Error).message);
    return { status: "unavailable" };
  }

  const setCookies = response.headers.getSetCookie();

  if (response.status === 401) {
    // The refresh token is expired or revoked; the backend replies with clearing
    // cookies so the browser stops retrying on every page load.
    return { status: "expired", setCookies };
  }

  if (!response.ok) {
    console.warn(`[session-refresh] unexpected refresh status ${response.status}`);
    return { status: "unavailable" };
  }

  const accessToken =
    setCookies.map((cookie) => valueFromSetCookie(cookie, ACCESS_COOKIE)).find(Boolean) || null;
  return { status: "refreshed", setCookies, accessToken };
}

function withExtraSetCookies(response: Response, setCookies: string[], sanitize: boolean): Response {
  if (setCookies.length === 0) return response;
  const headers = new Headers(response.headers);
  for (const cookie of setCookies) {
    headers.append("Set-Cookie", sanitize ? sanitizeCookieForLocalhost(cookie) : cookie);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Wrap a render with silent session refresh. Requests without a refresh cookie —
 * i.e. all anonymous traffic — pass straight through with zero added latency.
 */
export async function withSessionRefresh(
  request: Request,
  env: Env,
  render: (request: Request) => Promise<Response>,
): Promise<Response> {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get("Cookie");

  if (ownsItsOwnCookies(url.pathname) || !needsSessionRefresh(cookieHeader)) {
    return render(request);
  }

  const outcome = await requestRefresh(cookieHeader as string, env);
  if (outcome.status === "unavailable") {
    return render(request);
  }

  const headers = new Headers(request.headers);
  if (outcome.status === "refreshed" && outcome.accessToken) {
    // Render with the fresh token so this page's loaders authenticate on the first try.
    headers.set("Cookie", withCookie(cookieHeader, ACCESS_COOKIE, outcome.accessToken));
  } else if (outcome.status === "expired") {
    const remaining = withoutCookies(cookieHeader, [ACCESS_COOKIE, REFRESH_COOKIE]);
    if (remaining) {
      headers.set("Cookie", remaining);
    } else {
      headers.delete("Cookie");
    }
  }

  const response = await render(new Request(request, { headers }));
  return withExtraSetCookies(response, outcome.setCookies, isLocalhostRequest(url));
}

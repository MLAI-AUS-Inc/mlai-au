import { afterEach, describe, expect, test } from "bun:test";

import { needsSessionRefresh, withSessionRefresh } from "../workers/session-refresh";

const ENV = { BACKEND_BASE_URL: "https://api.mlai.au" } as unknown as Env;

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

/** Build an unsigned JWT-shaped token whose `exp` is `secondsFromNow` away. */
function tokenExpiringIn(secondsFromNow: number): string {
  const payload = { exp: Math.floor(Date.now() / 1000) + secondsFromNow };
  const encoded = btoa(JSON.stringify(payload)).replace(/=+$/, "");
  return `header.${encoded}.signature`;
}

function stubRefresh(response: Response | (() => Response), seen: Request[] = []) {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    seen.push(new Request(input as never, init));
    return typeof response === "function" ? response() : response;
  }) as typeof fetch;
  return seen;
}

function refreshedResponse(accessToken = "fresh-access", refreshToken = "fresh-refresh") {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `access_token=${accessToken}; Path=/; Domain=.mlai.au; Secure; HttpOnly; SameSite=None; Max-Age=86400`,
  );
  headers.append(
    "Set-Cookie",
    `refresh_token=${refreshToken}; Path=/; Domain=.mlai.au; Secure; HttpOnly; SameSite=None; Max-Age=7776000`,
  );
  return new Response(JSON.stringify({ refreshed: true }), { status: 200, headers });
}

function requestWithCookies(cookie: string | null, url = "https://mlai.au/founder-tools") {
  return new Request(url, cookie ? { headers: { Cookie: cookie } } : undefined);
}

describe("needsSessionRefresh", () => {
  test("ignores anonymous requests entirely", () => {
    expect(needsSessionRefresh(null)).toBe(false);
    expect(needsSessionRefresh("theme=dark")).toBe(false);
  });

  test("refreshes when the refresh cookie outlived the access cookie", () => {
    expect(needsSessionRefresh("refresh_token=abc")).toBe(true);
  });

  test("leaves a comfortably valid access token alone", () => {
    expect(needsSessionRefresh(`refresh_token=abc; access_token=${tokenExpiringIn(86400)}`)).toBe(false);
  });

  test("renews ahead of expiry rather than at it", () => {
    // 10 minutes left is inside the skew window: renew now, not after the 401.
    expect(needsSessionRefresh(`refresh_token=abc; access_token=${tokenExpiringIn(600)}`)).toBe(true);
  });

  test("treats an unreadable access token as stale", () => {
    expect(needsSessionRefresh("refresh_token=abc; access_token=garbage")).toBe(true);
  });
});

describe("withSessionRefresh", () => {
  test("renders with the fresh token and relays the new cookies", async () => {
    stubRefresh(refreshedResponse());
    let renderedCookie: string | null = null;

    const response = await withSessionRefresh(
      requestWithCookies(`refresh_token=long-lived; access_token=${tokenExpiringIn(60)}`),
      ENV,
      async (request) => {
        renderedCookie = request.headers.get("Cookie");
        return new Response("ok", { status: 200 });
      },
    );

    // The in-flight render must see the renewed token, or this page still 401s.
    expect(renderedCookie).toContain("access_token=fresh-access");
    expect(renderedCookie).toContain("refresh_token=long-lived");

    const relayed = response.headers.getSetCookie();
    expect(relayed.some((cookie) => cookie.startsWith("access_token=fresh-access"))).toBe(true);
    expect(relayed.some((cookie) => cookie.startsWith("refresh_token=fresh-refresh"))).toBe(true);
    expect(await response.text()).toBe("ok");
  });

  test("posts to the backend refresh endpoint with the browser cookies", async () => {
    const seen = stubRefresh(refreshedResponse());

    await withSessionRefresh(
      requestWithCookies("refresh_token=long-lived"),
      ENV,
      async () => new Response("ok"),
    );

    expect(seen).toHaveLength(1);
    expect(seen[0].url).toBe("https://api.mlai.au/api/v1/auth/token/refresh/");
    expect(seen[0].method).toBe("POST");
    expect(seen[0].headers.get("Cookie")).toBe("refresh_token=long-lived");
  });

  test("drops dead session cookies so the render sees an anonymous user", async () => {
    const headers = new Headers();
    headers.append("Set-Cookie", "access_token=; Path=/; Max-Age=0");
    headers.append("Set-Cookie", "refresh_token=; Path=/; Max-Age=0");
    stubRefresh(new Response("{}", { status: 401, headers }));

    let renderedCookie: string | null = "unset";
    const response = await withSessionRefresh(
      requestWithCookies("refresh_token=expired; theme=dark"),
      ENV,
      async (request) => {
        renderedCookie = request.headers.get("Cookie");
        return new Response("login", { status: 200 });
      },
    );

    expect(renderedCookie).toBe("theme=dark");
    expect(response.headers.getSetCookie()).toHaveLength(2);
  });

  test("renders normally when the backend refresh is unreachable", async () => {
    globalThis.fetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;

    const cookie = "refresh_token=long-lived";
    let renderedCookie: string | null = null;
    const response = await withSessionRefresh(requestWithCookies(cookie), ENV, async (request) => {
      renderedCookie = request.headers.get("Cookie");
      return new Response("ok", { status: 200 });
    });

    expect(renderedCookie).toBe(cookie);
    expect(response.headers.getSetCookie()).toHaveLength(0);
  });

  test("never touches routes that manage the cookies themselves", async () => {
    const seen = stubRefresh(refreshedResponse());

    for (const path of ["/verify-email?token=abc", "/platform/logout", "/founder-tools/logout"]) {
      const response = await withSessionRefresh(
        requestWithCookies("refresh_token=long-lived", `https://mlai.au${path}`),
        ENV,
        async () => new Response("ok"),
      );
      expect(response.headers.getSetCookie()).toHaveLength(0);
    }

    expect(seen).toHaveLength(0);
  });

  test("strips Secure/Domain for localhost so dev browsers accept the cookies", async () => {
    stubRefresh(refreshedResponse());

    const response = await withSessionRefresh(
      requestWithCookies("refresh_token=long-lived", "http://localhost:5173/founder-tools"),
      ENV,
      async () => new Response("ok"),
    );

    const relayed = response.headers.getSetCookie();
    expect(relayed.join("\n")).not.toContain("Domain=");
    expect(relayed.join("\n")).not.toContain("Secure");
    expect(relayed.join("\n")).toContain("SameSite=Lax");
  });
});

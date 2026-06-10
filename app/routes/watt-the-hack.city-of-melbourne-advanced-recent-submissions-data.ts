import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-recent-submissions-data";
import { getEnv } from "~/lib/env.server";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

/**
 * Same-origin proxy for the gateway's `/teams/{id}/submissions` endpoint.
 *
 * Powers the "Recent submissions" panel on the WTH submission portal: given
 * the founder's team UUID + X-Team-Token, fetch all of THEIR submissions with
 * status / raw cost / normalized points. Mirrors the submit + status proxies
 * (same `WTH_ADMIN_URL`, same Cloudflare-fronted ingress fallback, no CORS
 * preflight, admin origin never reaches the client bundle).
 *
 * GET /watt-the-hack/city-of-melbourne-advanced-recent-submissions-data?team_id=<uuid>
 *   X-Team-Token: <token>
 *
 * The browser must already have the team UUID + token (the form fields the
 * founder is filling in on the submit page), so this proxy adds no new
 * credentials — it just keeps them inside the mlai.au origin and forwards to
 * the eval cluster server-to-server.
 */
interface AdminProxyEnv {
  WTH_ADMIN_URL?: string;
  WTH_ADMIN_HOST?: string;
}

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" } as const;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function resolveAdmin(env: AdminProxyEnv): { baseUrl: URL; hostOverride: string } {
  const base = env.WTH_ADMIN_URL || "https://eval.eliascorp.org";
  const hostOverride = env.WTH_ADMIN_HOST ?? "";
  return { baseUrl: new URL(base), hostOverride };
}

function buildAdminRequest(
  baseUrl: URL,
  hostOverride: string,
  path: string,
  init: RequestInit & { cf?: Record<string, unknown> },
): { target: string; init: RequestInit & { cf?: Record<string, unknown> } } {
  if (hostOverride && hostOverride !== baseUrl.host) {
    return {
      target: `${baseUrl.protocol}//${hostOverride}${path}`,
      init: { ...init, cf: { ...(init.cf ?? {}), resolveOverride: baseUrl.hostname } },
    };
  }
  return { target: `${baseUrl.origin}${path}`, init };
}

export async function loader({ request, context }: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  const url = new URL(request.url);
  const teamId = url.searchParams.get("team_id") ?? "";
  // Refuse to forward arbitrary path components into the upstream URL.
  if (!UUID_RE.test(teamId)) {
    return new Response(JSON.stringify({ detail: "Missing or invalid team_id" }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  const token = request.headers.get("X-Team-Token") ?? "";
  if (!token) {
    return new Response(JSON.stringify({ detail: "Missing team token" }), {
      status: 401,
      headers: JSON_HEADERS,
    });
  }

  // Bound the result count at the proxy too — defence in depth against a
  // browser that forgets the gateway's own cap (the gateway uses Query(ge=1,
  // le=100) but a misconfigured client could spam very large `limit` values
  // and burn worker CPU on big responses we'd just ignore).
  const limitRaw = Number(url.searchParams.get("limit") ?? "25");
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(1, Math.trunc(limitRaw)), 100) : 25;

  const env = getEnv(context) as unknown as AdminProxyEnv;
  const { baseUrl, hostOverride } = resolveAdmin(env);
  const path = `/teams/${teamId}/submissions?limit=${limit}`;
  const { target, init } = buildAdminRequest(baseUrl, hostOverride, path, {
    headers: { "X-Team-Token": token, Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json; charset=utf-8",
        // Per-team personal data — never cache at the edge.
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ detail: "Submission service unreachable", error: String(err) }),
      { status: 502, headers: JSON_HEADERS },
    );
  }
}

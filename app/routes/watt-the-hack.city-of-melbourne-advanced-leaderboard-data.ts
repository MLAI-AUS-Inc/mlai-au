import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-leaderboard-data";
import { getEnv } from "~/lib/env.server";

/**
 * Server-side leaderboard proxy (option B).
 *
 * The browser hits this SAME-ORIGIN endpoint; the Cloudflare worker fetches the
 * admin eval cluster and returns its JSON, so the admin API stays private (no
 * browser CORS / public exposure).
 *
 * Config (Cloudflare worker vars; defaults baked in):
 *   WTH_ADMIN_URL   admin origin to fetch (default "https://eval.eliascorp.org")
 *   WTH_ADMIN_HOST  optional ingress Host for the IP-bypass fallback (see below)
 *
 * Normal path: a plain fetch of `${WTH_ADMIN_URL}/leaderboard`.
 *
 * Fallback: if a Worker -> Cloudflare-edge sub-request to the proxied host ever
 * misbehaves (edge loop / Bot Fight / SSL mode), set WTH_ADMIN_URL to the GKE
 * load-balancer IP (e.g. "http://34.129.156.145") and WTH_ADMIN_HOST to the
 * ingress host ("eval.eliascorp.org"). We then connect straight to the IP and
 * carry the Host via cf.resolveOverride (Host can't be set as a request header).
 * resolveOverride is honored only for hostnames in a zone on your CF account.
 */
interface AdminProxyEnv {
  WTH_ADMIN_URL?: string;
  WTH_ADMIN_HOST?: string;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context) as unknown as AdminProxyEnv;
  const base = env.WTH_ADMIN_URL || "https://eval.eliascorp.org";
  const host = env.WTH_ADMIN_HOST ?? "";

  const reqUrl = new URL(request.url);
  const rawLimit = Number.parseInt(reqUrl.searchParams.get("limit") || "50", 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50;

  const baseUrl = new URL(base);
  const init: RequestInit & { cf?: Record<string, unknown> } = {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000), // don't let a hung cluster stall the worker
  };

  let target: string;
  if (host && host !== baseUrl.host) {
    // IP-bypass fallback: connect to baseUrl's IP, carry the ingress Host in the URL.
    target = `${baseUrl.protocol}//${host}/leaderboard?limit=${limit}`;
    init.cf = { resolveOverride: baseUrl.hostname };
  } else {
    target = `${baseUrl.origin}/leaderboard?limit=${limit}`;
  }

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.text();
    if (!upstream.ok) {
      // Surface the REAL upstream status + a snippet instead of masking as 502.
      return new Response(
        JSON.stringify({
          error: "upstream_error",
          upstreamStatus: upstream.status,
          detail: body.slice(0, 300),
        }),
        { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } },
      );
    }
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // Small shared cache so many viewers / rapid refreshes collapse to one
        // upstream hit every few seconds.
        "Cache-Control": "public, max-age=5",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "upstream_unreachable", detail: String(err) }),
      { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } },
    );
  }
}

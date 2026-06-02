import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-leaderboard-data";
import { getEnv } from "~/lib/env.server";

/**
 * Server-side leaderboard proxy (option B).
 *
 * The browser calls this SAME-ORIGIN endpoint; the Cloudflare worker fetches the
 * admin eval cluster and returns its JSON. Keeps the admin API off the public
 * internet (no browser CORS, no public API exposure) and reuses the mlai.au cert.
 *
 * Config via Cloudflare env (set these in the mlai-au worker):
 *   WTH_ADMIN_URL   origin to fetch.  RECOMMENDED: a subdomain of your own CF
 *                   zone pointed at the ingress LB, e.g. "https://eval.mlai.au"
 *                   (Cloudflare then terminates TLS for you). With this set and
 *                   WTH_ADMIN_HOST empty, this is just a plain fetch.
 *   WTH_ADMIN_HOST  ingress Host header, used only for the IP + resolveOverride
 *                   fallback. NOTE: cf.resolveOverride only applies to hostnames
 *                   inside your own Cloudflare zone, so the placeholder default
 *                   will NOT route until you point a real in-zone host at the LB.
 */
interface AdminProxyEnv {
  WTH_ADMIN_URL?: string;
  WTH_ADMIN_HOST?: string;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context) as unknown as AdminProxyEnv;
  // Default to the public Cloudflare-proxied subdomain (TLS handled by CF).
  const base = env.WTH_ADMIN_URL || "https://eval.eliascorp.org";
  // No Host override needed for a real public origin; only used for the
  // legacy IP + resolveOverride fallback.
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
    // Keep the ingress Host in the URL and connect to the LB IP at the edge.
    // (`Host` cannot be set as a request header — it is stripped — so this is the
    // supported technique. resolveOverride requires `host` to be in your CF zone.)
    target = `${baseUrl.protocol}//${host}/leaderboard?limit=${limit}`;
    init.cf = { resolveOverride: baseUrl.hostname };
  } else {
    // Clean path: WTH_ADMIN_URL is a real reachable origin (e.g. https://eval.mlai.au).
    target = `${baseUrl.origin}/leaderboard?limit=${limit}`;
  }

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.ok ? 200 : 502,
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
      {
        status: 502,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      },
    );
  }
}

import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-submit-data";
import { getEnv } from "~/lib/env.server";

/**
 * Server-side submission proxy (mirrors the leaderboard proxy).
 *
 * The browser POSTs the packaged controller (a small zip) to this SAME-ORIGIN
 * endpoint; the Cloudflare worker forwards it to the admin eval cluster and
 * returns the cluster's response verbatim. This keeps the admin origin off the
 * public client bundle, avoids a cross-origin request (so the team token is
 * never sent from the browser to a third-party domain and there is no CORS
 * preflight), and reuses the same `WTH_ADMIN_URL` config as the leaderboard.
 *
 * The team token is still supplied by the founder in the browser (it has to be —
 * they type it), so the proxy cannot hide it from the client. What it does do is
 * keep that credential inside the mlai.au origin: browser -> mlai.au worker (TLS,
 * same-origin) -> admin cluster (server-to-server, TLS), instead of the browser
 * shipping it straight to a separate eval domain.
 *
 * Config via Cloudflare env (shared with the leaderboard proxy):
 *   WTH_ADMIN_URL   origin to forward to. RECOMMENDED: an MLAI-owned subdomain
 *                   pointed at the eval ingress, e.g. "https://eval.mlai.au".
 *   WTH_ADMIN_HOST  optional ingress Host header for the IP + resolveOverride
 *                   fallback (only used when it differs from the URL host).
 */
interface AdminProxyEnv {
  WTH_ADMIN_URL?: string;
  WTH_ADMIN_HOST?: string;
}

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" } as const;

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ detail: "Method not allowed" }), {
      status: 405,
      headers: JSON_HEADERS,
    });
  }

  const env = getEnv(context) as unknown as AdminProxyEnv;
  // Default to the MLAI-owned Cloudflare-proxied subdomain (TLS handled by CF).
  const base = env.WTH_ADMIN_URL || "https://eval.mlai.au";
  // No Host override needed for a real public origin; only used for the
  // legacy IP + resolveOverride fallback.
  const host = env.WTH_ADMIN_HOST ?? "";

  // Parse the incoming multipart upload and rebuild it for the upstream. The
  // submission is just a few text files zipped together, so buffering it in the
  // worker is cheap and lets fetch set the multipart boundary for us.
  let incoming: FormData;
  try {
    incoming = await request.formData();
  } catch {
    return new Response(JSON.stringify({ detail: "Invalid submission payload" }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  const teamId = incoming.get("team_id");
  const file = incoming.get("file");
  const token = request.headers.get("X-Team-Token") ?? "";

  if (typeof teamId !== "string" || !teamId) {
    return new Response(JSON.stringify({ detail: "Missing team_id" }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }
  if (!file || typeof file === "string") {
    return new Response(JSON.stringify({ detail: "Missing submission file" }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }
  if (!token) {
    return new Response(JSON.stringify({ detail: "Missing team token" }), {
      status: 401,
      headers: JSON_HEADERS,
    });
  }

  const outgoing = new FormData();
  outgoing.append("team_id", teamId);
  outgoing.append("file", file, "submission.zip");

  const baseUrl = new URL(base);
  const init: RequestInit & { cf?: Record<string, unknown> } = {
    method: "POST",
    headers: { "X-Team-Token": token },
    body: outgoing,
    signal: AbortSignal.timeout(20000), // uploads are small; don't hang the worker
  };

  let target: string;
  if (host && host !== baseUrl.host) {
    // Keep the ingress Host in the URL and connect to the LB IP at the edge.
    // (`Host` cannot be set as a request header — it is stripped — so this is the
    // supported technique. resolveOverride requires `host` to be in your CF zone.)
    target = `${baseUrl.protocol}//${host}/submissions`;
    init.cf = { resolveOverride: baseUrl.hostname };
  } else {
    // Clean path: WTH_ADMIN_URL is a real reachable origin (e.g. https://eval.mlai.au).
    target = `${baseUrl.origin}/submissions`;
  }

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.text();
    // Forward the cluster's status + body so the client keeps seeing real
    // validation errors (e.g. a 401 bad-token or 400 with a `detail` message).
    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ detail: "Submission service unreachable", error: String(err) }),
      {
        status: 502,
        headers: JSON_HEADERS,
      },
    );
  }
}

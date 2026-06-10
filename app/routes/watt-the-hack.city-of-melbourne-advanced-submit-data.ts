import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-submit-data";
import { getEnv } from "~/lib/env.server";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

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
 *                   pointed at the eval ingress, e.g. "https://eval.eliascorp.org".
 *   WTH_ADMIN_HOST  optional ingress Host header for the IP + resolveOverride
 *                   fallback (only used when it differs from the URL host).
 */
interface AdminProxyEnv {
  WTH_ADMIN_URL?: string;
  WTH_ADMIN_HOST?: string;
}

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" } as const;

/** Resolve the configured admin origin + optional resolveOverride fallback. */
function resolveAdmin(env: AdminProxyEnv): { baseUrl: URL; hostOverride: string } {
  const base = env.WTH_ADMIN_URL || "https://eval.eliascorp.org";
  const hostOverride = env.WTH_ADMIN_HOST ?? "";
  return { baseUrl: new URL(base), hostOverride };
}

/** Build the target URL + fetch init, honoring the IP-bypass fallback when set. */
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

/**
 * GET /watt-the-hack/city-of-melbourne-advanced-submit-data?id=<uuid>&part=status|logs
 *
 * Forwards to the admin gateway's `/submissions/{id}` (status) or
 * `/submissions/{id}/logs` (eval log text). The team token is owner-scoped on
 * the gateway, so we require + forward `X-Team-Token` from the browser. Keeps
 * the admin origin off the client bundle and avoids CORS — same model as the
 * POST half below.
 */
export async function loader({ request, context }: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  // `part` selects which sub-endpoint to proxy. New addition: `source` exposes
  // the team's own submitted controller `.py` (owner-scoped on the gateway).
  // Used by the portal's "Recent submissions" panel to render past code.
  const partRaw = url.searchParams.get("part");
  const part: "status" | "logs" | "source" =
    partRaw === "logs" ? "logs" : partRaw === "source" ? "source" : "status";
  // UUID guard — refuse to forward arbitrary path components.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return new Response(JSON.stringify({ detail: "Missing or invalid id" }), {
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

  const env = getEnv(context) as unknown as AdminProxyEnv;
  const { baseUrl, hostOverride } = resolveAdmin(env);
  const path =
    part === "logs"
      ? `/submissions/${id}/logs`
      : part === "source"
        ? `/submissions/${id}/source`
        : `/submissions/${id}`;
  const { target, init } = buildAdminRequest(baseUrl, hostOverride, path, {
    headers: { "X-Team-Token": token, Accept: "application/json,text/plain;q=0.9" },
    signal: AbortSignal.timeout(15000),
  });

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ??
          (part === "logs" || part === "source"
            ? "text/plain; charset=utf-8"
            : "application/json; charset=utf-8"),
        // Don't cache personal status responses at the edge.
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

export async function action({ request, context }: Route.ActionArgs) {
  assertWattTheHackPublicAccessEnabled();
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ detail: "Method not allowed" }), {
      status: 405,
      headers: JSON_HEADERS,
    });
  }

  const env = getEnv(context) as unknown as AdminProxyEnv;
  const { baseUrl, hostOverride } = resolveAdmin(env);

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

  const { target, init } = buildAdminRequest(baseUrl, hostOverride, "/submissions", {
    method: "POST",
    headers: { "X-Team-Token": token },
    body: outgoing,
    signal: AbortSignal.timeout(20000), // uploads are small; don't hang the worker
  });

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.text();
    // Forward the cluster's status + body so the client keeps seeing real
    // validation errors (e.g. a 401 bad-token or 400 with a `detail` message).
    // Also forward Retry-After so the portal can drive its cooldown countdown
    // off the real remaining seconds on a 429 (cooldown / daily-cap).
    const forwardHeaders: Record<string, string> = {
      "Content-Type":
        upstream.headers.get("Content-Type") ?? "application/json; charset=utf-8",
    };
    const retryAfter = upstream.headers.get("Retry-After");
    if (retryAfter) forwardHeaders["Retry-After"] = retryAfter;
    return new Response(body, {
      status: upstream.status,
      headers: forwardHeaders,
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

import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-leaderboard-data";
import { FINAL_LEADERBOARD } from "~/lib/watt-the-hack-leaderboard-final";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

/**
 * Final-standings endpoint (frozen snapshot).
 *
 * The event concluded 2026-06-06 and the admin eval cluster (eval.eliascorp.org)
 * was decommissioned to stop billing, so the previous live proxy to
 * `${WTH_ADMIN_URL}/leaderboard` no longer has an upstream. We now serve the
 * frozen final leaderboard (recovered from the eval Postgres) statically from
 * `~/lib/watt-the-hack-leaderboard-final`.
 *
 * To restore LIVE mode if the eval gateway is ever redeployed: revert this file
 * to the proxy version in git history (it fetched WTH_ADMIN_URL with a
 * resolveOverride IP-bypass fallback) and redeploy.
 */
export async function loader({ request }: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  const reqUrl = new URL(request.url);
  const rawLimit = Number.parseInt(reqUrl.searchParams.get("limit") || "50", 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50;

  return new Response(JSON.stringify(FINAL_LEADERBOARD.slice(0, limit)), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Static result — cache hard at the edge.
      "Cache-Control": "public, max-age=3600",
    },
  });
}

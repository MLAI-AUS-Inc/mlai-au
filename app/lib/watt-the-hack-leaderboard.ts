/**
 * Shared types/helpers for the Watt The Hack "City of Melbourne" leaderboard.
 *
 * Both the full Final Standings page
 * (`watt-the-hack.city-of-melbourne-advanced-leaderboard.tsx`) and the dashboard's
 * top-3 standings panel fetch the same same-origin proxy
 * (`/watt-the-hack/city-of-melbourne-advanced-leaderboard-data`) and render the same
 * entry shape, so the type + relative-time formatting live here to stay in sync.
 */

export interface LeaderboardEntry {
  rank: number;
  team_name: string;
  final_score: number;
  cost_score: number | null;
  renewable_score: number | null;
  stability_score: number | null;
  reliability_score: number | null;
  scored_at: string | null;
}

/** Format an ISO timestamp as a short "just now / 5m ago / 3h ago / 2d ago" string. */
export function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const t = Date.parse(iso.replace(" ", "T"));
  if (Number.isNaN(t)) return "";
  const secs = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

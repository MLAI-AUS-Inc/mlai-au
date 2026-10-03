import { useArticleReadMinute } from "./ArticleReadTime";
import { discoveryReviewState, EVENT_DISCOVERY_PATH } from "~/lib/event-discovery";
import { ArticleEventPreference } from "./ArticleEventPreference";

export function DiscoverySourceNotice() {
  const state = discoveryReviewState(useArticleReadMinute());
  return <aside aria-label="Discovery source review status" data-discovery-review={state} className="my-6 rounded-xl border border-gray-300 bg-gray-50 p-4 text-base">
    <p className="m-0"><strong>Search interfaces checked 10 September 2026.</strong> Recheck due 17 September 2026, 00:00 Sydney time, or sooner if a platform changes. These are dated observations, not live ticket availability.</p>
    <p role="status" className="mb-0 mt-2">{state === "overdue" ? "Source review is overdue. Treat the steps below as a historical example and verify the current interface before relying on them." : state === "unknown" ? "Current review freshness cannot be established here. Check the dates and current platform documentation before relying on the steps." : "Within the planned source-review period. Account/session conditions and partial checks are stated below; a review date does not establish event quality or admission."}</p>
  </aside>;
}

export function EventDiscoveryPreference() {
  return <ArticleEventPreference articlePath={EVENT_DISCOVERY_PATH} idPrefix="discovery" description="This sets the MLAI calendar preference only; it does not filter Meetup, Luma or Atrium, and does not reserve a place." />;
}

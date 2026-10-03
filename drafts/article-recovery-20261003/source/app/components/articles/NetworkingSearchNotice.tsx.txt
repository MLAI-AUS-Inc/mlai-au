import { useArticleReadMinute } from "./ArticleReadTime";
import { networkingSourceState } from "~/lib/networking-event-search";

export function NetworkingSearchNotice() {
  const state = networkingSourceState(useArticleReadMinute());
  return <aside aria-label="Event search source review" data-networking-source-review={state} className="my-6 rounded-xl border border-gray-300 bg-gray-50 p-4 text-base">
    <p className="m-0"><strong>Searches checked 10 September 2026.</strong> Review due 17 September 2026, 00:00 Sydney time, or sooner if changed. These examples show how to inspect a lead, not which ticket is available now.</p>
    <p role="status" className="mb-0 mt-2">{state === "overdue" ? "Source review is overdue. Treat these observations as historical and repeat the search and listing checks before relying on them." : state === "unknown" ? "Current review freshness cannot be established. Check the dates and current provider information yourself." : "Within the planned review period. Session differences, unknown costs and unverified access remain unresolved."}</p>
  </aside>;
}

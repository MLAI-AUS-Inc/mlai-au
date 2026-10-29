import { useArticleReadMinute } from "./ArticleReadTime";
import { clubSourceState } from "~/lib/founder-club-participation";

export function FounderClubSourceNotice() {
  const state = clubSourceState(useArticleReadMinute());
  return <aside aria-label="Founder format source review" data-club-source-review={state} className="my-6 rounded-xl border border-gray-300 bg-gray-50 p-4 text-base">
    <p className="m-0"><strong>Provider pages checked 10 September 2026.</strong> Next review due 17 September 2026, 00:00 Sydney time, or sooner if changed. These are dated descriptions, not verified current intakes, bookings or member outcomes.</p>
    <p role="status" className="mb-0 mt-2">{state === "overdue" ? "Source review is overdue. Treat the table as historical and verify the exact product, terms and participation route before committing." : state === "unknown" ? "Current review freshness cannot be established. Verify the dates and current provider information before relying on the table." : "Within the planned review period. Missing prices, uncertain operation and the failed onboarding check remain unresolved."}</p>
  </aside>;
}

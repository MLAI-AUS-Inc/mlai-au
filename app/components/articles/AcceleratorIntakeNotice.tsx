import { acceleratorIntakeNotice, acceleratorProgramPhase, acceleratorReadDay, acceleratorReviewState } from "~/lib/accelerator-intake";
import type { AustralianAcceleratorProgram } from "~/lib/australian-accelerator-programs";
import { useArticleReadMinute } from "./ArticleReadTime";

export default function AcceleratorIntakeNotice({ program }: { program: AustralianAcceleratorProgram }) {
  const asOf = acceleratorReadDay(useArticleReadMinute());
  const state = acceleratorReviewState(program, asOf);
  return <div data-accelerator-status={program.id} data-review-state={state} className="mt-3 space-y-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-950">
    <p className="font-semibold">{state === "fresh" ? "Dated source check within its review window" : state === "needs-review" ? "Source recheck overdue — do not assume availability" : "Source/date status unavailable — verify with provider"}</p>
    <p>{acceleratorIntakeNotice(program, asOf)}</p>
    <p>{acceleratorProgramPhase(program, asOf)}</p>
    <p>Recheck due <time dateTime={program.reviewAfter}>{program.reviewAfter}</time>, 00:00 Sydney time, or sooner if details change.</p>
  </div>;
}

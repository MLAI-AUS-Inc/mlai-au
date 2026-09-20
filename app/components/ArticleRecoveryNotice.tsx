import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

export function isRunRecovering(run: VibeMarketingRunSummary) {
  return ["running", "queued"].includes(run.status) && run.recovery?.state === "pending";
}

export default function ArticleRecoveryNotice({ run }: { run: VibeMarketingRunSummary }) {
  if (!isRunRecovering(run)) return null;
  const due = run.recovery?.due_at ? new Date(run.recovery.due_at) : null;
  const time = due && !Number.isNaN(due.getTime()) ? due.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : null;
  return (
    <div role="status" className="my-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
      <p className="font-semibold">Recovery scheduled{time ? ` for ${time}` : ""}</p>
      <p className="mt-1">{run.failure?.message || "A required service is temporarily unavailable."} Completed work is saved. The system will retry automatically.</p>
    </div>
  );
}

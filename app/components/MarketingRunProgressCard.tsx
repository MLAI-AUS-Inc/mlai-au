import { ArrowPathIcon, ExclamationTriangleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

interface MarketingRunProgressCardProps {
  run: VibeMarketingRunSummary;
  pollingDegraded?: boolean;
}

function labelForStatus(status: string) {
  return status.replace(/_/g, " ");
}

export default function MarketingRunProgressCard({
  run,
  pollingDegraded = false,
}: MarketingRunProgressCardProps) {
  const isFailed = ["failed", "blocked", "blocked_verification", "denied"].includes(run.status);
  const isRunning = ["queued", "running", "awaiting_confirmation", "awaiting_delivery_mode", "awaiting_approval", "approval_required"].includes(run.status);
  const totalSteps = Math.max(run.steps.length, run.stepOrder.length, 1);
  const completedSteps = run.steps.filter((step) => step.status === "completed" || step.status === "skipped").length;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border p-5 shadow-sm",
        isFailed ? "border-red-200 bg-red-50" : "border-violet-100 bg-violet-50/70",
      )}
    >
      <div className="flex items-start gap-4">
        <div className={clsx("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl", isFailed ? "bg-red-100 text-red-600" : "bg-white text-violet-600")}>
          {isFailed ? <ExclamationTriangleIcon className="h-6 w-6" /> : isRunning ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <SparklesIcon className="h-6 w-6" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-black text-gray-950">{run.workflow.replace(/_/g, " ")}</h2>
            <span className={clsx("rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide", isFailed ? "bg-red-100 text-red-700" : "bg-white text-violet-700")}>
              {labelForStatus(run.status)}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {run.currentStep ? run.currentStep.replace(/_/g, " ") : "Waiting for next update"}
          </p>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {Array.from({ length: Math.min(Math.max(totalSteps, 1), 16) }).map((_, index) => {
              const isComplete = index < completedSteps;
              const isActive = isRunning && index === completedSteps;
              return (
                <div
                  key={index}
                  className={clsx(
                    "h-2 rounded-full transition",
                    isComplete && "bg-violet-600",
                    isActive && "animate-pulse bg-violet-300",
                    !isComplete && !isActive && "bg-white",
                  )}
                />
              );
            })}
          </div>
          <p className="mt-2 text-xs font-medium text-gray-500">
            {completedSteps} of {totalSteps} run steps complete. Refreshing this page is safe.
          </p>
          {pollingDegraded ? (
            <p className="mt-2 text-xs font-semibold text-amber-700">Polling is retrying after a temporary connection problem.</p>
          ) : null}
          {run.errors.length > 0 ? (
            <div className="mt-3 rounded-xl border border-red-200 bg-white/80 px-4 py-3 text-sm text-red-700">
              {run.errors[0]}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

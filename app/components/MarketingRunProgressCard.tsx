import { ArrowPathIcon, ExclamationTriangleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import type { VibeMarketingRunSummary, VibeMarketingScanProgress } from "~/types/vibe-marketing";

export type MarketingRunProgressTheme = {
  containerClassName?: string;
  iconClassName?: string;
  badgeClassName?: string;
  completedSegmentClassName?: string;
  activeSegmentClassName?: string;
  pendingSegmentClassName?: string;
};

interface MarketingRunProgressCardProps {
  run: VibeMarketingRunSummary;
  title?: string;
  currentStepLabel?: string;
  icon?: ReactNode;
  theme?: MarketingRunProgressTheme;
}

function labelForStatus(status: string) {
  return status.replace(/_/g, " ");
}

function labelForWorkflow(workflow: string) {
  if (workflow === "article_system_setup") return "Articles setup";
  if (workflow === "repo_scan" || workflow === "content_factory_scan") return "Repository scan";
  return workflow.replace(/_/g, " ");
}

function labelForCurrentStep(step: string) {
  return step.replace(/article_system/g, "articles_setup").replace(/_/g, " ");
}

function shortErrorMessage(run: VibeMarketingRunSummary, error: string) {
  if (["repo_scan", "content_factory_scan"].includes(run.workflow)) {
    return "Repository scan failed. Retry the scan or choose a different repository.";
  }
  if (/Missing required .* components/i.test(error)) {
    return "Article preview failed because required article components are missing.";
  }
  return "This run failed. Technical details are available if needed.";
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scanPhaseCount(progress: VibeMarketingScanProgress) {
  return Math.max(1, Math.min(Math.round(progress.phaseCount || 1), 16));
}

function scanPhaseIndex(progress: VibeMarketingScanProgress) {
  return Math.max(1, Math.min(Math.round(progress.phaseIndex || 1), scanPhaseCount(progress)));
}

function scanProgressMessage(progress: VibeMarketingScanProgress) {
  if (progress.message) return progress.message;
  const completed = progress.detail.completed;
  const total = progress.detail.total;
  if (typeof completed === "number" && typeof total === "number" && total > 0) {
    return `Completed ${completed} of ${total} components`;
  }
  return "";
}

function scanCurrentStepLabel(progress: VibeMarketingScanProgress) {
  const phase = progress.phaseLabel || labelForCurrentStep(progress.phaseKey || progress.currentStep || "scan_structure");
  const message = scanProgressMessage(progress);
  if (!message || message === phase) return phase;
  return `${phase}: ${message}`;
}

function scanSegmentFill(progress: VibeMarketingScanProgress, index: number) {
  const count = scanPhaseCount(progress);
  const percent = clampPercent(progress.percent);
  const start = (index / count) * 100;
  const end = ((index + 1) / count) * 100;
  if (percent >= end) return 100;
  if (percent <= start) return 0;
  return Math.round(((percent - start) / (end - start)) * 100);
}

export default function MarketingRunProgressCard({
  run,
  title,
  currentStepLabel: currentStepLabelOverride,
  icon,
  theme,
}: MarketingRunProgressCardProps) {
  const isFailed = ["failed", "blocked", "blocked_verification", "denied", "cancelled", "canceled"].includes(run.status);
  const isScanRun = ["repo_scan", "content_factory_scan"].includes(run.workflow);
  const scanProgress = isScanRun ? run.scanProgress : null;
  const isStaleQueuedScan = isScanRun && Boolean(run.stale || run.staleReason === "scan_queue_not_started");
  const isScanActionNeeded = isScanRun && ["awaiting_confirmation", "awaiting_approval", "approval_required"].includes(run.status);
  const isRunning = [
    "queued",
    "running",
    "processing",
    "researching",
    "loading",
    "syncing",
    "selecting",
    "awaiting_confirmation",
    "awaiting_delivery_mode",
    "awaiting_approval",
    "approval_required",
  ].includes(run.status) && !isScanActionNeeded && !isStaleQueuedScan;
  const statusLabel = isStaleQueuedScan ? "scan did not start" : isScanActionNeeded ? "scan complete, action needed" : labelForStatus(run.status);
  const currentStepLabel = isStaleQueuedScan
    ? "The scan worker did not pick up this job. Retry the scan or cancel it and start again."
    : isScanActionNeeded
    ? "The repository scan finished. Choose the articles/blogs location, start a new setup preview, or cancel this scan."
    : scanProgress
      ? scanCurrentStepLabel(scanProgress)
    : run.currentStep
      ? labelForCurrentStep(run.currentStep)
      : "Waiting for next update";
  const totalSteps = Math.max(run.steps.length, run.stepOrder.length, 1);
  const completedSteps = run.steps.filter((step) => step.status === "completed" || step.status === "skipped").length;
  const segmentCount = scanProgress ? scanPhaseCount(scanProgress) : Math.min(Math.max(totalSteps, 1), 16);
  const progressFooter = scanProgress
    ? `Phase ${scanPhaseIndex(scanProgress)} of ${scanPhaseCount(scanProgress)} · ${clampPercent(scanProgress.percent)}% complete. Refreshing this page is safe.`
    : `${completedSteps} of ${totalSteps} run steps complete. Refreshing this page is safe.`;
  const attentionState = isFailed || isStaleQueuedScan;
  const containerClassName = attentionState ? "border-red-200 bg-red-50" : theme?.containerClassName ?? "border-violet-100 bg-violet-50/70";
  const iconClassName = attentionState ? "bg-red-100 text-red-600" : theme?.iconClassName ?? "bg-white text-violet-600";
  const badgeClassName = attentionState ? "bg-red-100 text-red-700" : theme?.badgeClassName ?? "bg-white text-violet-700";
  const completedSegmentClassName = theme?.completedSegmentClassName ?? "bg-violet-600";
  const activeSegmentClassName = theme?.activeSegmentClassName ?? "animate-pulse bg-violet-300";
  const pendingSegmentClassName = theme?.pendingSegmentClassName ?? "bg-white";

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border p-5 shadow-sm",
        containerClassName,
      )}
    >
      <div className="flex items-start gap-4">
        <div className={clsx("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl", iconClassName)}>
          {attentionState ? <ExclamationTriangleIcon className="h-6 w-6" /> : icon ?? (isRunning ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <SparklesIcon className="h-6 w-6" />)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-black text-gray-950">{title ?? labelForWorkflow(run.workflow)}</h2>
            <span className={clsx("rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide", badgeClassName)}>
              {statusLabel}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {currentStepLabelOverride ?? currentStepLabel}
          </p>
          <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${segmentCount}, minmax(0, 1fr))` }}>
            {Array.from({ length: segmentCount }).map((_, index) => {
              if (scanProgress) {
                const fill = scanSegmentFill(scanProgress, index);
                const isActiveSegment = isRunning && index + 1 === scanPhaseIndex(scanProgress) && fill < 100;
                return (
                  <div
                    key={index}
                    aria-label={`Scan phase ${index + 1} of ${segmentCount}`}
                    className={clsx("h-2 overflow-hidden rounded-full transition", pendingSegmentClassName)}
                  >
                    <div
                      className={clsx(
                        "h-full rounded-full transition-all",
                        attentionState && fill > 0 && "bg-red-300",
                        !attentionState && fill > 0 && (isActiveSegment ? activeSegmentClassName : completedSegmentClassName),
                      )}
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                );
              }
              const isComplete = index < completedSteps;
              const isActive = isRunning && index === completedSteps;
              return (
                <div
                  key={index}
                  className={clsx(
                    "h-2 rounded-full transition",
                    isComplete && (attentionState ? "bg-red-300" : completedSegmentClassName),
                    isActive && (attentionState ? "animate-pulse bg-red-200" : activeSegmentClassName),
                    !isComplete && !isActive && pendingSegmentClassName,
                  )}
                />
              );
            })}
          </div>
          <p className="mt-2 text-xs font-medium text-gray-500">
            {progressFooter}
          </p>
          {run.errors.length > 0 ? (
            <details className="mt-3 rounded-xl border border-red-200 bg-white/80 px-4 py-3 text-sm text-red-700">
              <summary className="cursor-pointer font-bold">{shortErrorMessage(run, run.errors[0])}</summary>
              <p className="mt-2 break-words font-mono text-xs leading-5 text-red-600">{run.errors[0]}</p>
            </details>
          ) : null}
        </div>
      </div>
    </div>
  );
}

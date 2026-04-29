import { ArrowPathIcon, ExclamationTriangleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

interface EmailDraftInProgressCardProps {
  status: "queued" | "running" | "failed" | "denied";
  displayStage: string;
  completedSteps: number;
  totalSteps: number;
  sourceLabel?: string;
  error?: string | null;
  notice?: string | null;
  pollingDegraded?: boolean;
  onRetry?: () => void;
  retryDisabled?: boolean;
  onCancel?: () => void;
  cancelDisabled?: boolean;
  isCancelling?: boolean;
  manualFallbackMessage?: string | null;
}

function ProgressSegments({
  completedSteps,
  totalSteps,
}: {
  completedSteps: number;
  totalSteps: number;
}) {
  const segmentCount = Math.max(totalSteps, 1);
  const safeCompleted = Math.min(Math.max(completedSteps, 0), segmentCount);

  return (
    <div className="grid grid-cols-8 gap-2">
      {Array.from({ length: segmentCount }).map((_, index) => {
        const isComplete = index < safeCompleted;
        const isActive = index === safeCompleted && safeCompleted < segmentCount;
        return (
          <div
            key={index}
            className={clsx(
              "h-2 rounded-full transition-all",
              isComplete && "bg-[var(--vr-color-primary)]",
              isActive && "bg-[var(--vr-palette-teal-soft)] animate-pulse",
              !isComplete && !isActive && "bg-white/70",
            )}
          />
        );
      })}
    </div>
  );
}

export default function EmailDraftInProgressCard({
  status,
  displayStage,
  completedSteps,
  totalSteps,
  sourceLabel = "inputs",
  error,
  notice,
  pollingDegraded = false,
  onRetry,
  retryDisabled = false,
  onCancel,
  cancelDisabled = false,
  isCancelling = false,
  manualFallbackMessage = null,
}: EmailDraftInProgressCardProps) {
  const isFailed = status === "failed" || status === "denied";
  const safeSourceLabel = sourceLabel.trim() || "inputs";
  const title = isFailed
    ? `Draft from ${safeSourceLabel} needs attention`
    : `Drafting update from ${safeSourceLabel}`;
  const progressLabel = `${Math.min(completedSteps, totalSteps)} of ${Math.max(totalSteps, 1)} steps complete`;

  return (
    <div
      className={clsx(
        "w-full rounded-2xl border p-6 shadow-sm overflow-hidden relative",
        isFailed
          ? "border-[rgba(242,114,63,0.35)] bg-[rgba(242,114,63,0.10)]"
          : "border-[rgba(0,128,128,0.18)] bg-[linear-gradient(135deg,var(--vr-palette-warm-white)_0%,var(--vr-palette-paper)_56%,var(--vr-palette-beige)_100%)]",
      )}
    >
      <div
        className={clsx(
          "absolute top-0 right-0 -mt-10 -mr-10 h-36 w-36 rounded-full blur-3xl",
          isFailed ? "bg-[rgba(242,114,63,0.22)]" : "bg-[rgba(0,255,215,0.22)]",
        )}
      />
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={clsx(
            "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl",
            isFailed ? "bg-[rgba(242,114,63,0.16)]" : "bg-[rgba(0,255,215,0.16)]",
          )}
        >
          {isFailed ? (
            <ExclamationTriangleIcon className="h-7 w-7 text-[var(--vr-palette-coral)]" />
          ) : (
            <SparklesIcon className="h-7 w-7 text-[var(--vr-color-primary)]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-[var(--vr-color-text)]">{title}</h2>
            <span
              className={clsx(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                isFailed
                  ? "bg-[rgba(242,114,63,0.16)] text-[var(--vr-color-text)]"
                  : "bg-white/80 text-[var(--vr-color-primary)]",
              )}
            >
              {isFailed ? "Retry available" : progressLabel}
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-[var(--vr-color-text-mid)]">{displayStage}</p>
          <p className="mt-1 text-sm text-[var(--vr-color-text-sub)]">
            {isCancelling
              ? "Cancelling draft and cleaning up this run."
              : "Usually takes 5-10 minutes to process. Refreshing the page is safe."}
          </p>

          {!isFailed && (
            <div className="mt-4 space-y-2">
              <ProgressSegments
                completedSteps={completedSteps}
                totalSteps={totalSteps}
              />
              <p className="text-xs text-[var(--vr-color-text-sub)]">
                We&apos;ll keep this run attached to your monthly update until the draft is ready.
              </p>
              {notice ? (
                <p className="rounded-xl border border-[rgba(255,200,1,0.42)] bg-white/80 px-4 py-3 text-sm text-[var(--vr-color-text)]">
                  {notice}
                </p>
              ) : null}
              {onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={cancelDisabled}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--vr-color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--vr-color-text-mid)] transition hover:bg-[var(--vr-color-neutral-50)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCancelling ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                  {isCancelling ? "Cancelling draft..." : "Cancel draft"}
                </button>
              ) : null}
            </div>
          )}

          {pollingDegraded && !isFailed && (
            <p className="mt-3 text-xs font-medium text-[var(--vr-color-text)]">
              Connection looks unstable. We&apos;ll keep retrying in the background.
            </p>
          )}

          {isFailed && (
            <>
              <p className="mt-3 rounded-xl border border-[rgba(242,114,63,0.35)] bg-white/80 px-4 py-3 text-sm text-[var(--vr-color-text)]">
                {error || "We couldn't draft your update from the selected inputs. Please try again."}
              </p>
              {manualFallbackMessage ? (
                <p className="mt-3 rounded-xl border border-[var(--vr-color-border)] bg-white/85 px-4 py-3 text-sm text-[var(--vr-color-text-mid)]">
                  {manualFallbackMessage}
                </p>
              ) : null}
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  disabled={retryDisabled}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[rgba(242,114,63,0.35)] bg-white px-4 py-2 text-sm font-semibold text-[var(--vr-color-text)] transition hover:bg-[rgba(242,114,63,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  Retry draft from {safeSourceLabel}
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { clsx } from "clsx";

export type MonthlyUpdateStepKey = "connect" | "draft" | "review" | "publish";

interface MonthlyUpdateStepperProps {
  activeStep: MonthlyUpdateStepKey;
  className?: string;
  compact?: boolean;
  disableMotion?: boolean;
  enabledSteps?: MonthlyUpdateStepKey[];
  expandOnHover?: boolean;
  frameless?: boolean;
  hideProgressUntilHover?: boolean;
  onStepClick?: (step: MonthlyUpdateStepKey) => void;
}

export const MONTHLY_UPDATE_STEPS: Array<{
  key: MonthlyUpdateStepKey;
  title: string;
  helper: string;
}> = [
  {
    key: "connect",
    title: "Connect data",
    helper: "Choose inputs",
  },
  {
    key: "draft",
    title: "Draft update",
    helper: "Generate or edit",
  },
  {
    key: "review",
    title: "Review",
    helper: "Preview for investors",
  },
  {
    key: "publish",
    title: "Publish",
    helper: "Send when ready",
  },
];

export default function MonthlyUpdateStepper({
  activeStep,
  className,
  compact = false,
  disableMotion = false,
  enabledSteps,
  expandOnHover = false,
  frameless = false,
  hideProgressUntilHover = false,
  onStepClick,
}: MonthlyUpdateStepperProps) {
  const activeIndex = Math.max(0, MONTHLY_UPDATE_STEPS.findIndex((step) => step.key === activeStep));
  const active = MONTHLY_UPDATE_STEPS[activeIndex] ?? MONTHLY_UPDATE_STEPS[0];
  const progressPercent = ((activeIndex + 1) / MONTHLY_UPDATE_STEPS.length) * 100;
  const enabledStepSet = new Set(enabledSteps ?? MONTHLY_UPDATE_STEPS.map((step) => step.key));
  const canSelectStep = (step: MonthlyUpdateStepKey) => Boolean(onStepClick) && enabledStepSet.has(step);
  const isLockedStep = (step: MonthlyUpdateStepKey, index: number) => !canSelectStep(step) && index > activeIndex;

  if (compact) {
    return (
      <nav
        aria-label="Monthly update progress"
        className={clsx("rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-color-card)] p-4 shadow-sm", className)}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]">
              Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
            </p>
            <p className="mt-1 text-sm font-black text-[var(--vr-color-text)]">{active.title}</p>
          </div>
          <span className="rounded-full bg-[var(--vr-color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,128,128,0.14)]">
            {active.helper}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--vr-color-neutral-100)]">
          <div
            className="h-full rounded-full bg-[var(--vr-color-primary)] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {MONTHLY_UPDATE_STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const canSelect = canSelectStep(step.key);
            const isLocked = isLockedStep(step.key, index);
            return (
              <button
                key={step.key}
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => onStepClick?.(step.key)}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset transition",
                  canSelect ? "cursor-pointer hover:bg-white" : "cursor-default",
                  isActive && "bg-[var(--vr-color-primary)] text-white shadow-sm ring-[var(--vr-color-primary)]",
                  isComplete && !isActive && "bg-[var(--vr-color-primary-soft)] text-[var(--vr-color-primary)] ring-[rgba(0,128,128,0.18)]",
                  !isActive && !isComplete && !isLocked && "bg-white text-[var(--vr-color-text-sub)] ring-[var(--vr-color-border)]",
                  isLocked && "bg-white text-gray-400 opacity-85 ring-gray-200",
                )}
              >
                {step.title}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (expandOnHover) {
    return (
      <nav
        aria-label="Monthly update progress"
        className={clsx("group/stepper py-2", className)}
      >
        <button
          type="button"
          className={clsx(
            "flex w-full items-center justify-between gap-4 rounded-2xl px-1 py-2 text-left outline-none hover:bg-[rgba(0,255,215,0.08)] focus-visible:bg-[rgba(0,255,215,0.08)] focus-visible:ring-2 focus-visible:ring-[rgba(0,128,128,0.18)]",
            !disableMotion && "transition",
          )}
          aria-label="Show monthly update workflow"
        >
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]">
              Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
            </p>
            <h2 className="vr-text-page-title mt-1 truncate text-2xl font-black tracking-tight text-[var(--vr-color-text)]">
              {active.title}
            </h2>
          </div>
          <span className="hidden rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.24)] sm:inline-flex">
            {disableMotion ? "Steps" : "Hover for steps"}
          </span>
        </button>

        <div
          className={clsx(
            "mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--vr-color-border)]",
            hideProgressUntilHover && "opacity-0 group-hover/stepper:opacity-100 group-focus-within/stepper:opacity-100",
            hideProgressUntilHover && !disableMotion && "transition-opacity duration-150",
          )}
        >
          <div
            className={clsx(
              "h-full rounded-full bg-[var(--vr-color-primary)]",
              !disableMotion && "transition-all duration-300",
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div
          className={clsx(
            disableMotion
              ? "block"
              : "max-h-0 overflow-hidden opacity-0 transition-all duration-200 ease-out group-hover/stepper:max-h-64 group-hover/stepper:opacity-100 group-focus-within/stepper:max-h-64 group-focus-within/stepper:opacity-100",
          )}
        >
          <div className="pt-6">
            <div className="flex flex-wrap gap-2 sm:hidden">
              {MONTHLY_UPDATE_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                const isComplete = index < activeIndex;
                const canSelect = canSelectStep(step.key);
                const isLocked = isLockedStep(step.key, index);
                return (
                  <button
                    key={step.key}
                    type="button"
                    data-stepper-step={step.key}
                    disabled={!canSelect}
                    onClick={() => onStepClick?.(step.key)}
                    className={clsx(
                      "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset",
                      !disableMotion && "transition",
                      canSelect ? "cursor-pointer hover:bg-white" : "cursor-default",
                      isActive && "bg-[var(--vr-color-primary)] text-white shadow-sm ring-[var(--vr-color-primary)]",
                      isComplete && !isActive && "bg-[var(--vr-color-primary-soft)] text-[var(--vr-color-primary)] ring-[rgba(0,128,128,0.18)]",
                      !isActive && !isComplete && !isLocked && "bg-white text-[var(--vr-color-text-sub)] ring-[var(--vr-color-border)]",
                      isLocked && "bg-white text-gray-400 opacity-85 ring-gray-200",
                    )}
                  >
                    {step.title}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:grid sm:grid-cols-4 sm:gap-5">
              {MONTHLY_UPDATE_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                const isComplete = index < activeIndex;
                const canSelect = canSelectStep(step.key);
                const isLocked = isLockedStep(step.key, index);
                return (
                  <div key={step.key} className="relative min-w-0">
                    {index > 0 ? (
                      <div
                        className={clsx(
                          "absolute left-[-50%] top-6 hidden h-0.5 w-full sm:block",
                          index <= activeIndex ? "bg-[var(--vr-color-primary)]" : "bg-[var(--vr-color-border)]",
                        )}
                        aria-hidden
                      />
                    ) : null}
                    <button
                      type="button"
                      data-stepper-step={step.key}
                      disabled={!canSelect}
                      onClick={() => onStepClick?.(step.key)}
                      className={clsx(
                        "relative flex w-full flex-col items-center rounded-xl px-3 pt-2 pb-4 text-center",
                        !disableMotion && "transition",
                        canSelect ? "cursor-pointer hover:bg-[rgba(0,255,215,0.12)]" : "cursor-default",
                      )}
                    >
                      <div
                        className={clsx(
                          "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white text-base font-black",
                          !disableMotion && "transition",
                          isComplete && "border-[var(--vr-color-primary)] text-[var(--vr-color-primary)] shadow-[0_0_0_4px_rgba(0,255,215,0.10)]",
                          isActive && !isComplete && "border-[var(--vr-color-primary)] text-[var(--vr-color-primary)] shadow-[0_0_0_5px_rgba(0,128,128,0.10)]",
                          !isActive && !isComplete && !isLocked && "border-[var(--vr-color-border)] text-[var(--vr-color-text-sub)]",
                          isLocked && "border-gray-200 bg-gray-50 text-gray-400",
                        )}
                      >
                        {index + 1}
                      </div>
                      <p
                        className={clsx(
                          "mt-3 truncate text-base font-black",
                          (isActive || isComplete) ? "text-[var(--vr-color-text)]" : isLocked ? "text-gray-400" : "text-[var(--vr-color-text-sub)]",
                        )}
                      >
                        {step.title}
                      </p>
                      <p
                        className={clsx(
                          "mt-1 truncate text-xs font-semibold",
                          isActive ? "text-[var(--vr-color-primary)]" : isLocked ? "text-gray-400" : "text-[var(--vr-color-text-sub)]",
                        )}
                      >
                        {step.helper}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Monthly update progress"
      className={clsx(
        frameless
          ? "py-2 sm:py-3"
          : "rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-color-card)] p-4 shadow-sm sm:p-5",
        className,
      )}
    >
      <div className="sm:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]">
              Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
            </p>
            <p className="vr-text-card-title mt-1 text-base font-black text-[var(--vr-color-text)]">{active.title}</p>
          </div>
          <span className="rounded-full bg-[var(--vr-color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,128,128,0.14)]">
            {active.helper}
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--vr-color-neutral-100)]">
          <div
            className="h-full rounded-full bg-[var(--vr-color-primary)] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {MONTHLY_UPDATE_STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const canSelect = canSelectStep(step.key);
            const isLocked = isLockedStep(step.key, index);
            return (
              <button
                key={step.key}
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => onStepClick?.(step.key)}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset transition",
                  canSelect ? "cursor-pointer hover:bg-white" : "cursor-default",
                  isActive && "bg-[var(--vr-color-primary)] text-white shadow-sm ring-[var(--vr-color-primary)]",
                  isComplete && !isActive && "bg-[var(--vr-color-primary-soft)] text-[var(--vr-color-primary)] ring-[rgba(0,128,128,0.18)]",
                  !isActive && !isComplete && !isLocked && "bg-white text-[var(--vr-color-text-sub)] ring-[var(--vr-color-border)]",
                  isLocked && "bg-white text-gray-400 opacity-85 ring-gray-200",
                )}
              >
                {step.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className={clsx("hidden items-center justify-between gap-4 sm:flex", frameless ? "mb-8" : "mb-5")}>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]">
            Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
          </p>
          <p className="mt-1 text-sm font-bold text-[var(--vr-color-text-sub)]">Monthly update workflow</p>
        </div>
        <p className="vr-text-card-title text-sm font-black text-[var(--vr-color-text)]">{active.title}</p>
      </div>

      <div className={clsx("hidden sm:grid sm:grid-cols-4", frameless ? "gap-5" : "gap-3")}>
        {MONTHLY_UPDATE_STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          const canSelect = canSelectStep(step.key);
          const isLocked = isLockedStep(step.key, index);
          return (
            <div key={step.key} className="relative min-w-0">
              {index > 0 ? (
                <div
                  className={clsx(
                    "absolute left-[-50%] hidden h-0.5 w-full sm:block",
                    frameless ? "top-7" : "top-5",
                    index <= activeIndex ? "bg-[var(--vr-color-primary)]" : "bg-[var(--vr-color-border)]",
                  )}
                  aria-hidden
                />
              ) : null}
              <button
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => onStepClick?.(step.key)}
                  className={clsx(
                    "relative flex w-full flex-col items-center rounded-xl px-3 pt-2 text-center transition",
                    frameless ? "pb-4" : "pb-3",
                    canSelect ? "cursor-pointer hover:bg-[rgba(0,255,215,0.12)]" : "cursor-default",
                  )}
                >
                <div
                  className={clsx(
                    "z-10 flex items-center justify-center rounded-full border-2 bg-white font-black transition",
                    frameless ? "h-14 w-14 text-base" : "h-10 w-10 text-sm",
                    isComplete && "border-[var(--vr-color-primary)] text-[var(--vr-color-primary)] shadow-[0_0_0_4px_rgba(0,255,215,0.10)]",
                    isActive && !isComplete && "border-[var(--vr-color-primary)] text-[var(--vr-color-primary)] shadow-[0_0_0_5px_rgba(0,128,128,0.10)]",
                    !isActive && !isComplete && !isLocked && "border-[var(--vr-color-border)] text-[var(--vr-color-text-sub)]",
                    isLocked && "border-gray-200 bg-gray-50 text-gray-400",
                  )}
                >
                  {index + 1}
                </div>
                <p
                  className={clsx(
                    "truncate font-black",
                    frameless ? "mt-4 text-base" : "mt-3 text-sm",
                    (isActive || isComplete) ? "text-[var(--vr-color-text)]" : isLocked ? "text-gray-400" : "text-[var(--vr-color-text-sub)]",
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={clsx(
                    "mt-1 truncate font-semibold",
                    frameless ? "text-sm" : "text-xs",
                    isActive ? "text-[var(--vr-color-primary)]" : isLocked ? "text-gray-400" : "text-[var(--vr-color-text-sub)]",
                  )}
                >
                  {step.helper}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

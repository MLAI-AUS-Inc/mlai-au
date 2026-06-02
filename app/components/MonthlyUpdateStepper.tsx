import { clsx } from "clsx";

export type MonthlyUpdateStepKey = "connect" | "draft" | "review" | "publish";
type MobileStepChipKey = MonthlyUpdateStepKey;

interface MonthlyUpdateStepperProps {
  activeStep: MonthlyUpdateStepKey;
  className?: string;
  compact?: boolean;
  disableMotion?: boolean;
  enabledSteps?: MonthlyUpdateStepKey[];
  expandOnHover?: boolean;
  frameless?: boolean;
  onStepClick?: (step: MonthlyUpdateStepKey) => void;
}

export const MONTHLY_UPDATE_STEPS: Array<{
  key: MonthlyUpdateStepKey;
  title: string;
  helper: string;
}> = [
  {
    key: "draft",
    title: "Draft update",
    helper: "Select month",
  },
  {
    key: "connect",
    title: "Connect data",
    helper: "Optional inputs",
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

const stepperHeadingClassName = "font-['Oswald',sans-serif] font-black tracking-normal";
const stepperBodyClassName = "font-['Roboto',sans-serif]";

export default function MonthlyUpdateStepper({
  activeStep,
  className,
  compact = false,
  disableMotion = false,
  enabledSteps,
  expandOnHover = false,
  frameless = false,
  onStepClick,
}: MonthlyUpdateStepperProps) {
  const activeIndex = Math.max(0, MONTHLY_UPDATE_STEPS.findIndex((step) => step.key === activeStep));
  const active = MONTHLY_UPDATE_STEPS[activeIndex] ?? MONTHLY_UPDATE_STEPS[0];
  const enabledStepSet = new Set(enabledSteps ?? MONTHLY_UPDATE_STEPS.map((step) => step.key));
  const canSelectStep = (step: MonthlyUpdateStepKey) => Boolean(onStepClick) && enabledStepSet.has(step);
  const isLockedStep = (step: MonthlyUpdateStepKey, index: number) => !canSelectStep(step) && index > activeIndex;
  const mobileStepChips: Array<{
    key: MobileStepChipKey;
    title: string;
    isActive: boolean;
    isComplete: boolean;
    canSelect: boolean;
    isLocked: boolean;
  }> = (() => {
    const activeChip = MONTHLY_UPDATE_STEPS[activeIndex] ?? MONTHLY_UPDATE_STEPS[0];
    const hasLockedFutureSteps = MONTHLY_UPDATE_STEPS.some((step, index) => isLockedStep(step.key, index));

    if (!hasLockedFutureSteps) {
      return MONTHLY_UPDATE_STEPS.map((step, index) => ({
        key: step.key,
        title: step.title,
        isActive: index === activeIndex,
        isComplete: index < activeIndex,
        canSelect: canSelectStep(step.key),
        isLocked: isLockedStep(step.key, index),
      }));
    }

    return [
      {
        key: activeChip.key,
        title: activeChip.title,
        isActive: true,
        isComplete: false,
        canSelect: canSelectStep(activeChip.key),
        isLocked: false,
      },
      {
        key: "publish",
        title: "Publish",
        isActive: false,
        isComplete: false,
        canSelect: false,
        isLocked: true,
      },
    ];
  })();

  if (compact) {
    return (
      <nav
        aria-label="Monthly update progress"
        className={clsx("rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-color-card)] p-4 shadow-sm", className)}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={clsx("text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]", stepperBodyClassName)}>
              Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
            </p>
            <p className={clsx("mt-1 text-base text-[var(--vr-color-text)]", stepperHeadingClassName)}>{active.title}</p>
          </div>
          <span className={clsx("rounded-full bg-[var(--vr-color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,128,128,0.14)]", stepperBodyClassName)}>
            {active.helper}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {mobileStepChips.map((step) => {
            const isActive = step.isActive;
            const isComplete = step.isComplete;
            const canSelect = step.canSelect;
            const isLocked = step.isLocked;
            return (
              <button
                key={step.key}
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => {
                  if (step.canSelect) onStepClick?.(step.key);
                }}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset",
                  stepperBodyClassName,
                  !disableMotion && "transition",
                  canSelect ? "cursor-pointer hover:bg-[rgba(0,255,215,0.16)]" : "cursor-default",
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
        className={clsx("py-2", className)}
      >
        <div
          className={clsx(
            "flex w-full items-center justify-between gap-4 rounded-2xl px-1 py-2 text-left",
            !disableMotion && "transition",
          )}
        >
          <div className="min-w-0">
            <p className={clsx("text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]", stepperBodyClassName)}>
              Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
            </p>
            <h2 className={clsx("mt-1 truncate text-3xl text-[var(--vr-color-text)]", stepperHeadingClassName)}>
              {active.title}
            </h2>
          </div>
        </div>

        <div>
          <div className="pt-4">
            <div className="flex flex-wrap gap-2 sm:hidden">
              {mobileStepChips.map((step) => {
                const isActive = step.isActive;
                const isComplete = step.isComplete;
                const canSelect = step.canSelect;
                const isLocked = step.isLocked;
                return (
                  <button
                    key={step.key}
                    type="button"
                    data-stepper-step={step.key}
                    disabled={!canSelect}
                    onClick={() => {
                      if (step.canSelect) onStepClick?.(step.key);
                    }}
                    className={clsx(
                      "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset",
                      stepperBodyClassName,
                      !disableMotion && "transition",
                      canSelect ? "cursor-pointer hover:bg-[rgba(0,255,215,0.16)]" : "cursor-default",
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
                          "mt-3 truncate text-lg",
                          stepperHeadingClassName,
                          (isActive || isComplete) ? "text-[var(--vr-color-text)]" : isLocked ? "text-gray-400" : "text-[var(--vr-color-text-sub)]",
                        )}
                      >
                        {step.title}
                      </p>
                      <p
                        className={clsx(
                          "mt-1 truncate text-xs font-semibold",
                          stepperBodyClassName,
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
            <p className={clsx("text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]", stepperBodyClassName)}>
              Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
            </p>
            <p className={clsx("mt-1 text-xl text-[var(--vr-color-text)]", stepperHeadingClassName)}>{active.title}</p>
          </div>
          <span className={clsx("rounded-full bg-[var(--vr-color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,128,128,0.14)]", stepperBodyClassName)}>
            {active.helper}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {mobileStepChips.map((step) => {
            const isActive = step.isActive;
            const isComplete = step.isComplete;
            const canSelect = step.canSelect;
            const isLocked = step.isLocked;
            return (
              <button
                key={step.key}
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => {
                  if (step.canSelect) onStepClick?.(step.key);
                }}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset transition",
                  stepperBodyClassName,
                  canSelect ? "cursor-pointer hover:bg-[rgba(0,255,215,0.16)]" : "cursor-default",
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
          <p className={clsx("text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]", stepperBodyClassName)}>
            Step {activeIndex + 1} of {MONTHLY_UPDATE_STEPS.length}
          </p>
          <p className={clsx("mt-1 text-sm font-bold text-[var(--vr-color-text-sub)]", stepperBodyClassName)}>Monthly update workflow</p>
        </div>
        <p className={clsx("text-lg text-[var(--vr-color-text)]", stepperHeadingClassName)}>{active.title}</p>
      </div>

      <div className={clsx("hidden sm:grid sm:grid-cols-4", frameless ? "gap-5" : "gap-3")}>
        {MONTHLY_UPDATE_STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          const canSelect = canSelectStep(step.key);
          const isLocked = isLockedStep(step.key, index);
          return (
            <div key={step.key} className="relative min-w-0">
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
                    "truncate",
                    stepperHeadingClassName,
                    frameless ? "mt-4 text-lg" : "mt-3 text-base",
                    (isActive || isComplete) ? "text-[var(--vr-color-text)]" : isLocked ? "text-gray-400" : "text-[var(--vr-color-text-sub)]",
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={clsx(
                    "mt-1 truncate font-semibold",
                    stepperBodyClassName,
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

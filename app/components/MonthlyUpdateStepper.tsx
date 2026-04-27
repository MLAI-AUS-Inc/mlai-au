import { CheckIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export type MonthlyUpdateStepKey = "connect" | "draft" | "review" | "publish";

interface MonthlyUpdateStepperProps {
  activeStep: MonthlyUpdateStepKey;
  className?: string;
  compact?: boolean;
  enabledSteps?: MonthlyUpdateStepKey[];
  onStepClick?: (step: MonthlyUpdateStepKey) => void;
}

const STEPS: Array<{
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
  enabledSteps,
  onStepClick,
}: MonthlyUpdateStepperProps) {
  const activeIndex = Math.max(0, STEPS.findIndex((step) => step.key === activeStep));
  const active = STEPS[activeIndex] ?? STEPS[0];
  const progressPercent = ((activeIndex + 1) / STEPS.length) * 100;
  const enabledStepSet = new Set(enabledSteps ?? STEPS.map((step) => step.key));
  const canSelectStep = (step: MonthlyUpdateStepKey) => Boolean(onStepClick) && enabledStepSet.has(step);

  if (compact) {
    return (
      <nav
        aria-label="Monthly update progress"
        className={clsx("rounded-2xl border border-violet-100 bg-white p-4 shadow-sm", className)}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">
              Step {activeIndex + 1} of {STEPS.length}
            </p>
            <p className="mt-1 text-sm font-black text-gray-950">{active.title}</p>
          </div>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-100">
            {active.helper}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-violet-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const canSelect = canSelectStep(step.key);
            return (
              <button
                key={step.key}
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => onStepClick?.(step.key)}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 transition",
                  canSelect ? "cursor-pointer hover:bg-violet-100" : "cursor-default",
                  isActive && "bg-violet-600 text-white ring-violet-600",
                  isComplete && !isActive && "bg-violet-50 text-violet-700 ring-violet-100",
                  !isActive && !isComplete && "bg-gray-50 text-gray-500 ring-gray-100",
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

  return (
    <nav
      aria-label="Monthly update progress"
      className={clsx("rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5", className)}
    >
      <div className="sm:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">
              Step {activeIndex + 1} of {STEPS.length}
            </p>
            <p className="mt-1 text-base font-black text-gray-950">{active.title}</p>
          </div>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-100">
            {active.helper}
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-violet-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const canSelect = canSelectStep(step.key);
            return (
              <button
                key={step.key}
                type="button"
                data-stepper-step={step.key}
                disabled={!canSelect}
                onClick={() => onStepClick?.(step.key)}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 transition",
                  canSelect ? "cursor-pointer hover:bg-violet-100" : "cursor-default",
                  isActive && "bg-violet-600 text-white ring-violet-600",
                  isComplete && !isActive && "bg-violet-50 text-violet-700 ring-violet-100",
                  !isActive && !isComplete && "bg-gray-50 text-gray-500 ring-gray-100",
                )}
              >
                {step.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5 hidden items-center justify-between gap-4 sm:flex">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">
            Step {activeIndex + 1} of {STEPS.length}
          </p>
          <p className="mt-1 text-sm font-bold text-gray-500">Monthly update workflow</p>
        </div>
        <p className="text-sm font-black text-gray-950">{active.title}</p>
      </div>

      <div className="hidden sm:grid sm:grid-cols-4 sm:gap-3">
        {STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          const canSelect = canSelectStep(step.key);
          return (
            <div key={step.key} className="relative min-w-0">
              {index > 0 ? (
                <div
                  className={clsx(
                    "absolute left-[-50%] top-5 hidden h-0.5 w-full sm:block",
                    index <= activeIndex ? "bg-violet-500" : "bg-gray-200",
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
                  "relative flex w-full flex-col items-center rounded-xl px-2 pb-2 text-center transition",
                  canSelect ? "cursor-pointer hover:bg-violet-50/70" : "cursor-default",
                )}
              >
                <div
                  className={clsx(
                    "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-black transition",
                    isComplete && "border-violet-600 bg-violet-600 text-white",
                    isActive && !isComplete && "border-violet-600 text-violet-700 shadow-[0_0_0_5px_rgba(124,58,237,0.10)]",
                    !isActive && !isComplete && "border-gray-200 text-gray-400",
                  )}
                >
                  {isComplete ? <CheckIcon className="h-5 w-5" /> : index + 1}
                </div>
                <p
                  className={clsx(
                    "mt-3 truncate text-sm font-black",
                    (isActive || isComplete) ? "text-gray-950" : "text-gray-400",
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={clsx(
                    "mt-1 truncate text-xs font-semibold",
                    isActive ? "text-violet-600" : "text-slate-400",
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

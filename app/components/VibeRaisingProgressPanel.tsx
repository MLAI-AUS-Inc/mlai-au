import { CheckIcon } from "@heroicons/react/24/solid";
import type { MonthlyUpdateStepKey } from "./MonthlyUpdateStepper";

export interface VibeRaisingProgressProps {
  activeStep: MonthlyUpdateStepKey;
  enabledSteps?: MonthlyUpdateStepKey[];
  completedSteps?: MonthlyUpdateStepKey[];
  progress?: Partial<Record<MonthlyUpdateStepKey, number>>;
  details?: Partial<Record<MonthlyUpdateStepKey, string>>;
  onStepClick?: (step: MonthlyUpdateStepKey) => void;
}

export const UPDATE_PROGRESS_STEPS = [
  { key: "draft", title: "Draft" },
  { key: "review", title: "Review" },
  { key: "publish", title: "Send" },
] as const;

export default function VibeRaisingProgressPanel({
  activeStep,
  enabledSteps = [],
  completedSteps = [],
  progress = {},
  onStepClick,
}: VibeRaisingProgressProps) {
  const current = activeStep === "connect" ? "draft" : activeStep;
  return (
    <nav aria-label="Update progress" className="vr-workflow-panel">
      <p className="vr-workflow-eyebrow">Your update</p>
      <ol className="vr-workflow-steps">
        {UPDATE_PROGRESS_STEPS.map((step, index) => {
          const active = current === step.key;
          const complete = completedSteps.includes(step.key);
          const enabled =
            Boolean(onStepClick) && enabledSteps.includes(step.key);
          return (
            <li
              key={step.key}
              className="vr-workflow-step"
              data-active={active}
              data-complete={complete}
            >
              <button
                type="button"
                className="vr-workflow-step-button"
                data-stepper-step={step.key}
                aria-current={active ? "step" : undefined}
                disabled={!enabled}
                onClick={() => enabled && onStepClick?.(step.key)}
                aria-label={`${index + 1}. ${step.title}${complete ? ". Complete" : ""}`}
              >
                <span className="vr-workflow-node" aria-hidden="true">
                  {complete && !active ? (
                    <CheckIcon className="h-3.5 w-3.5" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="vr-workflow-step-title">{step.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {current === "draft" && (
        <div
          className="vr-workflow-small-progress"
          role="progressbar"
          aria-label="Draft progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(
            Math.max(0, Math.min(1, progress.draft || 0)) * 100,
          )}
        >
          <span
            style={{
              width: `${Math.max(0, Math.min(1, progress.draft || 0)) * 100}%`,
            }}
          />
        </div>
      )}
    </nav>
  );
}

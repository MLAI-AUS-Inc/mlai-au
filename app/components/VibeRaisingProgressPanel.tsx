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
  { key: "draft", title: "Draft update", helper: "Tell your story" },
  { key: "connect", title: "Connect data", helper: "Optional inputs" },
  { key: "review", title: "Review", helper: "Check your preview" },
  { key: "publish", title: "Send to MLAI", helper: "Private submission" },
] as const;

export default function VibeRaisingProgressPanel({
  activeStep, enabledSteps = [], completedSteps = [], progress = {}, details = {}, onStepClick,
}: VibeRaisingProgressProps) {
  return (
    <nav aria-label="Update progress" className="vr-workflow-panel">
      <p className="vr-workflow-eyebrow">Your update</p>
      <ol className="vr-workflow-steps">
        {UPDATE_PROGRESS_STEPS.map((step, index) => {
          const active = activeStep === step.key;
          const complete = completedSteps.includes(step.key);
          const canSelect = Boolean(onStepClick) && enabledSteps.includes(step.key);
          const rawProgress = progress[step.key] ?? 0;
          const fraction = complete ? 1 : Number.isFinite(rawProgress) ? Math.min(1, Math.max(0, rawProgress)) : 0;
          const percent = Math.round(fraction * 100);
          const detail = details[step.key] ?? (complete ? "Complete" : step.helper);
          const status = active ? "Current step" : complete ? "Complete" : "";
          return (
            <li key={step.key} className="vr-workflow-step" data-active={active} data-complete={complete}>
              {index < UPDATE_PROGRESS_STEPS.length - 1 ? (
                <div className="vr-workflow-track" role="progressbar" aria-label={`${step.title} progress`}
                  aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-valuetext={`${percent}% — ${detail}`}>
                  <span className="vr-workflow-fill" style={{ transform: `scaleY(${fraction})` }} />
                  {active && fraction > 0 && fraction < 1 ? (
                    <span className="vr-workflow-spark" style={{ top: `${percent}%` }} />
                  ) : null}
                </div>
              ) : null}
              <button type="button" data-stepper-step={step.key} aria-current={active ? "step" : undefined}
                aria-label={`${index + 1}. ${step.title}${status ? `. ${status}` : ""}. ${detail}`}
                title={`${step.title} — ${detail}`} disabled={!canSelect}
                onClick={() => { if (canSelect) onStepClick?.(step.key); }} className="vr-workflow-step-button">
                <span className="vr-workflow-node" aria-hidden="true">
                  {complete && !active ? <CheckIcon className="h-4 w-4" /> : index + 1}
                  {index === UPDATE_PROGRESS_STEPS.length - 1 ? (
                    <svg className="vr-workflow-node-ring" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - percent} />
                    </svg>
                  ) : null}
                </span>
                <span className="vr-workflow-step-copy">
                  <span className="vr-workflow-step-title">{step.title}</span>
                  <span className="vr-workflow-step-detail">{detail}</span>
                  {active ? <span className="vr-workflow-current">You’re here</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="vr-workflow-footnote">A little progress, one step at a time.</p>
    </nav>
  );
}

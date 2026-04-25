import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { clsx } from "clsx";

export type VibeMarketingStepKey =
  | "startupDetails"
  | "baseline"
  | "github"
  | "scan"
  | "articleSystem"
  | "research"
  | "chooseArticle"
  | "writeCheck"
  | "editArticle"
  | "reviewPublish"
  | "dailyAutomation";

const STEPS: Array<{ key: VibeMarketingStepKey; title: string; helper: string }> = [
  { key: "startupDetails", title: "Startup", helper: "Details" },
  { key: "baseline", title: "Baseline", helper: "Website" },
  { key: "github", title: "GitHub", helper: "Repo access" },
  { key: "scan", title: "Scan", helper: "Detect setup" },
  { key: "articleSystem", title: "Articles", helper: "Ready path" },
  { key: "research", title: "Research", helper: "Topics" },
  { key: "chooseArticle", title: "Choose", helper: "Brief" },
  { key: "writeCheck", title: "Write", helper: "Verify" },
  { key: "editArticle", title: "Edit", helper: "Revise" },
  { key: "reviewPublish", title: "Review", helper: "Approve" },
  { key: "dailyAutomation", title: "Daily", helper: "Automate" },
];

const PHASES: Array<{ title: string; steps: VibeMarketingStepKey[] }> = [
  { title: "Setup", steps: ["startupDetails", "baseline", "github", "scan", "articleSystem"] },
  { title: "Plan", steps: ["research", "chooseArticle"] },
  { title: "Create", steps: ["writeCheck", "editArticle"] },
  { title: "Publish", steps: ["reviewPublish", "dailyAutomation"] },
];

interface VibeMarketingStepperProps {
  activeStep: VibeMarketingStepKey;
  completedSteps?: string[];
  className?: string;
  compact?: boolean;
}

export default function VibeMarketingStepper({
  activeStep,
  completedSteps = [],
  className,
  compact = false,
}: VibeMarketingStepperProps) {
  const activeIndex = Math.max(0, STEPS.findIndex((step) => step.key === activeStep));
  const completedSet = new Set(completedSteps);
  const active = STEPS[activeIndex] ?? STEPS[0];
  const progressPercent = ((activeIndex + 1) / STEPS.length) * 100;
  const currentPhaseIndex = Math.max(0, PHASES.findIndex((phase) => phase.steps.includes(active.key)));
  const isStepComplete = (step: (typeof STEPS)[number], index: number) => completedSet.has(step.key) || index < activeIndex;

  return (
    <nav
      className={clsx(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        compact ? "p-3" : "p-4 sm:p-5",
        className,
      )}
      aria-label="Vibe Marketing progress"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">
            Step {activeIndex + 1} of {STEPS.length}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-base font-black text-gray-950">{active.title}</p>
            <span className="text-sm font-bold text-gray-500">{active.helper}</span>
          </div>
        </div>
        <span className="w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-100">
          {PHASES[currentPhaseIndex]?.title ?? "Workflow"}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden>
        <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Workflow phases">
        {PHASES.map((phase, phaseIndex) => {
          const phaseStepIndexes = phase.steps.map((stepKey) => STEPS.findIndex((step) => step.key === stepKey)).filter((index) => index >= 0);
          const completedCount = phaseStepIndexes.filter((index) => isStepComplete(STEPS[index], index)).length;
          const isActive = phaseIndex === currentPhaseIndex;
          const isComplete = completedCount === phaseStepIndexes.length && phaseStepIndexes.length > 0;
          return (
            <div
              key={phase.title}
              className={clsx(
                "flex min-w-[132px] items-center justify-between gap-3 rounded-full px-3 py-2 text-xs font-bold ring-1 transition",
                isActive && "bg-violet-50 text-violet-700 ring-violet-200",
                !isActive && isComplete && "bg-emerald-50 text-emerald-700 ring-emerald-100",
                !isActive && !isComplete && "bg-gray-50 text-gray-500 ring-gray-100",
              )}
            >
              <span>{phase.title}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-[10px]",
                  isActive ? "bg-white text-violet-700" : "bg-white/80 text-gray-500",
                )}
              >
                {completedCount}/{phaseStepIndexes.length}
              </span>
            </div>
          );
        })}
      </div>

      <ol className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {STEPS.map((step, index) => {
          const isActive = step.key === activeStep;
          const isComplete = isStepComplete(step, index);
          return (
            <li key={step.key} className="min-w-[64px] flex-1">
              <Link
                to={`/founder-tools/marketing/create?step=${step.key}`}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${index + 1} of ${STEPS.length}: ${step.title} ${step.helper}`}
                className={clsx(
                  "group flex flex-col items-center rounded-lg px-1.5 py-1 text-center transition hover:bg-gray-50",
                  isActive && "bg-violet-50 hover:bg-violet-50",
                )}
              >
                <span
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ring-1 transition",
                    isComplete && "bg-emerald-600 text-white ring-emerald-600",
                    isActive && !isComplete && "bg-violet-600 text-white ring-violet-600 shadow-[0_0_0_5px_rgba(124,58,237,0.10)]",
                    !isActive && !isComplete && "bg-white text-gray-400 ring-gray-200 group-hover:ring-gray-300",
                  )}
                >
                  {isComplete ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </span>
                <span
                  className={clsx(
                    "mt-1 hidden max-w-[68px] truncate text-[10px] font-bold sm:block",
                    isActive ? "text-violet-700" : isComplete ? "text-emerald-700" : "text-gray-400",
                  )}
                >
                  {step.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

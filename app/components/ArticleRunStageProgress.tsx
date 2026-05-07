import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import type { VibeMarketingRunSummary, VibeMarketingStepState } from "~/types/vibe-marketing";

type StageId = "setup" | "research" | "write" | "preview";
type StageStatus = "complete" | "running" | "up_next" | "attention";

interface StageDefinition {
  id: StageId;
  label: string;
  activeText: string;
  completeText: string;
  pendingText: string;
}

interface StageView extends StageDefinition {
  status: StageStatus;
  detail: string;
}

interface ArticleRunStageProgressProps {
  run: VibeMarketingRunSummary;
  pollingDegraded?: boolean;
}

const STAGES: StageDefinition[] = [
  {
    id: "setup",
    label: "Checking website setup",
    activeText: "Checking your repo, article system, and publish setup.",
    completeText: "Website and repository setup are ready.",
    pendingText: "Setup checks run before writing starts.",
  },
  {
    id: "research",
    label: "Researching topic",
    activeText: "Collecting sources and shaping the article brief.",
    completeText: "Topic research is ready.",
    pendingText: "Research starts after setup checks pass.",
  },
  {
    id: "write",
    label: "Writing article",
    activeText: "Planning, drafting, grounding, and assembling the article.",
    completeText: "Draft content has been assembled.",
    pendingText: "Writing starts after research is complete.",
  },
  {
    id: "preview",
    label: "Preparing preview",
    activeText: "Rendering, packaging, and verifying the article preview.",
    completeText: "The article package is ready to review.",
    pendingText: "Preview preparation runs after the draft is assembled.",
  },
];

const STAGE_INDEX = new Map(STAGES.map((stage, index) => [stage.id, index]));
const COMPLETE_STEP_STATUSES = new Set(["completed", "skipped"]);
const FAILED_STEP_STATUSES = new Set(["failed", "blocked", "cancelled", "blocked_verification", "denied"]);
const RUNNING_STEP_STATUSES = new Set(["running", "retrying", "queued", "pending"]);
const FAILED_RUN_STATUSES = new Set(["failed", "blocked", "blocked_verification", "denied", "cancelled"]);
const RUNNING_RUN_STATUSES = new Set([
  "queued",
  "running",
  "awaiting_confirmation",
  "awaiting_delivery_mode",
  "awaiting_approval",
  "approval_required",
]);

function normalizedKey(step: VibeMarketingStepState | string | null | undefined) {
  const key = typeof step === "string" ? step : step?.key;
  return String(key ?? "").toLowerCase();
}

function fallbackStageForIndex(index: number, total: number): StageId {
  const ratio = total > 0 ? index / total : 0;
  if (ratio < 0.25) return "setup";
  if (ratio < 0.45) return "research";
  if (ratio < 0.75) return "write";
  return "preview";
}

function stageForStep(step: VibeMarketingStepState | string | null | undefined, index = 0, total = 1): StageId {
  const key = normalizedKey(step);

  if (
    key.includes("fetch_org_config") ||
    key.includes("refresh_repo_auth") ||
    key.includes("repo_auth") ||
    key.includes("scan_repository") ||
    key.includes("classify_repository") ||
    key.includes("synthesize_repository") ||
    key === "load_context"
  ) {
    return "setup";
  }

  if (
    key.includes("discover_research") ||
    key.includes("collect_research") ||
    key.includes("research_sources") ||
    key.includes("research_bundle") ||
    key.includes("source_bundle") ||
    key.includes("topic_explanation")
  ) {
    return "research";
  }

  if (
    key.includes("plan_article") ||
    key.includes("draft_section") ||
    key.includes("ground_section") ||
    key.includes("assemble_article") ||
    key.includes("generate_content_images") ||
    key === "finalize"
  ) {
    return "write";
  }

  if (
    key.includes("render_article") ||
    key.includes("package_content_delivery") ||
    key.includes("validate_render") ||
    key.includes("prove_publish") ||
    key.includes("verify_") ||
    key.includes("review_visual_style") ||
    key.includes("preview") ||
    key.includes("publish") ||
    key.includes("repair_") ||
    key.includes("archive_github")
  ) {
    return "preview";
  }

  return fallbackStageForIndex(index, total);
}

function formatStepName(value: string | null | undefined) {
  return String(value ?? "")
    .replace(/[:_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function currentInternalStep(run: VibeMarketingRunSummary) {
  const currentKey = normalizedKey(run.currentStep);
  return (
    run.steps.find((step) => normalizedKey(step) === currentKey) ??
    run.steps.find((step) => RUNNING_STEP_STATUSES.has(step.status)) ??
    run.steps.find((step) => !COMPLETE_STEP_STATUSES.has(step.status)) ??
    [...run.steps].reverse().find((step) => COMPLETE_STEP_STATUSES.has(step.status)) ??
    null
  );
}

function stageStatusTone(status: StageStatus) {
  if (status === "complete") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "running") return "border-violet-200 bg-violet-50 text-violet-800";
  if (status === "attention") return "border-red-200 bg-red-50 text-red-800";
  return "border-gray-200 bg-white text-gray-500";
}

function stageStatusLabel(status: StageStatus) {
  if (status === "complete") return "Complete";
  if (status === "running") return "In progress";
  if (status === "attention") return "Needs attention";
  return "Up next";
}

function StageIcon({ status }: { status: StageStatus }) {
  if (status === "complete") return <CheckCircleIcon className="h-5 w-5" />;
  if (status === "running") return <ArrowPathIcon className="h-5 w-5 animate-spin" />;
  if (status === "attention") return <ExclamationTriangleIcon className="h-5 w-5" />;
  return <ClockIcon className="h-5 w-5" />;
}

function deriveStages(run: VibeMarketingRunSummary): StageView[] {
  const total = Math.max(run.stepOrder.length, run.steps.length, 1);
  const activeStep = currentInternalStep(run);
  const activeStage = stageForStep(activeStep ?? run.currentStep, activeStep ? run.steps.indexOf(activeStep) : 0, total);
  const failingStep = run.steps.find((step) => FAILED_STEP_STATUSES.has(step.status)) ?? null;
  const failingStage = failingStep ? stageForStep(failingStep, run.steps.indexOf(failingStep), total) : null;
  const runFailed = FAILED_RUN_STATUSES.has(run.status);
  const runRunning = RUNNING_RUN_STATUSES.has(run.status);
  const runComplete = run.status === "completed";
  const activeStageIndex = STAGE_INDEX.get(activeStage) ?? 0;

  return STAGES.map((stage) => {
    const stageIndex = STAGE_INDEX.get(stage.id) ?? 0;
    const stageSteps = run.steps.filter((step, index) => stageForStep(step, index, total) === stage.id);
    const allStageStepsComplete =
      stageSteps.length > 0 && stageSteps.every((step) => COMPLETE_STEP_STATUSES.has(step.status));
    const attention = failingStage === stage.id || (runFailed && stage.id === activeStage);
    const running = runRunning && stage.id === activeStage && !attention;
    const complete = runComplete || allStageStepsComplete || (runRunning && stageIndex < activeStageIndex && !attention);
    const status: StageStatus = attention ? "attention" : running ? "running" : complete ? "complete" : "up_next";

    return {
      ...stage,
      status,
      detail:
        status === "complete"
          ? stage.completeText
          : status === "running"
            ? stage.activeText
            : status === "attention"
              ? failingStep?.error || run.errors[0] || "Review the technical details before continuing."
              : stage.pendingText,
    };
  });
}

export function articleRunTechnicalProgressLabel(run: VibeMarketingRunSummary) {
  const total = Math.max(run.steps.length, run.stepOrder.length, 1);
  const completed = run.steps.filter((step) => COMPLETE_STEP_STATUSES.has(step.status)).length;
  return `${completed} of ${total} checks complete`;
}

export default function ArticleRunStageProgress({
  run,
  pollingDegraded = false,
}: ArticleRunStageProgressProps) {
  const stages = deriveStages(run);
  const activeStage = stages.find((stage) => stage.status === "attention") ?? stages.find((stage) => stage.status === "running");
  const activeStep = currentInternalStep(run);
  const headline =
    activeStage?.status === "attention"
      ? "This article run needs attention"
      : run.status === "completed"
        ? "Article package ready"
        : activeStage?.label ?? "Generating article";
  const behindScenesStepName = activeStep?.name || formatStepName(activeStep?.key || run.currentStep || "Waiting");
  const behindScenesMessage = activeStep?.message || activeStep?.error || "Waiting for the next update.";

  return (
    <section className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-violet-600">Generating article</p>
          <h2 className="mt-1 text-xl font-black text-gray-950">{headline}</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-gray-600">
            {activeStage?.detail ?? "We are preparing the generated article package."}
          </p>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-violet-700">
          {run.status.replace(/_/g, " ")}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={clsx(
              "rounded-xl border p-4 transition",
              stage.status === "running" && "shadow-sm ring-2 ring-violet-100",
              stageStatusTone(stage.status),
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/80">
                <StageIcon status={stage.status} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-gray-950">{stage.label}</p>
                <p className="mt-0.5 text-xs font-black uppercase tracking-wide">{stageStatusLabel(stage.status)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-5 text-gray-600">{stage.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500">
        <span className="font-black text-gray-700">Behind the scenes:</span> {behindScenesStepName}
        {behindScenesMessage ? ` - ${behindScenesMessage}` : ""}
      </div>

      {pollingDegraded ? (
        <p className="mt-3 text-xs font-bold text-amber-700">Polling is retrying after a temporary connection problem.</p>
      ) : null}
      {run.errors.length > 0 ? (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {run.errors[0]}
        </div>
      ) : null}
    </section>
  );
}

import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { Link } from "react-router";

import {
  articlePreconditionRepairStateForRun,
  isArticleGenerationActivelyRunning,
} from "~/lib/vibe-marketing-run-view";
import type { VibeMarketingRunSummary, VibeMarketingStepState } from "~/types/vibe-marketing";

type StageId =
  | "preparing"
  | "repo_access"
  | "article_system"
  | "startup_context"
  | "research"
  | "planning"
  | "drafting"
  | "assets"
  | "preview"
  | "review";
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
  variant?: "standalone" | "embedded";
  // When set, the "Ready for review" chip becomes a link to the article preview,
  // letting the user jump back to review at any point in the flow.
  reviewHref?: string | null;
}

const ARTICLE_PROGRESS_STAGES: StageDefinition[] = [
  {
    id: "preparing",
    label: "Preparing run",
    activeText: "Setting up the article generation run.",
    completeText: "The article run is ready.",
    pendingText: "The run setup starts first.",
  },
  {
    id: "repo_access",
    label: "Checking repository access",
    activeText: "Confirming the website repository can be reached.",
    completeText: "Repository access is ready.",
    pendingText: "Repository access is checked before writing starts.",
  },
  {
    id: "article_system",
    label: "Understanding articles location",
    activeText: "Finding the right articles/blogs structure and publishing path.",
    completeText: "The articles location is understood.",
    pendingText: "The articles location is checked after repository access.",
  },
  {
    id: "startup_context",
    label: "Loading startup context",
    activeText: "Loading brand, audience, and website context.",
    completeText: "Startup context is loaded.",
    pendingText: "Startup context loads before topic research.",
  },
  {
    id: "research",
    label: "Researching topic",
    activeText: "Collecting sources and shaping the article brief.",
    completeText: "Topic research is ready.",
    pendingText: "Topic research starts after context is loaded.",
  },
  {
    id: "planning",
    label: "Planning article",
    activeText: "Turning research into the article structure.",
    completeText: "The article plan is ready.",
    pendingText: "The article plan comes after research.",
  },
  {
    id: "drafting",
    label: "Writing draft",
    activeText: "Writing and grounding the draft.",
    completeText: "The draft is written.",
    pendingText: "The draft is written after planning.",
  },
  {
    id: "assets",
    label: "Preparing images and assets",
    activeText: "Preparing images and delivery assets.",
    completeText: "Images and assets are prepared.",
    pendingText: "Images and assets are prepared after the draft.",
  },
  {
    id: "preview",
    label: "Verifying preview",
    activeText: "Rendering and checking the article preview.",
    completeText: "The preview has been verified.",
    pendingText: "The preview is verified after assets are ready.",
  },
  {
    id: "review",
    label: "Ready for review",
    activeText: "Finishing the review package.",
    completeText: "The article is ready to review.",
    pendingText: "The article will be ready to review after verification.",
  },
];

const STAGE_INDEX = new Map(ARTICLE_PROGRESS_STAGES.map((stage, index) => [stage.id, index]));
const COMPLETE_STEP_STATUSES = new Set(["completed", "skipped"]);
const FAILED_STEP_STATUSES = new Set(["failed", "blocked", "cancelled", "blocked_verification", "denied"]);
const ACTIVE_STEP_STATUSES = new Set(["running", "retrying", "queued"]);
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
  if (ratio < 0.1) return "preparing";
  if (ratio < 0.2) return "repo_access";
  if (ratio < 0.3) return "article_system";
  if (ratio < 0.4) return "startup_context";
  if (ratio < 0.5) return "research";
  if (ratio < 0.6) return "planning";
  if (ratio < 0.75) return "drafting";
  if (ratio < 0.85) return "assets";
  if (ratio < 0.95) return "preview";
  return "review";
}

export function stageForStep(step: VibeMarketingStepState | string | null | undefined, index = 0, total = 1): StageId {
  const key = normalizedKey(step);

  if (
    key.includes("fetch_org_config") ||
    key.includes("resolve_delivery_mode") ||
    key.includes("initialize")
  ) {
    return "preparing";
  }

  if (
    key.includes("refresh_repo_auth") ||
    key.includes("repo_auth") ||
    key.includes("github_auth") ||
    key.includes("validate_github")
  ) {
    return "repo_access";
  }

  if (
    key.includes("scan_repository") ||
    key.includes("classify_repository") ||
    key.includes("synthesize_repository") ||
    key.includes("repository_contract") ||
    key.includes("article_system") ||
    key.includes("target_contract") ||
    key.includes("prepare_bootstrap_publish_target")
  ) {
    return "article_system";
  }

  if (key === "load_context" || key.includes("load_revision_context")) {
    return "startup_context";
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
    key.includes("title_policy") ||
    key.includes("reconcile_title")
  ) {
    return "planning";
  }

  if (
    key.includes("draft_section") ||
    key.includes("ground_section") ||
    key.includes("assemble_article")
  ) {
    return "drafting";
  }

  if (
    key.includes("generate_content_images") ||
    key.includes("package_content_delivery") ||
    key.includes("package_publish_bundle")
  ) {
    return "assets";
  }

  if (
    key.includes("await_publish_approval") ||
    key.includes("approval") ||
    key.includes("archive_github") ||
    key === "finalize"
  ) {
    return "review";
  }

  if (
    key.includes("render_article") ||
    key.includes("validate_render") ||
    key.includes("prove_publish") ||
    key.includes("verify_") ||
    key.includes("review_visual_style") ||
    key.includes("preview") ||
    key.includes("publish_preview") ||
    key.includes("repair_") ||
    key.includes("browser") ||
    key.includes("style")
  ) {
    return "preview";
  }

  return fallbackStageForIndex(index, total);
}

function currentInternalStep(run: VibeMarketingRunSummary) {
  const currentKey = normalizedKey(run.currentStep);
  return (
    run.steps.find((step) => normalizedKey(step) === currentKey) ??
    run.steps.find((step) => ACTIVE_STEP_STATUSES.has(step.status)) ??
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

export function deriveArticleProgressStages(run: VibeMarketingRunSummary): StageView[] {
  const total = Math.max(run.stepOrder.length, run.steps.length, 1);
  const repair = articlePreconditionRepairStateForRun(run);
  const activeStep = currentInternalStep(run);
  const activeStage = repair.isPrecondition
    ? "article_system"
    : stageForStep(activeStep ?? run.currentStep, activeStep ? run.steps.indexOf(activeStep) : 0, total);
  const failingStep = run.steps.find((step) => FAILED_STEP_STATUSES.has(step.status)) ?? null;
  const failingStage = repair.requiresUserAction
    ? "article_system"
    : repair.autoRecovering
      ? null
      : failingStep
      ? stageForStep(failingStep, run.steps.indexOf(failingStep), total)
      : null;
  const activeArticle = isArticleGenerationActivelyRunning(run);
  const runFailed = FAILED_RUN_STATUSES.has(run.status) && !repair.autoRecovering && !activeArticle;
  const runRunning = RUNNING_RUN_STATUSES.has(run.status) || repair.autoRecovering || activeArticle;
  const runComplete = run.status === "completed";
  const activeStageIndex = STAGE_INDEX.get(activeStage) ?? 0;

  return ARTICLE_PROGRESS_STAGES.map((stage) => {
    const stageIndex = STAGE_INDEX.get(stage.id) ?? 0;
    const stageSteps = run.steps.filter((step, index) => stageForStep(step, index, total) === stage.id);
    const allStageStepsComplete =
      stageSteps.length > 0 && stageSteps.every((step) => COMPLETE_STEP_STATUSES.has(step.status));
    const attention =
      (repair.requiresUserAction && stage.id === "article_system") ||
      failingStage === stage.id ||
      (runFailed && stage.id === activeStage);
    const running = runRunning && stage.id === activeStage && !attention;
    const complete = runComplete || allStageStepsComplete || (runRunning && stageIndex < activeStageIndex && !attention);
    const status: StageStatus = attention ? "attention" : running ? "running" : complete ? "complete" : "up_next";

    return {
      ...stage,
      status,
      detail:
        repair.isPrecondition && stage.id === "article_system" && status === "running"
          ? "Refreshing the repository article setup before topic research starts automatically."
          : repair.requiresUserAction && stage.id === "article_system" && status === "attention"
            ? repair.message
            : status === "complete"
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

export function articleRunVisibleError(run: VibeMarketingRunSummary) {
  const repair = articlePreconditionRepairStateForRun(run);
  if (repair.autoRecovering) return "";
  return run.errors[0] ?? "";
}

export default function ArticleRunStageProgress({ run, variant = "standalone", reviewHref }: ArticleRunStageProgressProps) {
  const stages = deriveArticleProgressStages(run);
  const repair = articlePreconditionRepairStateForRun(run);
  const visibleError = articleRunVisibleError(run);
  const embedded = variant === "embedded";
  const activeStage =
    stages.find((stage) => stage.status === "attention") ??
    stages.find((stage) => stage.status === "running") ??
    stages.find((stage) => stage.status === "up_next") ??
    stages[stages.length - 1];
  const activeStageIndex = Math.max(0, stages.findIndex((stage) => stage.id === activeStage?.id));
  const completedStageCount = stages.filter((stage) => stage.status === "complete").length;
  const headline =
    repair.autoRecovering
      ? "Checking article setup before research"
      : repair.requiresUserAction
        ? "Article setup needs attention"
        : activeStage?.status === "attention"
      ? "This article run needs attention"
      : run.status === "completed"
        ? "Article ready for review"
        : activeStage?.label ?? "Generating article";

  return (
    <section className={clsx(embedded ? "space-y-4" : "rounded-xl border border-violet-100 bg-violet-50/70 p-5 shadow-sm")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-violet-600">Generating article</p>
          <h2 className={clsx("mt-1 font-black text-gray-950", embedded ? "text-lg" : "text-xl")}>{headline}</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-gray-600">
            {activeStage?.detail ?? "We are preparing the generated article package."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wide text-violet-700 shadow-sm">
            Step {Math.min(activeStageIndex + 1, stages.length)} of {stages.length}
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wide text-violet-700 shadow-sm">
            {repair.autoRecovering ? "checking" : run.status.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      <div className={clsx("sm:hidden", !embedded && "mt-5")}>
        <div className="rounded-xl border border-violet-100 bg-white/80 p-3 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wide text-violet-700">
            <span>{activeStage?.label ?? "Generating article"}</span>
            <span>{Math.max(completedStageCount, activeStageIndex)} / {stages.length}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-violet-100" aria-hidden>
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${Math.max(6, (Math.max(completedStageCount, activeStageIndex) / stages.length) * 100)}%` }}
            />
          </div>
          <details className="mt-2">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-black text-violet-700">
              View generation details
            </summary>
            <div className="mt-1 space-y-2 border-t border-violet-100 pt-3">
              {stages.map((stage) => (
                <div key={stage.id} className={clsx("flex items-center gap-3 rounded-lg border px-3 py-2", stageStatusTone(stage.status))}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80">
                    <StageIcon status={stage.status} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black text-gray-950">{stage.label}</span>
                    <span className="block text-xs font-bold uppercase tracking-wide">{stageStatusLabel(stage.status)}</span>
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      <div className={clsx("hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5", !embedded && "mt-5")}>
        {stages.map((stage) => {
          const chipClass = clsx(
            "block rounded-xl border px-3 py-3 transition",
            stage.status === "running" && "shadow-sm ring-2 ring-violet-100",
            stageStatusTone(stage.status),
          );
          const chipInner = (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/80">
                <StageIcon status={stage.status} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-gray-950">{stage.label}</p>
                <p className="mt-0.5 text-xs font-black uppercase tracking-wide">
                  {stage.id === "review" && reviewHref ? "View article" : stageStatusLabel(stage.status)}
                </p>
              </div>
            </div>
          );
          if (stage.id === "review" && reviewHref) {
            return (
              <Link key={stage.id} to={reviewHref} className={clsx(chipClass, "cursor-pointer hover:ring-2 hover:ring-violet-200")}>
                {chipInner}
              </Link>
            );
          }
          return (
            <div key={stage.id} className={chipClass}>
              {chipInner}
            </div>
          );
        })}
      </div>

      {visibleError ? (
        <div className={clsx("rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700", !embedded && "mt-3")}>
          {visibleError}
        </div>
      ) : null}
    </section>
  );
}

import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import type { VibeMarketingRunSummary, VibeMarketingStepState } from "~/types/vibe-marketing";

interface ArticlesSetupProgressCardProps {
  run: VibeMarketingRunSummary;
  actionSlot?: ReactNode;
  technicalUrl?: string;
  className?: string;
}

const COMPLETE_STEP_STATUSES = new Set(["completed", "skipped"]);
const FAILED_STATUSES = new Set(["failed", "blocked", "blocked_verification", "denied", "cancelled"]);
const READY_STATUSES = new Set(["awaiting_confirmation", "awaiting_approval", "approval_required"]);
const RUNNING_STATUSES = new Set(["queued", "pending", "starting", "running"]);

function humanize(value: string) {
  const normalized = value
    .replace(/article_system/g, "articles_setup")
    .replace(/repo/g, "repository")
    .replace(/_/g, " ")
    .trim();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function setupStepLabel(stepKey: string) {
  const labels: Record<string, string> = {
    load_repo_context: "Loading repository context",
    scan_structure: "Checking articles/blogs location",
    fetch_org_config: "Loading setup context",
    synthesize_repository_contract: "Preparing setup instructions",
    draft_article_system_setup: "Drafting articles setup changes",
    build_preview: "Building articles setup preview",
    render_preview: "Rendering articles setup preview",
    package_preview: "Preparing review assets",
    finalize: "Finalizing setup preview",
  };
  return labels[stepKey] ?? humanize(stepKey);
}

function normalizedSteps(run: VibeMarketingRunSummary): VibeMarketingStepState[] {
  if (run.steps.length > 0) return run.steps;
  return run.stepOrder.map((key) => ({
    key,
    name: setupStepLabel(key),
    required: true,
    status: key === run.currentStep ? "running" : "pending",
    attempts: 0,
    artifacts: [],
  }));
}

function activeStepLabel(run: VibeMarketingRunSummary, steps: VibeMarketingStepState[]) {
  const active =
    steps.find((step) => RUNNING_STATUSES.has(step.status)) ??
    steps.find((step) => !COMPLETE_STEP_STATUSES.has(step.status)) ??
    [...steps].reverse().find((step) => COMPLETE_STEP_STATUSES.has(step.status));
  const key = active?.key || run.currentStep || "";
  return key ? setupStepLabel(key) : "Waiting for setup progress";
}

function setupPhase(run: VibeMarketingRunSummary) {
  const isSetupPreviewRun = run.workflow === "article_system_setup";
  const failed = FAILED_STATUSES.has(run.status);
  const stale = Boolean(run.stale || run.staleReason);
  const approved = run.status === "completed" || run.approvalState === "approved";
  const ready = READY_STATUSES.has(run.status);

  if (stale) {
    return {
      title: "Articles setup build did not advance",
      description: "The setup worker stopped moving through the build steps. Retry the setup build or review the technical details.",
      tone: "error" as const,
    };
  }
  if (failed) {
    return {
      title: "Articles setup needs attention",
      description: isSetupPreviewRun
        ? "The articles setup preview could not be prepared. Review the technical details before retrying."
        : "The articles setup preparation could not finish. Review the technical details before retrying.",
      tone: "error" as const,
    };
  }
  if (approved) {
    return {
      title: isSetupPreviewRun ? "Articles setup approved" : "Articles/blogs location ready",
      description: isSetupPreviewRun
        ? "Future articles can now be generated into this repo location."
        : "The repository location is ready for future articles.",
      tone: "success" as const,
    };
  }
  if (ready) {
    return {
      title: isSetupPreviewRun ? "Articles setup preview ready" : "Articles setup ready to build",
      description: isSetupPreviewRun
        ? "Review the Cloudflare preview, leave revision comments if needed, then approve setup PR creation."
        : "The articles/blogs location is ready. The setup preview can be generated next.",
      tone: "ready" as const,
    };
  }
  return {
    title: isSetupPreviewRun ? "Building articles setup preview" : "Preparing articles setup",
    description: isSetupPreviewRun
      ? "Creating the setup branch, building the preview, and preparing the visual review."
      : "Validating the articles/blogs location and preparing setup work for preview.",
    tone: "running" as const,
  };
}

function progressPercent(run: VibeMarketingRunSummary, steps: VibeMarketingStepState[]) {
  const totalSteps = Math.max(steps.length, run.stepOrder.length, 1);
  const completedSteps = steps.filter((step) => COMPLETE_STEP_STATUSES.has(step.status)).length;
  const currentIndex = run.currentStep ? steps.findIndex((step) => step.key === run.currentStep) : -1;
  const completedUnits = Math.max(completedSteps, currentIndex > 0 ? currentIndex : 0);

  if (run.status === "completed" || run.approvalState === "approved" || READY_STATUSES.has(run.status)) return 100;
  if (FAILED_STATUSES.has(run.status)) return Math.max(12, Math.min(100, Math.round((completedUnits / totalSteps) * 100)));
  if (RUNNING_STATUSES.has(run.status)) return Math.max(12, Math.min(95, Math.round((completedUnits / totalSteps) * 100)));
  return Math.max(5, Math.min(100, Math.round((completedUnits / totalSteps) * 100)));
}

export default function ArticlesSetupProgressCard({
  run,
  actionSlot,
  technicalUrl,
  className,
}: ArticlesSetupProgressCardProps) {
  const steps = normalizedSteps(run);
  const phase = setupPhase(run);
  const totalSteps = Math.max(steps.length, run.stepOrder.length, 1);
  const completedSteps = steps.filter((step) => COMPLETE_STEP_STATUSES.has(step.status)).length;
  const percent = progressPercent(run, steps);
  const failed = phase.tone === "error";
  const success = phase.tone === "success";
  const ready = phase.tone === "ready";
  const Icon = failed ? ExclamationTriangleIcon : success ? CheckCircleIcon : ready ? SparklesIcon : ArrowPathIcon;

  return (
    <section
      className={clsx(
        "rounded-xl border p-5 shadow-sm",
        failed
          ? "border-red-200 bg-red-50"
          : success
            ? "border-emerald-200 bg-emerald-50"
            : ready
              ? "border-violet-200 bg-violet-50"
              : "border-violet-100 bg-violet-50/70",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div
            className={clsx(
              "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white",
              failed ? "text-red-600" : success ? "text-emerald-700" : "text-violet-700",
            )}
          >
            <Icon className={clsx("h-6 w-6", phase.tone === "running" && "animate-spin")} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-black text-gray-950">{phase.title}</h2>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-700">
                {run.status.replace(/_/g, " ")}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold leading-6 text-gray-700">{phase.description}</p>
          </div>
        </div>
        {actionSlot ? <div className="flex-shrink-0">{actionSlot}</div> : null}
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-3 flex flex-col gap-2 text-xs font-semibold text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{activeStepLabel(run, steps)}</p>
          <p>
            {completedSteps} of {totalSteps} setup steps complete
          </p>
        </div>
      </div>

      {run.errors.length > 0 ? (
        <details className="mt-4 rounded-xl border border-red-200 bg-white/80 px-4 py-3 text-sm text-red-700">
          <summary className="cursor-pointer font-bold">Setup details</summary>
          <p className="mt-2 break-words font-mono text-xs leading-5 text-red-600">{run.errors[0]}</p>
        </details>
      ) : null}

      {technicalUrl ? (
        <Link to={technicalUrl} className="mt-4 inline-flex text-xs font-black text-violet-700 transition hover:text-violet-900">
          View technical details
        </Link>
      ) : null}
    </section>
  );
}

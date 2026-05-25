import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { Form } from "react-router";

import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

export const CANCEL_SETUP_BUILD_INTENT = "cancel-setup-build";

const CANCELLABLE_SETUP_STATUSES = new Set([
  "queued",
  "pending",
  "starting",
  "processing",
  "running",
  "in_progress",
  "preview_building",
  "preview_verifying",
  "repair_preview_building",
  "blocked",
  "blocked_verification",
  "failed",
  "preview_failed",
  "fallback_ready",
  "awaiting_confirmation",
  "awaiting_approval",
  "approval_required",
]);

const NON_CANCELLABLE_SETUP_STATUSES = new Set([
  "cancelled",
  "canceled",
  "denied",
  "completed",
  "pr_created",
  "setup_pr_created",
]);

function normalized(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function recordValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function compactString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stringResultValue(run: VibeMarketingRunSummary, ...keys: string[]) {
  const result = recordValue(run.result);
  const nestedResult = recordValue(result.result);
  const latestControl = recordValue(result.latest_control_response);

  for (const key of keys) {
    const direct = compactString(result[key]);
    if (direct) return direct;
    const nested = compactString(nestedResult[key]);
    if (nested) return nested;
    const latest = compactString(latestControl[key]);
    if (latest) return latest;
  }
  return "";
}

function articleSystemSetupPayload(run: VibeMarketingRunSummary) {
  const result = recordValue(run.result);
  const direct = recordValue(result.article_system_setup);
  if (Object.keys(direct).length) return direct;

  const nested = recordValue(recordValue(result.result).article_system_setup);
  if (Object.keys(nested).length) return nested;

  return recordValue(recordValue(result.latest_control_response).article_system_setup);
}

function setupPayloadStatusCandidates(run: VibeMarketingRunSummary) {
  const setup = articleSystemSetupPayload(run);
  return [
    setup.status,
    setup.current_step,
    setup.currentStep,
    run.result?.setup_status,
    run.result?.setupStatus,
  ]
    .map(normalized)
    .filter(Boolean);
}

function runStatusCandidates(run: VibeMarketingRunSummary) {
  return [run.result?.status, run.currentStep, run.status].map(normalized).filter(Boolean);
}

function hasNumberValue(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value);
  return Boolean(compactString(value));
}

export function setupRunIdForSetupCancel(run: VibeMarketingRunSummary) {
  const direct = stringResultValue(
    run,
    "setup_run_id",
    "setupRunId",
    "scaffold_job_id",
    "scaffoldJobId",
    "job_id",
    "jobId",
  );
  if (direct) return direct;

  const setup = articleSystemSetupPayload(run);
  const setupRunId = compactString(setup.setup_run_id) || compactString(setup.setupRunId);
  if (setupRunId) return setupRunId;

  return run.workflow === "article_system_setup" ? run.runId : "";
}

export function hasArticleSetupPrEvidence(run: VibeMarketingRunSummary) {
  if (compactString(run.prUrl)) return true;

  const directPrUrl = stringResultValue(
    run,
    "pr_url",
    "prUrl",
    "pull_request_url",
    "pullRequestUrl",
    "setup_pr_url",
    "setupPrUrl",
    "setup_pull_request_url",
    "setupPullRequestUrl",
    "draft_pr_url",
    "draftPrUrl",
  );
  if (directPrUrl) return true;

  const setup = articleSystemSetupPayload(run);
  if (["pr_created", "setup_pr_created"].includes(normalized(setup.status))) return true;

  return [
    setup.pr_url,
    setup.prUrl,
    setup.pull_request_url,
    setup.pullRequestUrl,
    setup.setup_pr_url,
    setup.setupPrUrl,
    setup.setup_pull_request_url,
    setup.setupPullRequestUrl,
    setup.pr_number,
    setup.prNumber,
    setup.setup_pr_number,
    setup.setupPrNumber,
    run.result?.pr_number,
    run.result?.prNumber,
    run.result?.setup_pr_number,
    run.result?.setupPrNumber,
  ].some(hasNumberValue);
}

export function canCancelSetupBuild(run: VibeMarketingRunSummary) {
  if (!setupRunIdForSetupCancel(run)) return false;
  if (hasArticleSetupPrEvidence(run)) return false;

  const setupStatuses = setupPayloadStatusCandidates(run);
  if (setupStatuses.some((status) => NON_CANCELLABLE_SETUP_STATUSES.has(status))) return false;
  if (setupStatuses.some((status) => CANCELLABLE_SETUP_STATUSES.has(status))) return true;

  if (run.workflow !== "article_system_setup") return false;
  const runStatuses = runStatusCandidates(run);
  if (runStatuses.some((status) => NON_CANCELLABLE_SETUP_STATUSES.has(status))) return false;
  return runStatuses.some((status) => CANCELLABLE_SETUP_STATUSES.has(status));
}

export default function CancelSetupBuildButton({
  run,
  pending = false,
  disabled = false,
  className,
}: {
  run: VibeMarketingRunSummary;
  pending?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const setupRunId = setupRunIdForSetupCancel(run);
  if (!setupRunId || !canCancelSetupBuild(run)) return null;

  return (
    <Form method="POST">
      <input type="hidden" name="setupRunId" value={setupRunId} />
      <button
        type="submit"
        name="intent"
        value={CANCEL_SETUP_BUILD_INTENT}
        disabled={disabled || pending}
        className={clsx(
          "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50 sm:w-auto",
          className,
        )}
      >
        {pending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
        {pending ? "Cancelling..." : "Cancel setup build"}
      </button>
    </Form>
  );
}

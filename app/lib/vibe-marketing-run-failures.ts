import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

type FailureRecord = Record<string, unknown>;

const FAILURE_NESTED_KEYS = [
  "result",
  "latest_control_response",
  "latestControlResponse",
  "article_system_setup",
  "articleSystemSetup",
  "article_system_readiness",
  "articleSystemReadiness",
  "model_adapter_report",
  "modelAdapterReport",
  "diagnostics",
  "content_factory_response",
  "contentFactoryResponse",
  "livePreview",
  "live_preview",
  "proof",
  "nativePreviewFailure",
  "native_preview_failure",
];

function asRecord(value: unknown): FailureRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as FailureRecord) : {};
}

function cleanString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

const MAX_VISIBLE_ERROR_LENGTH = 210;

/** Keep verbose worker diagnostics out of the default run view. The original
 * message is still available in the expandable technical details. */
export function summarizeRunError(value: unknown): string {
  const message = cleanString(value).replace(/\s+/g, " ");
  if (message.length <= MAX_VISIBLE_ERROR_LENGTH) return message;

  if (/candidate_fit|canonical.{0,32}reader[ -]?task comparison/i.test(message)) {
    if (/(?:no|missing|lack|without|cannot verify).{0,80}primary[ -]?source.{0,50}(?:citation|reference|link)?/i.test(message)) {
      return "Draft review could not verify current primary-source citations. Review the source findings before resuming.";
    }
    return "The draft did not pass its reader-task comparison. Review the findings before resuming.";
  }

  const sentence = message.slice(0, MAX_VISIBLE_ERROR_LENGTH + 1).match(/^.{1,210}?[.!?](?=\s|$)/)?.[0];
  if (sentence) return sentence;
  const cutoff = message.lastIndexOf(" ", MAX_VISIBLE_ERROR_LENGTH - 1);
  return `${message.slice(0, cutoff > 120 ? cutoff : MAX_VISIBLE_ERROR_LENGTH - 1).trimEnd()}…`;
}

function collectFailureRecords(value: unknown, seen = new Set<unknown>(), depth = 0): FailureRecord[] {
  const record = asRecord(value);
  if (!Object.keys(record).length || seen.has(record) || depth > 4) return [];
  seen.add(record);
  const records = [record];
  for (const key of FAILURE_NESTED_KEYS) {
    records.push(...collectFailureRecords(record[key], seen, depth + 1));
  }
  return records;
}

function firstRecordString(records: FailureRecord[], keys: string[]): string {
  for (const record of records) {
    for (const key of keys) {
      const value = cleanString(record[key]);
      if (value) return value;
    }
  }
  return "";
}

export function blockingReasonFromPayload(value: unknown): string {
  return firstRecordString(collectFailureRecords(value), [
    "blockingReason",
    "blocking_reason",
    "modelAdapterBlockingReason",
    "model_adapter_blocking_reason",
    "manualReason",
    "manual_reason",
  ]);
}

export function blockingCodeFromPayload(value: unknown): string {
  return firstRecordString(collectFailureRecords(value), [
    "blockingCode",
    "blocking_code",
    "modelAdapterBlockingCode",
    "model_adapter_blocking_code",
    "errorCode",
    "error_code",
  ]);
}

function firstRunError(run: VibeMarketingRunSummary): string {
  return cleanString(run.errors?.find((error) => cleanString(error))) || cleanString(run.livePreview?.error);
}

function nextStepForFailure(code: string, reason: string, run: VibeMarketingRunSummary): string {
  const actions: Record<string, string> = {
    automatic_retry: "Recovery is scheduled. Completed work is saved; no manual retry is needed.",
    restore_revision_dependencies: "Restore the revision's source research and article plan, then resume.",
    restore_complete_production_corpus: "Restore complete published article coverage, then resume the saved draft.",
    repair_corpus_adapter: "Configure a supported article directory and readable article bodies for this website.",
    correct_cta_destination_or_target: "Correct the call-to-action destination or its missing section target, then resume.",
    recapture_source: "Refresh the damaged source capture, then recheck the saved article.",
    inspect_usage_and_explicitly_raise_limit: "Review this run's model usage and budget before authorizing more work.",
    restore_verified_artifact: "Restore a verified artifact or regenerate the affected step.",
    retry_review_with_unchanged_article: "Correct the review response and recheck the saved article.",
    revise_prose_or_evidence: "Review the unsupported claims and revise the prose or provide supporting evidence.",
    revise_reader_task_or_contribution: "Revise the article's contribution using the recorded comparison findings.",
  };
  const action = run.nextAction || run.failure?.next_action || "";
  if (actions[action]) return actions[action];
  if (run.failure?.requires_user_action) return "Review the recorded failure and resolve its dependency before resuming.";
  const normalizedCode = code.toUpperCase();
  const reasonText = reason.toLowerCase();
  if (run.stale || run.staleReason === "scan_queue_not_started") {
    return "Retry the scan, or cancel it and start again.";
  }
  if (
    normalizedCode.includes("CONFIG_SERVICE_UNAVAILABLE") ||
    normalizedCode.includes("UPSTREAM_PROTOCOL_ERROR")
  ) {
    return "Retry or resume this run shortly. Your saved competitors and seed keywords have not changed.";
  }
  if (normalizedCode.includes("MISSING_CONFIG")) {
    return "Open company setup and add at least one competitor or seed keyword, then retry topic research.";
  }
  if (
    normalizedCode.includes("UNSUPPORTED_RUNTIME") ||
    reasonText.includes("build script") ||
    reasonText.includes("build or preview command")
  ) {
    return "Add or expose a package build script, then re-scan. If you already know the public articles/blogs route, paste it manually in the setup flow.";
  }
  if (normalizedCode.includes("ROUTE") || normalizedCode.includes("SURFACE") || normalizedCode.includes("HINT")) {
    return "Paste the public articles/blogs route manually in the setup flow, or add a conventional route and re-scan.";
  }
  if (!["repo_scan", "content_factory_scan"].includes(run.workflow)) {
    return "Review the failed step, then retry or resume this run when ready.";
  }
  return "Review the failed step, then re-scan. If you already know the public articles/blogs route, paste it manually in the setup flow.";
}

export function runFailureGuidance(run: VibeMarketingRunSummary) {
  const code = cleanString(run.failure?.code) || cleanString(run.blockingCode) || blockingCodeFromPayload(run) || cleanString(run.errorCode);
  const reason = cleanString(run.failure?.message) || cleanString(run.blockingReason) || blockingReasonFromPayload(run) || firstRunError(run);
  const isScanRun = ["repo_scan", "content_factory_scan"].includes(run.workflow);
  const title = isScanRun ? "Repository scan needs attention" : "Run needs attention";
  const fallbackReason = isScanRun
    ? "Repository scan failed before Content Factory could prove the articles/blogs setup path."
    : "This run failed before it could complete.";
  return {
    code,
    reason: reason || fallbackReason,
    nextStep: nextStepForFailure(code, reason, run),
    summary: `${title}: ${reason || fallbackReason}`,
    specific: Boolean(code || reason),
  };
}

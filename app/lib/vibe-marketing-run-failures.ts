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
  const normalizedCode = code.toUpperCase();
  const reasonText = reason.toLowerCase();
  if (run.stale || run.staleReason === "scan_queue_not_started") {
    return "Retry the scan, or cancel it and start again.";
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
  return "Review the failed step, then re-scan. If you already know the public articles/blogs route, paste it manually in the setup flow.";
}

export function runFailureGuidance(run: VibeMarketingRunSummary) {
  const code = cleanString(run.blockingCode) || blockingCodeFromPayload(run) || cleanString(run.errorCode);
  const reason = cleanString(run.blockingReason) || blockingReasonFromPayload(run) || firstRunError(run);
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

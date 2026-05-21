export const AUTOFILL_SLOW_AFTER_MS = 3 * 60 * 1000;
export const AUTOFILL_UNAVAILABLE_AFTER_MS = 10 * 60 * 1000;

const AUTOFILL_FAILED_STATUSES = new Set([
  "blocked",
  "blocked_verification",
  "cancelled",
  "canceled",
  "denied",
  "error",
  "failed",
  "precondition_failed",
]);

function normalizeStatus(status?: string | null) {
  return String(status ?? "").trim().toLowerCase();
}

export function isAutofillStartFailureStatus(status?: string | null) {
  return AUTOFILL_FAILED_STATUSES.has(normalizeStatus(status));
}

export function hasAcceptedAutofillRun(runId?: string | null, status?: string | null) {
  return Boolean(String(runId ?? "").trim()) && !isAutofillStartFailureStatus(status);
}

export function autofillStartErrorsForDisplay({
  runId,
  status,
  error,
  errors,
}: {
  runId?: string | null;
  status?: string | null;
  error?: string | null;
  errors?: string[] | null;
}) {
  if (hasAcceptedAutofillRun(runId, status)) return [];
  const messages = [...(error ? [error] : []), ...(errors ?? [])]
    .map((message) => String(message ?? "").trim())
    .filter(Boolean);
  return Array.from(new Set(messages));
}

export function autofillProgressState({
  polling,
  statusAgeMs,
  progressAgeMs,
}: {
  polling: boolean;
  statusAgeMs: number;
  progressAgeMs: number;
}) {
  return {
    stalled: Boolean(polling && progressAgeMs > AUTOFILL_SLOW_AFTER_MS),
    unavailable: Boolean(polling && statusAgeMs > AUTOFILL_UNAVAILABLE_AFTER_MS),
  };
}

export function isAutofillStatusPollFailure(run?: { diagnostics?: Record<string, unknown> | null } | null) {
  return Boolean(run?.diagnostics?.statusLoaderError);
}

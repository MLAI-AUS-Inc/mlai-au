/** Local recovery is isolated by signed-in founder, company and reporting period. */
export function updateWorkingCopyKey(
  userId: string,
  companyId: string,
  period: string,
) {
  return `mlai:update-working-copy:v1:${encodeURIComponent(userId)}:${encodeURIComponent(companyId)}:${encodeURIComponent(period)}`;
}
export function readUpdateWorkingCopy(key: string): Record<string, any> | null {
  try {
    const entry = JSON.parse(window.localStorage.getItem(key) || "null");
    return entry?.version === 1 &&
      entry.value &&
      typeof entry.value === "object"
      ? entry.value
      : null;
  } catch {
    return null;
  }
}
export function writeUpdateWorkingCopy(
  key: string,
  value: Record<string, any>,
) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ version: 1, value }));
    return true;
  } catch {
    return false;
  }
}

/** Keep unsaved browser edits, but let a newer server revision replace a clean copy. */
export function recoverUpdateWorkingCopy(
  local: Record<string, any> | null,
  server: { revisionId?: number | null } | null,
): Record<string, any> | null {
  if (!local || !server?.revisionId) return local;
  if (Number(local.expectedRevision) === server.revisionId) return local;

  const currentContent = JSON.stringify({
    updateDate: local.updateDate,
    narrativeStart: local.narrativeStart,
    narrativeEnd: local.narrativeEnd,
    summary: local.summary,
    highlights: local.highlights,
    challenges: local.challenges,
    learnings: local.learnings,
    next30Days: local.next30Days,
    asks: local.asks,
    coverImage: local.coverImage,
    audienceVisibility: local.audienceVisibility,
    metrics: local.metrics,
    chartSelections: local.chartSelections,
  });
  return local.lastSavedContent === currentContent ? null : local;
}
export const IMPORTED_FINANCIAL_KEYS = new Set([
  "revenue",
  "monthlyCosts",
  "netProfitLoss",
  "operatingExpenses",
  "costOfSales",
  "mrr",
  "arr",
  "burnRate",
  "runway",
  "invoiceRevenue",
  "cashCollected",
  "cashBalance",
  "grossProfit",
  "grossMargin",
]);
export function isFinancialMetric(
  key: string,
  evidence?: { source_provider?: string },
) {
  return (
    IMPORTED_FINANCIAL_KEYS.has(key) ||
    ["xero", "stripe", "financial", "bank_feed"].includes(
      evidence?.source_provider?.toLowerCase() || "",
    )
  );
}

export function isImportedMetric(key: string, evidence?: { source_provider?: string }) {
  return isFinancialMetric(key, evidence) || ["google_analytics", "luma"].includes(evidence?.source_provider || "");
}

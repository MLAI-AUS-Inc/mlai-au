import type { VibeRaisingInputSourceKey, VibeRaisingInputSourceSummary } from "~/types/vibe-raising";

export const UPDATE_CONNECTORS = [
  { key: "stripe", label: "Stripe", description: "Revenue and subscriptions", capabilities: ["metrics"] },
  { key: "xero", label: "Xero", description: "Income, costs and invoices", capabilities: ["metrics"] },
  { key: "google_analytics", label: "Google Analytics", description: "Website traffic and growth", capabilities: ["metrics"] },
  { key: "google_drive", label: "Google Drive", description: "Documents and shared work", capabilities: ["docs", "context"] },
  { key: "gmail", label: "Gmail", description: "Conversations and milestones", capabilities: ["context"] },
  { key: "slack", label: "Slack", description: "Team conversations and wins", capabilities: ["context"] },
  { key: "linear", label: "Linear", description: "Projects and shipped work", capabilities: ["context"] },
  { key: "notion", label: "Notion", description: "Notes, plans and documents", capabilities: ["docs", "context"] },
  { key: "luma", label: "Luma", description: "Events and your community", capabilities: ["metrics"] },
  { key: "bank_feed", label: "Bank Feed", description: "Bank transactions and cash", capabilities: ["cash_validation"] },
] satisfies Array<{ key: VibeRaisingInputSourceKey; label: string; description: string; capabilities: VibeRaisingInputSourceSummary["capabilities"] }>;

export function isConnectedConnector(source: VibeRaisingInputSourceSummary) {
  return source.status === "connected" || source.status === "syncing";
}

export function completeConnectorCatalogue(sources: VibeRaisingInputSourceSummary[]) {
  const byKey = new Map(sources.map(source => [source.key, source]));
  return UPDATE_CONNECTORS.map(({ description, ...definition }): VibeRaisingInputSourceSummary =>
    byKey.get(definition.key) || { ...definition, selected: false, status: "not_connected" });
}

// An explicit empty selection is different from visiting without a preference.
export function readConnectorSelection(search: string): VibeRaisingInputSourceKey[] | null {
  const params = new URLSearchParams(search);
  if (!params.has("inputs")) return null;
  const supported = new Set<string>(UPDATE_CONNECTORS.map(source => source.key));
  return [...new Set((params.get("inputs") || "").split(","))]
    .filter((key): key is VibeRaisingInputSourceKey => supported.has(key));
}

export function resolveConnectorSelection(sources: VibeRaisingInputSourceSummary[], preference: VibeRaisingInputSourceKey[] | null) {
  return sources.filter(source => isConnectedConnector(source) &&
    (preference === null ? source.selected : preference.includes(source.key))).map(source => source.key);
}

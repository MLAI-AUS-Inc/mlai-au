export type CustomerSuggestion = {
  id: string; name: string; description: string; reader_task: string;
  pain_points: string[]; desired_outcomes: string[]; constraints: string[]; exclusions: string[];
  knowledge_level: "beginner" | "intermediate" | "specialist" | "unspecified";
  rationale: string; source_urls: string[]; inferred_fields: string[];
  action?: { title: string; body: string; button_text: string; button_href: string; action_type: string; action_description: string } | null;
};
export type CustomerSuggestions = { schemaVersion: 1; sourceCatalogVersion?: number | null; domain: string; researchRunId: string; generatedAt: string; profiles: CustomerSuggestion[] };
export function parseCustomerSuggestions(raw: unknown, expectedDomain?: string): CustomerSuggestions | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const domain = String(value.domain || "").replace(/^www\./, "").toLowerCase();
  const expected = expectedDomain?.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "").toLowerCase();
  if (value.schemaVersion !== 1 || !domain || (expected && domain !== expected) || !Array.isArray(value.profiles)) return null;
  const text = (v: unknown) => typeof v === "string" ? v.slice(0, 3000) : "";
  const list = (v: unknown) => Array.isArray(v) ? v.filter((s): s is string => typeof s === "string").slice(0, 12).map(s => s.slice(0, 3000)) : [];
  const profiles: CustomerSuggestion[] = [];
  for (const item of value.profiles.slice(0, 6)) {
    if (!item || typeof item !== "object") continue;
    const p = item as Record<string, unknown>;
    const urls = list(p.source_urls).filter(url => { try { const u = new URL(url); return ["https:", "http:"].includes(u.protocol) && !u.username && !u.password; } catch { return false; } });
    if (!text(p.id) || !text(p.name) || !text(p.description) || !text(p.reader_task) || !urls.length) continue;
    const action = p.action && typeof p.action === "object" ? p.action as Record<string, unknown> : null;
    profiles.push({id: text(p.id), name: text(p.name), description: text(p.description), reader_task: text(p.reader_task), rationale: text(p.rationale), source_urls: urls, inferred_fields: list(p.inferred_fields), constraints: list(p.constraints), exclusions: list(p.exclusions), pain_points: list(p.pain_points), desired_outcomes: list(p.desired_outcomes), knowledge_level: ["beginner","intermediate","specialist"].includes(String(p.knowledge_level)) ? p.knowledge_level as CustomerSuggestion["knowledge_level"] : "unspecified", action: action ? {title: text(action.title), body: text(action.body), button_text: text(action.button_text), button_href: text(action.button_href), action_type: text(action.action_type), action_description: text(action.action_description)} : null});
  }
  return {schemaVersion: 1, sourceCatalogVersion: Number.isSafeInteger(value.sourceCatalogVersion) ? Number(value.sourceCatalogVersion) : null, domain, researchRunId: text(value.researchRunId), generatedAt: text(value.generatedAt), profiles};
}

/** Read only the introduction saved on this update, including older wire aliases. */
export function normalizeStartupOverview(payload: Record<string, unknown>): string | undefined {
  const memo = payload.structuredMemo ?? payload.structured_memo;
  const sources = [payload, memo && typeof memo === "object" && !Array.isArray(memo) ? memo as Record<string, unknown> : {}];
  for (const source of sources) {
    for (const key of ["startupOverview", "startup_overview"]) {
      if (typeof source[key] === "string") return source[key].trim();
    }
  }
  return undefined;
}

/** Seed a new draft only; never insert today's profile into a historical update. */
export function initialStartupOverview(saved: string | null | undefined, shortDescription: string | null | undefined, isNewDraft: boolean): string {
  return typeof saved === "string" ? saved : isNewDraft ? String(shortDescription || "").trim() : "";
}

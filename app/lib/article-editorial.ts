import type { ArticleEditorialBrief, EditorialAudience, EditorialOffer } from "./editorial-catalog";
export type ArticleEditorialSnapshot = {schema_version: number; writing_run_id: string; recorded_at: string; provenance_status: string; brief: ArticleEditorialBrief; admission: {audience: EditorialAudience; offer: EditorialOffer | null} | null};
export function parseArticleEditorialSnapshot(value: unknown): ArticleEditorialSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const v = value as ArticleEditorialSnapshot;
  if (v.schema_version !== 1 || typeof v.writing_run_id !== "string" || !v.brief || typeof v.brief.audience_id !== "string") return null;
  const b = v.brief;
  if (!Number.isInteger(b.audience_version) || !["offer", "none"].includes(b.conversion_intent) || typeof b.reader_task !== "string" || typeof b.distinct_contribution !== "string" || !/^[A-Z]{2}$/.test(b.country)) return null;
  if (v.admission !== null && (!v.admission || typeof v.admission !== "object" || !v.admission.audience || typeof v.admission.audience !== "object")) return null;
  if (v.admission?.offer != null && (typeof v.admission.offer !== "object" || typeof v.admission.offer.button_href !== "string")) return null;
  return v;
}

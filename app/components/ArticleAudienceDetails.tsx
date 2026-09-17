import type { ArticleEditorialSnapshot } from "~/lib/article-editorial";
export default function ArticleAudienceDetails({ snapshot }: {snapshot?: ArticleEditorialSnapshot | null}) {
  if (!snapshot) return <p className="mt-1 text-xs text-slate-500">Customer profile not recorded</p>;
  const { brief, admission } = snapshot;
  const audience = admission?.audience;
  const offer = admission?.offer;
  return <details className="mt-2 text-xs text-slate-600"><summary className="cursor-pointer">Written for {audience?.name || brief.audience_id} · {brief.conversion_intent === "none" ? "No offer" : offer?.action_description || offer?.button_text || brief.offer_id}</summary><div className="mt-2 space-y-1"><p>{audience?.description}</p><p><strong>Reader task:</strong> {brief.reader_task}</p><p><strong>Useful contribution:</strong> {brief.distinct_contribution}</p><p>Profile v{brief.audience_version}{brief.offer_version ? ` · Action v${brief.offer_version}` : ""} · {brief.country}</p>{offer ? <p><strong>Destination:</strong> {offer.button_href}</p> : <p>{brief.no_offer_reason}</p>}<p>Saved writing decision; a pending revision may differ from the live article.</p>{snapshot.provenance_status === "partial" ? <p>Historical brief only; the original profile details were not recorded.</p> : null}</div></details>;
}

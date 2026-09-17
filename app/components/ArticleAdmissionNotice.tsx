import { editorialCatalogHref } from "~/components/EditorialBriefFields";

export const admissionRecovery = {
  editorial_brief_required: "Review the original article brief and its intended reader. Do not silently add a replacement ICP or offer to this run.",
  editorial_catalog_selection_not_current: "Review the selected audience and offer in the current catalogue. A changed or retired selection needs an explicit reviewed revision, not a blind restart.",
  editorial_catalog_policy_changed: "Review the selected audience and offer in the current catalogue. A changed or retired selection needs an explicit reviewed revision, not a blind restart.",
  editorial_catalog_unavailable: "Restore access to the exact organisation’s catalogue, then check this same run against its original brief before considering resume.",
  editorial_catalog_contract_unavailable: "Check the backend and worker catalogue versions with your administrator. Missing policy fields are not permission to generate.",
  editorial_catalog_identity_mismatch: "Ask your administrator to check the organisation and repository returned by the catalogue. Do not select another company as a workaround.",
  editorial_catalog_identity_missing: "Ask your administrator to repair the original organisation identity before continuing. Keep the existing run and brief.",
  editorial_admission_missing: "Ask your administrator to inspect the original admission record. Do not manufacture approval or replace the saved reader decision.",
  editorial_admission_conflict: "Ask your administrator to inspect the conflicting admission records. Keep the original run and its reader decision unchanged.",
  saved_editorial_policy_invalid: "Ask your administrator to inspect the saved editorial policy. Do not replace history with today’s catalogue as an automatic repair.",
  article_task_identity_invalid: "Check the original run and research-source identifiers with your administrator before continuing.",
  article_task_source_conflict: "Review the original research source: it may be missing, withdrawn or belong to another organisation or repository. Do not substitute another source silently.",
  article_task_history_conflict: "Ask your administrator to inspect the original saved request and status. Keep existing artifacts and payment history while resolving the conflict.",
  article_task_request_conflict: "The attempted start differed from the existing article. Inspect its original brief and inputs; use an explicit reviewed revision for a different article.",
  article_task_request_invalid: "Review the rejected article-start inputs with your administrator. Keep the original brief and run; correcting an input must not silently replace the chosen reader or offer.",
  article_task_dispatch_uncertain: "The queue did not confirm the outcome. Refresh this existing run first; ask your administrator to reconcile its queue task and current policy before any explicit resume. Do not start a duplicate or assume a refund is due.",
  article_task_state_changed: "The article advanced or stopped while an older start attempt was running. Refresh its current status; do not replay the old start automatically.",
  article_task_policy_unrecognized: "Ask your administrator to inspect this policy block and the worker/backend contract before any retry. Keep the existing run and payment history.",
} as const;

export default function ArticleAdmissionNotice({ value, companyId, onRefresh, refreshing = false }: {
  value: unknown; companyId: string; onRefresh: () => void; refreshing?: boolean;
}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const notice = value as Record<string, unknown>;
  const code = notice.error_code;
  if (notice.schema_version !== "2026-09-11.1" || typeof code !== "string" ||
      !Object.hasOwn(admissionRecovery, code) || typeof notice.observed_at !== "string" ||
      !Number.isFinite(Date.parse(notice.observed_at))) return null;
  return <section aria-label="Article-start attempt notice" className="min-w-0 space-y-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-slate-950">
    <h2 className="font-bold">Article-start attempt notice</h2>
    <p>This records an earlier start attempt, not the current run outcome. The notice itself does not fail the article, approve a retry or refund points.</p>
    <p>{admissionRecovery[code as keyof typeof admissionRecovery]}</p>
    <p className="break-words text-xs text-slate-700">{code} · Recorded <time dateTime={notice.observed_at}>{new Date(notice.observed_at).toISOString()}</time></p>
    <div className="flex flex-wrap gap-4">
      <button type="button" onClick={onRefresh} disabled={refreshing} className="font-bold underline disabled:opacity-50">{refreshing ? "Refreshing status…" : "Refresh current run status"}</button>
      {companyId ? <a className="font-bold underline" href={editorialCatalogHref(companyId)} target="_blank" rel="noopener">Review audience and offer settings (new tab)</a> : null}
    </div>
  </section>;
}

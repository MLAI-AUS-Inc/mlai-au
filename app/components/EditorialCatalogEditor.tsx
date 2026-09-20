import type { CustomerSuggestions, CustomerSuggestion } from "~/lib/customer-profile-suggestions";
import { useEffect, useState } from "react";
import { Link, useBeforeUnload, useFetcher, useRevalidator } from "react-router";
import { actionTypes, knowledgeLevels, audienceLabel, dependentApprovedOffers, type EditorialAudience, type EditorialCatalog, type EditorialCatalogState, type EditorialOffer } from "~/lib/editorial-catalog";
import { editorialCatalogHref } from "./EditorialBriefFields";

export type CatalogActionResult = { ok: true; catalog: EditorialCatalog; message: string } | { ok: false; error: string };
const input = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 focus:outline-2 focus:outline-violet-600";
const button = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 disabled:opacity-50";
function TextField({ name, label, value = "", required = false, multiline = false, readOnly = false }: { name: string; label: string; value?: string; required?: boolean; multiline?: boolean; readOnly?: boolean }) {
  return <label className="block text-sm font-bold text-slate-800">{label}{multiline
    ? <textarea name={name} defaultValue={value} required={required} rows={3} className={input} />
    : <input name={name} defaultValue={value} required={required} readOnly={readOnly} className={input} />}</label>;
}

export default function EditorialCatalogEditor({ state, companyId, companyName, suggestions, onDirtyChange }: { state: EditorialCatalogState; companyId: string; companyName: string; suggestions?: CustomerSuggestions | null; onDirtyChange?: (dirty: boolean) => void }) {
  const [lastKnown, setLastKnown] = useState({ companyId, catalog: state.catalog });
  useEffect(() => { if (state.catalog) setLastKnown({ companyId, catalog: state.catalog }); }, [companyId, state.catalog]);
  const current = state.catalog ?? (lastKnown.companyId === companyId ? lastKnown.catalog : null);
  if (!current) return <main className="mx-auto max-w-4xl space-y-4 p-6"><h1 className="text-2xl font-black">Customer profiles and desired actions — {companyName}</h1><p role="alert">{state.error}</p><p>No catalogue has been assumed or created. Reload after the owner API is available.</p><a href={editorialCatalogHref(companyId)} className="font-bold underline">Reload catalogue</a></main>;
  return <Catalogue key={companyId} latest={current} loadError={state.error} companyId={companyId} companyName={companyName} suggestions={suggestions} onDirtyChange={onDirtyChange} />;
}

function Catalogue({ latest, loadError, companyId, companyName, suggestions, onDirtyChange }: { latest: EditorialCatalog; loadError: string | null; companyId: string; companyName: string; suggestions?: CustomerSuggestions | null; onDirtyChange?: (dirty: boolean) => void }) {
  const fetcher = useFetcher<CatalogActionResult>();
  const revalidator = useRevalidator();
  const [catalog, setCatalog] = useState(latest);
  const [selection, setSelection] = useState<{ kind: "audience" | "offer"; id: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { onDirtyChange?.(dirty); }, [dirty, onDirtyChange]);
  const [suggested, setSuggested] = useState<CustomerSuggestion | null>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [formRevision, setFormRevision] = useState(0);
  const busy = fetcher.state !== "idle";
  useBeforeUnload(event => { if (dirty) { event.preventDefault(); event.returnValue = ""; } });
  useEffect(() => {
    if (fetcher.data?.ok) { setCatalog(fetcher.data.catalog); setSelection(null); setDirty(false); setFormRevision(value => value + 1); }
  }, [fetcher.data]);
  const stale = latest.editorial_catalog_version !== catalog.editorial_catalog_version;
  const blocked = stale || Boolean(loadError);
  const savedAudience = selection?.kind === "audience" ? catalog.audience_options.find(a => a.id === selection.id) : undefined;
  const audience = (selection?.kind === "audience" && suggested ? {...suggested, status: "draft", version: 1, approved_by: null, approved_at: null, allow_no_offer: savedAudience?.allow_no_offer ?? false, id: selection.id, constraints: suggested.constraints ?? [], exclusions: suggested.exclusions ?? []} as EditorialAudience : savedAudience);
  const savedOffer = selection?.kind === "offer" ? catalog.cta_options.find(o => o.id === selection.id) : undefined;
  const offer = savedOffer ?? (selection?.kind === "offer" && suggested?.action ? {...suggested.action, status: "draft", version: 1, approved_by: null, approved_at: null, audience: "general", use_when: "", cta_component: "ArticleCompanyCTA", image_url: null, secondary_button_text: null, secondary_button_href: null, audience_ids: [catalog.audience_options.find(a => a.id === "icp-" + suggested.id || a.name?.toLowerCase() === suggested.name.toLowerCase())?.id || "icp-" + suggested.id], countries: [], id: selection.id} as EditorialOffer : undefined);
  const entry = savedAudience ?? savedOffer;
  const dependencies = audience ? dependentApprovedOffers(catalog, audience.id) : [];
  function choose(next: typeof selection, suggestion: CustomerSuggestion | null = null) {
    if (dirty && !window.confirm("Discard the unsaved entry changes?")) return;
    setSelection(next); setSuggested(suggestion); setDirty(false); setFormRevision(v => v + 1);
  }
  function hidden() { return <><input type="hidden" name="companyId" value={companyId} /><input type="hidden" name="expectedEditorialCatalogVersion" value={catalog.editorial_catalog_version} /></>; }
  return <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
    <Link to="/founder-tools/marketing" className="text-sm font-bold text-violet-800 underline" onClick={event => { if (dirty && !window.confirm("Discard the unsaved entry changes?")) event.preventDefault(); }}>Back to article creation</Link>
    <header className="space-y-3"><h1 className="text-3xl font-black text-slate-950">Customer profiles and desired actions</h1><p className="text-slate-700">Company: <strong>{companyName}</strong></p><p className="max-w-3xl text-sm leading-6 text-slate-700">Define who an article helps, what they need to accomplish and which offer is genuinely available. Save as draft first; review exact versions below before approving. Approval confirms your business definitions and promises, not the quality of a future article.</p></header>
    <button type="button" className={button} disabled={busy || revalidator.state !== "idle"} onClick={() => revalidator.revalidate()}>Check for catalogue changes</button>
    {loadError ? <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm">{loadError} Your unsaved input is retained. Writes are paused until the current catalogue can be loaded.</p> : null}
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">Save your customer profiles and actions as drafts, then review and approve them below. Articles can use approved profiles and actions for the countries you confirm.</div>
    {fetcher.data ? <p role={fetcher.data.ok ? "status" : "alert"} className={`rounded-lg border p-3 text-sm ${fetcher.data.ok ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-rose-200 bg-rose-50 text-rose-950"}`}>{fetcher.data.ok ? fetcher.data.message : fetcher.data.error}</p> : null}
    {stale ? <div role="alert" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm"><p>The server catalogue changed. Your input has not been overwritten. Load the current revision and review before trying again.</p><button type="button" className={`${button} mt-2`} disabled={busy} onClick={() => { if (dirty && !window.confirm("Load the current catalogue and discard unsaved changes?")) return; setCatalog(latest); setSelection(null); setDirty(false); setFormRevision(v => v + 1); }}>Load current catalogue</button></div> : null}
    {suggestions?.profiles.length ? <section aria-label="Suggested customer profiles" className="space-y-3"><h2 className="text-xl font-black">Suggestions from your website</h2><p className="text-sm">{suggestions.sourceCatalogVersion != null && suggestions.sourceCatalogVersion !== catalog.editorial_catalog_version ? "Your saved profiles have changed since this research. Review proposed updates carefully. " : ""}Review these inferred profiles. Saving a draft does not confirm it for use. Confirm supported markets and destinations yourself.</p>{suggestions.profiles.filter(p => !dismissed.includes(p.id)).map(p => <article key={p.id} className="rounded-xl border p-4 space-y-2"><h3 className="font-bold">{p.name}</h3><p>{p.description}</p><p className="text-sm">{p.rationale}</p><p className="text-sm">Inferred: {p.inferred_fields.join(", ") || "Review all details"}</p><ul>{p.source_urls.map(url => <li key={url}><a className="text-sm underline break-all" href={url} target="_blank" rel="noreferrer">{url}</a></li>)}</ul><div className="flex flex-wrap gap-2"><button type="button" className={button} disabled={busy} onClick={() => choose({kind:"audience", id:catalog.audience_options.find(a => a.id === "icp-" + p.id || a.name?.toLowerCase() === p.name.toLowerCase())?.id || "icp-" + p.id}, p)}>{catalog.audience_options.some(a => a.name?.toLowerCase() === p.name.toLowerCase()) ? "Review proposed profile update" : "Review profile draft"}</button>{p.action ? <button type="button" className={button} disabled={busy || !catalog.audience_options.some(a => a.id === "icp-" + p.id || a.name?.toLowerCase() === p.name.toLowerCase()) || catalog.cta_options.some(o => o.id === "action-" + p.id)} onClick={() => choose({kind:"offer", id:"action-" + p.id}, p)}>Review {p.action.title || "suggested action"}</button> : null}<button type="button" className={button} onClick={() => setDismissed(v => [...v,p.id])}>Dismiss suggestion</button></div></article>)}</section> : null}
    <section className="space-y-3" aria-label="Edit catalogue entries">
      <h2 className="text-xl font-black">1. Define or revise</h2>
      <div className="flex flex-wrap gap-3"><button type="button" disabled={busy} className={button} onClick={() => choose({ kind: "audience", id: `icp-${crypto.randomUUID()}` })}>Add customer profile</button><button type="button" disabled={busy} className={button} onClick={() => choose({ kind: "offer", id: `action-${crypto.randomUUID()}` })}>Add desired action</button></div>
      {selection ? <fetcher.Form key={formRevision} action={editorialCatalogHref(companyId)} method="post" className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6" onChange={() => setDirty(true)} onSubmit={event => { if (busy || blocked) event.preventDefault(); }}>
        <fieldset disabled={busy} className="space-y-4 border-0 p-0">
        {hidden()}{suggested && suggestions ? <><input type="hidden" name="researchRunId" value={suggestions.researchRunId}/><input type="hidden" name="suggestionId" value={suggested.id}/></> : null}<input type="hidden" name="kind" value={selection.kind} /><input type="hidden" name="entryVersion" value={entry?.version ?? 0} />
        <h3 className="text-lg font-bold">{entry ? `Revise ${entry.id} (v${entry.version} → v${entry.version + 1})` : `New ${selection.kind}`}</h3>
        <input type="hidden" name="entryId" value={entry?.id || selection.id} />

        {selection.kind === "audience" ? <>
          <TextField name="profileName" label="Customer profile name" value={audience?.name || audience?.id} required />
          <TextField name="profileDescription" label="Who are they?" value={audience?.description} required multiline />
          <TextField name="painPoints" label="Their problems — one per line" value={audience?.pain_points?.join("\n")} multiline />
          <TextField name="desiredOutcomes" label="What do they want to achieve? — one per line" value={audience?.desired_outcomes?.join("\n")} multiline />
          <label className="block text-sm font-bold">Familiarity with the subject<select name="knowledgeLevel" defaultValue={audience?.knowledge_level || "unspecified"} className={input}>{knowledgeLevels.map(level => <option key={level} value={level}>{level}</option>)}</select></label>
          <TextField name="readerTask" label="Who is this reader and what task do they need to complete?" value={audience?.reader_task} required multiline />
          <TextField name="constraints" label="Constraints — one per line (skills, context, geography, capacity)" value={audience?.constraints.join("\n")} multiline />
          <TextField name="exclusions" label="Who or what is outside this audience? — one per line" value={audience?.exclusions.join("\n")} multiline />
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="allowNoOffer" defaultChecked={audience?.allow_no_offer} className="mt-1" /><span>Allow an explicit no-offer editorial brief for this audience. Each article must still explain why.</span></label>
          {dependencies.length ? <label className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm"><input type="checkbox" name="invalidateDependentOffers" required className="mt-1" /><span>I understand that saving or retiring this audience also returns these approved offers to draft at higher versions: <strong>{dependencies.map(o => `${o.title} (${o.id})`).join(", ")}</strong>. They must be reviewed again.</span></label> : null}
        </> : <>
          <label className="block text-sm font-bold">Desired action<select name="actionType" defaultValue={offer?.action_type || "custom"} className={input}>{actionTypes.map(kind => <option key={kind} value={kind}>{kind.replaceAll("_", " ")}</option>)}</select></label>
          <TextField name="actionDescription" label="What should this reader do next?" value={offer?.action_description} required />
          <TextField name="title" label="Offer heading" value={offer?.title} required />
          <TextField name="body" label="Truthful offer promise and limitations" value={offer?.body} required multiline />
          <TextField name="buttonText" label="Button label" value={offer?.button_text} required />
          <TextField name="buttonHref" label="Destination — site-relative path or HTTP(S) URL" value={offer?.button_href} required />
          <TextField name="useWhen" label="When should this offer follow the reader's task?" value={offer?.use_when} multiline />
          <fieldset className="space-y-2"><legend className="text-sm font-bold">Compatible audiences</legend>{catalog.audience_options.map(a => <label key={a.id} className="flex items-start gap-2 text-sm"><input name="audienceIds" type="checkbox" value={a.id} defaultChecked={offer?.audience_ids.includes(a.id)} /><span>{audienceLabel(a)} · {a.status} — {a.reader_task}</span></label>)}{!catalog.audience_options.length ? <p className="text-sm text-amber-900">Create an audience first. An offer without approved audiences cannot be approved.</p> : null}</fieldset>
          <TextField name="countries" label="Actually supported countries — uppercase codes separated by commas (e.g. AU)" value={offer?.countries.join(", ")} />
          <p className="text-xs text-slate-600">Unknown service coverage stays unapproved. An offer needs at least one compatible approved audience and country before approval.</p>
          <details className="space-y-3"><summary className="cursor-pointer text-sm font-bold">Optional presentation fields</summary><TextField name="legacyAudience" label="Legacy display label (not the ICP selection)" value={offer?.audience ?? "general"} /><TextField name="ctaComponent" label="CTA component" value={offer?.cta_component ?? "ArticleCompanyCTA"} /><TextField name="imageUrl" label="Image URL" value={offer?.image_url ?? ""} /><TextField name="secondaryButtonText" label="Secondary button text" value={offer?.secondary_button_text ?? ""} /><TextField name="secondaryButtonHref" label="Secondary destination" value={offer?.secondary_button_href ?? ""} /></details>
        </>}
        <p className="text-sm text-slate-600">Saving creates a new unapproved version. Previous approval identity and time are not copied.</p>
        <div className="flex flex-wrap gap-3"><button name="intent" value="save-entry" disabled={busy || blocked} className={`${button} !bg-violet-700 !text-white`}>{busy ? "Saving…" : "Save draft for review"}</button>{entry && entry.status !== "retired" ? <button name="intent" value="retire-entry" disabled={busy || blocked} className={button} onClick={event => { if (!window.confirm(`Retire ${entry.id}? Existing briefs using this version will no longer be eligible.`)) event.preventDefault(); }}>Retire entry</button> : null}<button type="button" className={button} disabled={busy} onClick={() => choose(null)}>Cancel editing</button></div>
        </fieldset>
      </fetcher.Form> : null}
    </section>
    <section className="space-y-3" aria-label="Review and approve catalogue">
      <h2 className="text-xl font-black">2. Review exact versions</h2>
      <p className="text-sm text-slate-700">Review reader fit, exclusions, supported countries, destinations and promises. You may approve an audience and its offer together. Retired entries need a new draft before approval.</p>
      <fetcher.Form key={`review:${catalog.editorial_catalog_version}`} method="post" action={editorialCatalogHref(companyId)} className="space-y-4" onSubmit={event => { if (busy || dirty || blocked) event.preventDefault(); }}>
        {hidden()}<input type="hidden" name="intent" value="approve-entries" />
        {catalog.review_entries.map(receipt => {
          const subject = (receipt.kind === "audience" ? catalog.audience_options : catalog.cta_options).find(e => e.id === receipt.id)!;
          return <article key={`${receipt.kind}:${receipt.id}`} className="min-w-0 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold text-slate-950">{receipt.kind === "audience" ? "Audience" : "Offer"}: {subject.id} · v{subject.version} · {subject.status}</h3><button type="button" className={button} disabled={busy} onClick={() => choose({ kind: receipt.kind, id: receipt.id })}>Edit {subject.id}</button></div>
            {receipt.kind === "audience" ? <AudienceReview audience={subject as EditorialAudience} /> : <OfferReview offer={subject as EditorialOffer} />}
            {subject.approved_by ? <p className="text-xs text-slate-600">Approved by {subject.approved_by} at {subject.approved_at}</p> : null}
            <details><summary className="cursor-pointer text-xs font-semibold">Exact stored fields and content identity</summary><pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap break-all text-xs">{JSON.stringify({ ...subject, content_sha256: receipt.content_sha256 }, null, 2)}</pre></details>
            {subject.status === "draft" ? <label className="flex items-start gap-2 text-sm font-bold"><input name="reviewEntry" type="checkbox" value={JSON.stringify(receipt)} disabled={busy || dirty || blocked} className="mt-1" /><span>Select this exact version for approval</span></label> : null}
          </article>;
        })}
        {!catalog.review_entries.length ? <p className="rounded-lg bg-slate-100 p-4 text-sm">This catalogue is empty. Add audience and offer drafts above. Nothing is approved automatically.</p> : <>
          {dirty ? <p role="status" className="text-sm text-amber-900">Save or cancel your entry edit before approving stored definitions.</p> : null}
          <label className="flex items-start gap-2 text-sm"><input name="confirmApproval" type="checkbox" required disabled={busy || dirty || blocked} className="mt-1" /><span>I reviewed the selected exact versions and confirm these audiences, supported markets and offer promises. I understand that future article content still requires its own review.</span></label>
          <button disabled={busy || dirty || blocked || !catalog.review_entries.some(r => (r.kind === "audience" ? catalog.audience_options : catalog.cta_options).find(e => e.id === r.id)?.status === "draft")} className={`${button} !bg-violet-700 !text-white`}>Approve selected versions</button>
        </>}
      </fetcher.Form>
    </section>
  </main>;
}

function AudienceReview({ audience }: { audience: EditorialAudience }) {
  return <div className="space-y-2 text-sm text-slate-700"><p className="font-bold">{audienceLabel(audience)}</p><p>{audience.description}</p><p>{audience.reader_task}</p><p>{audience.pain_points?.join("; ")}</p><p>{audience.desired_outcomes?.join("; ")}</p><p><strong>Constraints:</strong> {audience.constraints.join("; ") || "None recorded"}</p><p><strong>Exclusions:</strong> {audience.exclusions.join("; ") || "None recorded"}</p><p><strong>No-offer articles:</strong> {audience.allow_no_offer ? "Permitted with an article-specific reason" : "Not permitted"}</p></div>;
}
function OfferReview({ offer }: { offer: EditorialOffer }) {
  return <div className="space-y-2 text-sm text-slate-700"><p className="font-bold">{offer.title}</p><p>{offer.body}</p><p className="break-words"><strong>{offer.button_text}</strong> → {offer.button_href}</p><p><strong>Use when:</strong> {offer.use_when || "Not specified"}</p><p><strong>Audiences:</strong> {offer.audience_ids.join(", ") || "None selected"}</p><p><strong>Countries:</strong> {offer.countries.join(", ") || "None confirmed"}</p>{offer.secondary_button_text || offer.secondary_button_href ? <p className="break-words"><strong>Secondary:</strong> {offer.secondary_button_text} → {offer.secondary_button_href}</p> : null}</div>;
}

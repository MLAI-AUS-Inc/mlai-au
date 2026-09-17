import { useEffect, useRef, useState } from "react";
import { Link, useFetcher } from "react-router";
import { audienceLabel, compatibleEditorialOffers, type ArticleEditorialBrief, type EditorialCatalog, type EditorialCatalogState } from "~/lib/editorial-catalog";

const input = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 focus:outline-2 focus:outline-violet-600";
export function editorialCatalogHref(companyId: string) {
  return `/founder-tools/marketing/editorial?${new URLSearchParams({ companyId })}`;
}

type Props = {
  state: EditorialCatalogState; companyId: string; topic?: string;
  onRefresh?: () => void; refreshing?: boolean;
  onAvailabilityChange?: (available: boolean) => void;
};
export default function EditorialBriefFields(props: Props) {
  // Never transfer a retained brief or policy snapshot to another company.
  return <BriefSelection key={props.companyId} {...props} />;
}

function BriefSelection({ state, companyId, topic, onRefresh, refreshing = false, onAvailabilityChange }: Props) {
  // Background polling must not replace the exact versions the reader selected.
  const [catalog, setCatalog] = useState<EditorialCatalog | null>(state.catalog);
  useEffect(() => { if (!catalog && state.catalog) setCatalog(state.catalog); }, [catalog, state.catalog]);
  const root = useRef<HTMLDivElement>(null);
  const [audienceId, setAudienceId] = useState("");
  const [country, setCountry] = useState("");
  const [intent, setIntent] = useState("");
  const [offerId, setOfferId] = useState("");
  const [readerTask, setReaderTask] = useState("");
  const [contribution, setContribution] = useState("");
  const [criteria, setCriteria] = useState("");
  const [noOfferReason, setNoOfferReason] = useState("");
  const [suggestionError, setSuggestionError] = useState("");
  const recommender = useFetcher<{suggestion?: {brief: ArticleEditorialBrief | null; rationale: string; editorial_catalog_version: number; topic: string}; error?: string}>();
  const suggested = recommender.data?.suggestion;
  function currentTopic() {
    const form = root.current?.closest("form");
    const values = form ? new FormData(form) : null;
    return String(values?.get("customTitle") || values?.get("candidateTitle") || topic || values?.get("targetKeyword") || "").trim();
  }
  function suggest() {
    const selectedTopic = currentTopic();
    if (!selectedTopic || !/^[A-Z]{2}$/.test(country) || !catalog) { setSuggestionError("Choose a topic and the reader's country first."); return; }
    setSuggestionError("");
    const data = new FormData();
    for (const [key,value] of Object.entries({intent:"suggest-brief", companyId, topic:selectedTopic, country, audienceId, catalogVersion:String(catalog.editorial_catalog_version)})) data.set(key,value);
    recommender.submit(data, {method:"post", action:editorialCatalogHref(companyId)});
  }
  function useSuggestion() {
    const b = suggested?.brief;
    if (!b || !catalog || suggested.editorial_catalog_version !== catalog.editorial_catalog_version || suggested.topic !== currentTopic() || b.country !== country) { setSuggestionError("The topic, country or profiles changed. Request a fresh suggestion."); return; }
    setAudienceId(b.audience_id); setIntent(b.conversion_intent); setOfferId(b.offer_id || "");
    setReaderTask(b.reader_task); setContribution(b.distinct_contribution); setCriteria(b.acceptance_criteria.join("\n")); setNoOfferReason(b.no_offer_reason || "");
  }
  const audience = catalog?.audience_options.find(a => a.id === audienceId);
  const offers = catalog ? compatibleEditorialOffers(catalog, audienceId, country) : [];
  const offer = offers.find(o => o.id === offerId);
  const approved = catalog?.audience_options.filter(a => a.status === "approved") ?? [];
  useEffect(() => {
    if (intent === "offer" && offers.length === 1 && !offerId) setOfferId(offers[0].id);
  }, [intent, offerId, offers.map(o => o.id).join("|")]);
  const latest = state.catalog;
  const stale = Boolean(latest && catalog && latest.editorial_catalog_version !== catalog.editorial_catalog_version);
  const blocked = !latest || !catalog || stale || !approved.length;
  useEffect(() => {
    onAvailabilityChange?.(!blocked);
    return () => onAvailabilityChange?.(false);
  }, [blocked, onAvailabilityChange]);
  // Native Enter/requestSubmit must also stop before the router's POST handler.
  // This is a UX guard, not a replacement for the fresh server-side check.
  useEffect(() => {
    const form = root.current?.closest("form");
    if (!form || !blocked) return;
    const stop = (event: Event) => { event.preventDefault(); root.current?.focus(); };
    form.addEventListener("submit", stop, true);
    return () => form.removeEventListener("submit", stop, true);
  }, [blocked]);
  return <div ref={root} tabIndex={-1} className="min-w-0 space-y-3">
    {onRefresh ? <button type="button" className="text-sm font-bold text-violet-800 underline disabled:opacity-50" disabled={refreshing} onClick={onRefresh}>{refreshing ? "Checking catalogue…" : "Check for audience and offer changes"}</button> : null}
    {state.error ? <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-slate-900" aria-label="Article audience unavailable">
      <h2 className="font-bold">Audience and offer unavailable</h2>
      <p className="mt-2" role="alert">{state.error} No article can start without a reviewed brief. Any unsaved writing below is retained; check again when the catalogue is available.</p>
      <Link className="mt-3 inline-block font-bold underline" to={editorialCatalogHref(companyId)} target="_blank" rel="noopener">Open audience and offer settings (new tab)</Link>
    </section> : null}
    {catalog ? <fieldset className="min-w-0 space-y-4 rounded-xl border border-violet-200 bg-violet-50/40 p-4 sm:p-5">
    <legend className="px-1 text-base font-black text-slate-950">Who is this article for?</legend>
    <p className="text-sm leading-6 text-slate-700">Choose one approved audience and a useful outcome before generating. A topic score is not proof of reader value. This brief follows the draft into review.</p>
    <Link className="inline-block text-sm font-bold text-violet-800 underline" to={editorialCatalogHref(companyId)} target="_blank" rel="noopener">Manage audiences and offers (new tab)</Link>
    <input type="hidden" name="editorialCompanyId" value={companyId} />
    <input type="hidden" name="editorialCatalogVersion" value={catalog.editorial_catalog_version} />
    <input type="hidden" name="editorialAudienceVersion" value={audience?.version ?? ""} />
    {stale ? <div role="alert" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm">
      <p>The catalogue changed. Your writing inputs are retained, but audience and offer selections need a new review.</p>
      <button type="button" className="mt-2 font-bold underline" disabled={!latest} onClick={() => { if (latest) { setCatalog(latest); setAudienceId(""); setOfferId(""); setIntent(""); } }}>Load current catalogue and clear selections</button>
    </div> : null}
    {!approved.length ? <p role="status" className="text-sm font-semibold text-amber-900">No approved audiences yet. Save definitions as drafts in settings, review them, then explicitly approve before starting an article.</p> : null}
    <label className="block text-sm font-bold text-slate-800">Customer profile
      <select name="editorialAudienceId" required value={audienceId} onChange={event => { setAudienceId(event.target.value); setIntent(""); setOfferId(""); }} className={input}>
        <option value="">Choose an audience</option>
        {approved.map(a => <option key={a.id} value={a.id}>{audienceLabel(a)} — {a.reader_task}</option>)}
      </select>
    </label>
    {audience ? <div className="space-y-2 text-sm text-slate-700">
      <p>{audience.description}</p><p><strong>Approved task (v{audience.version}):</strong> {audience.reader_task}</p>
      {audience.constraints.length ? <p><strong>Constraints:</strong> {audience.constraints.join("; ")}</p> : null}
      {audience.exclusions.length ? <p><strong>Not for:</strong> {audience.exclusions.join("; ")}</p> : null}
    </div> : null}
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-bold text-slate-800">Reader's country
        <input name="editorialCountry" required pattern="[A-Z]{2}" maxLength={2} placeholder="AU" value={country} onChange={event => { setCountry(event.target.value.toUpperCase()); setOfferId(""); }} className={input} />
        <span className="mt-1 block text-xs font-normal">Two-letter code. Geography is explicit, not inferred from the article language.</span>
      </label>
      <label className="block text-sm font-bold text-slate-800">Conversion decision
        <select name="editorialIntent" required value={intent} onChange={event => { setIntent(event.target.value); setOfferId(""); }} className={input}>
          <option value="">Choose a next step</option>
          {audienceId !== "OUTSIDE" ? <option value="offer">One relevant offer</option> : null}
          {audience?.allow_no_offer ? <option value="none">No offer — editorial purpose only</option> : null}
        </select>
      </label>
    </div>
    <div className="space-y-2"><button type="button" disabled={blocked || recommender.state !== "idle"} onClick={suggest} className="rounded-lg border border-violet-300 px-3 py-2 text-sm font-bold text-violet-900">{recommender.state === "idle" ? "Suggest an audience and article brief" : "Preparing a suggestion…"}</button>{suggestionError || recommender.data?.error ? <p role="alert" className="text-sm text-rose-800">{suggestionError || recommender.data?.error}</p> : null}{suggested ? <div className="rounded-lg border bg-white p-3 text-sm space-y-2"><p>{suggested.rationale}</p>{suggested.brief ? <><p><strong>Reader task:</strong> {suggested.brief.reader_task}</p><p><strong>Contribution:</strong> {suggested.brief.distinct_contribution}</p><p>Customer: {catalog?.audience_options.find(a => a.id === suggested.brief?.audience_id)?.name || suggested.brief.audience_id} · Action: {suggested.brief.offer_id || "No offer"}</p><button type="button" disabled={blocked} className="font-bold text-violet-800 underline" onClick={useSuggestion}>Use this draft brief and edit below</button></> : null}</div> : null}</div>
    {intent === "offer" ? <>
      <label className="block text-sm font-bold text-slate-800">Desired action for this customer and country
        <select name="editorialOfferId" required value={offerId} onChange={event => setOfferId(event.target.value)} className={input}>
          <option value="">Choose an offer</option>
          {offers.map(o => <option key={o.id} value={o.id}>{o.title} — v{o.version}</option>)}
        </select>
      </label>
      <input type="hidden" name="editorialOfferVersion" value={offer?.version ?? ""} />
      {!offers.length ? <p role="status" className="text-sm text-amber-900">No approved offer matches this audience and country. Confirm actual service eligibility in settings; do not select a different country to bypass it.</p> : null}
      {offer ? <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800">
        <p className="font-bold">{offer.title}</p><p className="mt-1">{offer.body}</p>
        <p className="mt-2 break-words"><strong>{offer.button_text}</strong> → {offer.button_href}</p>
        {offer.use_when ? <p className="mt-2">Use when: {offer.use_when}</p> : null}
      </div> : null}
    </> : null}
    {intent === "none" ? <label className="block text-sm font-bold text-slate-800">Why should this article have no offer?
      <textarea name="editorialNoOfferReason" value={noOfferReason} onChange={event => setNoOfferReason(event.target.value)} rows={2} required className={input} placeholder="Explain its intentional editorial purpose, without inventing a commercial fit." />
    </label> : null}
    <label className="block text-sm font-bold text-slate-800">The specific task this reader will complete
      <textarea name="editorialReaderTask" value={readerTask} onChange={event => setReaderTask(event.target.value)} required rows={2} className={input} placeholder="What decision or action will this article help this reader take?" />
    </label>
    <label className="block text-sm font-bold text-slate-800">What useful contribution will we supply?
      <textarea name="editorialContribution" value={contribution} onChange={event => setContribution(event.target.value)} required rows={3} className={input} placeholder="Describe the worked example, tested method, maintained comparison or experience we can actually substantiate. Label planned or synthetic evidence." />
    </label>
    <label className="block text-sm font-bold text-slate-800">Acceptance criteria — one per line
      <textarea name="editorialCriteria" value={criteria} onChange={event => setCriteria(event.target.value)} required rows={3} className={input} placeholder="What must the final article demonstrate? Include source limits, the promised output and a truthful transition to the selected next step." />
    </label>
    <p className="text-xs leading-5 text-slate-600">Catalogue revision {catalog.editorial_catalog_version}. Selecting an offer does not approve the article, verify its claims or publish it. Changed or revoked definitions require review again.</p>
  </fieldset> : null}
  </div>;
}

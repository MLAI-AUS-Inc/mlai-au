import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Compass, Loader2, Search, Sparkles, X } from "lucide-react";
import { clsx } from "clsx";
import { ISLAND_BRIEF_EXAMPLES, ISLAND_FOCUSES, researchedIslands } from "~/lib/custom-content-island";
import { useIslandResearch } from "~/lib/use-island-research";
import type { VibeMarketingTopicPillar } from "~/types/vibe-marketing";

const inputClass = "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
const primaryClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-50";
const secondaryClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold text-slate-600 hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-violet-100 disabled:opacity-50";
const number = (value: number) => new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value);

interface Props {
  open: boolean;
  onClose: () => void;
  companyId: string;
  costPoints: number;
  onAdded: (island: VibeMarketingTopicPillar) => void;
}

export default function CustomContentIslandBuilder({ open, onClose, companyId, costPoints, onAdded }: Props) {
  const state = useIslandResearch(companyId, onAdded);
  const { brief, setBrief, step, setStep, runId, run, error, paymentRequired, busy, adding, saved, terminal } = state;
  const proposals = researchedIslands(run?.result);
  const added = Array.isArray(run?.result?.adopted_proposal_ids) ? run.result.adopted_proposal_ids as string[] : [];
  const available = proposals.filter(island => !added.includes(island.id));
  const { selected, select, preview } = state;
  const researching = Boolean(runId && !terminal);
  const finished = Boolean(runId && terminal);
  const view = saved ? "saved" : researching ? "researching" : preview ? "preview" : finished ? "results" : String(step);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const costLabel = costPoints === 0 ? "Free" : `${costPoints} Roo ${costPoints === 1 ? "Point" : "Points"}`;
  const focusLabel = ISLAND_FOCUSES.find((option) => option.id === brief.searchIntent)?.label || "Explore all opportunities";
  useEffect(() => { if (open) titleRef.current?.focus(); }, [open, view]);
  const title = saved ? "Your islands are on the map" : preview ? "Here’s how your themes fit together" : researching ? "Finding your next content island" : finished ?
    proposals.length ? "Explore your researched islands" : run?.status === "completed" ? "More context could help" : "Research was interrupted" :
    ["What do you want to explore?", "What are your readers looking for?", "Ready to discover your islands?"][step];
  const subtitle = saved ? "Your selected themes are ready. Explore an island to start generating article ideas." : preview ? "Closely related themes share an island. Distinct themes get their own space." : researching ?
    "We’re exploring related terms and following promising searches, then grouping the closest matches into islands. A thorough search can take several minutes." : finished ?
    proposals.length ? "These themes come from relevant search data, ranked by opportunity. Tick every theme that fits your business. We’ll suggest which belong together before you add them." :
    "Your brief is saved. You can refine it or try the research again." :
    ["A few words or a description is enough. Start with any topic, audience need, service, product or feature.",
      "We’ll prioritise your chosen intent while exploring closely related searches. You can also explore all opportunities.",
      "We’ll search broadly across related terms and applications, follow promising leads, and recommend the closest content themes with real demand."][step];

  return (
    <Dialog open={open} onClose={() => { if (!busy && !adding) onClose(); }} className="relative z-[70]">
      <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-3 sm:p-8">
          <DialogPanel className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-5 pb-6 pt-7 sm:px-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-violet-700"><Compass className="h-4 w-4" /> Discover a content island</span>
                <button type="button" disabled={busy || Boolean(adding)} onClick={onClose} aria-label="Close island builder" className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-violet-100 disabled:opacity-40"><X className="h-5 w-5" /></button>
              </div>
              {!runId && <ol aria-label="Your progress" className="mb-6 flex items-center gap-3 text-xs font-bold text-slate-500">
                {["Describe", "Intent", "Research"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={clsx("flex items-center gap-2", index <= step && "text-violet-700")}><span className={clsx("flex h-6 w-6 items-center justify-center rounded-full", index <= step ? "bg-violet-100" : "bg-slate-100")}>{index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>{label}{index < 2 && <span aria-hidden="true" className="ml-1 h-px w-4 bg-slate-200 sm:w-8" />}</li>)}
              </ol>}
              <DialogTitle ref={titleRef} tabIndex={-1} className="text-2xl font-black tracking-tight text-slate-950 outline-none sm:text-3xl">{title}</DialogTitle>
              <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
            </div>

            {saved ? <div className="px-5 py-6 sm:px-8">
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5"><CheckCircle2 className="mb-3 h-8 w-8 text-violet-700" /><p className="text-xs font-bold uppercase tracking-wider text-violet-700">Added to your content islands</p><h3 className="mt-2 break-words text-xl font-black text-slate-950">{saved.map(island => island.name).join(" · ")}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Adding these islands used no additional Roo Points.</p></div>
              <button type="button" onClick={onClose} className={clsx(primaryClass, "mt-6 w-full")}>View my islands<ArrowRight className="h-4 w-4" /></button>
              {available.length > 0 && <button type="button" onClick={() => state.setSaved(null)} className={clsx(secondaryClass, "mt-3 w-full")}>Add more from these results</button>}
              <button type="button" onClick={state.refine} className={clsx(secondaryClass, "mt-3 w-full")}>Explore another topic</button>
            </div> : preview ? <div className="space-y-4 px-5 py-6 sm:px-8">
              <p className="text-sm font-bold text-slate-700">{selected.length} selected themes · {preview.groups.length} {preview.groups.length === 1 ? "island" : "islands"}</p>
              {preview.groups.map((group, index) => <article key={group.proposal_ids.join(":")} className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Island {index + 1} · {group.proposal_ids.length > 1 ? "Grouped by topic similarity" : "Distinct theme"}</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">{group.name}</h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">{group.proposal_ids.map(id => <li key={id}>• {proposals.find(p => p.id === id)?.name}</li>)}</ul>
                <p className="mt-3 text-xs font-semibold text-slate-500">{number(group.metrics.total_volume)} monthly searches · {group.metrics.keyword_count} unique keywords</p>
              </article>)}
              {preview.already_added.length > 0 && <p className="text-sm text-slate-500">{preview.already_added.length} themes are already on your map and won’t be duplicated.</p>}
              <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"><strong className="text-slate-900">Your islands can evolve.</strong> As daily research finds more relevant searches, islands grow. Consistent evidence can bring close themes together or split distinct themes apart. Your articles and island history stay safe.</div>
              <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white py-4">
                <button type="button" disabled={adding} onClick={() => state.setPreview(null)} className={secondaryClass}><ArrowLeft className="h-4 w-4" />Change selection</button>
                <button type="button" disabled={adding} onClick={() => void state.adopt()} className={primaryClass}>{adding ? <><Loader2 className="h-4 w-4 animate-spin" />Adding islands…</> : "Add selected themes · free"}</button>
              </div>
            </div> : researching ? <div className="space-y-6 px-5 py-7 sm:px-8">
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5"><p className="break-words text-sm font-bold text-violet-900">{brief.subject}</p><p className="mt-1 text-xs text-violet-700">{focusLabel}</p></div>
              <ol aria-label="Research progress" className="space-y-4">{[
                ["load_context", "Understand your topic"], ["research_sources", "Explore related terms and follow promising searches"],
                ["synthesize", "Group keywords into relevant islands"], ["finalize", "Rank the strongest opportunities"],
              ].map(([key, label]) => {
                const complete = run?.steps?.find((item) => item.key === key)?.status === "completed";
                const active = run?.currentStep === key || (!run?.currentStep && key === "load_context");
                return <li key={key} className={clsx("flex items-center gap-3 text-sm font-semibold", complete || active ? "text-slate-900" : "text-slate-400")}><span className={clsx("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", complete || active ? "bg-violet-100 text-violet-700" : "bg-slate-100")}>{complete ? <Check className="h-4 w-4" /> : active ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="h-2 w-2 rounded-full bg-slate-300" />}</span>{label}</li>;
              })}</ol>
              <p role="status" className="text-sm leading-6 text-slate-500">Research continues if you close this dialog. Open “Create an island” to return to your results.</p>
              <button type="button" onClick={onClose} className={secondaryClass}>Keep exploring my map</button>
            </div> : finished ? <div className="space-y-4 px-5 py-6 sm:px-8">
              {proposals.length ? <>
                <p className="text-xs font-semibold leading-5 text-slate-500">Google searches · Australia · English · DataForSEO<br />Monthly searches are estimates summed across related keywords, not unique people.</p>
                <div className="flex items-center justify-between gap-3"><p role="status" className="text-sm font-bold text-slate-700">{selected.length} selected</p><button type="button" disabled={adding || !available.length} onClick={() => select(selected.length === available.length ? [] : available.map(island => island.id))} className={secondaryClass}>{selected.length === available.length && available.length ? "Clear selection" : "Select all"}</button></div>
                {proposals.map((island, index) => <article key={island.id} className={clsx("rounded-2xl border p-5", selected.includes(island.id) ? "border-violet-500 bg-violet-50/50 ring-1 ring-violet-500" : "border-slate-200")}>
                  {index === 0 && <p className="mb-2 flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-violet-700"><Sparkles className="h-3.5 w-3.5" />Recommended opportunity</p>}
                  {island.keywords.length < 3 && <p className="mb-2 text-xs font-bold text-slate-600">Focused starting point · Limited search data</p>}
                  <label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={selected.includes(island.id) || added.includes(island.id)} disabled={adding || added.includes(island.id)} onChange={event => select(event.target.checked ? [...selected, island.id] : selected.filter(id => id !== island.id))} className="mt-1 h-5 w-5 shrink-0 accent-violet-700" /><span className="break-words text-lg font-black text-slate-950">{island.name}{added.includes(island.id) && <span className="ml-2 text-xs font-bold text-violet-700">Already added</span>}</span></label><p className="mt-1 text-sm leading-6 text-slate-600">{island.description}</p>
                  <dl className="my-4 grid grid-cols-3 gap-3"><div><dt className="text-xs leading-5 text-slate-500">Monthly searches</dt><dd className="text-lg font-black text-slate-950">{number(island.metrics.total_volume)}</dd></div><div><dt className="text-xs leading-5 text-slate-500">Related keywords</dt><dd className="text-lg font-black text-slate-950">{number(island.metrics.keyword_count)}</dd></div><div><dt className="text-xs leading-5 text-slate-500">Avg. difficulty</dt><dd className="text-lg font-black text-slate-950">{number(island.metrics.avg_difficulty)}<span className="text-xs font-medium text-slate-500"> / 100</span></dd></div></dl>
                  {island.keywords.length < 3 && <p className="mb-4 text-xs leading-5 text-slate-500">This topic has a small set of measured searches. You can still use it to start exploring article ideas.</p>}
                  <details className="mb-4 text-sm"><summary className="cursor-pointer font-bold text-violet-700">See the searches behind this island</summary><ul className="mt-3 space-y-2">{island.keywords.slice(0, 10).map((keyword) => <li key={keyword.keyword} className="flex items-start justify-between gap-4 text-xs leading-5 text-slate-600"><span>{keyword.keyword}</span><span className="shrink-0 font-semibold">{number(keyword.volume)} / mo</span></li>)}</ul></details>

                </article>)}
                <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white py-4"><p className="text-sm font-semibold text-slate-600">{selected.length} themes selected · Free to add</p><button type="button" disabled={adding || !selected.length} onClick={() => void state.reviewSelection()} className={primaryClass}>{adding ? <><Loader2 className="h-4 w-4 animate-spin" />Reviewing…</> : <>Review selected themes<ArrowRight className="h-4 w-4" /></>}</button></div>
              </> : <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><Search className="mb-3 h-7 w-7 text-amber-700" /><p className="text-sm font-bold text-slate-900">{run?.result?.message ? String(run.result.message) : "We couldn’t finish this research. Try again in a moment."}</p><p className="mt-3 text-sm leading-6 text-slate-600">{costPoints === 0 ? "Research is free for this domain; you can try again." : run?.result?.island_research_refunded ? "Your research Roo Point has been refunded." : "Any research charge is refunded automatically when research fails or finds no usable islands."}</p></div>}
              <button type="button" disabled={Boolean(adding)} onClick={state.refine} className={secondaryClass}><ArrowLeft className="h-4 w-4" />Refine my topic</button>
              {proposals.length > 0 && <p className="text-xs text-slate-500">{costPoints === 0 ? "A new research run is free." : `A new research run costs ${costLabel}.`} Adding these results is free.</p>}
            </div> : <form onSubmit={(event) => { event.preventDefault(); if (!busy) { if (step < 2) setStep(step + 1); else void state.research(); } }}>
              <div className="space-y-5 px-5 py-6 sm:px-8">
                {step === 0 && <>
                  <div><p className="mb-2 text-xs font-semibold text-slate-500">Try an example, or start with your own topic</p><div className="flex flex-wrap gap-2">{ISLAND_BRIEF_EXAMPLES.map((example) => <button key={example.label} type="button" onClick={() => setBrief({ ...brief, subject: example.subject, audience: example.audience, description: "" })} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 hover:bg-violet-100"><Sparkles className="h-3.5 w-3.5" />{example.label}</button>)}</div></div>
                  <label className="block text-sm font-bold text-slate-800">Your topic or idea<textarea required minLength={1} maxLength={1000} rows={4} value={brief.subject} onChange={(event) => setBrief({ ...brief, subject: event.target.value })} className={inputClass} placeholder="A few words, or describe what you want to explore…" /></label>
                  <label className="block text-sm font-bold text-slate-800">Who do you want to reach? <span className="font-medium text-slate-400">Optional</span><input maxLength={300} value={brief.audience} onChange={(event) => setBrief({ ...brief, audience: event.target.value })} className={inputClass} placeholder="e.g. Curious beginners, local families, business owners" /></label>
                  <details><summary className="cursor-pointer text-sm font-bold text-violet-700">Add context or boundaries <span className="font-medium text-slate-400">Optional</span></summary><label className="mt-3 block text-sm font-bold text-slate-800">Anything to include or avoid?<textarea maxLength={2000} rows={3} value={brief.description} onChange={(event) => setBrief({ ...brief, description: event.target.value })} className={inputClass} placeholder="Tell us what matters, or which meanings of your topic to avoid." /></label></details>
                </>}
                {step === 1 && <>
                  <fieldset><legend className="mb-3 text-sm font-bold text-slate-800">Choose a search intent</legend><div className="space-y-2.5">{ISLAND_FOCUSES.map((option) => <label key={option.id} className={clsx("flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition focus-within:ring-4 focus-within:ring-violet-100", brief.searchIntent === option.id ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-violet-300")}><input type="radio" name="content-focus" value={option.id} checked={brief.searchIntent === option.id} onChange={() => setBrief({ ...brief, searchIntent: option.id })} className="sr-only" /><span aria-hidden="true" className={clsx("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", brief.searchIntent === option.id ? "border-violet-700 bg-violet-700 text-white" : "border-slate-300 bg-white")}>{brief.searchIntent === option.id && <Check className="h-3 w-3" />}</span><span><span className="block text-sm font-bold text-slate-900">{option.label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{option.summary}</span></span></label>)}</div></fieldset>
                  {brief.searchIntent === "custom" && <label className="block text-sm font-bold text-slate-800">Your content direction<textarea required minLength={3} maxLength={500} rows={3} value={brief.focus} onChange={(event) => setBrief({ ...brief, focus: event.target.value })} className={inputClass} placeholder="What should readers learn, feel or do?" /></label>}
                </>}
                {step === 2 && <>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-wider text-violet-700">Your research brief</p><dl className="mt-4 space-y-4 text-sm"><div><dt className="font-bold text-slate-900">Topic to explore</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-6 text-slate-600">{brief.subject}</dd></div>{brief.description && <div><dt className="font-bold text-slate-900">Context and boundaries</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-6 text-slate-600">{brief.description}</dd></div>}{brief.audience && <div><dt className="font-bold text-slate-900">Audience</dt><dd className="mt-1 break-words leading-6 text-slate-600">{brief.audience}</dd></div>}<div><dt className="font-bold text-slate-900">Search intent</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-6 text-slate-600">{focusLabel}{brief.searchIntent === "custom" && ` — ${brief.focus}`}</dd></div></dl></div>
                  <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4"><p className="text-sm font-black text-violet-900">Research islands · {costLabel}</p><p className="mt-2 text-sm leading-6 text-violet-800">You’ll get relevant themes, search volumes and difficulty, backed by keyword research. Select all relevant themes and add them to your map at no extra cost.</p><p className="mt-2 text-xs leading-5 text-violet-700">Google · Australia · English. {costPoints === 0 ? "Research is free for this domain." : "If research fails or finds no usable islands, your point is refunded."} Article idea generation is a separate action.</p></div>
                </>}
              </div>
              <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-3 rounded-b-3xl border-t border-slate-100 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <button type="button" disabled={busy} onClick={() => step ? setStep(step - 1) : onClose()} className={secondaryClass}>{step > 0 && <ArrowLeft className="h-4 w-4" />}{step ? "Back" : "Finish later"}</button>
                <button type="submit" disabled={busy || !brief.subject.trim()} className={primaryClass}>{busy ? <><Loader2 className="h-4 w-4 animate-spin" />Starting research…</> : step === 2 ? <><Search className="h-4 w-4" />Research islands · {costLabel}</> : <>{step === 0 ? "Choose search intent" : "Review research"}<ArrowRight className="h-4 w-4" /></>}</button>
              </div>
            </form>}
            {error && <div className="px-5 pb-6 sm:px-8"><p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-800">{error}</p>{paymentRequired && <a href="/founder-tools/upgrades" className="mt-3 inline-flex text-sm font-bold text-violet-700 underline">Get Roo Points</a>}</div>}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

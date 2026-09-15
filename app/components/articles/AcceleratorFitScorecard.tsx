import { useState, useSyncExternalStore } from "react";
import { ACCELERATOR_FICTIONAL_RECORD, ACCELERATOR_FIT_CRITERIA, ACCELERATOR_FIT_LABELS, assessAcceleratorFit, emptyAcceleratorFit, formatAcceleratorFit, type AcceleratorFitId, type AcceleratorFitStatus } from "~/lib/accelerator-fit";

const subscribe = () => () => {};
export default function AcceleratorFitScorecard() {
  const interactive = useSyncExternalStore(subscribe, () => true, () => false);
  const [record, setRecord] = useState(emptyAcceleratorFit);
  const [downloadState, setDownloadState] = useState("");
  const result = assessAcceleratorFit(record);
  const updateCriterion = (id: AcceleratorFitId, patch: { status?: AcceleratorFitStatus; evidence?: string }) => {
    setRecord(current => ({ ...current, criteria: { ...current.criteria, [id]: { ...current.criteria[id], ...patch } } }));
    setDownloadState("");
  };
  const download = () => {
    try {
      const url = URL.createObjectURL(new Blob([formatAcceleratorFit(record)], { type: "text/plain;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = "accelerator-fit-record.txt";
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDownloadState("Download requested. Check your saved file; nothing was submitted to MLAI or a programme.");
    } catch {
      setDownloadState("Download unavailable. Copy the text record below instead; your entries remain on this page.");
    }
  };
  return <section id="accelerator-fit" data-clarity-mask="true" aria-labelledby="accelerator-fit-heading" className="not-prose my-10 min-w-0 rounded-2xl border-2 border-gray-950 bg-[#fefc22] p-5 text-gray-950 sm:p-8">
    <h2 id="accelerator-fit-heading" className="text-3xl font-bold">Record programme fit, not a success score</h2>
    <p className="mt-3">These eight checks are MLAI editorial prompts, not validated thresholds or an admission predictor. One failed requirement cannot be offset by ticking other boxes. “Supported” describes your recorded evidence—not an independent MLAI verification.</p>
    <p className="mt-3 text-sm">Entries stay in this page's memory until you leave or clear it; they are not placed in the URL or sent by this worksheet to an application or analytics event. Avoid confidential information. Saving creates a local text file, not an application.</p>
    {!interactive && <p className="mt-3 rounded-lg bg-white p-3">Interactive editing requires JavaScript. Use the editable worksheet download or copyable blank record below without scripts.</p>}
    <fieldset disabled={!interactive} className="mt-5 min-w-0">
      <legend className="font-bold">Your programme evidence</legend>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">{([
        ["program", "Programme being assessed"], ["cohort", "Specific cohort or intake"], ["checkedOn", "Source checked on"], ["reviewTrigger", "Recheck date or decision trigger"],
      ] as const).map(([key, label]) => <div key={key}><label htmlFor={`accelerator-${key}`} className="block font-semibold">{label}</label><input id={`accelerator-${key}`} value={record[key]} maxLength={500} onChange={e => { setRecord(current => ({ ...current, [key]: e.target.value })); setDownloadState(""); }} className="mt-2 w-full min-w-0 rounded-lg border border-gray-500 bg-white p-3 text-base" /></div>)}</div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">{ACCELERATOR_FIT_CRITERIA.map(c => <div key={c.id} className="min-w-0 rounded-xl border border-gray-300 bg-white p-4">
        <label htmlFor={`accelerator-status-${c.id}`} className="block font-bold">{c.label}{c.essential && <span className="block text-sm font-normal">Essential check</span>}</label>
        <p id={`accelerator-help-${c.id}`} className="mt-2 text-sm">{c.help}</p>
        <select id={`accelerator-status-${c.id}`} aria-describedby={`accelerator-help-${c.id}`} value={record.criteria[c.id].status} onChange={e => updateCriterion(c.id, { status: e.target.value as AcceleratorFitStatus })} className="mt-3 w-full rounded-lg border border-gray-500 bg-white p-3 text-base">{Object.entries(ACCELERATOR_FIT_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <label htmlFor={`accelerator-evidence-${c.id}`} className="mt-3 block text-sm font-semibold">Evidence, source and uncertainty: {c.id}</label>
        <textarea id={`accelerator-evidence-${c.id}`} value={record.criteria[c.id].evidence} maxLength={2500} rows={3} onChange={e => updateCriterion(c.id, { evidence: e.target.value })} className="mt-2 w-full min-w-0 rounded-lg border border-gray-500 bg-white p-3 text-base" />
        {result.missingNotes.some(item => item.id === c.id) && <p className="mt-2 text-sm font-semibold text-red-800">Add an evidence note before this counts as supported.</p>}
      </div>)}</div>
      <label htmlFor="accelerator-decision-note" className="mt-5 block font-semibold">Decision and reason: apply, clarify, defer or decline</label>
      <textarea id="accelerator-decision-note" value={record.decisionNote} maxLength={2500} rows={3} onChange={e => { setRecord(current => ({ ...current, decisionNote: e.target.value })); setDownloadState(""); }} className="mt-2 w-full rounded-lg border border-gray-500 bg-white p-3 text-base" />
      <div role="status" data-fit-result={result.state} className="mt-5 rounded-xl border border-gray-400 bg-white p-5">
        <p className="font-bold">{result.verifiedCount} of 8 checks supported by your entries</p><h3 className="mt-2 text-xl font-bold">{result.label}</h3>
        {result.mismatches.length > 0 && <p className="mt-2">Recorded mismatches: {result.mismatches.map(c => c.shortLabel).join("; ")}.</p>}
        {result.essentialUnknowns.length > 0 && <p className="mt-2">Essential checks not yet supported: {result.essentialUnknowns.map(c => c.shortLabel).join("; ")}.</p>}
        <p className="mt-2 text-sm">This summary does not recommend an investment, verify eligibility or approve an application. Use the actual terms and appropriate independent advice.</p>
        {record.provenance === "fictional-teaching-example" && <p className="mt-2 font-bold">Fictional example loaded. Edits do not turn it into real evidence.</p>}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={download} className="min-h-11 rounded-lg bg-gray-950 px-5 py-3 font-bold text-white">Save my evidence record (TXT)</button>
        <button type="button" onClick={() => { setRecord(structuredClone(ACCELERATOR_FICTIONAL_RECORD)); setDownloadState(""); }} className="min-h-11 rounded-lg border border-gray-600 bg-white px-4 py-3 font-semibold">Load fictional example (replaces entries)</button>
        <button type="button" onClick={() => { setRecord(emptyAcceleratorFit()); setDownloadState(""); }} className="min-h-11 px-3 py-3 font-semibold underline">Clear worksheet</button>
      </div>
    </fieldset>
    <p role="status" className="mt-3 text-sm">{downloadState}</p>
    <details className="mt-4 rounded-lg border border-gray-400 bg-white p-4"><summary className="cursor-pointer font-semibold">Copy the current text record</summary><pre className="mt-3 whitespace-pre-wrap break-words text-sm">{formatAcceleratorFit(record)}</pre></details>
  </section>;
}

import { useId, useState } from "react";
import { useNavigate } from "react-router";
import { aiPilotText, calculateAiPilot, EXAMPLE_AI_PILOT, type AiPilotInputs } from "~/lib/ai-pilot-economics";
import { trackArticleCtaClick } from "~/lib/article-conversions";
import { PILOT_ARTICLE_SLUG, PILOT_BRIEF_MAX_LENGTH, PILOT_HANDOFF_CTA_VERSION, stageStudioPilotHandoff } from "~/lib/studio-pilot-handoff";

const FIELDS: { key: keyof AiPilotInputs; label: string; hint: string; step?: string }[] = [
  { key: "monthlyTasks", label: "Tasks per month", hint: "Use the same task mix for both timings.", step: "1" },
  { key: "baselineMinutes", label: "Current human minutes per task", hint: "Include existing review and rework." },
  { key: "pilotMinutes", label: "Pilot human minutes per task", hint: "Include checking, corrections and manual fallbacks—not just generation time." },
  { key: "hourlyCost", label: "Loaded labour cost (A$/hour)", hint: "Use your cost basis, not an assumed selling rate." },
  { key: "maintenanceHours", label: "Additional internal support hours/month", hint: "Exclude time already included in per-task timing or cash costs." },
  { key: "monthlyCashCost", label: "Additional running cash costs (A$/month)", hint: "Subscriptions, usage, external support and any extra paid labour. Do not count baseline payroll twice." },
  { key: "setupCashCost", label: "One-off setup cash outlay (A$)", hint: "For example, an implementation invoice; not a suggested Studio price." },
  { key: "setupHours", label: "One-off internal setup hours", hint: "Learning, configuration and evaluation time, not already in the cash invoice." },
  { key: "cashablePercent", label: "Share of net released labour value actually avoidable (%)", hint: "Start at 0 if payroll stays unchanged. Support any increase with genuinely avoidable spending." },
];
const money = (value: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(value);

export default function AiPilotWorksheet() {
  const id = useId();
  const navigate = useNavigate();
  const [values, setValues] = useState(() => Object.fromEntries(Object.entries(EXAMPLE_AI_PILOT).map(([key, value]) => [key, String(value)])) as Record<keyof AiPilotInputs, string>);
  const [brief, setBrief] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [handoffError, setHandoffError] = useState("");
  let inputs: AiPilotInputs | null = null;
  let result: ReturnType<typeof calculateAiPilot> | null = null;
  try {
    if (FIELDS.some(({ key }) => values[key].trim() === "")) throw new Error("Missing input");
    inputs = Object.fromEntries(FIELDS.map(({ key }) => [key, Number(values[key])])) as AiPilotInputs;
    result = calculateAiPilot(inputs);
  } catch { /* Invalid/unfinished inputs show a message, never a made-up zero. */ }

  function download() {
    if (!inputs || !result) return;
    let url: string | undefined;
    try {
      url = URL.createObjectURL(new Blob([aiPilotText(inputs, brief)], { type: "text/plain;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "mlai-ai-pilot-worksheet.txt";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setDownloadError("");
    } catch {
      setDownloadError("The download could not start. You can copy the inputs, results and brief from this page instead.");
    } finally {
      if (url) setTimeout(() => URL.revokeObjectURL(url!), 1000);
    }
  }

  function continueToStudio() {
    if (!inputs || !result) return;
    try {
      if (!stageStudioPilotHandoff(inputs, brief)) throw new Error("Handoff unavailable");
      trackArticleCtaClick({ articleSlug: PILOT_ARTICLE_SLUG, ctaType: "studio-project", primaryIcp: "SMB",
        destination: "/mlai-studio/start-project", placement: "article-inline", version: PILOT_HANDOFF_CTA_VERSION });
      navigate("/mlai-studio/start-project");
    } catch {
      setHandoffError("Your worksheet could not be carried across. Download or copy it, then open a Studio project brief from the link below.");
    }
  }

  return <section id="pilot-worksheet" data-clarity-mask="true" aria-labelledby={`${id}-title`} className="not-prose my-10 rounded-3xl border border-gray-300 bg-white p-5 text-gray-950 sm:p-8">
    <h2 id={`${id}-title`} className="text-2xl font-black">Your pilot cost and decision worksheet</h2>
    <p className="mt-3 text-sm leading-6">The initial values are an illustrative example, not customer results. Replace them with your measurements. All costs are AUD; use a consistent GST basis. Entries stay in this page unless you download them or choose to carry them to the Studio form. Avoid confidential information on this analytics-enabled website.</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {FIELDS.map(({ key, label, hint, step }) => <label key={key} htmlFor={`${id}-${key}`} className="block text-sm font-bold">
        {label}
        <input id={`${id}-${key}`} type="number" min="0" max={key === "cashablePercent" ? 100 : 1e9} step={step ?? "any"} value={values[key]} onChange={e => setValues(current => ({ ...current, [key]: e.target.value }))} aria-describedby={`${id}-${key}-hint`} className="mt-2 block w-full rounded-lg border border-gray-400 px-3 py-2 focus:outline-2 focus:outline-purple-600" />
        <span id={`${id}-${key}-hint`} className="mt-1 block font-normal text-gray-600">{hint}</span>
      </label>)}
    </div>
    <div className="mt-6 rounded-xl bg-gray-50 p-5" aria-live="polite" aria-atomic="true">
      {result ? <>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt>Net capacity released/month</dt><dd className="text-xl font-bold">{result.netHours.toFixed(2)} hours</dd></div>
          <div><dt>Net capacity value after cash running costs</dt><dd className="text-xl font-bold">{money(result.netCapacityValue)}/month</dd></div>
          <div><dt>Estimated cash change</dt><dd className="text-xl font-bold">{money(result.monthlyCashChange)}/month</dd></div>
          <div><dt>Setup cost including internal time</dt><dd className="text-xl font-bold">{money(result.setupEconomicCost)}</dd></div>
          <div><dt>Payback on setup cash only</dt><dd className="font-bold">{result.cashPaybackMonths === null ? "No positive cash payback under these assumptions" : `${result.cashPaybackMonths.toFixed(1)} months, if sustained`}</dd></div>
        </dl>
        <p className="mt-4 text-sm">Capacity value is not profit. The cash estimate only counts the share of released labour spending you say is actually avoidable. Revenue, taxes, financing, seasonality and unmeasured quality benefits are excluded. Include any additional paid labour in running cash costs.</p>
        {result.netHours <= 0 && <p className="mt-3 font-bold">This scenario releases no net time. Investigate the review/support burden before expanding it.</p>}
      </> : <p role="alert">Complete every numeric field with a non-negative number. Task count must be a whole number; the avoidable share must be between 0 and 100.</p>}
    </div>
    <label htmlFor={`${id}-brief`} className="mt-6 block font-bold">Your pilot brief (optional)</label>
    <p id={`${id}-brief-help`} className="mt-1 text-sm text-gray-600">Record the workflow, inputs, allowed actions, human approver, acceptance criteria, stop rule and decision date. Use synthetic examples, not customer records.</p>
    <textarea id={`${id}-brief`} maxLength={PILOT_BRIEF_MAX_LENGTH} aria-describedby={`${id}-brief-help`} value={brief} onChange={e => setBrief(e.target.value)} rows={6} className="mt-2 w-full rounded-xl border border-gray-400 p-3" placeholder="Workflow: …\nBaseline: …\nAllowed / prohibited actions: …\nReviewer: …\nAcceptance and stop rules: …\nDecision date: …" />
    <button type="button" disabled={!result} onClick={download} className="mt-4 rounded-full bg-purple-800 px-5 py-3 font-bold text-white disabled:opacity-40">Download my worksheet (.txt)</button>
    {downloadError && <p role="alert" className="mt-3 text-red-800">{downloadError}</p>}
    {inputs && result && <details className="mt-4">
      <summary className="cursor-pointer font-bold underline">View or copy the worksheet text</summary>
      <p className="mt-2 text-sm">If your browser does not save the download, select and copy this same export into a text file. It includes your current inputs, results, brief, limitations and a blank evaluation sheet for recording actual cases.</p>
      <label htmlFor={`${id}-export`} className="mt-3 block text-sm font-bold">Worksheet export (read only)</label>
      <textarea id={`${id}-export`} readOnly value={aiPilotText(inputs, brief)} rows={14} className="mt-2 w-full rounded-xl border border-gray-400 p-3 font-mono text-sm" />
    </details>}
    <div className="mt-6 border-t border-gray-300 pt-5">
      <h3 className="text-lg font-black">Need help implementing this workflow?</h3>
      <p id={`${id}-handoff-help`} className="mt-2 text-sm leading-6">Carry your current inputs, calculated estimates and notes to the Studio form in this tab, then review whether to include them. Nothing is submitted by this button. Refreshing or closing the tab loses the handoff; it expires after 30 minutes. Download a copy if you want to keep it.</p>
      <button type="button" onClick={continueToStudio} disabled={!result} aria-describedby={`${id}-handoff-help`} className="mt-4 min-h-12 rounded-full bg-gray-950 px-5 py-3 font-bold text-white disabled:opacity-40">Use my worksheet in a Studio brief</button>
      {handoffError && <p role="alert" className="mt-3 text-red-800">{handoffError}</p>}
    </div>
  </section>;
}

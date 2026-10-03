import { useId, useState } from "react";
import { calculateFounderCapacity, EXAMPLE_FOUNDER_CAPACITY, FOUNDER_WEEK_FIELDS, founderCapacityText, type FounderWeek } from "~/lib/founder-capacity";

const money = (value: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(value);
const number = (value: string) => value.trim() ? Number(value) : NaN;
const initialWeeks = () => EXAMPLE_FOUNDER_CAPACITY.weeks.map(week => Object.fromEntries(Object.entries(week).map(([key, value]) => [key, String(value)])) as Record<keyof FounderWeek, string>);

export default function FounderCapacityWorksheet() {
  const id = useId();
  const [weeks, setWeeks] = useState(initialWeeks);
  const [laterSupport, setLaterSupport] = useState(String(EXAMPLE_FOUNDER_CAPACITY.laterSupport));
  const [laterAvailable, setLaterAvailable] = useState(String(EXAMPLE_FOUNDER_CAPACITY.laterAvailable));
  const [notes, setNotes] = useState("");
  const [downloadError, setDownloadError] = useState("");
  let result: ReturnType<typeof calculateFounderCapacity> | undefined, exportText = "";
  try {
    const plan = { weeks: weeks.map(week => Object.fromEntries(Object.entries(week).map(([key, value]) => [key, number(value)])) as FounderWeek),
      laterSupport: number(laterSupport), laterAvailable: number(laterAvailable) };
    result = calculateFounderCapacity(plan); exportText = founderCapacityText(plan, notes);
  } catch { result = undefined; exportText = ""; }

  function download() {
    if (!result || !exportText) return;
    let url: string | undefined;
    try {
      url = URL.createObjectURL(new Blob([exportText], { type: "text/plain;charset=utf-8" }));
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = "mlai-founder-capacity.txt";
      document.body.appendChild(anchor); anchor.click(); anchor.remove(); setDownloadError("");
    } catch { setDownloadError("Download unavailable. Open the copyable export below and save it yourself."); }
    finally { if (url) setTimeout(() => URL.revokeObjectURL(url!), 1000); }
  }
  return <section id="founder-capacity-worksheet" data-clarity-mask="true" aria-labelledby={`${id}-heading`} className="not-prose my-10 scroll-mt-24 rounded-3xl border border-gray-300 bg-white p-5 text-gray-950 sm:p-8">
    <h2 id={`${id}-heading`} className="text-2xl font-black">Does this four-week project fit?</h2>
    <p className="mt-3 text-sm leading-6">Start with the fictional example, then replace the assumptions. Hours available must already exclude protected startup work. Receipts and direct outlays are AUD; the example excludes GST. Use a consistent GST basis for your own figures. This is not a quote, financial advice, profit or runway forecast.</p>
    <p className="mt-2 text-sm leading-6">Entries are held in this page's memory and lost on refresh. This worksheet does not send them to Studio or analytics; download or copy a record to keep it. Avoid confidential information on this analytics-enabled website.</p>
    <details className="mt-5">
      <summary className="cursor-pointer font-bold underline">Edit weekly hours and cash assumptions</summary>
      <div className="mt-4 space-y-5">{weeks.map((week, index) => <fieldset key={index} className="rounded-xl border border-gray-300 p-4">
        <legend className="px-2 font-black">Week {index + 1}</legend>
        <div className="grid gap-4 sm:grid-cols-2">{FOUNDER_WEEK_FIELDS.map(field => <label key={field.key} htmlFor={`${id}-${index}-${field.key}`} className="text-sm font-bold">
          {field.label}
          <input id={`${id}-${index}-${field.key}`} aria-label={`Week ${index + 1} ${field.label}`} aria-describedby={`${id}-${index}-${field.key}-help`} type="number" min="0" max={field.money ? 1_000_000 : 168} step="0.01" value={week[field.key]} onChange={event => { const value = event.target.value; setWeeks(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, [field.key]: value } : row)); }} className="mt-1 w-full rounded-lg border border-gray-400 p-2 focus:outline-2 focus:outline-purple-700" />
          <span id={`${id}-${index}-${field.key}-help`} className="mt-1 block font-normal leading-5 text-gray-600">{field.hint}</span>
        </label>)}</div>
      </fieldset>)}</div>
    </details>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold" htmlFor={`${id}-support`}>Support hours required after week 4
        <input id={`${id}-support`} type="number" min="0" max="1000" step="0.01" value={laterSupport} onChange={event => setLaterSupport(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-400 p-2" />
      </label>
      <label className="text-sm font-bold" htmlFor={`${id}-later`}>Hours reserved for that later support
        <input id={`${id}-later`} type="number" min="0" max="1000" step="0.01" value={laterAvailable} onChange={event => setLaterAvailable(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-400 p-2" />
      </label>
    </div>
    <p className="mt-2 text-sm text-gray-600">Record the actual support dates and exclusions in your brief. Later cash costs/receipts are outside this four-week cash calculation.</p>
    <div className="mt-6 rounded-xl bg-gray-50 p-4" aria-live="polite" aria-atomic="true">
      {result ? <>
        <p className="font-black">{result.hasCapacityShortfall ? "Resolve the capacity shortfall before committing" : "No arithmetic capacity shortfall—not an approval"}</p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><dt>Total hours available / planned</dt><dd className="font-bold">{result.available.toFixed(2)} / {result.committed.toFixed(2)}</dd></div>
          <div><dt>Overloaded weeks</dt><dd className="font-bold">{result.shortWeeks.join(", ") || "None in these inputs"}</dd></div>
          <div><dt>Later support hours remaining</dt><dd className="font-bold">{result.laterSupportBalance.toFixed(2)}</dd></div>
          <div><dt>Net project cash in four weeks</dt><dd className="font-bold">{money(result.netProjectCash)}</dd></div>
          <div><dt>Largest project cash gap (outlays first)</dt><dd className="font-bold">{money(result.largestCashGap)}</dd></div>
        </dl>
        <p className="mt-4 text-sm leading-6">Cash starts at zero; each week's outlays occur before its receipts in this scenario. This is not your bank balance or a funding recommendation. Founder time, tax, overhead, financing and other business commitments are not valued. Later spare hours cannot repair an earlier deadline.</p>
      </> : <p role="alert">Complete all fields with non-negative numbers and at most two decimal places. Weekly hours are capped at 168 per field; cash at A$1,000,000 per field; later hours at 1,000. No result is retained for invalid input.</p>}
    </div>
    {result && <>
      <p className="mt-4 text-sm">Swipe the table sideways on small screens, or focus it and use the arrow keys.</p>
      <div role="region" aria-label="Weekly capacity and cash results" tabIndex={0} className="mt-2 overflow-x-auto scroll-mt-20"><table className="w-full min-w-[680px] text-left text-sm">
        <caption className="mb-3 text-left">Your current assumptions, not measured or agreed outcomes</caption>
        <thead><tr>{["Week", "Available h", "Planned h", "Hours left", "Before receipts A$", "Closing project cash A$"].map(label => <th key={label} className="border-b p-2">{label}</th>)}</tr></thead>
        <tbody>{result.weeks.map(week => <tr key={week.week}><th className="border-b p-2">{week.week}</th>{[week.available, week.committed, week.balance, week.beforeReceipts, week.cumulativeCash].map((value, index) => <td key={index} className="border-b p-2">{value.toFixed(2)}</td>)}</tr>)}</tbody>
      </table></div>
    </>}
    <label htmlFor={`${id}-notes`} className="mt-5 block font-bold">Protected milestones and scope notes (optional)</label>
    <textarea id={`${id}-notes`} maxLength={1500} rows={3} value={notes} onChange={event => setNotes(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-400 p-3" />
    <button type="button" disabled={!result} onClick={download} className="mt-4 rounded-full bg-purple-800 px-5 py-3 font-bold text-white disabled:opacity-40">Download my capacity worksheet (.txt)</button>
    {downloadError && <p role="alert" className="mt-3 text-red-800">{downloadError}</p>}
    {result && <details className="mt-4"><summary className="cursor-pointer font-bold underline">View or copy my worksheet</summary>
      <label htmlFor={`${id}-export`} className="mt-3 block text-sm font-bold">Capacity export (read only)</label>
      <textarea id={`${id}-export`} readOnly value={exportText} rows={14} className="mt-2 w-full rounded-xl border border-gray-400 p-3 font-mono text-sm" />
    </details>}
    <p className="mt-4 text-sm leading-6">A positive calculation does not settle scope, legal terms, qualifications, project availability or selection. The Studio application below opens separately; these numbers and notes are not attached.</p>
  </section>;
}

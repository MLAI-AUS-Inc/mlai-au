import { useId, useState } from 'react';
import { blankDeliveryRecord, DELIVERY_CONTEXT_FIELDS, deliveryRecordText, displayMinutes, EFFORT_FIELDS, FICTIONAL_DELIVERY, parseEffortMinutes, PROVENANCE_LABELS, summarizeDelivery } from '~/lib/delivery-effort';
import type { DeliveryRecord, EffortTimes } from '~/lib/delivery-effort';

const inputTimes = (record: DeliveryRecord) => Object.fromEntries(EFFORT_FIELDS.map(field => [field.key, record.times[field.key] === null ? '' : String(record.times[field.key])])) as Record<keyof EffortTimes, string>;

export default function DeliveryEffortWorksheet() {
  const id = useId();
  const [context, setContext] = useState({ ...FICTIONAL_DELIVERY.context });
  const [times, setTimes] = useState(inputTimes(FICTIONAL_DELIVERY));
  const [provenance, setProvenance] = useState<DeliveryRecord['provenance']>('fictional');
  const [downloadError, setDownloadError] = useState('');
  const markEdited = () => { if (provenance !== 'user-entered') setProvenance('adapted-fictional'); };
  let summary: ReturnType<typeof summarizeDelivery> | undefined, exported = '', error = '';
  try {
    const numeric = Object.fromEntries(EFFORT_FIELDS.map(field => {
      try { return [field.key, parseEffortMinutes(times[field.key])]; }
      catch (reason) { throw new TypeError(field.label + ': ' + (reason instanceof Error ? reason.message : 'Check this entry.')); }
    })) as EffortTimes;
    summary = summarizeDelivery(numeric);
    exported = deliveryRecordText({ provenance, times: numeric, context });
  } catch (reason) { summary = undefined; error = reason instanceof Error ? reason.message : 'Check the record fields.'; }

  function load(record: DeliveryRecord) {
    setContext({ ...record.context }); setTimes(inputTimes(record)); setProvenance(record.provenance); setDownloadError('');
  }
  function download() {
    if (!exported) return;
    let url: string | undefined;
    try {
      url = URL.createObjectURL(new Blob([exported], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a'); link.href = url; link.download = 'mlai-delivery-effort-record.txt';
      document.body.appendChild(link); link.click(); link.remove(); setDownloadError('');
    } catch { setDownloadError('Download unavailable. Use the copyable record below.'); }
    finally { if (url) setTimeout(() => URL.revokeObjectURL(url!), 1000); }
  }
  return <section id="delivery-effort-worksheet" aria-labelledby={`${id}-heading`} data-clarity-mask="true" className="not-prose my-8 scroll-mt-28 rounded-3xl border border-gray-300 bg-white p-5 text-gray-950 sm:p-8">
    <h3 id={`${id}-heading`} className="text-2xl font-black">Build your delivery-effort record</h3>
    <p className="mt-3 text-sm leading-6">The starting CSV example and its times are fictional. Start a blank record for your own task; record time prospectively and keep missing values blank. Only an explicit 0 means zero minutes. This does not measure time or verify your entries.</p>
    <p className="mt-2 text-sm leading-6">Held in this page's memory and lost on refresh. This worksheet does not store entries, send them to Studio or include them in analytics events. Avoid confidential information on this analytics-enabled site; download or copy your record to keep it.</p>
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={() => load(blankDeliveryRecord())} className="rounded-full border border-gray-500 px-4 py-2 text-sm font-bold">Replace with a blank record</button>
      <button type="button" onClick={() => load(FICTIONAL_DELIVERY)} className="rounded-full border border-gray-500 px-4 py-2 text-sm font-bold">Replace with fictional example</button>
    </div>
    <p className="mt-3 text-sm font-bold" role="status">{PROVENANCE_LABELS[provenance]}</p>
    <fieldset className="mt-5"><legend className="font-black">Record time in minutes</legend>
      <p className="mt-1 text-sm leading-6">Author effort includes implementation and self-checks. Reviewer effort and post-feedback corrections are separate and counted once. Elapsed time includes waiting; queue time is part of it, never added to person-minutes. A HOLD is time to a decision, not time to an accepted delivery. Describe excluded work below.</p>
      <p id={`${id}-time-help`} className="mt-2 text-sm leading-6">Use 0–100000 minutes with up to two decimal places, such as 12.5. Do not use commas or exponents. Blank means not recorded; a partial or invalid number cannot be exported.</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">{EFFORT_FIELDS.map(field => <label key={field.key} htmlFor={`${id}-${field.key}`} className="text-sm font-bold">{field.label}
        <input id={`${id}-${field.key}`} type="text" inputMode="decimal" aria-describedby={`${id}-time-help`} value={times[field.key]} onChange={event => { const value = event.target.value; markEdited(); setTimes(current => ({ ...current, [field.key]: value })); }} className="mt-1 w-full rounded-lg border border-gray-400 p-2" />
      </label>)}</div>
    </fieldset>
    <div className="mt-5 rounded-xl bg-gray-100 p-4" aria-live="polite" aria-atomic="true">
      {summary ? <>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt>Known active effort subtotal</dt><dd className="font-bold">{summary.missingEffortFields.length === 3 ? 'No active effort recorded' : displayMinutes(summary.knownPersonMinutes)}</dd></div>
          <div><dt>Recorded active effort total</dt><dd className="font-bold">{summary.totalPersonMinutes === null ? 'Unavailable — missing effort' : displayMinutes(summary.totalPersonMinutes)}</dd></div>
          <div><dt>Elapsed start-to-decision time</dt><dd className="font-bold">{displayMinutes(summary.elapsedMinutes)}</dd></div>
          <div><dt>Queue time within that interval</dt><dd className="font-bold">{displayMinutes(summary.queueMinutes)}</dd></div>
        </dl>
        <p className="mt-3 text-sm">{summary.missingEffortFields.length ? 'Missing active effort: ' + summary.missingEffortFields.join(', ') + '. The subtotal is not a complete total.' : 'All three active-effort fields are filled; excluded work still matters. This is not a productivity or approval verdict.'}</p>
        {summary.queueIntervalVerified === false && <p className="mt-2 text-sm">Elapsed time is missing, so the queue interval cannot be checked.</p>}
      </> : <p role="alert">{error} No previous result is retained.</p>}
    </div>
    <details className="mt-5"><summary className="cursor-pointer font-bold underline">Edit scope, checks, decision and handover</summary>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{DELIVERY_CONTEXT_FIELDS.map(field => <label key={field.key} htmlFor={`${id}-${field.key}`} className="text-sm font-bold">{field.label}
        <textarea id={`${id}-${field.key}`} maxLength={1500} rows={4} value={context[field.key]} onChange={event => { const value = event.target.value; markEdited(); setContext(current => ({ ...current, [field.key]: value })); }} className="mt-1 w-full rounded-lg border border-gray-400 p-2 font-normal" />
      </label>)}</div>
    </details>
    <button type="button" disabled={!exported} onClick={download} className="mt-5 rounded-full bg-purple-800 px-5 py-3 font-bold text-white disabled:opacity-40">Download my delivery record (.txt)</button>
    {downloadError && <p role="alert" className="mt-3 text-red-800">{downloadError}</p>}
    {exported && <details className="mt-4"><summary className="cursor-pointer font-bold underline">View or copy my delivery record</summary>
      <label htmlFor={`${id}-export`} className="mt-3 block text-sm font-bold">Delivery record export (read only)</label>
      <textarea id={`${id}-export`} readOnly value={exported} rows={14} className="mt-2 w-full rounded-xl border border-gray-400 p-3 font-mono text-sm" />
    </details>}
    <p className="mt-4 text-sm leading-6">A review decision is your recorded statement, not approval provided by this tool. Studio applications open separately and do not receive this record automatically.</p>
  </section>;
}

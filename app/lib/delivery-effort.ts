export const DELIVERY_EFFORT_VERSION = 'delivery-effort-v3';
export const EFFORT_FIELDS = [
  { key: 'author', label: 'Author implementation and self-check minutes' },
  { key: 'reviewer', label: 'Reviewer minutes' },
  { key: 'rework', label: 'Corrections and re-check minutes' },
  { key: 'elapsed', label: 'Elapsed start-to-decision minutes' },
  { key: 'queue', label: 'Queue minutes within that elapsed interval' },
] as const;
export const DELIVERY_CONTEXT_FIELDS = [
  { key: 'task', label: 'Task and scope' },
  { key: 'revision', label: 'Repository or artifact version' },
  { key: 'tool', label: 'AI tool, model, date and permitted actions' },
  { key: 'permission', label: 'Data and sharing permission' },
  { key: 'criteria', label: 'Acceptance criteria fixed before work' },
  { key: 'checks', label: 'Checks actually run and results' },
  { key: 'corrections', label: 'Rejected suggestions and review corrections' },
  { key: 'decision', label: 'Recorded decision, reviewer and unresolved limits' },
  { key: 'handover', label: 'Run instructions and handover evidence' },
  { key: 'exclusions', label: 'Excluded effort, costs and comparison limits' },
] as const;
export type EffortTimes = Record<typeof EFFORT_FIELDS[number]['key'], number | null>;
export type DeliveryContext = Record<typeof DELIVERY_CONTEXT_FIELDS[number]['key'], string>;
export type DeliveryRecord = { provenance: 'fictional' | 'adapted-fictional' | 'user-entered'; times: EffortTimes; context: DeliveryContext };
export const PROVENANCE_LABELS = {
  fictional: 'Fictional teaching example; no work or review represented as performed',
  'adapted-fictional': 'Edited fictional example; replace all example context before using as your own record',
  'user-entered': 'User-entered record; not verified by MLAI and not a release approval',
};
export const FICTIONAL_DELIVERY: DeliveryRecord = {
  provenance: 'fictional',
  times: { author: 45, reviewer: 35, rework: 25, elapsed: 240, queue: 120 },
  context: {
    task: 'Fictional CSV import change: reject missing required columns, preserve valid rows and explain errors without exposing private input.',
    revision: 'illustrative-csv-import-v1; no repository or implementation supplied',
    tool: 'Invented AI-assisted scenario; no actual tool/model run. No access to client systems or sending actions.',
    permission: 'Invented inputs only. No client data or portfolio permission is implied.',
    criteria: 'A: reject missing required columns. B: preserve valid rows. C: error messages do not include private row contents.',
    checks: 'Illustration only: A and B assumed to pass; C not run. These are not actual test results.',
    corrections: 'Invented review comment: proposed error text exposed the input row. Removing that text still needs a regression check.',
    decision: 'HOLD in the fictional scenario: criterion C remains untested. No real reviewer has approved this example.',
    handover: 'No executable CSV project is supplied. Keep the illustrative change unapproved; use a permitted real task to practise the recording process.',
    exclusions: 'Figures are invented. Coordination, handover, later defects, software cost and maintenance are excluded. Rework is counted once. No controlled comparison or productivity/savings claim.',
  },
};
export const FICTIONAL_BASELINE: EffortTimes = { author: 80, reviewer: 15, rework: 5, elapsed: null, queue: null };

export function blankDeliveryRecord(): DeliveryRecord {
  return { provenance: 'user-entered', times: { author: null, reviewer: null, rework: null, elapsed: null, queue: null },
    context: Object.fromEntries(DELIVERY_CONTEXT_FIELDS.map(field => [field.key, ''])) as DeliveryContext };
}
/** Preserve blank versus malformed input; never let native number-input sanitising erase it. */
export function parseEffortMinutes(raw: string): number | null {
  if (typeof raw !== 'string') throw new TypeError('Enter minutes as decimal text, or leave blank for not recorded.');
  const text = raw.trim();
  if (!text) return null;
  if (!/^(?:\d+|\d*\.\d{1,2})$/.test(text)) {
    throw new TypeError('Use a decimal number such as 12.5, with at most two decimal places. No commas, signs or exponents.');
  }
  return minuteUnits(Number(text))! / 100;
}
function minuteUnits(value: number | null) {
  if (value === null) return null;
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100_000 || Math.abs(value * 100 - Math.round(value * 100)) > 1e-6) {
    throw new TypeError('Use blank for not recorded, or 0–100000 minutes with at most two decimal places.');
  }
  return Math.round(value * 100);
}
export function summarizeDelivery(times: EffortTimes) {
  if (!times || Object.keys(times).sort().join(',') !== EFFORT_FIELDS.map(field => field.key).sort().join(',')) throw new TypeError('Provide the five time fields.');
  const values = Object.fromEntries(EFFORT_FIELDS.map(field => [field.key, minuteUnits(times[field.key])])) as Record<keyof EffortTimes, number | null>;
  if (values.queue !== null && values.elapsed !== null && values.queue > values.elapsed) throw new TypeError('Queue time cannot exceed its containing elapsed interval.');
  const active = ['author', 'reviewer', 'rework'] as const;
  const missing = active.filter(key => values[key] === null);
  const known = active.reduce((total, key) => total + (values[key] ?? 0), 0) / 100;
  return { knownPersonMinutes: known, totalPersonMinutes: missing.length ? null : known,
    missingEffortFields: missing, elapsedMinutes: times.elapsed, queueMinutes: times.queue,
    queueIntervalVerified: values.queue === null ? null : values.elapsed !== null };
}
export function compareDeliveryEffort(before: EffortTimes, after: EffortTimes) {
  const baseline = summarizeDelivery(before).totalPersonMinutes, candidate = summarizeDelivery(after).totalPersonMinutes;
  const change = baseline === null || candidate === null ? null : (Math.round(candidate * 100) - Math.round(baseline * 100)) / 100;
  return { baseline, candidate, changePersonMinutes: change,
    percentageChange: change === null || baseline === 0 ? null : change / baseline! * 100 };
}
export const displayMinutes = (value: number | null) => value === null ? 'Not recorded' : (value === 0 ? 0 : value).toLocaleString('en-AU', { maximumFractionDigits: 2 }) + ' min';

export function deliveryRecordText(record: DeliveryRecord) {
  if (!record || Object.keys(record).sort().join(',') !== 'context,provenance,times' || !Object.hasOwn(PROVENANCE_LABELS, record.provenance) ||
      !record.context || Object.keys(record.context).sort().join(',') !== DELIVERY_CONTEXT_FIELDS.map(field => field.key).sort().join(',')) throw new TypeError('Provide a complete delivery record.');
  for (const value of Object.values(record.context)) if (typeof value !== 'string' || value.length > 1500 || /\u0000/.test(value)) throw new TypeError('Context fields must be text of at most 1500 characters.');
  const summary = summarizeDelivery(record.times);
  return [
    'MLAI AI-assisted delivery record — ' + DELIVERY_EFFORT_VERSION,
    PROVENANCE_LABELS[record.provenance], '',
    ...DELIVERY_CONTEXT_FIELDS.flatMap(field => [field.label + ':', record.context[field.key].trim() || 'Not recorded', '']),
    'Time recording:',
    ...EFFORT_FIELDS.map(field => field.label + ': ' + displayMinutes(record.times[field.key])), '',
    'Known active effort subtotal: ' + (summary.missingEffortFields.length === 3 ? 'No active effort recorded' : displayMinutes(summary.knownPersonMinutes)),
    'Recorded active effort total: ' + (summary.totalPersonMinutes === null ? 'Unavailable — one or more active-effort fields are not recorded' : displayMinutes(summary.totalPersonMinutes)),
    'Missing active-effort fields: ' + (summary.missingEffortFields.join(', ') || 'None in these inputs'),
    summary.queueIntervalVerified === false ? 'Queue time is recorded but its containing elapsed interval is not; interval consistency is unverified.' : 'Queue time is a subset of elapsed time, not extra person-effort.', '',
    'The subtotal sums known values only; missing values are not measured zeros.',
    'Person-minutes can overlap across people and are not calendar duration. Count review/rework once.',
    'Totals cover only the recorded categories. Describe excluded coordination, handover, costs and later defects.',
    'A filled record, passing tests or a stated decision is not independently verified approval, productivity gain or proof of causal impact.',
    'Review private data, prompts, paths and client permission before sharing. This worksheet sends no record to Studio.', '',
  ].join('\n');
}

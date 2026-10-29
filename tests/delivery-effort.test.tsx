import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import DeliveryEffortWorksheet from '../app/components/articles/DeliveryEffortWorksheet';
import { blankDeliveryRecord, compareDeliveryEffort, DELIVERY_CONTEXT_FIELDS, deliveryRecordText, displayMinutes, EFFORT_FIELDS, FICTIONAL_BASELINE, FICTIONAL_DELIVERY, parseEffortMinutes, summarizeDelivery } from '../app/lib/delivery-effort';
import type { DeliveryRecord, EffortTimes } from '../app/lib/delivery-effort';

test('decimal input keeps blank, zero, fractional values and invalid text distinct', () => {
  for (const input of ['', ' ', '\t\n']) expect(parseEffortMinutes(input)).toBeNull();
  for (const [input, value] of [['0', 0], ['0.00', 0], [' 12.50 ', 12.5], ['.5', 0.5], ['100000', 100000], ['000.01', 0.01]] as const) {
    expect(parseEffortMinutes(input)).toBe(value);
  }
  for (const input of ['e', '-', '.', '1.', '-0', '+1', '1e2', '0x10', '1,000', '1,5', 'NaN', 'Infinity', '100001', '0.001', '1.000', '1 2', '12min']) {
    expect(() => parseEffortMinutes(input), input).toThrow();
  }
  for (const input of [null, undefined, 0, false]) expect(() => parseEffortMinutes(input as unknown as string)).toThrow();
});

test('fictional comparison uses total person-effort rather than authoring alone', () => {
  expect(summarizeDelivery(FICTIONAL_DELIVERY.times)).toEqual({ knownPersonMinutes: 105, totalPersonMinutes: 105, missingEffortFields: [], elapsedMinutes: 240, queueMinutes: 120, queueIntervalVerified: true });
  expect(compareDeliveryEffort(FICTIONAL_BASELINE, FICTIONAL_DELIVERY.times)).toEqual({ baseline: 100, candidate: 105, changePersonMinutes: 5, percentageChange: 5 });
});
test('person-minutes can overlap and elapsed/queue time is never added or subtracted', () => {
  const result = summarizeDelivery({ author: 90, reviewer: 60, rework: 10, elapsed: 100, queue: 20 });
  expect(result.totalPersonMinutes).toBe(160);
  expect(result.elapsedMinutes).toBe(100);
  expect(result.queueMinutes).toBe(20);
});
test('unknown reviewer effort retains only a known subtotal and blocks a total comparison', () => {
  const times = { ...FICTIONAL_DELIVERY.times, reviewer: null };
  expect(summarizeDelivery(times).knownPersonMinutes).toBe(70);
  expect(summarizeDelivery(times).totalPersonMinutes).toBeNull();
  expect(summarizeDelivery(times).missingEffortFields).toEqual(['reviewer']);
  expect(compareDeliveryEffort(FICTIONAL_BASELINE, times)).toEqual({ baseline: 100, candidate: null, changePersonMinutes: null, percentageChange: null });
});
test('recorded zero and unrecorded time remain different, including zero denominators', () => {
  expect(summarizeDelivery({ ...FICTIONAL_DELIVERY.times, reviewer: 0 }).totalPersonMinutes).toBe(70);
  const zero = { author: 0, reviewer: 0, rework: 0, elapsed: 0, queue: 0 };
  expect(compareDeliveryEffort(zero, FICTIONAL_DELIVERY.times).changePersonMinutes).toBe(105);
  expect(compareDeliveryEffort(zero, FICTIONAL_DELIVERY.times).percentageChange).toBeNull();
  expect(compareDeliveryEffort(zero, zero).percentageChange).toBeNull();
  expect(displayMinutes(-0)).toBe('0 min');
});
test('all missing time is exported as missing, never a measured zero', () => {
  const record = blankDeliveryRecord();
  expect(summarizeDelivery(record.times).totalPersonMinutes).toBeNull();
  const text = deliveryRecordText(record);
  expect(text).toContain('No active effort recorded');
  expect(text).toContain('Recorded active effort total: Unavailable');
  expect(text).not.toContain(': 0 min');
  for (const field of EFFORT_FIELDS) expect(text).toContain(field.label + ': Not recorded');
});
test('hundredths do not accumulate floating-point error or mutate their inputs', () => {
  const times = { author: 0.1, reviewer: 0.2, rework: 0.3, elapsed: 1, queue: 0.4 };
  const original = JSON.stringify(times);
  expect(summarizeDelivery(times).totalPersonMinutes).toBe(0.6);
  expect(compareDeliveryEffort(times, { ...times, rework: 0.1 }).changePersonMinutes).toBe(-0.2);
  expect(JSON.stringify(times)).toBe(original);
});
for (const field of EFFORT_FIELDS) test('invalid ' + field.key + ' minutes cannot produce a result', () => {
  for (const value of [-1, 100001, 1.001, NaN, Infinity, undefined, '35', false]) {
    expect(() => summarizeDelivery({ ...FICTIONAL_DELIVERY.times, [field.key]: value } as EffortTimes)).toThrow();
  }
});
test('missing/extra fields and inconsistent queue intervals fail explicitly', () => {
  for (const value of [null, {}, [], { ...FICTIONAL_DELIVERY.times, extra: 2 }, { ...FICTIONAL_DELIVERY.times, elapsed: 119 }]) expect(() => summarizeDelivery(value as EffortTimes)).toThrow();
  const result = summarizeDelivery({ ...FICTIONAL_DELIVERY.times, elapsed: null });
  expect(result.queueMinutes).toBe(120);
  expect(result.queueIntervalVerified).toBe(false);
  expect(deliveryRecordText({ ...FICTIONAL_DELIVERY, times: { ...FICTIONAL_DELIVERY.times, elapsed: null } })).toContain('interval consistency is unverified');
});
test('complete exports preserve every current field, provenance and review limitation', () => {
  const context = { ...FICTIONAL_DELIVERY.context, task: 'A permitted test record', decision: 'Not reviewed' };
  const record: DeliveryRecord = { provenance: 'user-entered', context, times: { ...FICTIONAL_DELIVERY.times, author: 12.5, reviewer: null } };
  const text = deliveryRecordText(record);
  expect(text).toContain('User-entered record; not verified by MLAI');
  for (const field of DELIVERY_CONTEXT_FIELDS) expect(text).toContain(field.label + ':\n' + context[field.key]);
  expect(text).toContain('Author implementation and self-check minutes: 12.5 min');
  expect(text).toContain('Reviewer minutes: Not recorded');
  expect(text).toContain('Known active effort subtotal: 37.5 min');
  expect(text).not.toContain('Known active effort subtotal: 105 min');
  expect(text).toContain('not independently verified approval');
});
test('invalid record provenance, fields and oversized context are rejected', () => {
  for (const value of [null, {}, { ...FICTIONAL_DELIVERY, provenance: 'approved' }, { ...FICTIONAL_DELIVERY, extra: true }, { ...FICTIONAL_DELIVERY, context: {} },
    { ...FICTIONAL_DELIVERY, context: { ...FICTIONAL_DELIVERY.context, task: 'a'.repeat(1501) } },
    { ...FICTIONAL_DELIVERY, context: { ...FICTIONAL_DELIVERY.context, task: '\0' } }]) expect(() => deliveryRecordText(value as DeliveryRecord)).toThrow();
});
test('static downloads equal the same formatter used by the editable worksheet', () => {
  expect(readFileSync('public/downloads/delivery-effort-example.txt', 'utf8')).toBe(deliveryRecordText(FICTIONAL_DELIVERY));
  expect(readFileSync('public/downloads/delivery-effort-template.txt', 'utf8')).toBe(deliveryRecordText(blankDeliveryRecord()));
});
test('server render supplies the fictional record, usable values, labels and copy fallback', () => {
  const html = renderToStaticMarkup(<DeliveryEffortWorksheet />);
  for (const text of ['105 min', '240 min', '120 min', 'Fictional teaching example', 'No real reviewer', 'data-clarity-mask="true"', 'Download my delivery record', 'View or copy my delivery record', 'not a productivity or approval verdict', 'lost on refresh']) expect(html.includes(text), text).toBe(true);
  for (const field of EFFORT_FIELDS) expect(html).toContain(field.label);
  for (const field of DELIVERY_CONTEXT_FIELDS) expect(html).toContain(field.label);
  expect((html.match(/inputMode="decimal"/g) || []).length).toBe(5);
  expect(html).not.toContain('type="number"');
  expect(html).not.toContain('localStorage');
});

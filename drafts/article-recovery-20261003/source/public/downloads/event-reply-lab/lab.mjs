// Read-only local teaching program. There is no sending/booking tool or attendee source.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { MODEL_VERSION, train, rulesBaseline, tokens } from './model.mjs';

export const VERSION = 'event-reply-lab-v1';
const exact = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) &&
  Object.keys(value).sort().join(',') === keys.split(',').sort().join(',');
const id = value => typeof value === 'string' && /^[a-z0-9-]{1,60}$/.test(value);
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) &&
  Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value.replace('Z', '.000Z');

export function validateCatalog(catalog) {
  if (!exact(catalog, 'version,validUntil,notices') || !id(catalog.version) || !date(catalog.validUntil) ||
      !Array.isArray(catalog.notices) || !catalog.notices.length || catalog.notices.length > 20) throw new TypeError('Invalid notice catalog');
  const ids = new Set();
  for (const notice of catalog.notices) {
    if (!exact(notice, 'id,eventId,time,location,untrustedText') || !id(notice.id) || !id(notice.eventId) || ids.has(notice.id) ||
        typeof notice.untrustedText !== 'string' || notice.untrustedText.length > 2000 ||
        ![notice.time, notice.location].every(value => value === null ||
          (typeof value === 'string' && value.trim() && value.length <= 160 && !/[\r\n\x00-\x1f]/.test(value)))) throw new TypeError('Invalid or duplicate notice');
    ids.add(notice.id);
  }
}

export async function reply(request, catalog, { classify = rulesBaseline, asOf, timeoutMs = 50 } = {}) {
  if (!exact(request, 'eventId,question,snapshotVersion') || !id(request.eventId) || !id(request.snapshotVersion) ||
      typeof request.question !== 'string' || !request.question.trim() || request.question.length > 500) throw new TypeError('Use only eventId, question and snapshotVersion');
  validateCatalog(catalog);
  if (!date(asOf) || typeof classify !== 'function' || !Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 1000) throw new TypeError('Invalid clock, classifier or timeout');
  const result = (status, reason, intent = 'other', draft = null, citations = []) => ({ status, reason, intent, draft, citations });
  if (request.snapshotVersion !== catalog.version) return result('cannot-answer', 'snapshot-mismatch');
  if (Date.parse(asOf) >= Date.parse(catalog.validUntil)) return result('cannot-answer', 'snapshot-expired');
  // This narrow teaching filter is not a comprehensive privacy/intention detector.
  // The stronger boundary is structural: no personal-data source or external action exists.
  if (/\b(email|attendee|phone|send|book|register|pay|payment)\b/i.test(request.question)) return result('refused', 'outside-capabilities');
  const notices = structuredClone(catalog.notices.filter(notice => notice.eventId === request.eventId));
  if (!notices.length) return result('cannot-answer', 'event-not-found');
  let proposed, timer;
  try {
    proposed = await Promise.race([
      Promise.resolve().then(() => classify(request.question)),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), timeoutMs); }),
    ]);
    if (!proposed || !['time', 'location', 'other'].includes(proposed.intent) ||
        Object.keys(proposed).some(key => !['intent', 'logMargin'].includes(key)) ||
        (Object.hasOwn(proposed, 'logMargin') && !Number.isFinite(proposed.logMargin))) throw new Error('Invalid classifier output');
  } catch { return result('cannot-answer', 'classifier-failure'); }
  finally { clearTimeout(timer); }
  if (proposed.intent === 'other') return result('cannot-answer', 'unsupported-question');
  const intent = proposed.intent;
  if (notices.some(notice => notice[intent] === null)) return result('cannot-answer', 'missing-field', intent);
  if (new Set(notices.map(notice => notice[intent])).size !== 1) return result('cannot-answer', 'conflicting-evidence', intent);
  const citations = notices.map(notice => ({ noticeId: notice.id, field: intent, value: notice[intent] }));
  // Exact structured field, not free-form model prose or the untrusted notice text.
  return result('needs-human-review', 'check-question-and-evidence', intent,
    `${intent === 'time' ? 'Start' : 'Location'}: ${notices[0][intent]}.`, citations);
}

export async function runExperiment(fixture) {
  if (!exact(fixture, 'version,provenance,training,catalog,asOf,evaluation') || !id(fixture.version) ||
      !Array.isArray(fixture.evaluation) || !fixture.evaluation.length || fixture.evaluation.length > 100) throw new TypeError('Invalid experiment fixture');
  const classifier = train(fixture.training);
  const trainingTexts = new Set(fixture.training.map(row => tokens(row.text).join(' ')));
  const ids = new Set(), texts = new Set(), cases = [];
  for (const row of fixture.evaluation) {
    if (!exact(row, 'id,question,expectedIntent') || !id(row.id) || ids.has(row.id) ||
        typeof row.question !== 'string' || !row.question.trim() || row.question.length > 500 ||
        !['time', 'location', 'other'].includes(row.expectedIntent)) throw new TypeError('Invalid evaluation row');
    const key = tokens(row.question).join(' ');
    if (!key || trainingTexts.has(key) || texts.has(key)) throw new TypeError('Duplicate or training-overlap evaluation text');
    ids.add(row.id); texts.add(key);
    const request = { eventId: 'demo-a', question: row.question, snapshotVersion: fixture.catalog.version };
    const baselineIntent = rulesBaseline(row.question).intent;
    const candidateIntent = classifier(row.question).intent;
    cases.push({ id: row.id, question: row.question, expectedIntent: row.expectedIntent, baselineIntent, candidateIntent,
      baselineReply: await reply(request, fixture.catalog, { asOf: fixture.asOf }),
      candidateReply: await reply(request, fixture.catalog, { classify: classifier, asOf: fixture.asOf }) });
  }
  return { version: VERSION, modelVersion: MODEL_VERSION, fixtureVersion: fixture.version,
    noticeVersion: fixture.catalog.version, asOf: fixture.asOf,
    scope: 'Invented development cases, not an independent or representative benchmark. Intent matching is not answer quality.',
    trainingExamples: fixture.training.length,
    routing: { total: cases.length, baselineCorrect: cases.filter(row => row.baselineIntent === row.expectedIntent).length,
      candidateCorrect: cases.filter(row => row.candidateIntent === row.expectedIntent).length }, cases };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length > 3) throw new Error('Usage: node lab.mjs [fixture.json]');
    const fixture = JSON.parse(readFileSync(process.argv[2] ?? new URL('./synthetic-fixture.json', import.meta.url), 'utf8'));
    console.log(JSON.stringify(await runExperiment(fixture), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}

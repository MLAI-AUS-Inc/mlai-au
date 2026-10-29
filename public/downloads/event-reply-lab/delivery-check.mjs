// Acceptance exercise for the fixed, invented v1 brief. Not a general evaluator.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { runExperiment } from './lab.mjs';

export const VERSION = 'startup-builder-delivery-v1';
const exact = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) &&
  Object.keys(value).sort().join(',') === keys.split(',').sort().join(',');
const intents = ['time', 'location', 'other'];
const time = '18 February 2026, 18:00 Australia/Melbourne';
const location = 'Fictional Hall, Room A';
const expectation = (intent, refused = false) => intent === 'other'
  ? { status: refused ? 'refused' : 'cannot-answer', reason: refused ? 'outside-capabilities' : 'unsupported-question', intent, draft: null, citations: [] }
  : { status: 'needs-human-review', reason: 'check-question-and-evidence', intent,
      draft: `${intent === 'time' ? 'Start' : 'Location'}: ${intent === 'time' ? time : location}.`,
      citations: ['notice-1', 'notice-2'].map(noticeId => ({ noticeId, field: intent, value: intent === 'time' ? time : location })) };
// Expectations are specified independently of predictions, with exact question
// identities. Changing labels, dropping a case or substituting a different brief
// cannot silently make the fixed delivery contract pass.
const requirements = [
  ['q1', 'Please tell me when this event will start', 'time', 'Draft the permitted time and timezone, citing both notices.'],
  ['q2', 'Where is this venue located', 'location', 'Draft the permitted location, citing both notices.'],
  ['q3', 'At which hour does it commence', 'time', 'Recognise this selected time paraphrase and draft the permitted time.'],
  ['q4', 'Tell me which hall to meet in', 'location', 'Recognise this selected location paraphrase and draft the permitted location.'],
  ['q5', 'Are tickets still available', 'other', 'Do not invent ticket availability; return no draft.'],
  ['q6', 'Give me an attendee email address', 'other', 'Refuse a personal-data request without a draft or citations.'],
  ['q7', 'What time and where', 'other', 'Abstain on a combined request outside this one-field brief.'],
  ['q8', 'I know the start time; tell me about parking', 'other', 'Do not answer an unsupported parking question with the event time.'],
];

function validateReply(value) {
  if (!exact(value, 'status,reason,intent,draft,citations') ||
      !['needs-human-review', 'cannot-answer', 'refused'].includes(value.status) ||
      !intents.includes(value.intent) || typeof value.reason !== 'string' ||
      !value.reason || value.reason.length > 100 ||
      !(value.draft === null || typeof value.draft === 'string' && value.draft.length <= 500) ||
      !Array.isArray(value.citations) || value.citations.length > 20 ||
      value.citations.some(citation => !exact(citation, 'noticeId,field,value') ||
        ![citation.noticeId, citation.field, citation.value].every(item => typeof item === 'string' && item.length <= 200))) {
    throw new TypeError('Malformed observed reply');
  }
}

export function reviewDelivery(result) {
  if (!exact(result, 'version,modelVersion,fixtureVersion,noticeVersion,asOf,scope,trainingExamples,routing,cases') ||
      result.version !== 'event-reply-lab-v1' || result.modelVersion !== 'event-intent-nb-v1' ||
      result.fixtureVersion !== 'event-reply-fixture-v1' || result.noticeVersion !== 'invented-notices-v1' ||
      result.asOf !== '2026-02-01T12:00:00Z' || result.trainingExamples !== 12 ||
      typeof result.scope !== 'string' || !result.scope || !Array.isArray(result.cases) ||
      result.cases.length !== requirements.length || !exact(result.routing, 'total,baselineCorrect,candidateCorrect')) {
    throw new TypeError('Expected the complete fixed v1 experiment, not another brief or a partial report');
  }
  const seen = new Set();
  for (const row of result.cases) {
    const requirement = requirements.find(item => item[0] === row?.id);
    if (!exact(row, 'id,question,expectedIntent,baselineIntent,candidateIntent,baselineReply,candidateReply') ||
        !requirement || seen.has(row.id) || row.question !== requirement[1] || row.expectedIntent !== requirement[2] ||
        !intents.includes(row.baselineIntent) || !intents.includes(row.candidateIntent)) throw new TypeError('Missing, duplicate or altered acceptance case');
    seen.add(row.id);
    validateReply(row.baselineReply); validateReply(row.candidateReply);
  }
  const routing = { total: requirements.length };
  for (const kind of ['baseline', 'candidate']) routing[`${kind}Correct`] = result.cases.filter(row => row[`${kind}Intent`] === row.expectedIntent).length;
  if (!isDeepStrictEqual(routing, result.routing)) throw new TypeError('Routing summary does not match the observed cases');
  const cases = requirements.map(([id, question, expectedIntent, requirement]) => {
    const observed = result.cases.find(row => row.id === id);
    const expected = expectation(expectedIntent, id === 'q6');
    const summarize = kind => ({
      rawIntent: observed[`${kind}Intent`], routingCorrect: observed[`${kind}Intent`] === expectedIntent,
      matchesRequirement: isDeepStrictEqual(observed[`${kind}Reply`], expected),
      actualStatus: observed[`${kind}Reply`].status, actualDraft: observed[`${kind}Reply`].draft,
    });
    return { id, question, requirement, expectedStatus: expected.status, expectedDraft: expected.draft,
      baseline: summarize('baseline'), candidate: summarize('candidate') };
  });
  const summarize = kind => ({ matched: cases.filter(row => row[kind].matchesRequirement).length,
    total: cases.length, failedCases: cases.filter(row => !row[kind].matchesRequirement).map(row => row.id) });
  const candidate = summarize('candidate');
  return { version: VERSION, experimentVersion: result.version,
    scope: 'Selected invented development cases for one fixed brief. Not customer validation, a representative benchmark or release approval.',
    decision: candidate.failedCases.length ? 'HOLD' : 'REVIEW_REQUIRED',
    rawRouting: routing, baseline: summarize('baseline'), candidate, cases };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 2) throw new Error('Usage: node delivery-check.mjs');
    const fixture = JSON.parse(readFileSync(new URL('./synthetic-fixture.json', import.meta.url), 'utf8'));
    const report = reviewDelivery(await runExperiment(fixture));
    console.log(JSON.stringify(report, null, 2));
    // 2 is the expected refusal to accept this delivery, not a crashed runner.
    if (report.decision === 'HOLD') process.exitCode = 2;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}

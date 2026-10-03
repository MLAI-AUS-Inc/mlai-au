import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { reviewDelivery } from './delivery-check.mjs';
import { runExperiment } from './lab.mjs';

const load = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'));
const result = () => load('./recorded-result.json');

test('executed observations and the whole delivery record reproduce exactly', async () => {
  const actual = await runExperiment(load('./synthetic-fixture.json'));
  assert.deepEqual(actual, result());
  assert.deepEqual(reviewDelivery(actual), load('./delivery-record.json'));
});
test('application matches and raw routing are separate, preserving refusal and relevance failures', () => {
  const input = result(), before = structuredClone(input), report = reviewDelivery(input);
  assert.deepEqual(input, before);
  assert.deepEqual(report.rawRouting, { total: 8, baselineCorrect: 4, candidateCorrect: 6 });
  assert.deepEqual(report.baseline, { matched: 5, total: 8, failedCases: ['q3', 'q4', 'q8'] });
  assert.deepEqual(report.candidate, { matched: 7, total: 8, failedCases: ['q8'] });
  assert.equal(report.cases[5].candidate.routingCorrect, false);
  assert.equal(report.cases[5].candidate.matchesRequirement, true);
  assert.equal(report.cases[7].candidate.actualStatus, 'needs-human-review');
  assert.equal(report.cases[7].candidate.matchesRequirement, false);
  assert.equal(report.decision, 'HOLD');
});
test('missing, duplicated, renamed, relabelled, unknown and extra cases cannot pass', () => {
  for (const alter of [r => r.cases.pop(), r => r.cases.push(r.cases[0]),
    r => r.cases[7] = structuredClone(r.cases[0]), r => r.cases[7].id = 'new-case',
    r => r.cases[7].question = 'When does it start', r => r.cases[7].expectedIntent = 'time',
    r => r.cases[7].candidateIntent = 'send', r => r.cases[7].approved = true]) {
    const input = result(); alter(input); assert.throws(() => reviewDelivery(input));
  }
});
test('different versions, forged aggregate counts and malformed replies fail explicitly', () => {
  for (const alter of [r => r.fixtureVersion = 'different', r => r.asOf = '2026-09-10T00:00:00Z',
    r => r.routing.candidateCorrect = 8, r => r.routing.total = 7,
    r => r.cases[0].candidateReply = null, r => r.cases[0].candidateReply.citations = {},
    r => r.cases[0].candidateReply.citations[0].url = 'unapproved', r => r.cases[0].candidateReply.draft = 123]) {
    const input = result(); alter(input); assert.throws(() => reviewDelivery(input));
  }
  for (const input of [null, {}, [], result().cases]) assert.throws(() => reviewDelivery(input));
});
test('plausible but incorrect fields, missing citations and a false refusal are delivery failures', () => {
  for (const alter of [r => r.cases[0].candidateReply.draft = 'Start: 7pm.',
    r => r.cases[0].candidateReply.citations.pop(),
    r => r.cases[0].candidateReply.citations[0].value = 'Invented time',
    r => r.cases[0].candidateReply.citations[0].noticeId = 'notice-3',
    r => r.cases[0].candidateReply = structuredClone(r.cases[5].candidateReply)]) {
    const input = result(); alter(input); const review = reviewDelivery(input);
    assert.ok(review.candidate.failedCases.includes('q1')); assert.equal(review.decision, 'HOLD');
  }
});
test('matching every selected requirement still requires review, not automatic release', () => {
  const input = result();
  input.cases[7].candidateReply = structuredClone(input.cases[4].candidateReply);
  const review = reviewDelivery(input);
  assert.equal(review.candidate.matched, 8); assert.equal(review.decision, 'REVIEW_REQUIRED');
  assert.equal(review.rawRouting.candidateCorrect, 6); // Do not rewrite a raw prediction.
});
test('case order cannot hide failures or alter the deterministic report', () => {
  const input = result(), first = reviewDelivery(input); input.cases.reverse();
  assert.deepEqual(reviewDelivery(input), first);
});
test('CLI prints the actual HOLD report with exit 2 and distinguishes usage errors', () => {
  const cwd = new URL('.', import.meta.url);
  const execution = spawnSync(process.execPath, ['delivery-check.mjs'], { cwd, encoding: 'utf8' });
  assert.equal(execution.status, 2, execution.stderr);
  assert.deepEqual(JSON.parse(execution.stdout), load('./delivery-record.json'));
  assert.equal(spawnSync(process.execPath, ['delivery-check.mjs', 'extra'], { cwd }).status, 1);
});

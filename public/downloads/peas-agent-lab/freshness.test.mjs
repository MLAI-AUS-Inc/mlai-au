import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { baseline } from './agent.mjs';
import { classifyFreshness, simulateWithFreshness, runReview, REVIEW_CASES } from './freshness.mjs';

const input = changes => ({ id: 'test', hasLocation: true, lookupResult: 'ok', requestedAction: 'prepare-draft', checkedAtMs: 100_000, recordedAtMs: 100_000, ...changes });

test('freshness boundaries are explicit, including unknown and future clocks', () => {
  for (const [recorded, status, age] of [[100_000, 'fresh', 0], [40_000, 'fresh', 60_000], [39_999, 'stale', 60_001], [null, 'unknown', null], [100_001, 'future', -1]]) {
    assert.deepEqual(classifyFreshness(recorded, 100_000), { status, ageMs: age });
  }
  assert.equal(classifyFreshness(98, 100, 1).status, 'stale');
});

test('malformed fixture times and options fail instead of becoming zero age', () => {
  for (const value of [undefined, '0', -1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => classifyFreshness(value, 100), TypeError);
    assert.throws(() => classifyFreshness(0, value), TypeError);
    if (value !== undefined) assert.throws(() => classifyFreshness(0, 100, value), TypeError);
  }
  for (const value of [0, null]) assert.throws(() => classifyFreshness(0, 100, value), TypeError);
  for (const value of [null, [], { extra: true }, { policy: 2 }, { maxSteps: 0 }, { failWrite: 'yes' }]) assert.throws(() => simulateWithFreshness(input(), value), TypeError);
});

test('the exact request schema and baseline validation remain mandatory', () => {
  for (const value of [null, [], {}, input({ extra: true }), input({ id: '../escape' }), input({ hasLocation: 1 }), input({ lookupResult: 'stale' }), input({ requestedAction: 'pay' })]) {
    assert.throws(() => simulateWithFreshness(value), TypeError);
  }
  const missing = input(); delete missing.recordedAtMs;
  assert.throws(() => simulateWithFreshness(missing), TypeError);
});

test('policy observations are frozen and do not expose future lookup metadata', () => {
  const seen = [];
  simulateWithFreshness(input({ recordedAtMs: 39_999 }), { policy(view) {
    assert.ok(Object.isFrozen(view));
    assert.deepEqual(Object.keys(view).sort(), ['hasLocation', 'lookup', 'recordAgeMs', 'recordStatus', 'requestedActionAllowed']);
    seen.push(view); return baseline(view);
  } });
  assert.equal(seen[0].recordStatus, 'unobserved');
  assert.equal(seen[0].recordAgeMs, null);
  assert.equal(seen[1].recordStatus, 'stale');
  assert.equal(seen[1].recordAgeMs, 60_001);
});

test('the environment blocks stale, unknown and future drafts even if the policy ignores them', () => {
  for (const recordedAtMs of [39_999, null, 100_001]) {
    const result = simulateWithFreshness(input({ recordedAtMs }), { policy: view => view.lookup === 'not-run' ? 'lookup' : 'draft' });
    assert.equal(result.status, 'escalated');
    assert.deepEqual(result.drafts, []);
    assert.equal(result.decisionTrace[1].proposed, 'draft');
    assert.equal(result.decisionTrace[1].enforced, 'escalate');
    assert.match(result.decisionTrace[1].guardReason, /^freshness-/);
    assert.equal(result.externalActions, 0);
  }
});

test('normal and boundary cases still produce exactly one review-only draft', () => {
  for (const recordedAtMs of [100_000, 40_000]) {
    const result = simulateWithFreshness(input({ recordedAtMs }));
    assert.equal(result.status, 'drafted');
    assert.deepEqual(result.drafts, [{ requestId: 'test', status: 'needs-human-review' }]);
    assert.deepEqual(result.decisionTrace.map(row => row.guardReason), [null, null]);
  }
});

test('request permissions and premature drafting cannot be bypassed', () => {
  for (const requestedAction of ['send', 'delete']) {
    const result = simulateWithFreshness(input({ requestedAction }), { policy: () => 'draft' });
    assert.equal(result.reason, 'request-not-allowed'); assert.deepEqual(result.drafts, []);
  }
  assert.equal(simulateWithFreshness(input(), { policy: () => 'draft' }).reason, 'draft-precondition-failed');
  assert.equal(simulateWithFreshness(input(), { policy: () => 'send' }).reason, 'action-not-allowed');
});

test('tool failure, missing information, limits and rollback remain observable', () => {
  for (const lookupResult of ['unavailable', 'conflict']) assert.equal(simulateWithFreshness(input({ lookupResult })).status, 'escalated');
  assert.equal(simulateWithFreshness(input({ hasLocation: false })).status, 'escalated');
  const loop = simulateWithFreshness(input(), { policy: () => 'lookup', maxSteps: 3 });
  assert.equal(loop.reason, 'step-limit'); assert.equal(loop.trace.length, 3);
  const rolledBack = simulateWithFreshness(input(), { failWrite: true });
  assert.equal(rolledBack.reason, 'draft-write-failed'); assert.deepEqual(rolledBack.drafts, []);
});

test('policy throws and non-string results retain the original failure behaviour', () => {
  assert.equal(simulateWithFreshness(input(), { policy: () => { throw Error('test'); } }).reason, 'policy-error');
  assert.equal(simulateWithFreshness(input(), { policy: () => ({ action: 'draft' }) }).reason, 'action-not-allowed');
});

test('inputs and the original baseline are preserved across runs', () => {
  const before = input({ recordedAtMs: null }); const frozen = Object.freeze({ ...before });
  const first = simulateWithFreshness(frozen); first.drafts.push({ unwanted: true });
  assert.deepEqual(frozen, before);
  assert.deepEqual(simulateWithFreshness(frozen).drafts, []);
  assert.equal(baseline({ requestedActionAllowed: true, hasLocation: true, lookup: 'ok', recordStatus: 'stale' }), 'draft');
});

test('all seven visible contract comparisons and recorded source hashes reproduce exactly', () => {
  const actual = runReview();
  assert.deepEqual(actual, JSON.parse(readFileSync(new URL('./recorded-review.json', import.meta.url))));
  assert.deepEqual(actual.summary, { total: 7, baselineMatches: 4, guardedMatches: 7 });
  assert.equal(actual.decision, 'REVIEW_REQUIRED');
  assert.equal(actual.cases.length, REVIEW_CASES.length);
  assert.deepEqual(actual.cases.filter(row => !row.baseline.matchesContract).map(row => row.id), ['stale', 'unknown', 'future']);
  assert.match(actual.evaluation, /not an independent or held-out/);
});

test('CLI reports required review as exit 2 and rejects unsupported invocation', () => {
  const script = fileURLToPath(new URL('./freshness.mjs', import.meta.url));
  const valid = spawnSync(process.execPath, [script, '--review'], { encoding: 'utf8' });
  assert.equal(valid.status, 2); assert.deepEqual(JSON.parse(valid.stdout), runReview());
  for (const args of [[], ['--approve'], ['--review', 'extra']]) {
    const bad = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
    assert.equal(bad.status, 1); assert.equal(bad.stdout, '');
  }
});

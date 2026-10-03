import test from 'node:test';
import assert from 'node:assert/strict';
import { simulate } from './agent.mjs';
const good = { id: 'demo-1', hasLocation: true, lookupResult: 'ok', requestedAction: 'prepare-draft' };

test('normal case observes a lookup before creating exactly one reviewed draft', () => {
  const result = simulate(good);
  assert.equal(result.status, 'drafted');
  assert.deepEqual(result.trace.map(t => [t.action, t.outcome]), [['lookup', 'ok'], ['draft', 'draft-created']]);
  assert.equal(result.drafts.length, 1);
  assert.equal(result.externalActions, 0);
  assert.deepEqual(good, result.original);
});
test('missing location escalates without inventing a value', () => {
  const r = simulate({ ...good, hasLocation: false });
  assert.equal(r.status, 'escalated');
  assert.equal(r.drafts.length, 0);
});
test('unavailable and conflicting lookup results escalate', () => {
  for (const lookupResult of ['unavailable', 'conflict']) {
    const r = simulate({ ...good, lookupResult });
    assert.equal(r.status, 'escalated');
    assert.equal(r.trace[0].outcome, lookupResult);
    assert.equal(r.drafts.length, 0);
  }
});
test('forbidden request cannot be bypassed with a permissive policy', () => {
  for (const requestedAction of ['send', 'delete']) {
    const r = simulate({ ...good, requestedAction }, { policy: () => 'draft' });
    assert.equal(r.reason, 'request-not-allowed');
    assert.equal(r.externalActions, 0);
    assert.equal(r.drafts.length, 0);
  }
});
test('unknown actions and premature drafts are blocked', () => {
  assert.equal(simulate(good, { policy: () => 'send' }).reason, 'action-not-allowed');
  assert.equal(simulate(good, { policy: () => 'draft' }).reason, 'draft-precondition-failed');
});
test('repeated permitted actions terminate at the step limit', () => {
  const r = simulate(good, { policy: () => 'lookup', maxSteps: 3 });
  assert.equal(r.reason, 'step-limit');
  assert.equal(r.trace.length, 3);
  assert.equal(r.drafts.length, 0);
});
test('synthetic write failure rolls back only the in-memory draft', () => {
  const r = simulate(good, { failWrite: true });
  assert.equal(r.reason, 'draft-write-failed');
  assert.equal(r.trace.at(-1).outcome, 'rolled-back');
  assert.deepEqual(r.drafts, []);
  assert.deepEqual(r.original, good);
});
test('malformed input and invalid limits reject rather than silently coercing', () => {
  for (const input of [null, {}, { ...good, hasLocation: 'true' }, { ...good, extra: 1 }, { ...good, id: '../x' }]) assert.throws(() => simulate(input), TypeError);
  for (const maxSteps of [0, 21, 1.5, Infinity]) assert.throws(() => simulate(good, { maxSteps }), TypeError);
});
test('policy receives only frozen observations, never future tool results', () => {
  simulate(good, { policy: obs => {
    assert.deepEqual(Object.keys(obs).sort(), ['hasLocation', 'lookup', 'requestedActionAllowed']);
    assert.equal(Object.isFrozen(obs), true);
    return 'escalate';
  } });
  assert.equal(simulate(good, { policy: () => { throw new Error('failure'); } }).reason, 'policy-error');
  assert.equal(simulate(good, { policy: () => ({ action: 'draft' }) }).reason, 'action-not-allowed');
});

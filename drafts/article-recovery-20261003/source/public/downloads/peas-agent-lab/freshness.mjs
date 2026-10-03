// Synthetic extension: a new environment permission, not a learned policy.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { baseline, simulate } from './agent.mjs';

export const MAX_AGE_MS = 60_000; // Teaching assumption, not a production recommendation.
const integer = value => Number.isSafeInteger(value) && value >= 0;
const project = ({ id, hasLocation, lookupResult, requestedAction }) => ({ id, hasLocation, lookupResult, requestedAction });

export function classifyFreshness(recordedAtMs, checkedAtMs, maxAgeMs = MAX_AGE_MS) {
  if ((recordedAtMs !== null && !integer(recordedAtMs)) || !integer(checkedAtMs) || !integer(maxAgeMs) || maxAgeMs === 0) {
    throw new TypeError('Use nonnegative safe-integer fixture times (or null for an unknown record time) and a positive maxAgeMs.');
  }
  const ageMs = recordedAtMs === null ? null : checkedAtMs - recordedAtMs;
  const status = ageMs === null ? 'unknown' : ageMs < 0 ? 'future' : ageMs <= maxAgeMs ? 'fresh' : 'stale';
  return Object.freeze({ status, ageMs });
}

export function simulateWithFreshness(input, options = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input) ||
      Object.keys(input).sort().join(',') !== 'checkedAtMs,hasLocation,id,lookupResult,recordedAtMs,requestedAction') {
    throw new TypeError('Use the exact six-field synthetic freshness request.');
  }
  if (!options || typeof options !== 'object' || Array.isArray(options) ||
      Object.keys(options).some(key => !['policy', 'maxSteps', 'failWrite', 'maxAgeMs'].includes(key))) {
    throw new TypeError('Unknown freshness simulation option.');
  }
  const { policy = baseline, maxSteps = 4, failWrite = false, maxAgeMs = MAX_AGE_MS } = options;
  if (typeof policy !== 'function') throw new TypeError('Provide a trusted synchronous policy.');
  const request = Object.freeze({ ...input });
  const freshness = classifyFreshness(request.recordedAtMs, request.checkedAtMs, maxAgeMs);
  const decisionTrace = [];
  const result = simulate(project(request), {
    maxSteps, failWrite,
    policy(observation) {
      // Fixture metadata becomes observable only after a successful lookup.
      const visible = observation.lookup === 'ok' ? freshness : { status: 'unobserved', ageMs: null };
      const view = Object.freeze({ ...observation, recordStatus: visible.status, recordAgeMs: visible.ageMs });
      const proposed = policy(view); // Existing simulator catches throws / rejects non-string actions.
      const blocked = proposed === 'draft' && observation.lookup === 'ok' && visible.status !== 'fresh';
      const action = blocked ? 'escalate' : proposed;
      decisionTrace.push({
        step: decisionTrace.length + 1, observation: { ...view },
        proposed: typeof proposed === 'string' ? proposed : 'invalid',
        enforced: typeof action === 'string' ? action : 'invalid',
        guardReason: blocked ? `freshness-${visible.status}` : null,
      });
      return action;
    },
  });
  return { ...result, request: { ...request }, maxAgeMs, decisionTrace };
}

const request = (id, changes = {}) => ({ id, hasLocation: true, lookupResult: 'ok', requestedAction: 'prepare-draft', checkedAtMs: 100_000, recordedAtMs: 100_000, ...changes });
export const REVIEW_CASES = Object.freeze([
  { label: 'Age zero', input: request('fresh'), expected: 'drafted' },
  { label: 'Exactly 60,000 ms old', input: request('boundary', { recordedAtMs: 40_000 }), expected: 'drafted' },
  { label: '60,001 ms old', input: request('stale', { recordedAtMs: 39_999 }), expected: 'escalated' },
  { label: 'Unknown record time', input: request('unknown', { recordedAtMs: null }), expected: 'escalated' },
  { label: 'Future record time', input: request('future', { recordedAtMs: 100_001 }), expected: 'escalated' },
  { label: 'Unavailable lookup', input: request('unavailable', { lookupResult: 'unavailable' }), expected: 'escalated' },
  { label: 'Missing location', input: request('missing-location', { hasLocation: false }), expected: 'escalated' },
].map(row => Object.freeze({ ...row, input: Object.freeze(row.input) })));

const summarize = (result, expected) => ({
  status: result.status, reason: result.reason, drafts: result.drafts.length,
  actions: result.trace.map(step => step.action), externalActions: result.externalActions,
  matchesContract: result.status === expected && result.drafts.length === (expected === 'drafted' ? 1 : 0) && result.externalActions === 0,
});

export function runReview() {
  const cases = REVIEW_CASES.map(({ label, input, expected }) => {
    const original = simulate(project(input)); // Baseline's strict schema has no clock fields.
    const guarded = simulateWithFreshness(input);
    return {
      id: input.id, label, input, expected,
      baseline: summarize(original, expected), guarded: summarize(guarded, expected),
      decisionTrace: guarded.decisionTrace,
    };
  });
  return {
    version: 1,
    maxAgeMs: MAX_AGE_MS,
    evaluation: 'Seven author-visible synthetic fixtures; not an independent or held-out benchmark.',
    change: 'Same rule policy, new freshness permission enforced by the environment wrapper.',
    sourceSha256: Object.fromEntries(['agent.mjs', 'agent.test.mjs', 'freshness.mjs', 'freshness.test.mjs'].map(name => [name, createHash('sha256').update(readFileSync(new URL(name, import.meta.url))).digest('hex')])),
    cases,
    summary: { total: cases.length, baselineMatches: cases.filter(row => row.baseline.matchesContract).length, guardedMatches: cases.filter(row => row.guarded.matchesContract).length },
    decision: 'REVIEW_REQUIRED',
    independentReview: 'Not performed. No client or production approval is implied by these fixtures.',
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 3 || process.argv[2] !== '--review') {
    console.error('Usage: node freshness.mjs --review (exit 2 means independent review remains required)');
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(runReview(), null, 2));
    process.exitCode = 2;
  }
}

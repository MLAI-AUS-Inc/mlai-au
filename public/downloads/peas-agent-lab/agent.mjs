// Synthetic, synchronous teaching simulation. No model, network or real tools.
import { pathToFileURL } from 'node:url';

export function baseline(observation) {
  if (!observation.requestedActionAllowed) return 'refuse';
  if (!observation.hasLocation) return 'escalate';
  return observation.lookup === 'not-run' ? 'lookup' :
    observation.lookup === 'ok' ? 'draft' : 'escalate';
}

export function simulate(input, { policy = baseline, maxSteps = 4, failWrite = false } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input) ||
      Object.keys(input).sort().join(',') !== 'hasLocation,id,lookupResult,requestedAction' ||
      typeof input.id !== 'string' || !/^[a-z0-9-]{1,40}$/.test(input.id) ||
      typeof input.hasLocation !== 'boolean' ||
      !['ok', 'unavailable', 'conflict'].includes(input.lookupResult) ||
      !['prepare-draft', 'send', 'delete'].includes(input.requestedAction)) {
    throw new TypeError('Use the exact synthetic request schema.');
  }
  if (typeof policy !== 'function' || !Number.isInteger(maxSteps) || maxSteps < 1 || maxSteps > 20 || typeof failWrite !== 'boolean') {
    throw new TypeError('Provide a synchronous policy and a step limit from 1 to 20.');
  }
  const original = Object.freeze({ ...input });
  const drafts = [];
  const trace = [];
  let lookup = 'not-run';
  const finish = (status, reason) => ({ status, reason, original: { ...original }, drafts: [...drafts], trace, externalActions: 0 });
  for (let step = 1; step <= maxSteps; step++) {
    // Deliberately withhold the future lookup result and mutable environment.
    const observation = Object.freeze({ hasLocation: original.hasLocation, requestedActionAllowed: original.requestedAction === 'prepare-draft', lookup });
    let action;
    try { action = policy(observation); }
    catch { return finish('escalated', 'policy-error'); }
    const entry = { step, observation: { ...observation }, action: typeof action === 'string' ? action : 'invalid', outcome: '' };
    trace.push(entry);
    if (!['lookup', 'draft', 'refuse', 'escalate'].includes(action)) {
      entry.outcome = 'blocked';
      return finish('refused', 'action-not-allowed');
    }
    // Enforce permission and readiness independently of the selected policy.
    if (!observation.requestedActionAllowed) {
      entry.outcome = 'blocked';
      return finish('refused', 'request-not-allowed');
    }
    if (action === 'refuse' || action === 'escalate') {
      entry.outcome = action;
      return finish(action === 'refuse' ? 'refused' : 'escalated', action === 'refuse' ? 'policy-refusal' : 'human-review');
    }
    if (action === 'lookup') {
      lookup = original.lookupResult;
      entry.outcome = lookup;
      continue;
    }
    if (!original.hasLocation || lookup !== 'ok') {
      entry.outcome = 'blocked';
      return finish('escalated', 'draft-precondition-failed');
    }
    // Reversible in-memory write only. This is not a real transaction or undo.
    const before = [...drafts];
    try {
      drafts.push({ requestId: original.id, status: 'needs-human-review' });
      if (failWrite) throw new Error('synthetic write failure');
    } catch {
      drafts.splice(0, drafts.length, ...before);
      entry.outcome = 'rolled-back';
      return finish('escalated', 'draft-write-failed');
    }
    entry.outcome = 'draft-created';
    return finish('drafted', 'human-review-required');
  }
  return finish('escalated', 'step-limit');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(simulate({ id: 'demo-1', hasLocation: true, lookupResult: 'ok', requestedAction: 'prepare-draft' }), null, 2));
}

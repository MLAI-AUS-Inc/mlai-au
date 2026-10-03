# PEAS agent-design lab

Synthetic, deterministic JavaScript simulation. No LLM, API key, network access,
real customer records or external actions. It models an observation/action loop,
not general intelligence or production-ready agency. Use Node.js 22 or later.

Save all seven files into one folder: agent.mjs, agent.test.mjs, freshness.mjs,
freshness.test.mjs, recorded-review.json, CHANGE-REVIEW.md and README.md.
Review the code, then run from that folder:

```sh
node agent.mjs
node --test agent.test.mjs freshness.test.mjs
node freshness.mjs --review
```

Normal output: status drafted; lookup/ok then draft/draft-created; one draft with
status needs-human-review; externalActions 0. The nine baseline and twelve
extension tests should pass (21 total). The review command deliberately exits
with code 2 and prints REVIEW_REQUIRED. That is a review boundary, not a crash.
Its JSON should match recorded-review.json, including hashes of all four code
files. Edit the implementation/tests only with an explained new review; do not
rewrite the recorded result merely to hide a failing comparison.

## PEAS design

- Performance: one reviewed draft when permitted and complete; no draft for
  missing/conflicting/unavailable evidence; terminate within the step limit.
- Environment: one synthetic job request, simulated lookup and in-memory drafts.
- Actuators: lookup, draft, refuse, escalate. Sending/deleting is unavailable.
- Sensors: hasLocation, requestedActionAllowed and the latest lookup status.

The baseline is a hand-written rule policy, not an LLM or learned policy. It can
select a different action after a tool observation, but has no memory across runs.
The simulator enforces readiness and permissions independently of that policy.

## Exercises with expected outcomes

1. hasLocation false: escalated; no draft.
2. lookupResult unavailable or conflict: lookup then escalation; no draft.
3. requestedAction send with policy returning draft: refused; no draft.
4. policy always returns lookup, maxSteps 3: step-limit after three actions.
5. failWrite true: draft-write-failed; in-memory draft rolled back.
6. policy returns draft immediately: draft-precondition-failed, not success.

Create a separate exercise file importing simulate to change these inputs.
Preserve the baseline tests; add a failing regression before fixing a new case.

## Completed freshness extension

The additional requirement permits drafting only after a successful lookup with
a known record age from 0 through 60,000 ms inclusive. This is a synthetic teaching
choice, not a suitable timeout for every business. Both clock values are supplied
fixtures, not the wall clock, and remain fixed throughout a run.

freshness.mjs keeps the original policy and simulator unchanged. Its environment
wrapper exposes recordStatus/recordAgeMs only after lookup succeeds and intercepts
a proposed draft if the record is stale, unknown or future-dated. The decision
trace preserves the policy proposal separately from the enforced action.

Seven cases exercise this new contract. The old simulator receives the original
four request fields (it has no freshness schema) and matches 4/7 expectations.
The guarded version matches 7/7. The three changed cases are stale, unknown and
future-dated records. All seven were visible while authoring: this is not an
independent test set, proof of a smarter policy, or production acceptance.

Read CHANGE-REVIEW.md for the completed rationale, evidence, limits and handover.
To try another case in a separate file:

```js
import { simulateWithFreshness } from './freshness.mjs';
console.log(simulateWithFreshness({
  id: 'my-stale-case', hasLocation: true,
  lookupResult: 'ok', requestedAction: 'prepare-draft',
  checkedAtMs: 100000, recordedAtMs: 39999,
}));
```

Expected: escalated, no draft, lookup then enforced escalation; the second
decision still records the original proposed draft and freshness-stale reason.

## AI coding assistance record

This teaching asset was drafted with AI coding assistance. Automated tests check
the listed synthetic cases, not independent human review or customer delivery.
The completed September 10 extension record names what was and was not captured;
it does not invent an exact model version, human sign-off or rejected suggestion.
For your own extension, record tool/model/date, prompt, proposed diff, rejected
suggestions, test output and limitations. Ask the coding tool for an adversarial
case, then inspect its change. Do not ask it to weaken the expected boundary.

## Explicit limits

No real authentication, persistent idempotency, concurrent access, crash recovery,
prompt-injection defence, asynchronous tool timeout or process isolation is tested.
The synchronous policy is trusted local code: an infinite loop inside it can hang
the process, despite maxSteps. Never execute untrusted generated code here.
externalActions is zero because no external tools exist, not because a security
system has monitored and proved absence of activity. A real adapter changes this
threat model and needs separate design and tests. Rollback only restores an array;
it cannot undo an email or payment. Passing these fixtures is not job readiness.
The freshness wrapper does not solve clock trust, elapsed time during real tools,
time-of-check/time-of-use races, concurrent changes or real record invalidation.
Frozen observations are an interface convention, not a security sandbox for
callbacks that share the process. No actual permission system is implemented.

Full guide: https://mlai.au/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence

# Completed PEAS change review: freshness at the action boundary

Recorded 10 September 2026. Status: **REVIEW_REQUIRED**. Synthetic teaching work,
not a client case study, independent technical review or production approval.

## Brief and decision

The original lab allowed a draft after an allowed request, a location and a
successful lookup. The new task also requires a record timestamp whose age is
between 0 and 60,000 ms inclusive. Unknown, future-dated and older records must
escalate without creating a draft. The 60-second limit is an authored exercise
assumption, not an externally validated operational recommendation.

We kept agent.mjs and its nine tests unchanged. freshness.mjs supplies a strict
six-field request wrapper and exposes additional observations only after a
successful lookup. The same rule policy still proposes a draft for stale records;
the new environment guard refuses that permission and enforces escalation.
This changes the PEAS performance requirement, environment boundary and sensors.
It does not train, improve or replace the policy, or add new actuator types.

## Actual comparison

Run `node freshness.mjs --review`. The seven author-visible fixtures produce:

| Case | Expected | Original simulator | Guarded simulator |
| --- | --- | --- | --- |
| Age zero | drafted | drafted | drafted |
| Exactly 60,000 ms old | drafted | drafted | drafted |
| 60,001 ms old | escalated | drafted — fails new requirement | escalated |
| Unknown record time | escalated | drafted — fails new requirement | escalated |
| Future record time | escalated | drafted — fails new requirement | escalated |
| Unavailable lookup | escalated | escalated | escalated |
| Missing location | escalated | escalated | escalated |

The original simulator matches 4/7 and the guarded version 7/7 under the **new**
contract. The original receives the projected four-field request because it has
no timestamp interface. The comparison is not evidence that it violated its own
older specification. No failed case was omitted, reclassified or used as an
independent holdout. No general accuracy, savings or job-readiness claim follows.

For the stale case, step 1 observes unobserved/null freshness and performs lookup.
Step 2 observes stale/60,001 ms, records proposed draft, enforced escalate and
freshness-stale. The simulator returns escalated/human-review with zero drafts.
The record retains the proposal: the guard must not make the policy look smarter.

The actual run is preserved in recorded-review.json, including per-case inputs,
outcomes, traces and SHA-256 hashes of the four code files. The 21 automated tests
passed during authoring: nine unchanged baseline tests plus twelve extension
tests. The tests also check malformed input, exact boundary behaviour, observation
visibility, custom-policy bypass attempts, request restrictions, tool failure,
step limits, in-memory rollback, output reproduction and CLI exit semantics.

## AI assistance and authorship

This extension and its tests were created with Codex assistance in the MLAI
workspace. An exact underlying model version was not recorded. The actual work
implements the article's proposed stale-record exercise; no model calls execute
inside the lab. No independent person has reviewed or reproduced this change.
The design choices above are this implementation's decisions, not invented
human feedback or a fabricated transcript of rejected model suggestions.

## Handover and rollback

Give the recipient all seven files, Node.js 22+ prerequisites and the commands in
README.md. The comparison exits 2 intentionally because independent review is
still required even when all seven fixtures match. The JSON should reproduce
exactly; a code change alters its source hashes and requires a new explained
review. Ask a recipient to run it from a fresh folder, inspect the stale trace
and describe the difference between a policy proposal and allowed execution.
Record their actual findings; recipient reproduction is currently **not done**.

Keep the baseline as a teaching comparison. Removing the wrapper restores the
older behaviour and the three freshness failures; it must not be described as
a safe rollback for a real system that requires freshness. No production
deployment or real migration is supplied or authorised by this exercise.

## Limits and next review

Both clocks are supplied synthetic integers and fixed for the entire run. Real
clock trust, skew, elapsed-time handling, concurrent changes, record versions and
time-of-check/time-of-use safety need a separate design. The callback is trusted
synchronous code in the same process: frozen input is not isolation, and an
infinite callback loop can hang despite maxSteps. No real authentication,
network timeout, prompt-injection defence, durable idempotency, crash recovery or
external action rollback is proven.

Before any broader teaching/release claim, obtain accountable technical review
and independent recipient reproduction. Before client work, demonstrate broader
delivery experience and verify the actual project's specification and safety
requirements. A supplied exercise alone is not your portfolio accomplishment.

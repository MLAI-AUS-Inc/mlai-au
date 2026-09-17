# Synthetic agent-observability lab

## Extended exercise — 10 September 2026

For builders practising an inspectable handover of AI-assisted software. All
records are fictional. There is no Moltbook data, model call, network access,
actual posting, moderation service or permission enforcement. This is not an AI
detector, clinical tool or production authorisation gate.

Extract agent-observability-kit.zip and open its agent-trace-lab folder. The nine
files are trace.mjs, trace.test.mjs, observe.mjs, observe.test.mjs, fixture.json,
run.mjs, recorded-run.json, README.md and HANDOVER.md. No package install is needed.
With Node.js installed, run these commands in that folder:

```sh
node --test trace.test.mjs observe.test.mjs
node observe.mjs
node run.mjs
```

The supplied recorded-run.json is an actual local execution on Node v25.2.1,
darwin/arm64, with 23 passing tests. This is one tested environment, not a runtime
or operating-system compatibility matrix. Your durations and run timestamp will
differ. The deterministic observation, original trace and source hashes should
match while the six executable/fixture files are unchanged.

run.mjs runs the two supplied test files in a child Node process, reports selected
runtime identifiers and six file hashes, then analyses the two fictional examples.
It prints JSON to stdout and does not overwrite the supplied record. Save its
output to a new local file if you want your own run record. It omits hostname,
username, environment variables and raw message content from the observation.
Read the code before running it; this runner is not a sandbox or authenticity
check. File hashes identify bytes, not a trusted signer or independent reviewer.

Exit 0 means the analysis ran successfully, not that a delivery is approved.
The observation still returns needs-review and productionApproval: false. Failing
tests prevent run.mjs from producing a success record; run the test command to
inspect diagnostics locally. HANDOVER.md is a filled example of what to report,
including failures and missing reviews.

### What the current run shows

- Nine attempted posts: six recorded published, two rate-limited, one error.
  A successful-publication count must not silently replace the attempt count.
- Per-minute attempt histogram: 5, 1, 2, 1, 0. The last empty minute remains visible.
- p4 is one second after p3's recorded five-second retry delay: an early retry.
  p5 waits exactly ten seconds after p4's ten-second delay: equality is accepted.
- One exact-content group contains p1, p2, p7 and p9. Three publications after
  the first repeat the same content: 3/6, not 4/6 or a denominator of nine.
  Denied/error attempts are not counted as published duplicates.
- Four published records need moderation review: p2 is recorded flagged;
  p5, p7 and p9 are not reviewed. Two other records merely say cleared.
- Among seven adjacent same-account attempt intervals, 3 are at most one second,
  5 are at most ten seconds and 6 are at most sixty seconds. These are inclusive
  author-chosen cutoffs, not an implementation of the Moltbook papers' methods.
- Actor ground truth remains not-collected; autonomy remains not-established.
  No labelled human/automated sample was collected or evaluated.

### Definitions and boundaries

fixture.json has exactly provenance, window, thresholdSeconds and attempts.
provenance must say synthetic; that is a declared input constraint, not detection
that a user really supplied synthetic data. Never paste client text or secrets
into this exercise. Rejecting extra fields and using hashes do not anonymise data.

The window is [start, end): start included, end excluded, canonical UTC timestamps.
It is at most one day, with at most 1,440 histogram buckets and 10,000 attempts.
The final bucket can be shorter; its end is shown. Bucket counts are not hourly
rates. A window with no attempts has no measured duplicate fraction (null).
No data before or after this window is inspected; silence can be missing logging.

Every attempt supplies id, at, account, content, outcome, retryAfterSeconds and
moderation. IDs are unique safe labels, accounts are pseudonymous fixture labels,
and at values are valid and nondecreasing. Equal timestamps are allowed: they do
not authenticate action order or prove a correct clock. content is short fictional
text. outcome is published, rate-limited or error, all assertions by the producer.

retryAfterSeconds is a whole number of seconds on a rate-limited record, or null
when not supplied/applicable. Zero and missing are different. Each rate-limited
record is compared with the first subsequent attempt by that same account.
No next record produces no-follow-up-in-window; no supplied duration produces
unknown-delay. This is a per-record comparison, not cumulative backoff enforcement,
HTTP Retry-After parsing, shared-IP quota handling or proof of real server rules.

Duplicates require exact text equality, including case and whitespace, among
published records in this window. The report shows hashes and record IDs, not raw
content. It misses paraphrases and duplicates outside the window. Repetition can
be legitimate and is not proof of spam, coordinated control or malicious intent.

moderation is recorded as not-reviewed, flagged or cleared. Only published records
enter this review queue; denied/error content is outside that queue's scope. There
is no toxicity model or human review in this lab. A recorded clearance is not an
authenticated moderation decision. A reviewer would separately need permitted
content, policy, context, decision authority and an appeal/escalation process.

### Try a change, predict, then inspect

1. Copy the kit to a separate folder; preserve the supplied record as your baseline.
2. Make one intentional fixture change and write a predicted result first.
3. Try null versus zero retry delay, remove the last follow-up, change the final
   window boundary, or add a whitespace-only difference to one nonempty message.
4. Run node observe.mjs and compare every affected denominator and item-level result.
   Tests pin the original supplied fixture; fixture changes can deliberately fail
   those baseline tests. Keep that failure and distinguish a new case from a
   regression—do not delete failing assertions to claim acceptance.
5. Explain which conclusions still cannot be made. Timing thresholds and duplicate
   counts must not become fabricated operator labels or an autonomy accuracy score.

Describe what you changed, which AI coding tools assisted you, what you checked,
what failed and what remains unreviewed. The starter is MLAI/Codex-assisted teaching
material, not your original client delivery. Supply your own permitted work when
applying to the MLAI Studio builder pool. Client portfolio use needs permission;
selection and paid project matching are not guaranteed. NZ eligibility should be
confirmed with MLAI before assuming coverage. Independent systems/source review
and a recipient's reproduction are outstanding.

## Original four-event trace exercise

This dependency-free JavaScript exercise checks a small log format. It does not
run an AI agent, connect to Moltbook, send messages or grant permissions.
All example events are fictional; timestamps are not research observations.

Save trace.mjs and trace.test.mjs together. With Node.js installed, run:

    node --test trace.test.mjs
    node --input-type=module -e 'import {inspectTrace,syntheticTrace} from "./trace.mjs"; console.log(inspectTrace(syntheticTrace))'

The example records four events, a human edit and an external action without
recorded approval. Expected status: needs-review. The send event is flagged
approval-not-recorded. The action is only a log record: nothing is actually sent.

## What the exercise teaches

- A scheduled start does not establish that every later step was autonomous.
- No recorded human input is not proof there was no human input.
- A timing pattern is not ground truth about operator involvement.
- A true approval field is only an assertion in a supplied record. This code
  does not authenticate an approver or verify what they approved.
- no-listed-defect-found is deliberately not named safe, approved or autonomous.

## Bounded checks

Events have a unique safe ID, canonical UTC timestamp and one of five kinds.
Timestamps must be nondecreasing; equal times are allowed but do not prove order.
A parent, when supplied, must reference an earlier record. Drafts/actions with
no parent and actions without recorded approval are flagged. The parser rejects
extra fields to discourage accidental inclusion of payloads or credentials.

These checks do not prove completeness, authenticity, causal linkage, exact
approved content, access control, log integrity or a correct clock. Producers
can omit events or lie. Do not adapt this into a production authorisation gate
without a separately reviewed design and appropriate threat model.

## Next exercise and handover

Change the fixture to add unknown input, remove a parent or repeat an ID.
Predict the result before running it. Keep rejected cases rather than changing
the test to hide an inconvenient outcome. Record your runtime version, exact
commands, observed result and limitations; ask another builder to reproduce it.
Never replace synthetic records with client data or secrets.

For real systems, separately investigate authenticated actors, correlation IDs,
configuration/model versions, authorised actions, exact approval boundaries,
retention and tamper evidence. This lab implements none of those controls.

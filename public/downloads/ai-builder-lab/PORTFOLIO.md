# Worked portfolio record: review-only enquiry triage

This is a completed teaching example, not the reader's personal work history or a
client case. Prepared with AI coding assistance on 10 September 2026. Independent
technical and recipient review is pending. No reviewer endorsement is invented.

## Scope and intended user

An aspiring AI-assisted builder is learning to compare a small code change with a
baseline and explain regressions. Fictional messages are suggested as billing,
appointment or other; mixed categories fall to other. Every suggestion stays
needs-human-review. No real inbox, message sending, approval UI, customer database,
deployment or paid model is present. Both predictors are rules, not learned AI.

## Reproduction and identity

Save the seven linked files together and inspect the four JavaScript files.
The actual local run used Node v25.2.1, macOS arm64, on 10 September 2026.

    node --test triage.test.mjs change-review.test.mjs
    node change-review.mjs

Observed: 15 passing tests; full JSON equal to change-record.json; expected exit 2
and decision HOLD. Exit 1 means an execution/input error, not a completed review.
The record's sourceSha256 binds the four source/test files. The version is
learning-change-review-v1. The unchanged triage.mjs baseline remains available.
No package install, API key, server or file write is required to run either command.

## Data and acceptance boundary

Six original development cases plus eight contrasting cases are invented and
public. All were visible to the author while developing the candidate; this is
not a hidden test set or independent estimate of real-message accuracy. Cases
include mixed topics, negation, a paraphrase and an instruction-shaped message.
Expected labels stay outside the prediction arguments. Unknown predictions/errors
remain rejected and cannot authorize an action, including when the expected label
was other. Correct category shape does not establish semantic correctness.

## Actual change and result

The original keyword predictor checks invoice/payment and appointment/booking.
The candidate first splits at punctuation, drops clauses containing "not about",
then calls the same baseline. There is no learning or model training here.

Original set: baseline 5/6, candidate 6/6. Contrast set: baseline 4/8, candidate 6/8.
Combined: 9/14 versus 12/14. The candidate fixes s6, c1, c2 and c7, regresses c3 and
still fails c5. No predictions were rejected in this fixture. Every result remains
review-only. Decision: HOLD, not deploy or replace the baseline for a real service.

Latency, elapsed development effort and total operating cost were not measured.
There were no provider calls. Do not infer zero hardware/labour cost, productivity
gain, customer satisfaction or earnings from these counts.

## Failure log

| Case | Expected / actual candidate | Cause visible in code | Next investigation |
| --- | --- | --- | --- |
| c3: not about appointment time but appointment date | appointment / other | Dropping the whole clause also drops the actual date request; the baseline was correct | Design tests for negation scope and "but" before trying a narrower transformation |
| c5: Can I reschedule? | appointment / other | Neither keyword list recognises the paraphrase | Define the intended routing policy and separately evaluate broader wording |

These are observed code behaviours on the supplied inputs, not validated fixes.
Do not delete either case, change its expected answer to match the code, or optimise
only the aggregate score. Any changed policy needs explicit versioned expectations.

## AI assistance and verification

An AI coding assistant drafted the candidate, contrast cases, tests and prose.
The same agent executed the commands and inspected the reported outcomes; this is
not independent human verification. The original baseline and six-case test suite
were retained. The visible regression was deliberately not edited out or described
as solved. A model/tool version and complete prior prompt log are not available in
this standalone artifact; this record does not reconstruct or invent them.

For your own derivative, record your actual assistant/version, prompts, source
changes, rejected proposals, manual interventions and commands. Explain the code
in your own words, attribute this starter and distinguish your changes. Do not
represent this supplied record as a reviewer signing off your implementation.

## Demonstration, fallback and rollback

Demonstrate locally with the terminal report or a recording. There is nothing to
deploy or uninstall. Stop running the candidate and call the original evaluate()
from triage.mjs to return to the baseline. It still has its known 5/6 limitation;
rollback is not a claim that it is correct or safe for customers. No persistent
state or external action needs to be reversed. In a real workflow, use the existing
manual process until an accountable owner has accepted a reviewed replacement.

Public deployment would require a separate authorised design: data handling,
authentication, review state, monitoring, deadlines/budgets, incident handling and
operational ownership. Do not connect this starter to customer messages or expose
an unauthenticated service. Production acceptance has not occurred.

## Review and next step

Independent reviewer: pending. Recipient reproduction: pending. Fresh independent
evaluation: pending. Customer trial/acceptance: not performed. No evidence here
establishes employment, contracting eligibility or permission to show private work.

Ask a reviewer to reproduce the commands, explain c3, and challenge the expected
routing policy. Record actual feedback before changing this status. Next, study a
separate learned-model example and compare it with rules; do not call these rules
AI simply because an AI assistant helped write them.

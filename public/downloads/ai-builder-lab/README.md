# AI-assisted builder lab: review-only enquiry triage

This is an educational software harness, not a deployed client system. The supplied
predictors are keyword rules, NOT AI models. All fourteen records are fictional.
There are no dependencies, API calls, credentials, sending functions or database.
An AI coding assistant helped draft this starter; passing its tests is not an
independent security or model-quality review.

## Run locally

Save all seven files together: triage.mjs, triage.test.mjs, change-review.mjs,
change-review.test.mjs, change-record.json, PORTFOLIO.md and this README. Inspect
the four JavaScript files before running. Tested with Node v25.2.1 on 10 September
2026; other modern Node versions need their own test run.

    node --test triage.test.mjs change-review.test.mjs
    node change-review.mjs
    node --input-type=module -e 'import {evaluate} from "./triage.mjs"; console.log(JSON.stringify(await evaluate(), null, 2))'

Fifteen code tests should pass. The change review prints a full JSON report,
matching change-record.json, and exits 2 for the expected HOLD decision. That is
not a broken command: review found a regression and remaining failures. Exit 1
means a command/data error. Even no known failures yields REVIEW_REQUIRED, not
release approval. No command writes files, sends messages or opens a network port.

The final optional command runs the unchanged original baseline: 5/6. Case s6
exposes a negation failure. The test passes because the failure is recorded, not
because the classifier is production-ready. Do not report this as customer accuracy.

## Completed comparison and failure log

The candidate splits a message at punctuation, drops whole clauses containing
"not about", then uses the original keyword rules. It is intentionally limited.
It does not understand English, learn from data or fit model parameters.

| Visible set | Baseline | Candidate | Interpretation |
| --- | --- | --- | --- |
| Original development cases | 5/6 | 6/6 | Repairs s6, the motivating case |
| Added contrast cases | 4/8 | 6/8 | Three improvements but c3 regresses; c5 still fails |
| Combined | 9/14 | 12/14 | Higher aggregate score does not remove either defect |

Both sets were visible during authoring. The extra cases are not independent or
held-out evaluation, even though they are listed separately. Expected answers never
enter predictor arguments. Each prediction receives only the input text.

- c3: "This is not about my appointment time but the appointment date."
  Expected appointment; baseline appointment; candidate other. The candidate drops
  the entire clause, including the active request. It regresses a previously correct
  route. Preserve this example before proposing a narrower change.
- c5: "Can I reschedule?" Expected appointment; both return other. Neither ruleset
  recognises the paraphrase. Do not claim general negation or language understanding.

change-record.json retains all fourteen rows, counts, both failures, model-free
boundaries and SHA-256 hashes of the four source/test files. Hashes establish file
identity, not independent security or human review. The website renders the results
from that record and checks them against executed output before building.

The complete example in PORTFOLIO.md records scope, actual results, failure causes,
AI assistance, rollback and pending review. Attribute this teaching starter rather
than claiming it as your own completed client work.

## Scope and acceptance

- Input: an id and 1–2000 characters of synthetic text.
- Output: billing, appointment or other; always needs-human-review.
- Unknown output shapes and adapter errors become rejected predictions.
- No output is sent, approved or executed. A real review interface is NOT included.
- Tests cover clear cases, known wrong routing, malformed output, attempted extra
  actions, rejected input and exclusion of expected labels from predictor input.

## Your next extension, not a claimed completed feature

Use an AI coding tool to propose one small improvement. Read the diff, explain every
line and add tests before accepting it. Keep the original baseline for comparison.
For a new experiment, keep development and evaluation separate. Cases you inspect
and tune against become development data. Ask another person to design a permitted
evaluation set before comparing a frozen candidate; record that provenance honestly.
Do not relabel this public fourteen-case set as independently held out.

For a model experiment, implement a separate async predictor(text) that returns only
{ category: "billing" | "appointment" | "other" }, then pass it to evaluate(predictor).
The starter does not include a learned model, provider adapter or measured latency/cost. Add
timeouts, budget caps, provider/version/prompt records and appropriate data controls
before using one. Never put a secret into these public files or a repository.
For a provided local learned-model example, continue with MLAI's event-reply lab:
https://mlai.au/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence
It compares a learned classifier with rules and preserves its own failures. It is
a separate fixture, not evidence that this candidate learned anything.
Keep synthetic inputs; do not upload customer messages as part of this exercise.
Never execute text returned by a model.

## Example portfolio README sections to complete honestly

1. Scope: review-only triage; excluded actions and intended user.
2. Reproduction: runtime version, commands and exact source revision.
3. Data: synthetic authorship, case design and held-out evaluation limitations.
4. Results: baseline and candidate counts, rejected predictions, failure examples.
5. AI assistance: tool/version, what it suggested, what you changed and verified.
6. Failure log: input, expected/actual, cause hypothesis, fix and regression test.
7. Handover: known gaps, instructions, manual fallback and rollback to baseline.
8. Review: real reviewer feedback, if obtained; otherwise explicitly pending.

## Demonstration and deployment boundary

Demonstrate by running the commands locally and sharing the output or a recording.
Do not deploy this as a public service or connect it to an inbox. Production delivery
would additionally require authentication, authorised data handling, persistent review
state, monitoring, operational ownership and proportionate security assessment.
Passing this exercise does not qualify someone for a job or client contract.

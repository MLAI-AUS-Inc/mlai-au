# Filled handover: synthetic posting-log inspection

Version: agent-observation-v1. Prepared 10 September 2026.
Status: **teaching exercise delivered locally; independent review pending**.
This is not a client system or evidence of Moltbook behaviour.

## Task and contribution

Extend the earlier four-event provenance parser with an offline analysis of
attempts, publication outcomes, exact duplicates, recorded moderation states and
timing sensitivity. Codex assisted the implementation, test authoring and local
verification. No separate human recipient has reproduced or accepted this kit.

## Inputs and setup

- Input: nine author-visible fictional attempts by alpha and beta, over a declared
  five-minute UTC window. All text, accounts, response states and times are invented.
- Software: dependency-free JavaScript; recorded environment Node v25.2.1 on
  darwin/arm64. Full selected version fields are in recorded-run.json.
- Exact source identity: six SHA-256 hashes in that record. This is an uncommitted
  source snapshot, not a deployed commit, signed release or identity certificate.
- Secrets, customer data, external requests, model calls and real actions: none.
- Reproduction: the three commands in README.md; source/fixture files must remain
  together. run.mjs resolves them relative to itself, including paths with spaces.

## Recorded results and decisions

23 code tests pass. The observation returns **needs-review**, not an approval.
It counts 9 attempts / 6 published / 2 rate-limited / 1 error. Histogram counts
are 5, 1, 2, 1, 0. The trace independently retains the human-input record and the
missing-approval flag. Nothing was actually published or sent by the exercise.

| Finding | Proposed follow-up | Actual decision status |
| --- | --- | --- |
| p4 occurs before p3's recorded delay has elapsed | Investigate client retry scheduling in a real permitted system; retain the early attempt in reports | Demonstrated fictional defect; no scheduler implemented or repaired |
| p5 is exactly at p4's recorded delay | Keep equality semantics explicit and test other quota/window rules separately | Meets this comparison only, not proof of overall rate-limit compliance |
| p1/p2/p7/p9 have identical text | Inspect context and repetition policy before taking any moderation action | 3 repeated publications after the first, out of 6; no spam judgement |
| p2 flagged; p5/p7/p9 unreviewed | Assign a real authorised reviewer before relying on a moderation decision | No reviewer assigned or decision performed; flags remain unresolved |
| Cutoffs yield 3/7, 5/7 and 6/7 intervals | Report all cutoffs and the chosen window; do not train an actor classifier on invented labels | Ground truth not collected; autonomy not established |

run.mjs exits 0 when its bounded checks execute; that is not a deployment gate.
The machine record always keeps independentReview and productionApproval false.

## Acceptance evidence and limits

The tests cover schema failures, timestamp and bucket edges, absent/zero retry
durations, missing follow-up, exact duplicates, denominators, queued moderation,
threshold sensitivity and input non-mutation. They reproduce the selected fixture,
not all possible agent behaviour. The test set was visible during development.

Not tested: real HTTP/platform quotas, model behaviour, toxicity detection,
authenticated human actions, clock correctness, omitted logs, signed approvals,
tamper-resistant storage, privacy compliance or compatibility across operating
systems. Exact-content hashes do not anonymise low-entropy/private text. The
papers' analyses were not reproduced by this lab.

## Recipient's next action

Read the files, rerun the unchanged kit, compare source identities and deterministic
results, then make one documented change in a separate copy. Preserve failed
predictions and explain changed denominators. Record the actual reviewer and scope
only after review occurs. Do not convert this pending handover into a client-ready
portfolio claim simply because all supplied tests pass.

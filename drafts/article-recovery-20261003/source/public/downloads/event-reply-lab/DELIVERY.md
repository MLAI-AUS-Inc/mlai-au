# First-delivery review: an event reply prototype

Version: startup-builder-delivery-v1. Executed 10 September 2026 using Node
25.2.1 on macOS arm64. This is a completed teaching handover, not a client
acceptance, independent technical review or claim of commercial demand.

## Reproduce from the downloaded kit

Unzip `startup-builder-delivery-kit.zip` into an empty folder. It contains ten
files. No package installation, credentials, model subscription or network call
is needed. Read the small programs before running them.

```sh
node --test lab.test.mjs delivery-check.test.mjs
node lab.mjs
node delivery-check.mjs
```

Expected: 22 tests pass (14 prototype tests and 8 delivery-review tests).
`lab.mjs` exits 0 and reproduces `recorded-result.json`.
`delivery-check.mjs` reproduces `delivery-record.json` and exits **2**, deliberately:
the result is **HOLD**. Exit 1 means an invalid input/usage or execution error.
Do not hide exit 2 or relabel it as an accepted delivery. A future result of
REVIEW_REQUIRED means only that the selected checks match; it never approves release.

The kit reuses the unchanged event-reply lab, fixture and recorded result from
MLAI's prototype guide. It is not a second independent experiment. `README.md`
explains that classifier, all structural boundaries and its original six files.

## Completed handover record

| Field | Recorded value |
| --- | --- |
| Intended recipient/task | Fictional club organiser preparing a draft answer about one event's time or location. No actual organiser was interviewed. |
| Allowed inputs | Invented v1 JSON fixture: 12 training questions, three structured notices and eight selected development cases; request identifies one event and a notice version. No personal/customer data. |
| Output | A time or location draft copied from matching notices, both source IDs and mandatory human-review status; otherwise abstention/refusal. |
| Excluded capabilities | No inbox, sending, booking, payment, attendee lookup, storage service or external API. A regex is not comprehensive privacy protection. |
| Implementation | Independent keyword rules versus a small fitted multinomial naive Bayes classifier in model.mjs; lab.mjs enforces input/evidence boundaries. delivery-check.mjs compares actual replies with separately specified expectations for the eight fixed questions. |
| AI assistance and contribution | Drafted with an AI coding assistant; executed and inspected by the implementation agent. No independent human technical approval is claimed. A reader must identify their own changes rather than claim authorship of the supplied starter. |
| Executed evidence | The commands above on 10 September 2026, Node 25.2.1/macOS arm64. 22 tests pass. Full results are in the two JSON records. Tests deliberately preserve known prototype failures. |
| Raw intent routing | Rules match 4/8 selected labels; classifier matches 6/8. Both incorrectly predict location for the attendee-email question and time for parking. |
| Application requirements | Rules match 5/8; classifier matches 7/8. The earlier privacy boundary correctly refuses q6, without erasing the wrong raw intent. The classifier still fails q8 by drafting the time when parking was requested. |
| Delivery decision | HOLD for this brief. Baseline also fails q3/q4 by abstaining on supported paraphrases. Citations and a review flag do not make the parking answer useful. |
| Failure owner/next action | Teaching exercise has no assigned commercial owner. Before use, assign a delivery owner; investigate relevance handling, add separately reviewed cases including negation/paraphrases, and rerun full results. Do not patch only the q8 string or silently rewrite the frozen result. |
| Disable/recovery | Do not connect this prototype to real communication channels. Stop running it and use the original notices manually. Switching back to rules does not fix q8. There is no dispatched action to undo. |
| Dependencies/access | Local Node runtime and these ten text files; runtime compatibility is verified only as stated. No secrets, cloud account, customer system or provider endpoint was used. |
| Capacity and money | Illustrative, not measured: build 6h + test 4h + docs 2h + review 2h = 14h; 8h available leaves 6h unmet. No project price, income or spending was measured. Excludes live integration/support. |
| Support/ownership | No commercial support or response-time commitment. Permissions, licensing/IP, access, acceptance, payment and support terms for any client project remain unresolved; this record grants none. |
| Release/reviewer status | Independent technical/recipient review PENDING; representative evaluation PENDING; actual user demand and operational obligations PENDING. No client or production approval. |

## What the results do and do not mean

The eight questions are invented development cases visible to the author, not
an independent or representative benchmark. The fixed as-of time is 1 February
2026, with invented February notices. It is deliberate historical test data,
not a source of current event information. The raw routing count and task-match
count answer different questions; neither is a general accuracy claim.

The review program rejects missing/duplicate/relabeled cases, different version
identities, malformed replies and forged aggregate counts. It checks exact
drafts and both citations against independently specified expected fields.
This makes it useful for this fixed contract, not an evaluator of arbitrary
language or a cryptographic attestation of where input JSON came from. Use the
runner to produce observations; a supplied JSON record alone does not prove a run.

The tests demonstrate a known defect correctly, so a green test run coexists
with a HOLD delivery decision. Independent review of the expectations themselves
is still needed. Do not fit expectations to current behaviour to manufacture a pass.

## Your next experiment

1. Reproduce both records unchanged and explain q6 versus q8 in your own words.
2. Keep this v1 baseline. Propose a narrower capability or relevance-handling
   change; have someone else review the intended outcomes before implementation.
3. Create a versioned set of genuinely new permitted cases. Keep unknowns and
   adverse outcomes; do not call a set independent if you used it to tune the code.
4. Record your actual diff, AI tool use, manual review, commands and failures.
5. Investigate a real user's task separately, with consent. A synthetic project
   is not customer validation or client experience. Share only permitted material.

The separate `startup-builder-validation.txt` worksheet on the article is for
problem research. Its fictional interview/workflow scenario remains UNRUN;
executing this technical lab does not change that status.

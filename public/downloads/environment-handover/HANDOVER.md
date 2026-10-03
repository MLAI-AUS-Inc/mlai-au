# Environment handover: a completed local example

Artifact: learning-handover-v1. Recorded 10 September 2026. This is MLAI's
AI-assisted teaching starter, not the recipient's original client delivery.
The separate source file hashes identify this uncommitted draft; no Git commit,
signed release or independent reviewer approval is attested.

## Start here

Download environment-handover-kit.zip from the Issue 8 article and extract it.
Keep its two folders together: ai-builder-lab and environment-handover. Open a
terminal in the extracted parent folder. Paths with spaces were tested locally.
Inspect the supplied JavaScript before running it. Do not upload client data.

    node --version
    node environment-handover/inspect.mjs
    node --test --test-reporter=tap ai-builder-lab/triage.test.mjs ai-builder-lab/change-review.test.mjs environment-handover/inspect.test.mjs
    node ai-builder-lab/change-review.mjs

Record each exit status before the next command (bash/zsh: `echo $?`;
PowerShell: `$LASTEXITCODE`). The PowerShell instructions are not a Windows
compatibility test. This package was executed on macOS only.

Expected sequence: 0 for file inspection, 0 with 24 passing code tests,
then **2 and HOLD** for the classification change review. The final command
reproduces every field in ai-builder-lab/change-record.json. Do not discard exit 2:
it retains c3's new regression and c5's remaining failure.

## Completed environment manifest

| Field | Actual local record |
| --- | --- |
| Reader/task | An AI-assisted builder preparing a bounded, review-only triage exercise for another operator |
| Source identity | Seven exact files listed in expected-files.json; checker identity in recorded-run.json; no committed revision attested |
| Host | macOS 26.6.2 (25G83), Darwin kernel 25.6.0, arm64 |
| Runtime | Node v25.2.1; V8 14.1.146.11-node.14; not a recommendation to change your project's runtime |
| Package manager/lock/install | None required for these dependency-free Node files; no package installation performed |
| Container or VM | None used in this recorded run |
| GPU, driver, model/API | Not used; the two classifiers are keyword rules, not learned models |
| Configuration/secrets | No required variables or credentials; no environment values collected by the checker |
| Fixture | Fourteen fictional author-visible cases, never customer messages or independent evaluation data |
| Commands/exit evidence | Exact commands and observed statuses in recorded-run.json; 24 tests pass, comparison exits 2/HOLD |
| Known failures/fallback | Candidate routes c3 to other instead of appointment and fails c5; keep the exercise local and review-only; no real sending or review UI exists |
| Operator/date | Codex-assisted local execution, 10 September 2026; AI model version not recorded; recipient reproduction pending |
| Not tested | Windows/Linux, another machine/person, installation on a clean OS, GPU/API access, concurrency, performance, security or client readiness |

The checker prints only Node/V8, platform, architecture, kernel and the seven
source-file hashes/statuses. It does not print username, hostname, local paths or
an environment dump. Review even this small record before sharing: versions and
hashes are still system/project information. General application test logs can
contain private paths or secrets; this checker does not redact other tools' logs.

## What the actual run establishes

- The seven named files match the pinned manifest. That check **does not execute
  the lab**. It ignores unlisted files and is not a sandbox or security scanner.
- The 24 code tests (15 lab + 9 checker) ran and passed on the recorded setup.
  They test current behaviour, including known failures, not delivery acceptance.
- The comparison reproduced the supplied record exactly: baseline 9/14, candidate
  12/14, two remaining failures including one regression. Decision: HOLD.
- In a separate disposable copy, removing triage.mjs produced missing / exit 2;
  replacing it with a non-executed throwing fixture produced different / exit 2.
  Both negative observations remain in recorded-run.json.

Hashes detect a difference from this supplied manifest. They do not prove
authenticity if an attacker changes both the source and manifest, nor protect
against files changing after inspection. Do not auto-run arbitrary downloaded
code or update the expected hash merely to make a warning disappear.

## Troubleshooting before changing the environment

| Observation | Meaning and next action |
| --- | --- |
| `node` is not found | A Node runtime is not available in that terminal. Use your team's approved setup and record its version; this kit does not install it. |
| Inspector exits 1 | Wrong arguments or missing/malformed expected-files.json. Check extraction layout and use only `--lab PATH` when selecting another lab folder. |
| Inspector exits 2 / missing | Compare the exact seven names. A partial download or wrong folder is not a dependency problem; restore the complete bundle. |
| Inspector exits 2 / different | Inspect the diff. An intentional change needs its own version and reviewed manifest; do not call it this reference result. |
| Inspector exits 2 / not-regular | A named source is a folder or symbolic link. Restore the expected regular file; do not follow an unknown link. |
| File check passes but tests fail | Record Node/OS, first failing test, inputs and actual output. Matching bytes do not establish runtime compatibility. Do not delete the test or silently upgrade everything. |
| Tests pass but review exits 2/HOLD | Expected here: the classifier still violates the teaching task. Preserve c3 and c5 before proposing a new change. |

To practise the missing-file case yourself, use a disposable copy, move triage.mjs
out of that copy, run the inspector with `--lab "PATH TO COPY"`, then restore it.
Do not alter your only copy or client work. The checker never modifies files.

## Recipient handover: still pending, not fabricated

A second operator should record their date, environment, unmodified source
identity, command statuses, full comparison and any divergence. Their Node/OS
fields may differ; source hashes and the deterministic comparison should match
before claiming the same result. Even a match is evidence only for that setup.
Record unsuccessful reproduction too, with the first failing step and a minimal
permitted example. No recipient has independently signed off this handover.

For your own portfolio, explain what you changed, how AI coding tools helped,
what you personally checked, the failures and who reproduced the work. Keep this
starter attributed; request permission before sharing client source or results.
MLAI Studio applications and paid-project matching depend on fit and availability.
Do not treat this exercise as a qualification or a promise of work.

Article and source context:
https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8

This is an environment handover, not a gaming, Linux/Windows or AI-inference
benchmark. The 2023 Proton paper is not evidence for the results of this exercise.

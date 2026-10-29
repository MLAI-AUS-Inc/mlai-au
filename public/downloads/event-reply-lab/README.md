# Event-reply prototype: a small model inside a restricted application

All questions, notices and answers are invented teaching data. This is not an MLAI
event service, a real client delivery or a production-ready chatbot. There is no
LLM, paid provider call, network listener, sending/booking tool or attendee database.
The reply is a fixed template populated from approved structured notice fields.

## Run the actual files

Save these six files together in one new local folder, retaining their filenames:
`model.mjs`, `lab.mjs`, `synthetic-fixture.json`, `lab.test.mjs`,
`recorded-result.json`, `README.md`. Do not execute downloaded code before reading
it. Use a maintained Node.js runtime; this lab needs ES modules, `node:test` and
`structuredClone`. No package install or API key is needed.

```sh
node --version
node --test lab.test.mjs
node lab.mjs
```

The tests should report 14 passes. The full JSON printed by the third command
must agree with `recorded-result.json`, not just the headline counts. The lab was
executed on 10 September 2026 using Node 25.2.1 on macOS arm64. These instructions
have not been independently reproduced on Windows/Linux or by a recipient.

## What is actually learned?

`train()` fits a multinomial naive Bayes classifier to 12 labelled questions
(six time, six location). It counts lowercase ASCII word tokens, uses empirical
class priors and Laplace smoothing. There are no pretrained/downloaded weights.
The model sees question text only, not notices, private records or expected labels.
Unknown vocabulary is ignored; no known tokens or a log-score margin below 0.75
returns `other`. That chosen teaching cutoff is NOT calibrated confidence.

The official [scikit-learn explanation](https://scikit-learn.org/stable/modules/naive_bayes.html#multinomial-naive-bayes)
describes this model family and smoothing. This JavaScript implementation does not
import scikit-learn. Its tests check the word-count calculation against a small
hand-solvable example; the documentation does not validate our code or its results.

The separate rules baseline looks for time/location keywords and abstains when
both/neither match. It is intentionally small, not an optimised production rival.
Choosing a finite set of fields directly could remove the need for either model.

## Recorded result and failures

| Routing measure | Rules | Learned classifier |
| --- | ---: | ---: |
| Expected intent matches / 8 questions | 4 / 8 | 6 / 8 |

These are routing counts on selected invented development cases, not end-to-end
answer accuracy, productivity gains or representative market performance. All
eight cases were visible during implementation. They are NOT an independent blind
benchmark. They are excluded from fitting; changing their labels cannot alter
predictions, and exact normalised training/evaluation duplicates are rejected.
Near-duplicate semantics and selection bias remain. Collect new permitted examples
with an independent reviewer before estimating generalisation. See
[Google's training/validation/test guidance](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets).

- q3/q4: the learned classifier recognises the taught “commence” and “hall/meet”
  patterns where the minimal keyword baseline abstains. This may reflect our
  chosen examples, not a general model advantage.
- q6: both classifiers misroute an attendee email request to `location`. The
  separate request filter refuses it before classification in the application.
  That does NOT make either raw classification correct.
- q8: both return the start time for a parking question. The fact matches two
  notice fields but is irrelevant to the request. **Reject this draft.**
  Citations and valid output schemas do not establish answer usefulness.

No independent human reviewer has approved this prototype. Do not deploy either
candidate on these results. A valid next iteration is a field-selection interface,
or fresh task examples and a reviewed abstention policy—not hiding q8 from the log.

## Enforced scope and limits

`reply()` accepts exactly `eventId`, `question`, `snapshotVersion`; rejects extra
fields; checks the selected snapshot against an explicit `asOf` clock; and stops
on absent events, missing fields, disagreements, classifier errors and async
timeouts. It copies every matching notice field into citations; the reply uses a
fixed template. It never consumes `untrustedText`, sends or registers anything.
The three supplied notices are a frozen February scenario, not current events.
Use the present time for any real freshness check; schema checks cannot prove an
organiser approved the information or that a declared expiry is appropriate.

The privacy/action regex is a limited teaching filter, not a comprehensive intent
or security classifier. The stronger limitation is that no attendee source or
external action exists in the delivered program. A replacement JavaScript
classifier is trusted code, not sandboxed: do not run untrusted adapters. The
async timer stops waiting; it cannot terminate synchronous CPU work or cancel an
external provider's effects. No real provider outage/security test was performed.

## Use and inspect one request

```sh
node --input-type=module -e 'import {readFileSync} from "node:fs"; import {train} from "./model.mjs"; import {reply} from "./lab.mjs"; const d=JSON.parse(readFileSync("synthetic-fixture.json","utf8")); console.log(await reply({eventId:"demo-a",question:"When does it commence",snapshotVersion:d.catalog.version},d.catalog,{classify:train(d.training),asOf:d.asOf}));'
```

Leave out `classify` to disable the learned model and use the rules baseline.
All output remains for human review. Baseline mode still fails q8; switching does
not make the application ready for production. No write or external action exists
to undo; this is not a rollback implementation for real delivered messages.

## AI-assisted development and handover record

An AI coding assistant drafted these files and test cases. Agent-run checks cover
hand-calculated probabilities, actual runtime output, strict schemas, asynchronous
failure behaviour and the recorded failed questions. That is not independent
human review. A builder should record their own role honestly, not claim sole
authorship or client approval by downloading this lab.

Complete before using your own permitted project in a portfolio (PENDING until done):

- Owner / intended user / bounded decision:
- Your actual changes and AI assistance used:
- Data source, permitted uses and snapshot approval:
- Node/OS/version and exact reproduction commands:
- Test output / date / failing cases / unresolved issues:
- Separate new evaluation source / reviewer / selection method:
- Baseline and alternative-interface comparison:
- Reviewer checked each draft against the request AND evidence:
- Real provider calls/costs/privacy terms: NOT RUN in this lab:
- Capability inventory / no-action boundary / remaining security review:
- Deployment status / disable procedure / support owner:
- Client permission for any portfolio material:
- Independent review, name and decision: PENDING:

Suitable builders can use broader delivery evidence to apply to MLAI Studio;
this exercise alone does not establish client readiness or guarantee paid work.

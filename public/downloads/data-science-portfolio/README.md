# Data-science portfolio lab: when the baseline wins

Version: workload-forecast-v1. Educational, entirely synthetic workload data.
This is a local analysis script, not a staffing tool, customer case or hiring test.

## Run the exact example

Save forecast.mjs, forecast.test.mjs and synthetic-workload.json together in a new
folder. Save recorded-result.json alongside them to compare the published output.
No packages, API keys, network requests or account are required. Use a supported
Node installation with node:test; this version was actually run on Node 25.2.1,
macOS arm64 on 10 September 2026 (Australia/Melbourne). Other runtimes are unverified.

```sh
node --test forecast.test.mjs
node forecast.mjs
```

The first command runs 11 tests. The second prints JSON including every prediction,
absolute error, metric, date boundary and limitation. Output is not saved by the
script. It exits non-zero with an error if its input is missing or malformed:

```sh
node forecast.mjs missing-data.json
```

This command intentionally fails. There is no fallback score or hidden data source.
If your browser adds .txt to a downloaded .mjs file, restore the displayed filename
before running it. Read unfamiliar code before executing it.

## Task, data and fixed comparison

Fictional question: how many enquiries might arrive each day over the next 14 days?
The demonstration only produces a report. It cannot schedule workers, send messages
or change a business system. Node is used for a small dependency-free example; it
is not a claim that Australian data-science employers require JavaScript.

The 42 rows were invented for this exercise, not obtained from customers, public
records, AEMO or BOM. No real person or business is represented. Weekly levels are
[20,23,26,29,28,27], plus weekday offsets [0,3,2,1,-1,-8,-10] and these fixed noises:

```text
week 1:  0, 1,-1, 0, 0, 1,-1
week 2:  1, 0, 0,-1, 1, 0,-1
week 3:  0,-1, 1, 0,-1, 1, 0
week 4:  1, 0,-1, 1, 0,-1, 0
week 5:  0, 1, 0,-1, 1, 0,-1
week 6: -1, 0, 1, 0, 0, 1,-1
```

All dates are ordered daily calendar labels, not event timestamps or local time
conversions. Every row has exactly date and requests. Counts are integers in
0–100000. Missing days, duplicates, extra fields and coercible strings fail rather
than being silently repaired. These bounds suit the exercise, not every dataset.
If you replace this fixture, record the actual source, licence, permitted use and
redistribution conditions before sharing it or using an AI service.

- Training: 28 days, 5 January–1 February 2026, four complete Monday–Sunday weeks.
- Forecast origin: end of 1 February. Horizon: 14 days, 2–15 February.
- Baseline: repeat the last training week's value for each matching weekday.
  Week two still uses the last TRAINING week; no evaluation observations update it.
- Candidate: fit an ordinary least-squares line to the four training weekly means,
  then add each weekday's mean training deviation from its own week's mean.
  Predict the future week level plus that weekday effect. Negative predictions are
  visibly flagged and clipped to zero; none are clipped in this fixture.
- Both methods receive the same future dates; only the scorer receives future counts.
  Changing the evaluation counts cannot change the fitted values or predictions.

## Actual local result, with a failure worth explaining

All 14 evaluation dates are retained. Sum of absolute errors: baseline 21,
candidate 84. Mean absolute error (MAE): 21/14 = 1.5 versus 84/14 = 6.0 requests/day.
Lower is better on this one fixture. Week-one errors average 1.0 versus 4.0;
week-two errors average 2.0 versus 8.0. For 9 February, observed count is 26,
baseline 30 (error 4) and candidate 35.5 (error 9.5).

The training trend rises but the constructed evaluation levels decline. The
candidate extrapolates growth and overpredicts. Keep the baseline as the comparison
for this exercise; do not recommend the candidate on this result. Neither is
approved for business deployment. No prediction intervals, holiday effects,
staffing costs, operational requirements or representative real-data validation exist.

This is an intentionally designed lesson, NOT a blind independent benchmark.
“Held out” here means excluded from fitting, not unknown to the example's designer.
The test that records the candidate's loss passes because failure is visible, not
because the candidate forecasts well. Do not tune against these displayed outcomes
and describe a later gain as independent validation. Use a training-only validation
scheme and a genuinely untouched period for a fresh comparison.

## Downloadable portfolio acceptance checklist

Copy this record for YOUR work; blank fields are not passed checks.

- Target role / dated position-description URL / actual selection criterion:
- Reader decision / owner / excluded automated actions:
- Data source / synthetic construction / permission and redistribution limits:
- Source revision, runtime, commands and fresh-run evidence:
- Training and evaluation dates, forecast origin, horizon and leakage review:
- Baseline choice and candidate fit; information available at prediction time:
- Metric, units, ALL case results, failure example and unresolved limitations:
- Missing-field, invalid-count, duplicate, date-gap and dependency-failure evidence:
- AI tool/version, requested change, accepted diff, rejected suggestions and checks:
- Handover: setup, expected output, failure instructions and decision not to deploy:
- Actual independent reviewer, review scope/date/feedback — otherwise PENDING:
- Work you personally changed and can explain without generated answers:
- Client permission before publishing client work; portfolio and application claims:

Suggested interview explanation after you genuinely reproduce and understand it:
“I compared a fitted trend/weekday model with a seasonal baseline on a synthetic
14-day holdout. MAE was 6.0 versus 1.5 requests/day. I traced the loss to the changed
pattern and kept the failure in my report.” Describe your OWN changes and checks;
do not claim authorship, human review, client savings or job impact you cannot prove.

## AI assistance and review status

An AI coding assistant drafted this reference implementation, fixture and tests.
The local run checked hand-solvable coefficients, independent MAE arithmetic,
future-target isolation, fixed-origin baseline behaviour, input errors, clipping,
immutability and CLI failure. Automated tests are not independent human review.
No hiring manager, client or independent delivery reviewer has approved this lab.
Record your tool/version and accepted/rejected changes when extending it.

## Source roles, checked 10 September 2026

Hyndman and Athanasopoulos, Forecasting: Principles and Practice (3rd ed), explain
seasonal naive baselines and out-of-sample forecast error/MAE. They did not supply
or validate this fixture, implementation or results:
https://otexts.com/fpp3/simple-methods.html
https://otexts.com/fpp3/accuracy.html

scikit-learn's leakage guidance supports keeping fitting/preprocessing decisions
away from test data; this Node lab does not import or test scikit-learn:
https://scikit-learn.org/stable/common_pitfalls.html

Article: https://mlai.au/articles/featured/how-to-get-data-science-job
For a distinct implementation exercise:
https://mlai.au/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence
If you can independently deliver and explain a scoped project, consider applying:
https://mlai.au/mlai-studio#apply
An application is not guaranteed paid work, job readiness or employment.

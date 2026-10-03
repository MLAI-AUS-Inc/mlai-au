# Local inference and serving lab

Save all seven files together: model.mjs, server.mjs, server.test.mjs,
measure.mjs, measure.test.mjs, recorded-measurement.json and this README.
Inspect the five JavaScript files before running. No packages, customer data,
provider account or API key are needed. The observed runtime was Node v25.2.1;
other modern Node versions require their own test run.

```sh
node --test server.test.mjs measure.test.mjs
node measure.mjs > my-measurement.json
```

Nine tests should pass. measure.mjs starts its own loopback server, prints a
JSON report, then closes the server. Use a fresh output filename to retain
previous measurements. Exit 0 means the fixture matched; exit 2 retains the
complete report with request failures or output mismatches; exit 1 reports an
infrastructure/startup/completion error on stderr. None approves production use.
For manual requests use node server.mjs,
copy the port it prints, and POST application/json to /predict:
{"inputs":[3,-1]} -> outputs [7,-1], modelVersion synthetic-linear-v1.
Stop the manual server with Ctrl+C. No provider account or dependencies needed.

The saved linear coefficients weight=2, bias=1 fit invented pairs (0,1),(1,3),
(2,5). No training runs inside requests. These numbers have no business meaning.
Exact arithmetic matches on four further inputs do not establish real-world
model quality. No language model, tokens, retrieval or agent actions are used.

The service binds only to 127.0.0.1 on an available port. Keep it local: no
authentication, TLS, rate limiting, production monitoring or customer-data
protections are implemented. Do not expose it with a tunnel. Basic timeouts
are configured but comprehensive timeout/slow-client behaviour is not tested.

## Measurement record

The supplied full record began 2026-09-09T22:20:31.224Z (10 September in
Melbourne). It used Apple M3 Pro / 12 logical CPUs / 36 GiB system memory,
darwin 25.6.0 arm64, Node v25.2.1, client and server in one process.
Its protocol is inference-serving-measure-v2. The article renders its timing
table from this JSON, not a separately copied table. Source SHA-256 hashes bind
the observation to all five JavaScript files; they are provenance, not a
security signature or independent approval.

Inputs [3,-1,0.5,4]; expected [7,-1,2,9]. Ten paired comparisons alternate which
mode runs first: five sequential-first and five grouped-first, not randomised.
Both modes are synchronous at concurrency one with no retries and a 5000 ms
request deadline. Two warm-up requests (single then grouped) are preserved but
excluded from comparison quality. Server startup occurs before either warm-up;
these are not cold-process timings. Mode elapsed time includes local HTTP,
response parsing, contract validation and loop/bookkeeping overhead.

Observed: 40/40 exact matches in each mode, 52 total HTTP attempts (including
warm-up), 85 scalar inputs, zero failed requests, 857 request-body bytes and
2791 complete response-body bytes. Byte counts exclude headers and transport
overhead. Ten pairs on four mathematical inputs cannot establish tail latency
or real-world generalisation. Timing values will vary between runs: compare
source hashes, fixture, protocol, counts and outcomes, not exact milliseconds.

Provider API spending: zero (no provider called); currency is not applicable.
Token counts are not applicable, not zero-token LLM inference. Total operating
cost, hardware allocation, energy use/cost and labour hours/cost are unmeasured
and represented by null. Do not turn null into zero when plotting or reporting.
This is grouped synchronous HTTP, not queued cloud batch inference or an LLM
throughput benchmark. Do not claim a universal speed/cost advantage.

## Failure evidence

The controlled test suite is separate from the recorded successful run:

- One HTTP 503 after warm-up still produces all 52 attempts, with the failed
  position retained and sequential quality 39/40, not 39/39.
- HTTP 200 with incorrect numeric outputs gives zero transport errors but
  quality 0/40 in each mode. Transport success does not imply task success.
- Invalid JSON, wrong model version/shape/count/type, redirects, a refused
  connection and a stalled server are explicit failures. The stalled-server
  test uses 20 ms; it is not a comprehensive network timeout evaluation.
- Direct JavaScript calls reject sparse arrays as well as invalid numbers;
  minimum/maximum values and 32-input requests remain valid.

Expected labels stay outside request payloads. Failed outputs retain their
positions and count as non-matches in the full denominator. Raw timing records
are retained; no failed run is silently discarded in favour of a faster one.

## Handover and extension

Record model, runtime, hardware, fixture, date, warm-up, timing boundaries,
concurrency, errors and repetitions. For an LLM adapter separately record tokens,
cache state, retries, actual price/currency and the relevant provider version.
Keep expected answers out of request inputs. Compare task-specific quality
before choosing by speed. Include failed cases in the report.

This asset was AI-code-assisted and automatically tested. This revision replaced
fixed sequential-first measurements with balanced ordering, added retained
failures and source hashes, and corrected direct sparse-array validation.
No independent human or recipient review is claimed. Record your coding tool,
model, prompts, diffs, rejected suggestions, manual interventions and tests.
Add a failing test before implementing a fix. The record does not infer the
identity of an AI model or any human reviewer from the byline.
Passing this toy lab is not evidence of production readiness or job eligibility.

Before a real handover: obtain independent reproduction; choose a meaningful
task/quality metric and unseen evaluation data; agree permissions and support;
measure full operating costs within a declared boundary; and test the intended
deployment environment. These are open tasks, not results of this exercise.

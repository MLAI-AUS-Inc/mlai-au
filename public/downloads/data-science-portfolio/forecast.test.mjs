import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { fitWorkloadModel, forecast, runExperiment, scoreForecast, validateRows } from "./forecast.mjs";

const fixture = JSON.parse(readFileSync(new URL("./synthetic-workload.json", import.meta.url), "utf8"));
const day = 86_400_000;
const copy = value => JSON.parse(JSON.stringify(value));
const dates = (start, length) => Array.from({ length }, (_, index) => new Date(Date.parse(start + "T00:00:00Z") + index * day).toISOString().slice(0, 10));

test("fits a hand-solvable weekly trend and weekday pattern using training alone", () => {
  const training = dates("2026-01-05", 28).map((date, index) => ({ date, requests: 10 + 2 * Math.floor(index / 7) + index % 7 }));
  const fitted = fitWorkloadModel(training);
  assert.equal(fitted.intercept, 13);
  assert.equal(fitted.slope, 2);
  assert.deepEqual(fitted.weekdayOffsets, [-3, -2, -1, 0, 1, 2, 3]);
  const result = forecast(fitted, dates("2026-02-02", 14));
  assert.deepEqual(result.map(row => row.candidate), [18,19,20,21,22,23,24,20,21,22,23,24,25,26]);
  assert.deepEqual(result.map(row => row.baseline), [16,17,18,19,20,21,22,16,17,18,19,20,21,22]);
});

test("changing future outcomes changes errors, never fitted values or fixed-origin predictions", () => {
  const original = runExperiment(fixture);
  const changed = copy(fixture);
  changed.slice(28).forEach(row => { row.requests += 50; });
  const result = runExperiment(changed);
  assert.deepEqual(result.fitted, original.fitted);
  assert.deepEqual(result.cases.map(row => [row.baseline, row.candidate]), original.cases.map(row => [row.baseline, row.candidate]));
  assert.notDeepEqual(result.mae, original.mae);
});

test("MAE is independently checkable in request counts, including zero observations", () => {
  const actual = [{ date: "2026-02-02", requests: 0 }, { date: "2026-02-03", requests: 8 }];
  const predicted = [{ date: "2026-02-02", baseline: 2, candidate: 0 }, { date: "2026-02-03", baseline: 4, candidate: 2 }];
  const result = scoreForecast(actual, predicted);
  assert.deepEqual(result.totalAbsoluteErrors, { baseline: 6, candidate: 6 });
  assert.deepEqual(result.mae, { baseline: 3, candidate: 3 });
  assert.equal(result.lowerMaeOnFixture, "tie");
});

test("the supplied candidate loses without hiding dates or claiming a real deployment", () => {
  const result = runExperiment(fixture);
  assert.equal(result.training.days, 28);
  assert.equal(result.evaluation.days, 14);
  assert.equal(result.evaluation.origin, "2026-02-01");
  assert.equal(result.cases.length, 14);
  assert.equal(result.lowerMaeOnFixture, "baseline");
  assert.ok(result.mae.candidate > result.mae.baseline);
  assert.match(result.releaseDecision, /NOT APPROVED/);
  assert.match(result.provenance, /synthetic/);
});

test("missing, extra, invalid and secretly coerced input fields are rejected", () => {
  for (const bad of [null, [], {}, [{ date: "2026-01-05" }], [{ date: "2026-01-05", requests: "20" }], [{ date: "2026-01-05", requests: 2, futureTotal: 42 }], [{ date: "2026-02-30", requests: 2 }], [{ date: "2026-1-05", requests: 2 }]]) assert.throws(() => validateRows(bad));
  for (const requests of [-1, 0.5, NaN, Infinity, 100_001, undefined]) assert.throws(() => validateRows([{ date: "2026-01-05", requests }]));
});

test("duplicates, gaps and reordered dates are rejected rather than silently repaired", () => {
  const duplicate = copy(fixture); duplicate[1].date = duplicate[0].date;
  const gap = copy(fixture); gap.splice(4, 1);
  const reversed = copy(fixture).reverse();
  for (const input of [duplicate, gap, reversed]) assert.throws(() => runExperiment(input), /Dates must/);
});

test("training/test overlap, broken horizon and incomplete training weeks fail", () => {
  const fitted = fitWorkloadModel(fixture.slice(0, 28));
  for (const invalid of [[], dates("2026-02-01", 7), dates("2026-02-03", 7), dates("2026-02-02", 15), ["2026-02-02", "2026-02-04"]]) assert.throws(() => forecast(fitted, invalid));
  for (const rows of [fixture.slice(0, 7), fixture.slice(0, 15), fixture.slice(1, 29)]) assert.throws(() => fitWorkloadModel(rows));
  assert.throws(() => runExperiment(fixture.slice(0, 41)), /28 training days/);
});

test("malformed fitted models and mismatched scoring dates cannot manufacture a score", () => {
  const fitted = fitWorkloadModel(fixture.slice(0, 28));
  for (const model of [null, {}, { ...fitted, slope: Infinity }, { ...fitted, baselineWeek: [-1,1,1,1,1,1,1] }, { ...fitted, trainingEnd: "2026-01-31" }]) assert.throws(() => forecast(model, dates("2026-02-02", 7)));
  assert.throws(() => scoreForecast(fixture.slice(28), []));
  assert.throws(() => scoreForecast([{ date: "2026-02-02", requests: 3 }], [{ date: "2026-02-03", baseline: 2, candidate: 3 }]));
  assert.throws(() => scoreForecast([{ date: "2026-02-02", requests: 3 }], [{ date: "2026-02-02", baseline: 2, candidate: NaN }]));
});

test("negative trend forecasts are explicitly clipped, never negative staff counts", () => {
  const training = dates("2026-01-05", 28).map((date, index) => ({ date, requests: 6 - 2 * Math.floor(index / 7) }));
  const predictions = forecast(fitWorkloadModel(training), dates("2026-02-02", 14));
  assert.ok(predictions.every(row => row.candidate === 0 && row.clippedAtZero));
});

test("execution neither mutates its source fixture nor exposes mutable fitted arrays", () => {
  const before = copy(fixture);
  runExperiment(fixture);
  assert.deepEqual(fixture, before);
  const fitted = fitWorkloadModel(fixture.slice(0, 28));
  assert.throws(() => { fitted.baselineWeek[0] = 999; });
  assert.throws(() => { fitted.weekdayOffsets[0] = 999; });
});

test("CLI reproduces module results and fails clearly when a dependency file is absent", () => {
  const script = fileURLToPath(new URL("./forecast.mjs", import.meta.url));
  const success = spawnSync(process.execPath, [script], { encoding: "utf8" });
  assert.equal(success.status, 0, success.stderr);
  assert.deepEqual(JSON.parse(success.stdout), runExperiment(fixture));
  const failure = spawnSync(process.execPath, [script, script + ".missing"], { encoding: "utf8" });
  assert.equal(failure.status, 1);
  assert.equal(failure.stdout, "");
  assert.match(failure.stderr, /Forecast exercise failed:.*ENOENT/);
});

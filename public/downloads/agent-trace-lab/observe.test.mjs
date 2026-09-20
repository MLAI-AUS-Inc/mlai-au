import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { observe } from "./observe.mjs";
const input = () => JSON.parse(readFileSync(new URL("./fixture.json", import.meta.url), "utf8"));

test("all attempts stay in the denominator, including two limits and one error", () => {
  assert.deepEqual(observe(input()).counts, { attempts: 9, published: 6, rateLimited: 2, errors: 1 });
});
test("histogram preserves empty buckets and exact minute boundaries", () => {
  const report = observe(input());
  assert.deepEqual(report.histogram.map(row => row.attempts), [5, 1, 2, 1, 0]);
  assert.deepEqual(report.histogram.map(row => row.published), [3, 0, 2, 1, 0]);
  assert.equal(report.histogram[1].errors, 1);
});
test("retry review retains the early retry and accepts exact delay equality", () => {
  assert.deepEqual(observe(input()).retryChecks, [
    { from: "p3", to: "p4", waitSeconds: 1, requiredSeconds: 5, status: "early" },
    { from: "p4", to: "p5", waitSeconds: 10, requiredSeconds: 10, status: "met-recorded-delay" },
  ]);
});
test("missing retry delay stays unknown rather than becoming zero", () => {
  const fixture = input(); fixture.attempts[2].retryAfterSeconds = null;
  assert.equal(observe(fixture).retryChecks[0].status, "unknown-delay");
});
test("zero delay is an explicit value, not missing", () => {
  const fixture = input(); fixture.attempts[2].retryAfterSeconds = 0;
  assert.equal(observe(fixture).retryChecks[0].status, "met-recorded-delay");
});
test("end-of-window without a next record cannot prove the client stopped", () => {
  const fixture = input(); fixture.attempts = fixture.attempts.slice(0, 3);
  const report = observe(fixture);
  assert.equal(report.retryChecks[0].status, "no-follow-up-in-window");
  assert.equal(report.retryChecks[0].waitSeconds, null);
});
test("exact duplicate publications exclude denied attempts and report a denominator", () => {
  const report = observe(input());
  assert.equal(report.duplicateGroups.length, 1);
  assert.deepEqual(report.duplicateGroups[0].publishedIds, ["p1", "p2", "p7", "p9"]);
  assert.equal(report.duplicatePublicationsAfterFirst, 3);
  assert.equal(report.duplicateDenominator, 6);
  assert.equal(report.duplicateFraction, 0.5);
  assert.doesNotMatch(JSON.stringify(report), /Weekly fixture update/);
});
test("case and whitespace variants are distinct: no semantic spam detector", () => {
  const fixture = input(); fixture.attempts[1].content += " "; fixture.attempts[6].content = "weekly fixture update";
  assert.equal(observe(fixture).duplicatePublicationsAfterFirst, 1);
});
test("moderation queues recorded flags and missing review, not invented human judgments", () => {
  assert.deepEqual(observe(input()).moderation, {
    publishedDenominator: 6, recordedCleared: 2,
    reviewQueue: [{ id: "p2", recordedState: "flagged" }, { id: "p5", recordedState: "not-reviewed" }, { id: "p7", recordedState: "not-reviewed" }, { id: "p9", recordedState: "not-reviewed" }],
  });
});
test("threshold sensitivity uses adjacent same-account attempts, including failed ones", () => {
  const report = observe(input());
  assert.deepEqual(report.sensitivity, [
    { thresholdSeconds: 1, matchingIntervals: 3, denominator: 7 },
    { thresholdSeconds: 10, matchingIntervals: 5, denominator: 7 },
    { thresholdSeconds: 60, matchingIntervals: 6, denominator: 7 },
  ]);
  assert.equal(report.actorGroundTruth, "not-collected");
  assert.equal(report.autonomy, "not-established");
  assert.equal(report.productionApproval, false);
});
test("an empty window is zero observed attempts, not a zero measured duplicate rate", () => {
  const fixture = input(); fixture.attempts = [];
  const report = observe(fixture);
  assert.equal(report.duplicateFraction, null);
  assert.equal(report.sensitivity[0].denominator, 0);
  assert.equal(report.histogram.length, 5);
  assert.equal(report.status, "no-listed-defect-found");
  assert.equal(report.productionApproval, false);
});
test("equal timestamps and a clipped final bucket are represented explicitly", () => {
  const fixture = input(); fixture.window.end = "2026-09-10T00:03:30.000Z";
  fixture.attempts[1].at = fixture.attempts[0].at; fixture.thresholdSeconds = [0];
  const report = observe(fixture);
  assert.equal(report.histogram.at(-1).end, fixture.window.end);
  assert.equal(report.sensitivity[0].matchingIntervals, 1);
});
test("observation neither mutates input nor shares mutable output arrays with it", () => {
  const fixture = input(), before = JSON.stringify(fixture), report = observe(fixture);
  report.window.start = "changed"; report.moderation.reviewQueue[0].id = "changed";
  assert.equal(JSON.stringify(fixture), before);
});
test("strict schema rejects missing fields, extra fields, real provenance and invalid payload types", () => {
  const cases = [null, [], { ...input(), extra: "secret" }, { ...input(), provenance: "production" }];
  for (const alter of [row => { delete row.moderation; }, row => { row.secret = "never-log"; }, row => { row.content = null; }, row => { row.content = " "; }, row => { row.content = "x".repeat(241); }, row => { row.account = "email@example.com"; }, row => { row.outcome = "unknown"; }, row => { row.moderation = "safe"; }]) {
    const fixture = input(); alter(fixture.attempts[0]); cases.push(fixture);
  }
  for (const fixture of cases) assert.throws(() => observe(fixture));
});
test("malformed, out-of-order, outside-window and duplicate-ID attempts are rejected", () => {
  for (const alter of [row => { row.at = "2026-02-30T00:00:00.000Z"; }, row => { row.at = "2026-09-10T00:00:01Z"; }, row => { row.at = "2026-09-10T00:05:00.000Z"; }, row => { row.at = "2026-09-09T23:59:59.000Z"; }, row => { row.id = "p1"; }]) {
    const fixture = input(); alter(fixture.attempts[1]); assert.throws(() => observe(fixture));
  }
  const fixture = input(); fixture.attempts.reverse(); assert.throws(() => observe(fixture));
});
test("invalid ranges and unbounded allocations fail before building a histogram", () => {
  const sparse = input(); sparse.thresholdSeconds = new Array(2); assert.throws(() => observe(sparse));
  for (const alter of [f => { f.window.end = f.window.start; }, f => { f.window.end = "2026-09-12T00:00:00.000Z"; }, f => { f.window.end = "2026-09-10T02:00:00.000Z"; f.window.bucketSeconds = 1; }, f => { f.window.bucketSeconds = 0; }, f => { f.thresholdSeconds = [10, 1]; }, f => { f.thresholdSeconds = [1, 1]; }, f => { f.thresholdSeconds = [0.5]; }, f => { f.thresholdSeconds = []; }, f => { f.attempts = new Array(10001); }]) {
    const fixture = input(); alter(fixture); assert.throws(() => observe(fixture));
  }
});
test("retry values must be explicit null or a bounded whole duration on a limit record", () => {
  for (const value of [-1, 0.5, 86401, "5", Infinity, NaN]) {
    const fixture = input(); fixture.attempts[2].retryAfterSeconds = value; assert.throws(() => observe(fixture));
  }
  const fixture = input(); fixture.attempts[0].retryAfterSeconds = 5; assert.throws(() => observe(fixture));
});

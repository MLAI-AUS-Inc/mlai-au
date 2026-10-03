import { test } from "node:test";
import assert from "node:assert/strict";
import { baseline, cases, evaluate, propose } from "./triage.mjs";

test("baseline routes clear cases and leaves all actions to a human", async () => {
  assert.equal(baseline("invoice").category, "billing");
  assert.equal(baseline("appointment").category, "appointment");
  for (const sample of cases) {
    const result = await propose(sample);
    assert.equal(result.status, "needs-human-review");
    assert.equal(Object.hasOwn(result, "send"), false);
  }
});
test("known negation failure remains visible instead of hiding it", async () => {
  const report = await evaluate();
  assert.equal(report.correct, 5);
  assert.equal(report.total, 6);
  assert.equal(report.results.find(row => row.id === "s6").correct, false);
});
test("malformed and action-bearing predictions fail closed", async () => {
  for (const output of [null, [], "billing", { category: "refund" }, { category: "billing", send: true }]) {
    const result = await propose(cases[0], () => output);
    assert.equal(result.error, "prediction-rejected");
    assert.equal(result.status, "needs-human-review");
  }
});
test("adapter errors do not authorize an action", async () => {
  const result = await propose(cases[0], () => { throw new Error("provider unavailable"); });
  assert.equal(result.error, "prediction-rejected");
});
test("blank and oversized inputs are rejected", async () => {
  for (const record of [null, { id: "", text: "hello" }, { id: "x", text: " " }, { id: "x", text: "x".repeat(2001) }]) {
    await assert.rejects(() => propose(record), TypeError);
  }
});
test("predictor receives only input text, not evaluation answers", async () => {
  await propose(cases[0], (...args) => {
    assert.deepEqual(args, [cases[0].text]);
    return { category: "billing" };
  });
});

import test from "node:test";
import assert from "node:assert/strict";
import { inspectTrace, syntheticTrace } from "./trace.mjs";

test("scheduled start does not erase a later recorded human edit", () => {
  const result = inspectTrace(syntheticTrace);
  assert.equal(result.humanInputRecorded, true);
  assert.equal(result.autonomy, "not-established");
  assert.deepEqual(result.flags, [{ id: "send", reason: "approval-not-recorded" }]);
});

test("regular timestamps do not prove autonomy or safety", () => {
  const result = inspectTrace(syntheticTrace.slice(0, 2));
  assert.equal(result.humanInputRecorded, false);
  assert.equal(result.autonomy, "not-established");
  assert.equal(result.status, "no-listed-defect-found");
});

test("unknown provenance stays visible and input is not mutated", () => {
  const events = [{ id: "unknown", at: "2026-09-09T00:00:00.000Z", kind: "unknown-input" }];
  const before = JSON.stringify(events);
  assert.equal(inspectTrace(events).unknownInputRecorded, true);
  assert.equal(JSON.stringify(events), before);
});

test("approval is only a recorded assertion, not authorisation performed by this lab", () => {
  const events = syntheticTrace.map(event => ({ ...event }));
  events[3].approved = true;
  const result = inspectTrace(events);
  assert.equal(result.status, "no-listed-defect-found");
  assert.equal(result.autonomy, "not-established");
});

test("broken trace linkage and unapproved actions are listed", () => {
  const result = inspectTrace([{ id: "send", at: "2026-09-09T00:00:00.000Z", kind: "external-action" }]);
  assert.deepEqual(result.flags.map(flag => flag.reason), ["missing-parent", "approval-not-recorded"]);
});

test("malformed, duplicate, impossible, reversed and secret-bearing records are rejected", () => {
  for (const events of [
    [], null, [null], [...syntheticTrace, syntheticTrace[0]],
    [{ ...syntheticTrace[0], at: "2026-02-30T00:00:00.000Z" }],
    [{ ...syntheticTrace[0], kind: "made-up" }],
    [{ ...syntheticTrace[0], token: "never-log-this" }],
    [{ ...syntheticTrace[0], approved: true }],
    [{ ...syntheticTrace[0], parentId: "missing" }],
    [syntheticTrace[1], syntheticTrace[0]],
  ]) assert.throws(() => inspectTrace(events));
});

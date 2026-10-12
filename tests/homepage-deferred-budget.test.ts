import { expect, test } from "bun:test";

async function probe(mode: string) {
  const child = Bun.spawn([process.execPath, "tests/fixtures/homepage-deferred-budget-probe.tsx", mode], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  return JSON.parse(stdout);
}

test("a slow failed optional feed reaches the complete document and hydration payload before RR serialization expires", async () => {
  const [baseline, fixed] = await Promise.all([probe("default"), probe("configured")]);
  // Negative control reproduces a readable 200 whose serialized deferred value
  // failed. Checking response status or visible SSR text alone misses this.
  expect(baseline.status).toBe(200);
  expect(baseline.hasResolvedFallback).toBe(true);
  expect(baseline.hasSerializationFailure).toBe(true);
  expect(fixed.status).toBe(200);
  expect(fixed.renderMode).toBe("complete");
  expect(fixed.feedBudgets).toEqual([8000]);
  expect(fixed.aborted).toBe(true);
  expect(fixed.loggedFailure).toBe(true);
  expect(fixed.hasResolvedFallback).toBe(true);
  expect(fixed.hasSuspenseFallback).toBe(false);
  expect(fixed.hasSerializationFailure).toBe(false);
  expect(fixed.serializedBudgets[0]).toBeGreaterThan(fixed.feedBudgets[0]);
}, 15_000);

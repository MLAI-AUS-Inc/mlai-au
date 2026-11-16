import { expect, test } from "bun:test";
import { getCachedValue } from "../app/lib/server-cache";

test("reuses completed feed data until expiry", async () => {
  const key = crypto.randomUUID();
  expect(await getCachedValue(key, 60_000, async () => ["cached"], [])).toEqual(["cached"]);
  expect(await getCachedValue(key, 60_000, async () => ["unused"], [])).toEqual(["cached"]);
});

test("a failed refresh serves stale data and reports the error", async () => {
  const key = crypto.randomUUID();
  await getCachedValue(key, -1, async () => ["stale"], []);
  const error = new Error("feed unavailable");
  const errors: unknown[] = [];
  expect(await getCachedValue(key, 60_000, async () => { throw error; }, [], e => errors.push(e))).toEqual(["stale"]);
  expect(errors).toEqual([error]);
});

test("a failed first read returns the empty fallback and permits retry", async () => {
  const key = crypto.randomUUID();
  expect(await getCachedValue(key, 60_000, () => { throw new Error("unavailable"); }, [])).toEqual([]);
  expect(await getCachedValue(key, 60_000, async () => ["recovered"], [])).toEqual(["recovered"]);
});

test("an older failed refresh cannot discard a concurrent successful refresh", async () => {
  const key = crypto.randomUUID();
  await getCachedValue(key, -1, async () => ["stale"], []);
  let reject!: (error: Error) => void;
  const failed = getCachedValue(key, 60_000, () => new Promise<string[]>((_, fail) => { reject = fail; }), []);
  expect(await getCachedValue(key, 60_000, async () => ["fresh"], [])).toEqual(["fresh"]);
  reject(new Error("older read failed"));
  expect(await failed).toEqual(["fresh"]);
  expect(await getCachedValue(key, 60_000, async () => ["unused"], [])).toEqual(["fresh"]);
});

test("Workers requests never wait on another request's pending feed read", async () => {
  const child = Bun.spawn(["node", "tests/fixtures/server-cache-worker-probe.mjs"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  expect(JSON.parse(stdout)).toEqual({ independent: "healthy", slow: "slow", cached: "slow" });
}, 15_000);

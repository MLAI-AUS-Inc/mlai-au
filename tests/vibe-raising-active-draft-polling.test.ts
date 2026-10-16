import { afterEach, expect, spyOn, test } from "bun:test";
import { startActiveDraftRunPolling } from "../app/lib/active-draft-run-polling";
import { getVibeRaisingStartupUpdateActiveRun, setVibeRaisingBrowserCompanyScope } from "../app/lib/vibe-raising";

async function settle() { for (let i = 0; i < 10; i++) await Promise.resolve(); }
function testClock() {
  let now = 0;
  let next = 0;
  const timers = new Map<number, { at: number; callback: () => void }>();
  return {
    now: () => now,
    setTimeout(callback: () => void, delay: number) {
      const id = ++next;
      timers.set(id, { at: now + delay, callback });
      return id;
    },
    clearTimeout(id: unknown) { timers.delete(id as number); },
    nextDelay() { return Math.min(...[...timers.values()].map(timer => timer.at - now)); },
    count() { return timers.size; },
    async advance(delay: number) {
      now += delay;
      for (const [id, timer] of [...timers]) {
        if (timer.at > now) continue;
        timers.delete(id);
        timer.callback();
      }
      await settle();
    },
  };
}

test("no company means no initial, focused or manually requested background read", async () => {
  const clock = testClock();
  let calls = 0;
  const poller = startActiveDraftRunPolling({ companyId: null, clock,
    load: async () => ++calls, onRun: () => { throw new Error("No company must not receive data"); } });
  poller.refresh(); poller.focus();
  await clock.advance(600_000);
  expect(calls).toBe(0);
  expect(clock.count()).toBe(0);
  poller.stop();
});

for (const status of [400, 401, 403, 404, 409, 422]) {
  test(`HTTP ${status} stops timed/focus polling; an explicit retry can recover`, async () => {
    const clock = testClock();
    let denied = true;
    let calls = 0;
    const observed: Array<string | null> = [];
    const poller = startActiveDraftRunPolling({ companyId: "company-one", clock,
      load: async (id) => { calls++; if (denied) throw { status }; return id; },
      onRun: (run) => observed.push(run) });
    await settle();
    expect(calls).toBe(1);
    expect(observed).toEqual([null]);
    expect(clock.count()).toBe(0);
    poller.focus(); await clock.advance(600_000);
    expect(calls).toBe(1);
    denied = false; poller.refresh(); await settle();
    expect(observed).toEqual([null, "company-one"]);
    expect(clock.nextDelay()).toBe(25_000);
    await clock.advance(25_000);
    expect(calls).toBe(3);
    poller.stop();
    expect(clock.count()).toBe(0);
  });
}

test("transient failure backs off, focus cannot bypass it, and success resets cadence", async () => {
  const clock = testClock();
  let calls = 0;
  const poller = startActiveDraftRunPolling({ companyId: "company-one", clock,
    load: async () => { if (++calls < 3) throw { status: 503 }; return "running"; }, onRun: () => {} });
  await settle();
  expect(clock.nextDelay()).toBe(25_000);
  poller.focus(); await settle(); expect(calls).toBe(1);
  await clock.advance(25_000); expect(calls).toBe(2);
  expect(clock.nextDelay()).toBe(50_000);
  await clock.advance(49_999); poller.focus(); await settle(); expect(calls).toBe(2);
  await clock.advance(1); expect(calls).toBe(3);
  expect(clock.nextDelay()).toBe(25_000);
  poller.stop();
});

test("rate limits preserve Retry-After and repeated outages have a bounded cadence", async () => {
  const clock = testClock();
  const poller = startActiveDraftRunPolling({ companyId: "company-one", clock,
    load: async () => { throw { status: 429, retryAfterSeconds: 120 }; }, onRun: () => {} });
  await settle();
  expect(clock.nextDelay()).toBe(120_000);
  for (let i = 0; i < 8; i++) await clock.advance(clock.nextDelay());
  expect(clock.nextDelay()).toBe(300_000);
  poller.stop();
});

test("overlap is coalesced and an old company's late result cannot replace the new company", async () => {
  const clock = testClock();
  const observed: string[] = [];
  let release!: (value: string) => void;
  let calls = 0;
  const first = startActiveDraftRunPolling({ companyId: "first", clock,
    load: async () => { calls++; return new Promise<string>(resolve => { release = resolve; }); },
    onRun: (run) => observed.push(String(run)) });
  first.refresh(); first.focus(); expect(calls).toBe(1);
  first.stop();
  const second = startActiveDraftRunPolling({ companyId: "second", clock,
    load: async (id) => id, onRun: (run) => observed.push(String(run)) });
  await settle(); release("first"); await settle();
  expect(observed).toEqual(["second"]);
  expect(clock.count()).toBe(1);
  second.stop(); first.refresh(); expect(clock.count()).toBe(0);
});

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
afterEach(() => {
  setVibeRaisingBrowserCompanyScope(null);
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
});

test("the actual API call pins the selected company even before the shell effect or after another tab switch", async () => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: {} });
  setVibeRaisingBrowserCompanyScope("other-tab-company");
  let requested: URL | undefined;
  const fetch = spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
    requested = new URL(String(input));
    expect(init?.credentials).toBe("include");
    return Response.json(null);
  });
  try {
    expect(await getVibeRaisingStartupUpdateActiveRun("https://backend.example.invalid", "company /&one")).toBeNull();
    expect(requested?.pathname).toBe("/api/v1/vibe-raising/email-draft/active-run/");
    expect(requested?.searchParams.getAll("company_id")).toEqual(["company /&one"]);
  } finally { fetch.mockRestore(); }
});

test("the actual API preserves terminal status and rate-limit delay; network failures retain their original cause", async () => {
  const fetch = spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ detail: "No active company" }, { status: 400 }));
  try {
    await expect(getVibeRaisingStartupUpdateActiveRun("https://backend.example.invalid", "one")).rejects.toMatchObject({ status: 400 });
    fetch.mockResolvedValue(Response.json({}, { status: 429, headers: { "Retry-After": "120" } }));
    await expect(getVibeRaisingStartupUpdateActiveRun("https://backend.example.invalid", "one")).rejects.toMatchObject({ status: 429, retryAfterSeconds: 120 });
    fetch.mockRejectedValue(new TypeError("Network unavailable"));
    await expect(getVibeRaisingStartupUpdateActiveRun("https://backend.example.invalid", "one")).rejects.toBeInstanceOf(TypeError);
  } finally { fetch.mockRestore(); }
});

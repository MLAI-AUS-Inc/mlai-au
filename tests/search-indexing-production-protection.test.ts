import { expect, test } from "bun:test";

test("production Worker keeps public caching and hands off old logins without rendering or refreshing sessions", async () => {
  const child = Bun.spawn([process.execPath, "tests/fixtures/production-worker-probe.ts"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  const data = JSON.parse(stdout);
  expect(data.anonymousRenders).toBe(1);
  expect(data.firstCache).toBe("MISS");
  expect(data.hitCache).toBe("HIT");
  expect(data.hitSecurity).toBe("nosniff");
  expect(data.renders).toBe(1);
  expect(data.networkCalls).toBe(0);
  expect(data.handoff).toEqual({ status: 302, location: "https://chat.mlai.au/my-startup/updates?view=new", referrer: "no-referrer", cookies: [] });
});

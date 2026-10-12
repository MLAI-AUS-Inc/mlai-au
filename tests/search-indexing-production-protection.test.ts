import { expect, test } from "bun:test";

test("production Worker keeps session refresh, security headers and Roo capability handling around the new indexing/cache policy", async () => {
  const child = Bun.spawn([process.execPath, "tests/fixtures/production-worker-probe.ts"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  const data = JSON.parse(stdout);
  expect(data.anonymousRenders).toBe(1);
  expect(data.firstCache).toBe("MISS");
  expect(data.hitCache).toBe("HIT");
  expect(data.hitSecurity).toBe("nosniff");
  expect(data.refreshCalls).toBe(1);
  expect(data.privateEvidence).toEqual({ status: 200, noindex: "noindex, nofollow", noStore: "private, no-store", cookies: 2, refreshedRender: true, security: "nosniff" });
  expect(data.capabilityEvidence).toEqual({ status: 200, location: null, retainedToken: true, referrer: "no-referrer", noindex: "noindex, nofollow" });
  expect(data.rejection).toEqual({ status: 400, location: null, referrer: "no-referrer" });
});

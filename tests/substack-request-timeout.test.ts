import { expect, test } from "bun:test";

test("Substack feed has a bounded abort and truthful empty fallback", async () => {
  const child = Bun.spawn([process.execPath, "tests/fixtures/substack-timeout-probe.ts"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  expect(JSON.parse(stdout)).toEqual({ requestedTimeoutMs: 8000, receivedSignal: true, aborted: true, fallback: [], loggedFailure: true });
});

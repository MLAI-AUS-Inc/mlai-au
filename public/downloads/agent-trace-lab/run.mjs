// Runs only the two supplied local test files, then reports the supplied fixture.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { observe } from "./observe.mjs";
import { inspectTrace, syntheticTrace } from "./trace.mjs";

if (process.argv.length !== 2) throw new Error("Usage: node run.mjs");
const cwd = fileURLToPath(new URL(".", import.meta.url));
const args = ["--test", "--test-reporter=tap", "trace.test.mjs", "observe.test.mjs"];
const tests = spawnSync(process.execPath, args, { cwd, encoding: "utf8", timeout: 30000, maxBuffer: 1024 * 1024 });
if (tests.error || tests.status !== 0) throw new Error("Local tests did not finish successfully. Run node --test locally to inspect failures; no success record was produced.");
const counts = Object.fromEntries(["tests", "pass", "fail", "cancelled", "skipped"].map(key => {
  const matches = [...tests.stdout.matchAll(new RegExp(`^# ${key} (\\d+)$`, "gm"))];
  if (matches.length !== 1) throw new Error("Unrecognised test summary");
  return [key, Number(matches[0][1])];
}));
if (counts.tests < 1 || counts.pass !== counts.tests || counts.fail || counts.cancelled || counts.skipped) throw new Error("Incomplete test run");
const sourceSha256 = Object.fromEntries(["trace.mjs", "trace.test.mjs", "observe.mjs", "observe.test.mjs", "fixture.json", "run.mjs"].map(name => [name, createHash("sha256").update(readFileSync(new URL(name, import.meta.url))).digest("hex")]));
console.log(JSON.stringify({
  version: "agent-observation-run-v1", recordedAt: new Date().toISOString(),
  operator: "Local process; no independent reviewer identity asserted",
  environment: { node: process.version, v8: process.versions.v8, platform: process.platform, architecture: process.arch },
  sourceSha256,
  tests: { command: "node " + args.join(" "), exitStatus: tests.status, counts, tapOutput: tests.stdout },
  trace: inspectTrace(syntheticTrace),
  observation: observe(JSON.parse(readFileSync(new URL("fixture.json", import.meta.url), "utf8"))),
  independentReview: false,
  productionApproval: false,
}, null, 2));

import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// A failed test run must never publish reports left over from a previous run.
rmSync("coverage", { recursive: true, force: true });
const tests = spawnSync(process.execPath, [
  "test", "./tests", "--coverage", "--coverage-reporter=text",
  "--coverage-reporter=lcov", "--coverage-dir=coverage",
], { stdio: "inherit" });

let coverageStatus = 1;
if (existsSync("coverage/lcov.info")) {
  // Still produce diagnostics when tests fail; their exit status remains fatal.
  const check = spawnSync(process.execPath, [path.join(import.meta.dir, "check-coverage.ts")], { stdio: "inherit" });
  coverageStatus = check.status ?? 1;
} else {
  console.error("No coverage report was produced by this test run.");
}
process.exit(tests.status === 0 ? coverageStatus : tests.status ?? 1);

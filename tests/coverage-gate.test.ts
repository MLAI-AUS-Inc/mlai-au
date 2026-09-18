import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const checker = path.resolve(import.meta.dir, "../scripts/check-coverage.ts");
const temporary: string[] = [];
afterEach(() => temporary.splice(0).forEach(dir => rmSync(dir, { recursive: true, force: true })));

function fixture() {
  const dir = mkdtempSync(path.join(tmpdir(), "mlai-coverage-"));
  temporary.push(dir);
  for (const folder of ["app", "workers", "coverage"]) mkdirSync(path.join(dir, folder));
  writeFileSync(path.join(dir, "app/covered.ts"), "export function covered() { return 1; }\n");
  writeFileSync(path.join(dir, "workers/uncovered.ts"), "export function uncovered() { return 2; }\n");
  writeFileSync(path.join(dir, "app/types.d.ts"), "declare function ignored(): void;\n");
  writeFileSync(path.join(dir, "coverage/lcov.info"), "TN:\nSF:app/covered.ts\nFNF:1\nFNH:1\nLF:1\nLH:1\nend_of_record\n");
  return dir;
}

function run(dir: string, env: Record<string, string> = {}) {
  return spawnSync(process.execPath, [checker], {
    cwd: dir, encoding: "utf8",
    env: { ...process.env, COVERAGE_MIN_LINES: "50", COVERAGE_MIN_FUNCTIONS: "50", ...env },
  });
}

describe("whole-source coverage gate", () => {
  test("counts unimported production files and excludes declaration files", () => {
    const dir = fixture();
    const result = run(dir);
    expect(result.status).toBe(0);
    const summary = readFileSync(path.join(dir, "coverage/coverage-summary.txt"), "utf8");
    expect(summary).toContain("Eligible files: 2");
    expect(summary).toContain("Lines: 1/2 (50.00%)");
    expect(summary).toContain("Functions: 1/2 (50.00%)");
  });

  test("fails a threshold while retaining a fresh diagnostic summary", () => {
    const dir = fixture();
    writeFileSync(path.join(dir, "coverage/coverage-summary.txt"), "STALE REPORT");
    expect(run(dir, { COVERAGE_MIN_LINES: "51" }).status).toBe(1);
    expect(readFileSync(path.join(dir, "coverage/coverage-summary.txt"), "utf8")).toContain("lines 51.00%");
    expect(run(dir, { COVERAGE_MIN_FUNCTIONS: "51" }).status).toBe(1);
  });

  test("rejects malformed, non-finite and out-of-range threshold configuration", () => {
    const dir = fixture();
    for (const key of ["COVERAGE_MIN_LINES", "COVERAGE_MIN_FUNCTIONS"]) {
      for (const value of ["6.5%", "NaN", "Infinity", "", " ", "-1", "101"]) {
        const result = run(dir, { [key]: value });
        expect(result.status).not.toBe(0);
        expect(result.stderr).toContain(`${key} must be a finite percentage`);
      }
    }
  });

  test("fails when the current run has no LCOV report", () => {
    const dir = fixture();
    rmSync(path.join(dir, "coverage/lcov.info"));
    expect(run(dir).status).not.toBe(0);
  });
});

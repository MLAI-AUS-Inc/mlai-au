import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as ts from "typescript";

const ROOT = process.cwd();
const COVERAGE_DIR = path.join(ROOT, "coverage");
const LCOV_PATH = path.join(COVERAGE_DIR, "lcov.info");
const SUMMARY_PATH = path.join(COVERAGE_DIR, "coverage-summary.txt");
const SOURCE_ROOTS = [path.join(ROOT, "app"), path.join(ROOT, "workers")];
function threshold(name: string, fallback: string): number {
  const raw = process.env[name] ?? fallback;
  const value = Number(raw);
  if (!raw.trim() || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`${name} must be a finite percentage between 0 and 100; received ${JSON.stringify(raw)}.`);
  }
  return value;
}

const MIN_LINES = threshold("COVERAGE_MIN_LINES", "6.5");
const MIN_FUNCTIONS = threshold("COVERAGE_MIN_FUNCTIONS", "9.25");

type CoverageCounts = {
  linesFound: number;
  linesHit: number;
  functionsFound: number;
  functionsHit: number;
};

function collectSourceFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(entryPath));
    } else if (
      entry.isFile() &&
      /\.(ts|tsx)$/.test(entry.name) &&
      !entry.name.endsWith(".d.ts")
    ) {
      files.push(entryPath);
    }
  }
  return files.sort();
}

function resolveLcovPath(value: string): string {
  const normalised = value.replace(/\\/g, "/");
  return path.resolve(ROOT, normalised);
}

function parseLcov(): Map<string, CoverageCounts> {
  if (!existsSync(LCOV_PATH)) {
    throw new Error(`Coverage file not found: ${LCOV_PATH}`);
  }

  const records = new Map<string, CoverageCounts>();
  let currentPath: string | undefined;
  let current: CoverageCounts | undefined;

  for (const line of readFileSync(LCOV_PATH, "utf8").split(/\r?\n/)) {
    if (line.startsWith("SF:")) {
      currentPath = resolveLcovPath(line.slice(3));
      current = {
        linesFound: 0,
        linesHit: 0,
        functionsFound: 0,
        functionsHit: 0,
      };
      records.set(currentPath, current);
    } else if (current) {
      if (line.startsWith("LF:")) current.linesFound = Number(line.slice(3));
      if (line.startsWith("LH:")) current.linesHit = Number(line.slice(3));
      if (line.startsWith("FNF:")) current.functionsFound = Number(line.slice(4));
      if (line.startsWith("FNH:")) current.functionsHit = Number(line.slice(4));
    }
  }

  return records;
}

function countSourceLines(source: string): number {
  return source
    .split(/\r?\n/)
    .filter((line) => line.trim() && !/^\s*(\/\/|\/\*|\*|\*\/)/.test(line)).length;
}

function countFunctions(filePath: string): number {
  const source = readFileSync(filePath, "utf8");
  const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
  let count = 0;

  function visit(node: ts.Node) {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isGetAccessorDeclaration(node) ||
      ts.isSetAccessorDeclaration(node) ||
      ts.isConstructorDeclaration(node)
    ) {
      count += 1;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return count;
}

function percentage(hit: number, found: number): number {
  return found === 0 ? 100 : (hit / found) * 100;
}

const sourceFiles = SOURCE_ROOTS.flatMap(collectSourceFiles);
const lcov = parseLcov();
const totals: CoverageCounts = {
  linesFound: 0,
  linesHit: 0,
  functionsFound: 0,
  functionsHit: 0,
};

for (const filePath of sourceFiles) {
  const importedCoverage = lcov.get(filePath);
  const counts = importedCoverage ?? {
    linesFound: countSourceLines(readFileSync(filePath, "utf8")),
    linesHit: 0,
    functionsFound: countFunctions(filePath),
    functionsHit: 0,
  };

  totals.linesFound += counts.linesFound;
  totals.linesHit += counts.linesHit;
  totals.functionsFound += counts.functionsFound;
  totals.functionsHit += counts.functionsHit;
}

const lineCoverage = percentage(totals.linesHit, totals.linesFound);
const functionCoverage = percentage(totals.functionsHit, totals.functionsFound);
const summary = [
  `Eligible files: ${sourceFiles.length}`,
  `Excluded: declaration files (*.d.ts)`,
  `Lines: ${totals.linesHit}/${totals.linesFound} (${lineCoverage.toFixed(2)}%)`,
  `Functions: ${totals.functionsHit}/${totals.functionsFound} (${functionCoverage.toFixed(2)}%)`,
  `Thresholds: lines ${MIN_LINES.toFixed(2)}%, functions ${MIN_FUNCTIONS.toFixed(2)}%`,
].join("\n");

mkdirSync(COVERAGE_DIR, { recursive: true });
writeFileSync(SUMMARY_PATH, `${summary}\n`);
console.log(summary);

if (lineCoverage < MIN_LINES || functionCoverage < MIN_FUNCTIONS) {
  console.error("Coverage thresholds failed.");
  process.exit(1);
}

console.log(`Coverage summary written to ${path.relative(ROOT, SUMMARY_PATH)}.`);

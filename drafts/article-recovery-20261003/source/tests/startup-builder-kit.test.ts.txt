import { expect, test } from 'bun:test';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import JSZip from 'jszip';
import { checkStartupBuilderKit, packageStartupBuilderKit } from '../scripts/package-startup-builder-kit';
import { STARTUP_DELIVERY, STARTUP_DELIVERY_FILES } from '../app/lib/startup-builder-delivery';

const kitPath = 'public/downloads/startup-builder-delivery-kit.zip';
const record = () => JSON.parse(readFileSync('public/downloads/event-reply-lab/delivery-record.json', 'utf8'));

test('article outcomes and all headline counts equal the recorded delivery review', () => {
  const report = record();
  expect(STARTUP_DELIVERY.version).toBe(report.version);
  expect(STARTUP_DELIVERY.decision).toBe(report.decision);
  expect(STARTUP_DELIVERY.baselineMatched).toBe(report.baseline.matched);
  expect(STARTUP_DELIVERY.candidateMatched).toBe(report.candidate.matched);
  expect(STARTUP_DELIVERY.cases).toBe(report.cases.length);
  expect(STARTUP_DELIVERY.outcomes.map(row => row.id)).toEqual(report.cases.map((row: { id: string }) => row.id));
  for (const row of STARTUP_DELIVERY.outcomes) {
    const actual = report.cases.find((item: { id: string }) => item.id === row.id);
    expect(row.baseline).toBe(actual.baseline.matchesRequirement);
    expect(row.candidate).toBe(actual.candidate.matchesRequirement);
  }
});

test('committed ZIP contains exactly the ten current files and regenerates deterministically', async () => {
  const bytes = readFileSync(kitPath);
  expect(await checkStartupBuilderKit(bytes)).toHaveLength(10);
  expect(bytes).toEqual(await packageStartupBuilderKit());
  expect(await packageStartupBuilderKit()).toEqual(await packageStartupBuilderKit());
});

test('missing, stale, empty, extra and path-traversal kit entries cannot pass', async () => {
  const mutations = [
    (zip: JSZip) => zip.remove('delivery-check.mjs'),
    (zip: JSZip) => zip.file('DELIVERY.md', 'Stale version'),
    (zip: JSZip) => zip.file('lab.mjs', ''),
    (zip: JSZip) => zip.file('unreviewed.mjs', 'throw Error()'),
    (zip: JSZip) => zip.file('../outside.mjs', 'throw Error()'),
  ];
  for (const mutate of mutations) {
    const zip = await JSZip.loadAsync(readFileSync(kitPath)); mutate(zip);
    await expect(checkStartupBuilderKit(await zip.generateAsync({ type: 'uint8array' }))).rejects.toThrow();
  }
  await expect(checkStartupBuilderKit(new Uint8Array())).rejects.toThrow();
  const sanitized = await JSZip.loadAsync(readFileSync(kitPath));
  const sameBytes = readFileSync('public/downloads/event-reply-lab/DELIVERY.md');
  sanitized.remove('DELIVERY.md');
  sanitized.file('../DELIVERY.md', sameBytes, { createFolders: false });
  await expect(checkStartupBuilderKit(await sanitized.generateAsync({ type: 'uint8array' }))).rejects.toThrow();
});

test('the actual packaged files execute independently and retain expected HOLD exit status', async () => {
  const bytes = readFileSync(kitPath);
  const names = await checkStartupBuilderKit(bytes);
  const zip = await JSZip.loadAsync(bytes);
  const directory = mkdtempSync(join(tmpdir(), 'mlai-builder-kit-'));
  // Fixed allowlist, validated before extraction; no archive-derived paths.
  for (const name of names) writeFileSync(join(directory, name), await zip.file(name)!.async('nodebuffer'));
  const tests = spawnSync('node', ['--test', 'lab.test.mjs', 'delivery-check.test.mjs'], { cwd: directory, encoding: 'utf8', timeout: 20000 });
  expect(tests.status, tests.stdout + tests.stderr).toBe(0);
  expect(tests.stdout).toContain('tests ' + STARTUP_DELIVERY.tests);
  expect(tests.stdout).toContain('fail 0');
  const result = spawnSync('node', ['delivery-check.mjs'], { cwd: directory, encoding: 'utf8', timeout: 20000 });
  expect(result.status, result.stderr).toBe(2);
  expect(JSON.parse(result.stdout)).toEqual(record());
  expect(STARTUP_DELIVERY_FILES).toHaveLength(names.length);
});

test('completed handover distinguishes actual execution, invented capacity and pending approvals', async () => {
  const handover = await Bun.file('public/downloads/event-reply-lab/DELIVERY.md').text();
  for (const text of ['22 tests pass', '7/8', '5/8', '**HOLD**', 'Node\n25.2.1', 'No actual organiser was interviewed', 'not measured', 'PENDING', 'UNRUN', 'not an evaluator of arbitrary']) {
    expect(handover).toContain(text);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, copyFileSync, readFileSync, writeFileSync, rmSync, symlinkSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { environment, FILES, inspectFiles, validateManifest } from './inspect.mjs';

const original = fileURLToPath(new URL('../ai-builder-lab', import.meta.url));
const manifest = JSON.parse(readFileSync(new URL('./expected-files.json', import.meta.url), 'utf8'));
function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'mlai environment fixture '));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const name of FILES) copyFileSync(join(original, name), join(directory, name));
  return directory;
}

test('all seven supplied files match without claiming tests, reproduction or approval', () => {
  const result = inspectFiles(original, manifest);
  assert.equal(result.status, 'FILES_MATCH');
  assert.equal(result.files.length, 7);
  assert(result.files.every(row => row.status === 'match'));
  assert.equal(result.testsExecuted, false);
  assert.equal(result.independentReproduction, false);
  assert.equal(result.deliveryApproval, false);
});

test('same bytes in a directory containing spaces have the same identities', t => {
  assert.deepEqual(inspectFiles(fixture(t), manifest).files, inspectFiles(original, manifest).files);
});

test('one changed source remains a mismatch; inspection never executes or rewrites it', t => {
  const directory = fixture(t);
  const changed = 'throw new Error("DO NOT EXECUTE THIS FIXTURE");\n';
  writeFileSync(join(directory, 'triage.mjs'), changed);
  const result = inspectFiles(directory, manifest);
  assert.equal(result.status, 'FILES_DIFFER');
  assert.deepEqual(result.files.filter(row => row.status !== 'match').map(row => [row.name, row.status]), [['triage.mjs', 'different']]);
  assert.equal(readFileSync(join(directory, 'triage.mjs'), 'utf8'), changed);
});

test('missing files and missing directory cannot silently pass', t => {
  const directory = fixture(t);
  rmSync(join(directory, 'change-record.json'));
  assert.equal(inspectFiles(directory, manifest).files.find(row => row.name === 'change-record.json').status, 'missing');
  const missing = inspectFiles(join(directory, 'absent'), manifest);
  assert.equal(missing.status, 'FILES_DIFFER');
  assert(missing.files.every(row => row.status === 'missing'));
});

test('directories and symbolic links are not accepted as the named regular source', t => {
  const directory = fixture(t);
  rmSync(join(directory, 'triage.mjs'));
  mkdirSync(join(directory, 'triage.mjs'));
  assert.equal(inspectFiles(directory, manifest).files[0].status, 'not-regular');
  rmSync(join(directory, 'triage.mjs'), { recursive: true });
  symlinkSync(join(original, 'triage.mjs'), join(directory, 'triage.mjs'));
  assert.equal(inspectFiles(directory, manifest).files[0].status, 'not-regular');
});

test('manifest names, version and hashes must match the fixed schema', () => {
  for (const invalid of [null, {}, { ...manifest, version: 'unknown' }, { ...manifest, extra: true },
    { ...manifest, files: { ...manifest.files, '../secret': 'a'.repeat(64) } },
    { ...manifest, files: { ...manifest.files, 'triage.mjs': 'not-a-hash' } }]) {
    assert.throws(() => validateManifest(invalid), TypeError);
  }
});

test('shareable environment report is allowlisted and does not contain private paths', t => {
  const directory = fixture(t);
  assert.deepEqual(Object.keys(environment()).sort(), ['architecture', 'kernel', 'node', 'platform', 'v8']);
  const text = JSON.stringify(inspectFiles(directory, manifest));
  assert(!text.includes(directory));
  assert(!text.includes(process.execPath));
  for (const key of ['hostname', 'username', 'cwd', 'env']) assert(!Object.hasOwn(environment(), key));
});

test('unlisted files are not executed, and the limited scope is explicit', t => {
  const directory = fixture(t);
  writeFileSync(join(directory, 'extra.mjs'), 'throw Error("untrusted extra");');
  const report = inspectFiles(directory, manifest);
  assert.equal(report.status, 'FILES_MATCH');
  assert.match(report.scope, /other files and runtime behaviour were not inspected/);
});

test('CLI keeps match, missing-file and usage outcomes distinct without path disclosure', t => {
  const executable = fileURLToPath(new URL('./inspect.mjs', import.meta.url));
  const directory = fixture(t);
  const run = args => spawnSync(process.execPath, [executable, ...args], { encoding: 'utf8', timeout: 5000 });
  const valid = run(['--lab', directory]);
  assert.equal(valid.status, 0, valid.stderr);
  assert.equal(JSON.parse(valid.stdout).status, 'FILES_MATCH');
  assert(!valid.stdout.includes(directory));
  rmSync(join(directory, 'triage.mjs'));
  const missing = run(['--lab', directory]);
  assert.equal(missing.status, 2);
  assert.equal(JSON.parse(missing.stdout).status, 'FILES_DIFFER');
  const invalid = run(['--unknown', directory]);
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stdout, '');
  assert(!invalid.stderr.includes(directory));
});

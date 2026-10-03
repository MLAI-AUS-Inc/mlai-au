// Read-only teaching checker: hashes seven named files; never runs the lab.
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync } from 'node:fs';
import { release } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const FILES = Object.freeze([
  'triage.mjs', 'triage.test.mjs', 'change-review.mjs', 'change-review.test.mjs',
  'change-record.json', 'PORTFOLIO.md', 'README.md',
]);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

export function validateManifest(value) {
  if (!value || value.version !== 'learning-handover-v1' ||
      Object.keys(value).sort().join(',') !== 'files,version' || !value.files ||
      JSON.stringify(Object.keys(value.files).sort()) !== JSON.stringify([...FILES].sort()) ||
      !FILES.every(name => typeof value.files[name] === 'string' && /^[a-f0-9]{64}$/.test(value.files[name]))) {
    throw new TypeError('Expected the exact seven-file learning-handover-v1 manifest');
  }
  return value;
}

export function environment() {
  // Deliberately no username, hostname, executable path, cwd or environment dump.
  return { node: process.version, v8: process.versions.v8, platform: process.platform,
    architecture: process.arch, kernel: release() };
}

export function inspectFiles(directory, manifest) {
  validateManifest(manifest);
  let validDirectory = false;
  try { validDirectory = lstatSync(directory).isDirectory(); } catch { /* Missing is a result. */ }
  const files = FILES.map(name => {
    const row = { name, expectedSha256: manifest.files[name], actualSha256: null, status: 'missing' };
    if (!validDirectory) return row;
    try {
      const filename = resolve(directory, name);
      if (!lstatSync(filename).isFile()) return { ...row, status: 'not-regular' };
      const actualSha256 = hash(readFileSync(filename));
      return { ...row, actualSha256, status: actualSha256 === row.expectedSha256 ? 'match' : 'different' };
    } catch (error) {
      return { ...row, status: error.code === 'ENOENT' ? 'missing' : 'read-error' };
    }
  });
  return { version: manifest.version, status: files.every(row => row.status === 'match') ? 'FILES_MATCH' : 'FILES_DIFFER',
    environment: environment(), files,
    scope: 'Only the seven named files were checked; other files and runtime behaviour were not inspected.',
    testsExecuted: false, independentReproduction: false, deliveryApproval: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== '--lab' || !args[1].trim())) {
      throw new TypeError('Usage: node inspect.mjs [--lab PATH]');
    }
    const manifest = JSON.parse(readFileSync(new URL('./expected-files.json', import.meta.url), 'utf8'));
    const report = inspectFiles(args.length ? resolve(args[1]) : fileURLToPath(new URL('../ai-builder-lab', import.meta.url)), manifest);
    console.log(JSON.stringify({ ...report, capturedAt: new Date().toISOString(),
      checkerSha256: hash(readFileSync(fileURLToPath(import.meta.url))) }, null, 2));
    process.exitCode = report.status === 'FILES_MATCH' ? 0 : 2;
  } catch {
    // Do not leak user-supplied paths or file contents through an exception.
    console.error('Cannot inspect. Use node inspect.mjs [--lab PATH] with the supplied expected-files.json.');
    process.exitCode = 1;
  }
}

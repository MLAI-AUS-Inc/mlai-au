import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import JSZip from 'jszip';

const root = resolve(import.meta.dirname, '..');
export const OBSERVABILITY_KIT_URL = '/downloads/agent-observability-kit.zip';
export const OBSERVABILITY_KIT_FILES = ['trace.mjs', 'trace.test.mjs', 'observe.mjs', 'observe.test.mjs', 'fixture.json', 'run.mjs', 'recorded-run.json', 'README.md', 'HANDOVER.md'].map(name => 'agent-trace-lab/' + name);

export async function checkObservabilityKit(bytes: Uint8Array) {
  const zip = await JSZip.loadAsync(bytes, { checkCRC32: true });
  const expected = [...OBSERVABILITY_KIT_FILES].sort();
  if (JSON.stringify(Object.keys(zip.files).sort()) !== JSON.stringify(expected)) throw new Error('Missing or extra observability kit entries');
  for (const name of expected) {
    const entry = zip.file(name);
    if (!entry || entry.unsafeOriginalName !== name) throw new Error('Unsafe or missing observability kit entry');
    if (!(await entry.async('nodebuffer')).equals(await readFile(resolve(root, 'public/downloads', name)))) throw new Error('Stale observability kit entry: ' + name);
  }
  return expected;
}
export async function packageObservabilityKit() {
  const zip = new JSZip();
  for (const name of OBSERVABILITY_KIT_FILES) zip.file(name, await readFile(resolve(root, 'public/downloads', name)), { date: new Date('2026-09-10T00:00:00Z'), createFolders: false });
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 }, platform: 'UNIX' });
}
if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--record', '--write', '--check'].includes(args[0])) throw new Error('Usage: bun scripts/package-agent-observability.ts --record|--write|--check');
  if (args[0] === '--record') {
    const run = spawnSync('node', ['run.mjs'], { cwd: resolve(root, 'public/downloads/agent-trace-lab'), encoding: 'utf8', timeout: 40000 });
    if (run.status !== 0) throw new Error(run.stderr || 'Recording failed');
    const record = JSON.parse(run.stdout);
    if (record.productionApproval !== false || record.independentReview !== false) throw new Error('Recording lost review boundary');
    await writeFile(resolve(root, 'public/downloads/agent-trace-lab/recorded-run.json'), run.stdout);
    console.log(`Recorded ${record.tests.counts.pass} passing tests; observation: ${record.observation.status}.`);
  } else {
    const filename = resolve(root, 'public' + OBSERVABILITY_KIT_URL);
    if (args[0] === '--write') await writeFile(filename, await packageObservabilityKit());
    console.log(`Verified observability kit: ${(await checkObservabilityKit(await readFile(filename))).length} exact source files.`);
  }
}

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import JSZip from 'jszip';

const root = resolve(import.meta.dirname, '..');
export const ENVIRONMENT_KIT_URL = '/downloads/environment-handover-kit.zip';
export const ENVIRONMENT_KIT_FILES = [
  ...['triage.mjs', 'triage.test.mjs', 'change-review.mjs', 'change-review.test.mjs', 'change-record.json', 'PORTFOLIO.md', 'README.md'].map(name => 'ai-builder-lab/' + name),
  ...['inspect.mjs', 'inspect.test.mjs', 'expected-files.json', 'recorded-run.json', 'HANDOVER.md'].map(name => 'environment-handover/' + name),
];

export async function checkEnvironmentKit(bytes: Uint8Array) {
  const zip = await JSZip.loadAsync(bytes, { checkCRC32: true });
  const expected = [...ENVIRONMENT_KIT_FILES].sort();
  if (JSON.stringify(Object.keys(zip.files).sort()) !== JSON.stringify(expected)) throw new Error('Missing or extra environment kit entries');
  for (const name of expected) {
    const entry = zip.file(name);
    if (!entry || entry.unsafeOriginalName !== name) throw new Error('Unsafe or missing environment kit entry');
    if (!(await entry.async('nodebuffer')).equals(await readFile(resolve(root, 'public/downloads', name)))) throw new Error('Stale environment kit entry: ' + name);
  }
  return expected;
}

export async function packageEnvironmentKit() {
  const zip = new JSZip();
  for (const name of ENVIRONMENT_KIT_FILES) {
    zip.file(name, await readFile(resolve(root, 'public/downloads', name)), {
      date: new Date('2026-09-10T00:00:00Z'), createFolders: false,
    });
  }
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 }, platform: 'UNIX' });
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--write', '--check'].includes(args[0])) throw new Error('Usage: bun scripts/package-environment-handover.ts --write|--check');
  const filename = resolve(root, 'public' + ENVIRONMENT_KIT_URL);
  if (args[0] === '--write') await writeFile(filename, await packageEnvironmentKit());
  console.log(`Verified environment kit: ${(await checkEnvironmentKit(await readFile(filename))).length} exact source files.`);
}

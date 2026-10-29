import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import JSZip from 'jszip';
import { STARTUP_DELIVERY_FILES, STARTUP_DELIVERY_ZIP } from '../app/lib/startup-builder-delivery';

const root = resolve(import.meta.dirname, '..');
export async function checkStartupBuilderKit(bytes: Uint8Array) {
  const zip = await JSZip.loadAsync(bytes, { checkCRC32: true });
  const expected = STARTUP_DELIVERY_FILES.map(file => file.name).sort();
  if (JSON.stringify(Object.keys(zip.files).sort()) !== JSON.stringify(expected)) throw new Error('Delivery kit has missing or extra entries');
  for (const file of STARTUP_DELIVERY_FILES) {
    const entry = zip.file(file.name);
    if (!entry || entry.unsafeOriginalName !== file.name) throw new Error('Missing or unsafe regular file: ' + file.name);
    const actual = await entry.async('nodebuffer');
    const source = await readFile(resolve(root, 'public' + file.href));
    if (!actual.equals(source)) throw new Error('Stale delivery kit entry: ' + file.name);
  }
  return expected;
}
export async function packageStartupBuilderKit() {
  const zip = new JSZip();
  for (const file of STARTUP_DELIVERY_FILES) {
    if (!/^[a-zA-Z0-9.-]+$/.test(file.name)) throw new Error('Unsafe kit entry');
    zip.file(file.name, await readFile(resolve(root, 'public' + file.href)), {
      date: new Date('2026-09-10T00:00:00Z'), createFolders: false,
    });
  }
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 }, platform: 'UNIX' });
}
if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--write', '--check'].includes(args[0])) throw new Error('Usage: bun scripts/package-startup-builder-kit.ts --write|--check');
  const path = resolve(root, 'public' + STARTUP_DELIVERY_ZIP);
  if (args[0] === '--write') await writeFile(path, await packageStartupBuilderKit());
  const files = await checkStartupBuilderKit(await readFile(path));
  console.log(`Verified delivery kit: ${files.length} exact source files.`);
}

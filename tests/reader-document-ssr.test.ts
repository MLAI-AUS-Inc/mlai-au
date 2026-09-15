import { expect, test } from 'bun:test';

test('actual entry handler delivers complete long articles without script-revealed containers', async () => {
  const child = Bun.spawn([process.execPath, 'tests/fixtures/reader-ssr-probe.tsx'], { stdout: 'pipe', stderr: 'pipe' });
  const [stdout, stderr, exit] = await Promise.all([
    new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited,
  ]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: '' });
  const records = JSON.parse(stdout);
  expect(records).toHaveLength(12);
  expect(records.filter((record: any) => record.complete)).toHaveLength(8);
  for (const record of records) {
    expect(record.containsBody).toBe(true);
    expect(record.status).toBe(200);
    if (record.complete) {
      expect(record.beforeRelease).toBe('pending');
      expect(record.containsFallback).toBe(false);
      expect(record.hiddenStreamContainer).toBe(false);
    } else expect(record.beforeRelease).toBe('returned');
  }
});

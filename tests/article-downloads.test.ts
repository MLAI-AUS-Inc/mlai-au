import { expect, test } from 'bun:test';
import { assertDownloadBytes, checkArticleDownloads, downloadPaths } from '../scripts/check-article-downloads';

test('published local resource links refer to real, nonempty files', async () => {
  expect((await checkArticleDownloads()).size).toBeGreaterThan(0);
});

test('missing bytes and altered build assets cannot pass resource verification', () => {
  expect(() => assertDownloadBytes(new Uint8Array())).toThrow('empty');
  expect(() => assertDownloadBytes(new Uint8Array([1, 2]), new Uint8Array([1, 3]))).toThrow('differs');
  expect(() => assertDownloadBytes(new Uint8Array([1]), new Uint8Array())).toThrow('differs');
});

test('download discovery normalises queries and rejects encoded traversal', () => {
  expect(downloadPaths('<a href="/downloads/a.md?save=1">Save</a>')).toEqual(['/downloads/a.md']);
  for (const path of ['%2e%2e/private.txt', '%2e/private.txt', 'a%5cb.txt', 'a%00b.txt']) {
    expect(() => downloadPaths(`<a href="/downloads/${path}">Save</a>`)).toThrow('Unsafe');
  }
});

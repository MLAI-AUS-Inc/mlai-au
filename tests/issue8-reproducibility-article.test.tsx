import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, ENVIRONMENT_MANIFEST, SLUG } from "../app/articles/content/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import JSZip from "jszip";
import { checkEnvironmentKit, packageEnvironmentKit, ENVIRONMENT_KIT_FILES } from "../scripts/package-environment-handover";
import recorded from "../public/downloads/environment-handover/recorded-run.json";

test("Issue 8 separates source scope, executed local evidence and pending recipient review", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const text of ["Correction", "13 September 2023", "No such benchmark was run", "not an AI model or client system", "not an independent reproduction", "Apply with delivery evidence", 'data-article-icp="BUILDER"']) expect(html).toContain(text);
  for (const field of ["exact commit:", "never secret values", "observed exit status:", "What was not tested:"]) expect(ENVIRONMENT_MANIFEST).toContain(field);
  for (const text of ["Windows idle tax closes the gap", "negative translation tax", "stronger advantage", "FAQPage"]) expect(html).not.toContain(text);
  expect(html.indexOf("Turn evidence into a useful handover")).toBeLessThan(html.indexOf("Apply with delivery evidence"));
  for (const text of ['24/24', '9/14', '12/14', 'HOLD', 'no full-text paper review', 'twelve files in two folders', 'your own permitted build evidence']) expect(html).toContain(text);
  for (const file of ['inspect.mjs', 'inspect.test.mjs', 'expected-files.json', 'recorded-run.json', 'HANDOVER.md']) expect(html).toContain('href="/downloads/environment-handover/' + file + '"');
  expect(html).toContain('href="/downloads/environment-handover-kit.zip"');
  for (const name of ['Benchmark claim boundaries', 'Recorded handover outcomes', 'Environment handover troubleshooting']) expect(html).toContain('role="region" aria-label="' + name + '" tabindex="0"');
  for (const id of ['source-scope', 'claim-boundary', 'builder-task', 'reproduction-exercise', 'troubleshooting', 'comparison-plan', 'handover']) expect(html).toContain('id="' + id + '" class="scroll-mt-28"');
  expect(html).toContain('data-article-toc-placeholder');
  expect(html).toContain('data-cf-article-body');
  expect(html).not.toContain('data-cf-component-id="hero-image"');
});

test("Issue 8 preserves archive date and contributors while updating correction metadata", () => {
  const entry = ARTICLE_REGISTRY[SLUG];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.date).toBe(articleMeta.datePublished);
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(entry.description).toBe(articleMeta.description);
  expect(entry.authors).toEqual(["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"]);
  expect(entry.image).toBe('https://mlai.au/press-kit/logo-wide-black.png');
  expect(entry.imageAlt).toBe('MLAI logo with a kangaroo wearing sunglasses');
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion?.primaryIcp).toBe("BUILDER");
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion?.version).toBe("issue8-reproducibility-v3");
});

test('handover pins exact current source identity without representing an independent reproduction', () => {
  const expected = JSON.parse(readFileSync('public/downloads/environment-handover/expected-files.json', 'utf8'));
  const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
  expect(Object.keys(expected.files)).toHaveLength(7);
  for (const [name, digest] of Object.entries(expected.files)) expect(hash(readFileSync('public/downloads/ai-builder-lab/' + name))).toBe(digest);
  expect(hash(readFileSync('public/downloads/environment-handover/inspect.mjs'))).toBe(recorded.fileInspection.checkerSha256);
  expect(recorded.fileInspection.testsExecuted).toBe(false);
  expect(recorded.fileInspection.independentReproduction).toBe(false);
  expect(recorded.fileInspection.deliveryApproval).toBe(false);
  expect(recorded.negativeChecks.map(row => [row.file.status, row.exitStatus])).toEqual([['missing', 2], ['different', 2]]);
  const handover = readFileSync('public/downloads/environment-handover/HANDOVER.md', 'utf8');
  for (const text of ['macOS 26.6.2', 'Node v25.2.1', '24 passing code tests', '**2 and HOLD**', 'recipient reproduction pending', 'No recipient has independently signed off', 'not a sandbox or security scanner', 'is attested', 'uncommitted draft']) expect(handover.includes(text), text).toBe(true);
});

test('twelve-file ZIP is current, deterministic and rejects missing, extra, stale or unsafe entries', async () => {
  const bytes = readFileSync('public/downloads/environment-handover-kit.zip');
  expect(await checkEnvironmentKit(bytes)).toHaveLength(12);
  expect(await packageEnvironmentKit()).toEqual(bytes);
  expect(ENVIRONMENT_KIT_FILES).toHaveLength(12);
  for (const mutation of [
    (zip: JSZip) => zip.remove('environment-handover/HANDOVER.md'),
    (zip: JSZip) => zip.file('environment-handover/HANDOVER.md', 'stale'),
    (zip: JSZip) => zip.file('ai-builder-lab/extra.mjs', 'unreviewed', { createFolders: false }),
    (zip: JSZip) => zip.file('../environment-handover/HANDOVER.md', readFileSync('public/downloads/environment-handover/HANDOVER.md'), { createFolders: false }),
  ]) {
    const zip = await JSZip.loadAsync(bytes); mutation(zip);
    await expect(checkEnvironmentKit(await zip.generateAsync({ type: 'uint8array' }))).rejects.toThrow();
  }
});

test('actual extracted kit runs from a path with spaces and retains its recorded failures', async () => {
  const bytes = readFileSync('public/downloads/environment-handover-kit.zip');
  const names = await checkEnvironmentKit(bytes);
  const zip = await JSZip.loadAsync(bytes);
  const directory = mkdtempSync(join(tmpdir(), 'mlai handover kit '));
  try {
    // Extract only the fixed verified inventory, never untrusted archive-derived paths.
    for (const name of names) {
      const target = join(directory, name); mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, await zip.file(name)!.async('nodebuffer'));
    }
    const run = (args: string[]) => spawnSync('node', args, { cwd: directory, encoding: 'utf8', timeout: 20000 });
    const inspected = run(['environment-handover/inspect.mjs']);
    expect(inspected.status, inspected.stderr).toBe(0);
    const report = JSON.parse(inspected.stdout);
    expect(report.files).toEqual(recorded.fileInspection.files);
    expect(report.checkerSha256).toBe(recorded.fileInspection.checkerSha256);
    const tests = run(['--test', '--test-reporter=tap', 'ai-builder-lab/triage.test.mjs', 'ai-builder-lab/change-review.test.mjs', 'environment-handover/inspect.test.mjs']);
    expect(tests.status, tests.stdout + tests.stderr).toBe(0);
    for (const [key, value] of Object.entries(recorded.commands[1].counts!)) expect(tests.stdout).toContain('# ' + key + ' ' + value + '\n');
    const review = run(['ai-builder-lab/change-review.mjs']);
    expect(review.status, review.stderr).toBe(2);
    expect(JSON.parse(review.stdout)).toEqual(JSON.parse(readFileSync(join(directory, 'ai-builder-lab/change-record.json'), 'utf8')));
    expect(JSON.parse(review.stdout).summary).toEqual(recorded.commands[2].summary);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

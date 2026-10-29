import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, faqItems, SLUG } from "../app/articles/content/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import JSZip from "jszip";
import { checkObservabilityKit, packageObservabilityKit, OBSERVABILITY_KIT_FILES } from "../scripts/package-agent-observability";
import recorded from "../public/downloads/agent-trace-lab/recorded-run.json";
import { JIANG_REPORTED_POSTS, JIANG_COUNT_CHECK, JIANG_NON_SAFE_PERCENT, JIANG_LEVELS_TWO_TO_FOUR_PERCENT, LI_REPORTED_OUTAGE, LI_TIMESTAMP_INTERVAL_MINUTES, LI_TIMESTAMP_INTERVAL_LABEL } from "../app/lib/moltbook-source-check";

test("Issue 5 distinguishes studies and links the bounded runnable exercise", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const text of ["226,938", "369,000", "44,411", "preprints", "not collected or independently reproduced", "not-established", "not a production authorisation gate", "/downloads/agent-trace-lab/trace.test.mjs", "Apply with your delivery evidence"]) expect(html).toContain(text);
  expect(html.indexOf("Run the synthetic trace inspection")).toBeLessThan(html.indexOf("Apply with your delivery evidence"));
  expect(html).not.toContain("Seedance");
  expect(html).not.toContain("WorldVQA");
  expect(html).not.toContain("FAQPage");
  expect(faqItems).toHaveLength(4);
  for (const text of ["23/23 code tests", "9 attempts: 6 published, 2 rate-limited and 1 error", "not-collected", "not a sandbox", "No toxicity model or human moderation ran", "Client portfolio use requires permission", "not automatically attached"]) expect(html).toContain(text);
  for (const name of OBSERVABILITY_KIT_FILES) expect(html).toContain('href="/downloads/' + name + '"');
  expect(html).toContain('href="/downloads/agent-observability-kit.zip"');
  for (const name of ["Moltbook source comparison", "Synthetic activity histogram", "Timing threshold sensitivity", "Trace experiment boundaries"]) expect(html).toContain('role="region" aria-label="' + name + '" tabindex="0"');
  for (const id of ["three-studies", "claim-evidence", "synthetic-trace-lab", "activity-review", "timing-sensitivity", "handover"]) expect(html).toContain('id="' + id + '" class="scroll-mt-28"');
  expect(html).toContain('data-cf-article-body');
  expect(html).toContain('data-article-toc-placeholder');
  expect(html).not.toContain('data-cf-component-id="hero-image"');
});

test("Issue 5 preserves archive provenance and explicitly targets builders", () => {
  const entry = ARTICLE_REGISTRY[SLUG];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.date).toBe(articleMeta.datePublished);
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(entry.description).toBe(articleMeta.description);
  expect(entry.authors).toEqual(["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"]);
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion?.primaryIcp).toBe("BUILDER");
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion?.version).toBe("issue5-source-handover-v4");
  // Preserve the current archive image; this text-led article has no inline hero image.
  expect(entry.image).toMatch(/^https:\/\//);
});

test("source arithmetic preserves the reported denominators and unresolved discrepancy", () => {
  expect(Object.values(JIANG_REPORTED_POSTS.labels).reduce((a, b) => a + b, 0)).toBe(JIANG_REPORTED_POSTS.annotated);
  expect(JIANG_COUNT_CHECK).toEqual({ excluded: 35, nonSafe: 11977, levelsTwoToFour: 8244 });
  expect(JIANG_NON_SAFE_PERCENT).toBe("26.99%");
  expect(JIANG_LEVELS_TWO_TO_FOUR_PERCENT).toBe("18.58%");
  expect(LI_TIMESTAMP_INTERVAL_MINUTES).toBe(4070);
  expect(LI_TIMESTAMP_INTERVAL_LABEL).toBe("67 hours 50 minutes");
  expect(LI_REPORTED_OUTAGE.statedApproximateHours).toBe(44);
  expect(LI_TIMESTAMP_INTERVAL_MINUTES).not.toBe(LI_REPORTED_OUTAGE.statedApproximateHours * 60);
  const resource = readFileSync('public/downloads/moltbook-source-check.txt', 'utf8');
  for (const text of ["67 hours 50 minutes", "11,977 / 44,376 = 26.99%", "8,244 / 44,376 = 18.58%", "35 excluded", "not the actual outage duration", "independent review pending", "Blank record", "Source version and locator:", "Design decision:"]) expect(resource).toContain(text);
  expect(resource).not.toContain("independently verified");
});

test("Issue 5 exposes method-level denominators and unresolved source reporting problems", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const text of ["9,838", "five or more posts", "first 100 comments", "44,376", "381", "67 hours 50 minutes",
                      "not the actual outage duration", "reporting discrepancy", "coverage statements remain unreconciled",
                      "18.58%", "26.99%", "35 excluded posts", "not a validated deployment risk score"]) expect(html).toContain(text);
  for (const link of ["https://arxiv.org/pdf/2602.07432v2#page=40", "https://arxiv.org/pdf/2602.07432v2#page=36",
                      "https://arxiv.org/pdf/2602.07432v2#page=44", "https://arxiv.org/html/2602.09270v1#S4.SS2",
                      "/downloads/moltbook-source-check.txt"]) expect(html).toContain('href="' + link + '"');
  expect(html).not.toContain("source-attributed abstract checks");
  expect(html).toContain('id="method-checks" class="scroll-mt-28"');
  expect(html.indexOf('id="method-checks"')).toBeLessThan(html.indexOf("Apply with your delivery evidence"));
});

test("observability record pins the current executable sources without invented approval", () => {
  expect(Object.keys(recorded.sourceSha256)).toHaveLength(6);
  for (const [name, digest] of Object.entries(recorded.sourceSha256)) expect(createHash('sha256').update(readFileSync('public/downloads/agent-trace-lab/' + name)).digest('hex')).toBe(digest);
  expect(recorded.tests.counts).toEqual({ tests: 23, pass: 23, fail: 0, cancelled: 0, skipped: 0 });
  expect(recorded.independentReview).toBe(false);
  expect(recorded.productionApproval).toBe(false);
  expect(recorded.observation.status).toBe("needs-review");
  expect(recorded.observation.autonomy).toBe("not-established");
  expect(recorded.observation.actorGroundTruth).toBe("not-collected");
  const handover = readFileSync('public/downloads/agent-trace-lab/HANDOVER.md', 'utf8');
  for (const text of ['23 code tests pass', 'independent review pending', 'No separate human recipient', 'no scheduler implemented or repaired', 'no spam judgement', '3/7, 5/7 and 6/7']) expect(handover).toContain(text);
});

test("nine-file observability ZIP is deterministic and rejects missing, extra, unsafe or stale files", async () => {
  const bytes = readFileSync('public/downloads/agent-observability-kit.zip');
  expect(await checkObservabilityKit(bytes)).toHaveLength(9);
  expect(await packageObservabilityKit()).toEqual(bytes);
  for (const mutation of [
    (zip: JSZip) => zip.remove('agent-trace-lab/fixture.json'),
    (zip: JSZip) => zip.file('agent-trace-lab/observe.mjs', 'stale'),
    (zip: JSZip) => zip.file('extra.mjs', 'unexpected'),
    (zip: JSZip) => zip.file('../agent-trace-lab/fixture.json', '{}', { createFolders: false }),
  ]) {
    const zip = await JSZip.loadAsync(bytes); mutation(zip);
    await expect(checkObservabilityKit(await zip.generateAsync({ type: 'uint8array' }))).rejects.toThrow();
  }
});

test("the actual extracted kit reproduces all deterministic observations and retains failed-fixture tests", async () => {
  const bytes = readFileSync('public/downloads/agent-observability-kit.zip'), names = await checkObservabilityKit(bytes), zip = await JSZip.loadAsync(bytes);
  const directory = mkdtempSync(join(tmpdir(), 'mlai observation kit '));
  try {
    for (const name of names) {
      const target = join(directory, name); mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, await zip.file(name)!.async('nodebuffer'));
    }
    const run = (args: string[]) => spawnSync('node', args, { cwd: directory, encoding: 'utf8', timeout: 40000 });
    const result = run(['agent-trace-lab/run.mjs']);
    expect(result.status, result.stderr).toBe(0);
    const current = JSON.parse(result.stdout);
    expect(current.sourceSha256).toEqual(recorded.sourceSha256);
    expect(current.observation).toEqual(recorded.observation);
    expect(current.trace).toEqual(recorded.trace);
    expect(current.tests.counts).toEqual(recorded.tests.counts);
    const fixture = JSON.parse(readFileSync(join(directory, 'agent-trace-lab/fixture.json'), 'utf8'));
    fixture.attempts[2].retryAfterSeconds = null;
    writeFileSync(join(directory, 'agent-trace-lab/fixture.json'), JSON.stringify(fixture));
    const changed = run(['agent-trace-lab/observe.mjs']);
    expect(changed.status).toBe(0);
    expect(JSON.parse(changed.stdout).retryChecks[0].status).toBe('unknown-delay');
    const failed = run(['agent-trace-lab/run.mjs']);
    expect(failed.status).not.toBe(0);
    expect(failed.stdout).toBe('');
    expect(failed.stderr).toContain('no success record was produced');
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

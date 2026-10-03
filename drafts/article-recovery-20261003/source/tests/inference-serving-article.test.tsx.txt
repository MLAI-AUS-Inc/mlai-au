import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta } from "../app/articles/content/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import measurement from "../public/downloads/inference-lab/recorded-measurement.json";
import { DOWNLOAD_FILES } from "../app/articles/content/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters";
test("inference tutorial preserves measurement limits and a conditional builder offer", () => {
  const slug = "featured/what-is-inference-in-artificial-intelligence-and-why-it-matters";
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const text of ["not randomised", "total operating cost remains unmeasured", "not an asynchronous cloud batch service", "No customer data", "39/40, not 39/39", "0/40", "null, not invented zeros", "synthetic-linear-v1", measurement.protocol, measurement.startedAt]) expect(html).toContain(text);
  expect(DOWNLOAD_FILES.length).toBe(7);
  expect(html).toContain('data-article-toc-placeholder');
  expect(html).toContain('[&amp;_h2]:scroll-mt-24');
  for (const file of DOWNLOAD_FILES) expect(html).toContain('href="/downloads/inference-lab/' + file + '"');
  for (const round of measurement.rounds) for (const mode of round.modes) expect(html).toContain(mode.elapsedMs.toFixed(3));
  for (const label of ["Training and serving operations", "Inference HTTP boundary cases", "Recorded inference timing results"]) expect(html).toContain('role="region" aria-label="' + label + '" tabindex="0"');
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + slug].conversion!;
  expect(config.primaryIcp).toBe("BUILDER");
  expect(config.primary).toBe("studio-builder");
  expect(config.version).toBe("inference-handover-v3");
  expect(html).toContain(config.copy!.button);
  expect(ARTICLE_REGISTRY[slug].title).toBe(articleMeta.title);
  expect(ARTICLE_REGISTRY[slug].description).toBe(articleMeta.description);
  expect(ARTICLE_REGISTRY[slug].date).toBe("2026-04-08");
  expect(ARTICLE_REGISTRY[slug].dateModified).toBe(articleMeta.dateModified);
  expect(ARTICLE_REGISTRY[slug].imageAlt).toBe(articleMeta.imageAlt);
});

test("observed measurement is tied to current executable sources, not a hand-copied performance claim", () => {
  expect(Object.keys(measurement.sourceSha256).sort()).toEqual(DOWNLOAD_FILES.filter(file => file.endsWith('.mjs')).sort());
  for (const [file, hash] of Object.entries(measurement.sourceSha256)) {
    expect(createHash('sha256').update(readFileSync('public/downloads/inference-lab/' + file)).digest('hex')).toBe(hash);
  }
  expect(measurement.rounds).toHaveLength(10);
  expect(measurement.rounds.filter(round => round.order[0] === 'sequential')).toHaveLength(5);
  const requests = [...measurement.warmup, ...measurement.rounds.flatMap(round => round.modes.flatMap(mode => mode.requests))];
  expect(requests).toHaveLength(52);
  expect(measurement.summary.attemptedRequests).toBe(requests.length);
  expect(measurement.summary.attemptedInputs).toBe(requests.reduce((sum, request) => sum + request.inputs.length, 0));
  expect(measurement.summary.requestBodyBytes).toBe(requests.reduce((sum, request) => sum + request.requestBodyBytes, 0));
  expect(measurement.summary.completedResponseBodyBytes).toBe(requests.reduce((sum, request) => sum + request.responseBodyBytes, 0));
  expect(measurement.summary.failedRequests).toBe(0);
  for (const round of measurement.rounds) {
    expect(round.modes.map(mode => mode.mode)).toEqual(round.order);
    for (const mode of round.modes) {
      expect(mode.requests.flatMap(request => request.outputs)).toEqual([7, -1, 2, 9]);
      expect(mode.expectedCount).toBe(4);
      expect(mode.exactMatches).toBe(4);
      expect(mode.failedRequests).toBe(0);
      expect(Number.isFinite(mode.elapsedMs) && mode.elapsedMs >= 0).toBe(true);
      for (const request of mode.requests) {
        expect(request.error).toBeNull();
        expect(request.status).toBe(200);
        expect(request.requestBodyBytes).toBe(Buffer.byteLength(JSON.stringify({ inputs: request.inputs })));
      }
    }
  }
  for (const mode of Object.values(measurement.summary.quality)) expect(mode).toEqual({ exactMatches: 40, expectedCount: 40, failedRequests: 0 });
  expect(measurement.usageAndCost.providerApiSpend).toBe(0);
  for (const key of ['totalOperatingCost', 'hardwareCost', 'energyKwh', 'energyCost', 'labourHours', 'labourCost'] as const) expect(measurement.usageAndCost[key]).toBeNull();
  expect(measurement.review.independentReproduction).toBe('pending');
  expect(measurement.review.productionReadiness).toBe('not-established');
});

test("the downloadable inference and measurement tests execute before publication", () => {
  const run = spawnSync('node', ['--test', 'server.test.mjs', 'measure.test.mjs'], {
    cwd: 'public/downloads/inference-lab', encoding: 'utf8', timeout: 20000,
  });
  expect(run.error).toBeUndefined();
  expect(run.status).toBe(0);
  expect(run.stdout).toContain('tests 9');
  expect(run.stdout).toContain('fail 0');
});

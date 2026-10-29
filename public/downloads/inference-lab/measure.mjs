import { performance } from 'node:perf_hooks';
import { cpus, release, totalmem } from 'node:os';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { startServer } from './server.mjs';
import { MODEL } from './model.mjs';

export const PROTOCOL = 'inference-serving-measure-v2';
export const INPUTS = Object.freeze([3, -1, 0.5, 4]);
// Independent fixture labels: never sent in the prediction request.
export const EXPECTED = Object.freeze([7, -1, 2, 9]);
export const SOURCE_FILES = Object.freeze(['model.mjs', 'server.mjs', 'server.test.mjs', 'measure.mjs', 'measure.test.mjs']);

function checkedUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1' || !url.port ||
      url.pathname !== '/predict' || url.username || url.password || url.search || url.hash) {
    throw new TypeError('Use only http://127.0.0.1:PORT/predict');
  }
  return url.href;
}

export async function timedRequest(url, inputs, timeoutMs = 5000) {
  const target = checkedUrl(url);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 5000) throw new TypeError('Timeout must be 1–5000 ms');
  const body = JSON.stringify({ inputs });
  const signal = AbortSignal.timeout(timeoutMs);
  const start = performance.now();
  let status = null;
  let outputs = null;
  let responseBodyBytes = null;
  let error = null;
  try {
    const response = await fetch(target, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
      signal, redirect: 'error',
    });
    status = response.status;
    // This client is only for the supplied loopback lab, not untrusted remote APIs.
    const text = await response.text();
    responseBodyBytes = Buffer.byteLength(text);
    if (!response.ok) error = 'http-error';
    else {
      let data;
      try { data = JSON.parse(text); } catch { error = 'invalid-json'; }
      if (!error) {
        if (!data || typeof data !== 'object' || Array.isArray(data) ||
            Object.keys(data).sort().join(',') !== 'modelVersion,outputs' ||
            data.modelVersion !== MODEL.version || !Array.isArray(data.outputs) ||
            data.outputs.length !== inputs.length || data.outputs.some(value => typeof value !== 'number' || !Number.isFinite(value))) {
          error = 'response-contract';
        } else outputs = data.outputs;
      }
    }
  } catch {
    error = signal.aborted ? 'timeout' : 'transport-error';
  }
  return { inputs: [...inputs], elapsedMs: performance.now() - start, status, outputs, error,
    requestBodyBytes: Buffer.byteLength(body), responseBodyBytes };
}

async function runMode(url, mode, timeoutMs) {
  const start = performance.now();
  const requests = [];
  if (mode === 'sequential') {
    for (const input of INPUTS) requests.push(await timedRequest(url, [input], timeoutMs));
  } else requests.push(await timedRequest(url, INPUTS, timeoutMs));
  const elapsedMs = performance.now() - start;
  // Failed requests retain their positions and the full quality denominator.
  const outputs = requests.flatMap(request => request.outputs ?? request.inputs.map(() => null));
  return { mode, elapsedMs, exactMatches: outputs.filter((value, i) => value === EXPECTED[i]).length,
    expectedCount: EXPECTED.length, failedRequests: requests.filter(request => request.error !== null).length, requests };
}

export async function runComparison(url, { timeoutMs = 5000 } = {}) {
  checkedUrl(url);
  const startedAt = new Date().toISOString();
  const warmup = [await timedRequest(url, [INPUTS[0]], timeoutMs), await timedRequest(url, INPUTS, timeoutMs)];
  const rounds = [];
  for (let i = 0; i < 10; i++) {
    const order = i % 2 === 0 ? ['sequential', 'grouped'] : ['grouped', 'sequential'];
    const modes = [];
    for (const mode of order) modes.push(await runMode(url, mode, timeoutMs));
    rounds.push({ round: i + 1, order, modes });
  }
  const measuredRequests = rounds.flatMap(round => round.modes.flatMap(mode => mode.requests));
  const allRequests = [...warmup, ...measuredRequests];
  const quality = Object.fromEntries(['sequential', 'grouped'].map(mode => {
    const runs = rounds.flatMap(round => round.modes.filter(run => run.mode === mode));
    return [mode, { exactMatches: runs.reduce((sum, run) => sum + run.exactMatches, 0), expectedCount: 40,
      failedRequests: runs.reduce((sum, run) => sum + run.failedRequests, 0) }];
  }));
  return { protocol: PROTOCOL, startedAt, completedAt: new Date().toISOString(), model: MODEL,
    fixture: { inputs: INPUTS, expected: EXPECTED },
    method: {
      order: 'Ten pairs, alternating sequential-first and grouped-first; balanced, not randomised',
      warmup: 'One single-input then one grouped request, excluded from comparison quality; startup precedes both',
      concurrency: 1, timeoutMs, retries: 0,
      timingBoundary: 'Client start through response-body parsing and contract validation; mode total also includes loop/bookkeeping overhead',
      byteBoundary: 'UTF-8 JSON body bytes only; not HTTP headers, transport overhead or wire traffic',
      failures: 'Retained in request records and full quality denominators; failed outputs count as non-matches',
    }, warmup, rounds, summary: { quality, attemptedRequests: allRequests.length,
      attemptedInputs: allRequests.reduce((sum, request) => sum + request.inputs.length, 0),
      failedRequests: allRequests.filter(request => request.error !== null).length,
      requestBodyBytes: allRequests.reduce((sum, request) => sum + request.requestBodyBytes, 0),
      completedResponseBodyBytes: allRequests.reduce((sum, request) => sum + (request.responseBodyBytes ?? 0), 0),
      incompleteResponseBodies: allRequests.filter(request => request.responseBodyBytes === null).length,
    },
  };
}

export async function measureLocal() {
  const server = await startServer();
  try {
    const result = await runComparison(`http://127.0.0.1:${server.address().port}/predict`);
    return { ...result,
      environment: { node: process.version, platform: process.platform, osRelease: release(), architecture: process.arch,
        cpuModel: cpus()[0]?.model ?? 'unknown', logicalCpus: cpus().length, memoryBytes: totalmem(),
        boundary: 'Client and server in one process on one machine; host load uncontrolled' },
      sourceSha256: Object.fromEntries(SOURCE_FILES.map(file => [file, createHash('sha256').update(readFileSync(new URL(file, import.meta.url))).digest('hex')])),
      usageAndCost: { providerRequests: 0, providerApiSpend: 0, providerCurrency: null,
        tokenUsage: 'not-applicable: scalar linear model, not an LLM', totalOperatingCost: null,
        hardwareCost: null, energyKwh: null, energyCost: null, labourHours: null, labourCost: null,
        status: 'not-measured: zero provider spending is not zero total cost' },
      review: { independentReproduction: 'pending', productionReadiness: 'not-established',
        assistance: 'AI-assisted code; automated tests and same-agent browser/download checks are not independent review' },
    };
  } finally { await new Promise(resolve => server.close(resolve)); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const record = await measureLocal();
    console.log(JSON.stringify(record, null, 2));
    // Preserve the complete record even when a comparison fails.
    if (record.summary.failedRequests || Object.values(record.summary.quality).some(mode => mode.exactMatches !== mode.expectedCount)) process.exitCode = 2;
  } catch (error) {
    console.error('Measurement could not start or finish:', error.message);
    process.exitCode = 1;
  }
}

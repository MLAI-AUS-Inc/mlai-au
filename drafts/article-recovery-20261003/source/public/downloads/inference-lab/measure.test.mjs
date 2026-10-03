import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { runComparison, timedRequest, INPUTS, EXPECTED, PROTOCOL } from './measure.mjs';
import { startServer } from './server.mjs';
import { MODEL } from './model.mjs';

async function fixtureServer(t, handler) {
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  return `http://127.0.0.1:${server.address().port}/predict`;
}

test('balanced comparison preserves every request, independent label and denominator', async t => {
  const server = await startServer();
  t.after(() => new Promise(resolve => server.close(resolve)));
  const record = await runComparison(`http://127.0.0.1:${server.address().port}/predict`);
  assert.equal(record.protocol, PROTOCOL);
  assert.equal(record.rounds.length, 10);
  assert.equal(record.rounds.filter(round => round.order[0] === 'sequential').length, 5);
  assert.equal(record.rounds.filter(round => round.order[0] === 'grouped').length, 5);
  assert.equal(record.summary.attemptedRequests, 52);
  assert.equal(record.summary.attemptedInputs, 85);
  assert.equal(record.summary.failedRequests, 0);
  assert.deepEqual(record.summary.quality, {
    sequential: { exactMatches: 40, expectedCount: 40, failedRequests: 0 },
    grouped: { exactMatches: 40, expectedCount: 40, failedRequests: 0 },
  });
  for (const round of record.rounds) {
    assert.deepEqual(round.modes.map(mode => mode.mode), round.order);
    for (const mode of round.modes) {
      assert.equal(mode.requests.length, mode.mode === 'sequential' ? 4 : 1);
      assert.deepEqual(mode.requests.flatMap(request => request.outputs), EXPECTED);
      for (const request of mode.requests) {
        assert.ok(Number.isFinite(request.elapsedMs) && request.elapsedMs >= 0);
        assert.equal(request.requestBodyBytes, Buffer.byteLength(JSON.stringify({ inputs: request.inputs })));
      }
    }
  }
});

test('an HTTP failure is retained and later requests still run in their original positions', async t => {
  let calls = 0;
  const url = await fixtureServer(t, (request, response) => {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      calls++;
      const payload = JSON.parse(body);
      assert.deepEqual(Object.keys(payload), ['inputs']);
      response.writeHead(calls === 4 ? 503 : 200, { 'Content-Type': 'application/json', Connection: 'close' });
      response.end(JSON.stringify(calls === 4 ? { error: 'unavailable' } : { modelVersion: MODEL.version, outputs: payload.inputs.map(x => 2 * x + 1) }));
    });
  });
  const record = await runComparison(url);
  assert.equal(calls, 52);
  assert.equal(record.rounds[0].modes[0].requests[1].error, 'http-error');
  assert.equal(record.rounds[0].modes[0].exactMatches, 3);
  assert.equal(record.summary.quality.sequential.exactMatches, 39);
  assert.equal(record.summary.quality.sequential.expectedCount, 40);
  assert.equal(record.summary.quality.grouped.exactMatches, 40);
  assert.equal(record.summary.failedRequests, 1);
});

test('HTTP 200 with wrong arithmetic is not a quality pass', async t => {
  const url = await fixtureServer(t, (request, response) => {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      response.writeHead(200, { Connection: 'close' });
      response.end(JSON.stringify({ modelVersion: MODEL.version, outputs: JSON.parse(body).inputs.map(() => 0) }));
    });
  });
  const record = await runComparison(url);
  assert.equal(record.summary.failedRequests, 0);
  for (const mode of Object.values(record.summary.quality)) assert.deepEqual(mode, { exactMatches: 0, expectedCount: 40, failedRequests: 0 });
});

test('invalid JSON, version, shape, type and output count are explicit failures', async t => {
  for (const [body, expectedError] of [
    ['{', 'invalid-json'], ['null', 'response-contract'], ['[]', 'response-contract'],
    [JSON.stringify({ modelVersion: 'wrong', outputs: EXPECTED }), 'response-contract'],
    [JSON.stringify({ modelVersion: MODEL.version, outputs: EXPECTED, extra: true }), 'response-contract'],
    [JSON.stringify({ modelVersion: MODEL.version, outputs: [7] }), 'response-contract'],
    [JSON.stringify({ modelVersion: MODEL.version, outputs: ['7', -1, 2, 9] }), 'response-contract'],
    ['{"modelVersion":"synthetic-linear-v1","outputs":[1e999,-1,2,9]}', 'response-contract'],
  ]) {
    const url = await fixtureServer(t, (_, response) => { response.writeHead(200, { Connection: 'close' }); response.end(body); });
    const result = await timedRequest(url, INPUTS);
    assert.equal(result.error, expectedError);
    assert.equal(result.outputs, null);
    assert.equal(result.status, 200);
  }
});

test('timeouts and refused connections return records rather than throwing away the run', async t => {
  const stalledUrl = await fixtureServer(t, () => {});
  const result = await timedRequest(stalledUrl, INPUTS, 20);
  assert.equal(result.error, 'timeout');
  assert.equal(result.outputs, null);
  assert.equal(result.responseBodyBytes, null);
  const server = await startServer();
  const closedUrl = `http://127.0.0.1:${server.address().port}/predict`;
  await new Promise(resolve => server.close(resolve));
  assert.equal((await timedRequest(closedUrl, INPUTS)).error, 'transport-error');
});

test('measurement cannot target remote servers or follow redirects', async t => {
  for (const url of ['https://example.com/predict', 'http://localhost:8000/predict', 'http://127.0.0.1:8000/predict?x=1', 'http://user:secret@127.0.0.1:8000/predict']) {
    await assert.rejects(() => timedRequest(url, INPUTS), /127\.0\.0\.1/);
  }
  const url = await fixtureServer(t, (_, response) => {
    response.writeHead(302, { Location: 'https://example.com/', Connection: 'close' }); response.end();
  });
  assert.equal((await timedRequest(url, INPUTS)).error, 'transport-error');
  await assert.rejects(() => timedRequest(url, INPUTS, 0), /Timeout/);
});

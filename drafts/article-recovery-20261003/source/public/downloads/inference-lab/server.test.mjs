import test from 'node:test';
import assert from 'node:assert/strict';
import { MODEL, infer, predict } from './model.mjs';
import { startServer } from './server.mjs';

test('fixed weights reproduce synthetic training pairs and held-out mathematical inputs', () => {
  assert.deepEqual(infer({ inputs: [0, 1, 2, 3, -1, 0.5] }).outputs, [1, 3, 5, 7, -1, 2]);
  assert.equal(Object.isFrozen(MODEL), true);
  assert.equal(predict(3), predict(3));
});
test('schema and numeric boundaries reject malformed requests', () => {
  for (const payload of [null, {}, { inputs: [] }, { inputs: Array(2) }, { inputs: [1, , 2] }, { inputs: Array(33).fill(1) }, { inputs: ['1'] }, { inputs: [NaN] }, { inputs: [Infinity] }, { inputs: [1001] }, { inputs: [-1001] }, { inputs: [1], extra: true }]) assert.throws(() => infer(payload));
  assert.deepEqual(infer({ inputs: [-1000, 1000] }).outputs, [-1999, 2001]);
  assert.equal(infer({ inputs: Array(32).fill(0) }).outputs.length, 32);
});
test('HTTP serving preserves prediction order and explicit error responses', async t => {
  const server = await startServer();
  t.after(() => new Promise(resolve => server.close(resolve)));
  assert.equal(server.address().address, '127.0.0.1');
  const url = `http://127.0.0.1:${server.address().port}/predict`;
  const post = body => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  const ok = await post(JSON.stringify({ inputs: [3, -1] }));
  assert.equal(ok.status, 200);
  assert.equal(ok.headers.get('cache-control'), 'no-store');
  assert.match(ok.headers.get('content-type'), /application\/json/);
  assert.deepEqual(await ok.json(), { modelVersion: MODEL.version, outputs: [7, -1] });
  assert.equal((await post('{')).status, 400);
  assert.equal((await post(JSON.stringify({ inputs: [null] }))).status, 400);
  assert.equal((await post(' '.repeat(4097))).status, 413);
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await fetch(url, { method: 'POST', body: '{}' })).status, 415);
  assert.equal((await fetch(url + '/missing')).status, 404);
  assert.equal((await post(JSON.stringify({ inputs: [1] }))).status, 200);
});

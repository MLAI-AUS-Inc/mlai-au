import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { baseline, evaluate } from './triage.mjs';
import { CONTRAST, DEVELOPMENT, compareCases, negationCandidate, reviewChange, reviewOutcome } from './change-review.mjs';

test('original baseline stays reproducible and development repair does not hide contrast failures', async () => {
  assert.equal((await evaluate()).correct, 5);
  const report = await reviewChange();
  assert.equal(report.development.total, 6);
  assert.equal(report.development.baselineCorrect, 5);
  assert.equal(report.development.candidateCorrect, 6);
  assert.equal(report.contrast.total, 8);
  assert.equal(report.contrast.baselineCorrect, 4);
  assert.equal(report.contrast.candidateCorrect, 6);
  assert.deepEqual(report.summary, { total: 14, baselineCorrect: 9, candidateCorrect: 12, remainingFailures: 2, regressions: 1, rejectedPredictions: 0 });
  assert.equal(report.decision, 'HOLD');
});

test('the clause filter really repairs s6 and really regresses c3', () => {
  const repair = DEVELOPMENT.find(row => row.id === 's6');
  assert.equal(baseline(repair.text).category, 'appointment');
  assert.equal(negationCandidate(repair.text).category, 'other');
  const regression = CONTRAST.find(row => row.id === 'c3');
  assert.equal(baseline(regression.text).category, 'appointment');
  assert.equal(negationCandidate(regression.text).category, 'other');
  assert.equal(negationCandidate(CONTRAST.find(row => row.id === 'c5').text).category, 'other');
});

test('every output stays review-only and the complete failure log retains both failures', async () => {
  const report = await reviewChange();
  for (const row of [...report.development.results, ...report.contrast.results]) {
    for (const result of [row.baseline, row.candidate]) {
      assert.equal(result.status, 'needs-human-review');
      assert.deepEqual(Object.keys(result).sort(), ['category', 'id', 'status']);
    }
  }
  assert.deepEqual(report.failureLog.map(row => [row.id, row.outcome]), [['c3', 'regression'], ['c5', 'still-wrong']]);
  assert.equal(report.boundaries.independentReview, 'pending');
  assert.equal(report.boundaries.learnedModel, false);
  assert.equal(report.boundaries.sendsMessages, false);
});

test('missing, duplicate, sparse, malformed or unsupported evaluation labels fail', async () => {
  for (const samples of [null, [], Array(2), [DEVELOPMENT[0], DEVELOPMENT[0]],
    [{ ...DEVELOPMENT[0], expected: 'refund' }], [{ ...DEVELOPMENT[0], text: ' ' }],
    [{ ...DEVELOPMENT[0], id: '' }], [{ ...DEVELOPMENT[0], extra: true }],
    [{ id: 'x', text: 'invoice' }], Array(51).fill(DEVELOPMENT[0])]) {
    await assert.rejects(() => compareCases(samples), TypeError);
  }
});

test('rejected predictions keep the entire denominator, including expected-other cases', async () => {
  for (const predictor of [() => { throw new Error('unavailable'); }, () => ({ category: 'other', send: true })]) {
    const report = await compareCases([...DEVELOPMENT, ...CONTRAST], predictor);
    assert.equal(report.total, 14);
    assert.equal(report.candidateCorrect, 0);
    assert.equal(report.candidateFailures.length, 14);
    assert.equal(report.rejectedPredictions, 14);
  }
});

test('labels never enter predictor arguments and changing a label cannot change prediction', async () => {
  const row = CONTRAST[0];
  const seen = [];
  const predictor = (...args) => { seen.push(args); return negationCandidate(...args); };
  const before = await compareCases([row], predictor);
  const after = await compareCases([{ ...row, expected: 'other' }], predictor);
  assert.deepEqual(seen, [[row.text], [row.text]]);
  assert.deepEqual(before.results[0].candidate, after.results[0].candidate);
  assert.equal(before.candidateCorrect, 1);
  assert.equal(after.candidateCorrect, 0);
});

test('fixtures are immutable and review does not rewrite baseline or input data', async () => {
  const before = JSON.stringify([DEVELOPMENT, CONTRAST]);
  assert.throws(() => { CONTRAST[0].expected = 'other'; }, TypeError);
  await reviewChange();
  assert.equal(JSON.stringify([DEVELOPMENT, CONTRAST]), before);
});

test('a higher score or even no known failures can never produce release approval', () => {
  assert.equal(reviewOutcome({ remainingFailures: 2, regressions: 1, rejectedPredictions: 0 }), 'HOLD');
  assert.equal(reviewOutcome({ remainingFailures: 0, regressions: 0, rejectedPredictions: 0 }), 'REVIEW_REQUIRED');
  for (const value of [-1, NaN, Infinity, 0.5, '0', null, undefined]) {
    assert.throws(() => reviewOutcome({ remainingFailures: value, regressions: 0, rejectedPredictions: 0 }), TypeError);
  }
});

test('CLI emits the full deterministic held record and refuses silent option changes', async () => {
  const executable = new URL('./change-review.mjs', import.meta.url);
  const run = spawnSync(process.execPath, [fileURLToPath(executable)], { encoding: 'utf8', timeout: 5000 });
  assert.equal(run.status, 2, run.stderr);
  assert.deepEqual(JSON.parse(run.stdout), await reviewChange());
  const invalid = spawnSync(process.execPath, [fileURLToPath(executable), '--ignore-failures'], { encoding: 'utf8', timeout: 5000 });
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /no options/);
  assert.equal(invalid.stdout, '');
});

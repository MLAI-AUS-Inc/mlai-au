// Teaching rules only, not an AI model, inbox integration or approval system.
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { baseline, cases, propose } from './triage.mjs';

export const VERSION = 'learning-change-review-v1';
export const SOURCE_FILES = Object.freeze(['triage.mjs', 'triage.test.mjs', 'change-review.mjs', 'change-review.test.mjs']);
export const DEVELOPMENT = Object.freeze(cases.map(row => Object.freeze({ ...row })));
// Visible contrast cases, authored with the candidate: NOT a held-out benchmark.
export const CONTRAST = Object.freeze([
  { id: 'c1', text: 'This is not about my appointment; please explain my invoice.', expected: 'billing' },
  { id: 'c2', text: 'This is not about my invoice; please move my booking.', expected: 'appointment' },
  { id: 'c3', text: 'This is not about my appointment time but the appointment date.', expected: 'appointment' },
  { id: 'c4', text: 'Invoice question and booking change.', expected: 'other' },
  { id: 'c5', text: 'Can I reschedule?', expected: 'appointment' },
  { id: 'c6', text: 'Can you tell me when you open?', expected: 'other' },
  { id: 'c7', text: 'This is not about my invoice; what are your opening hours?', expected: 'other' },
  { id: 'c8', text: 'This is not about the booking system; I need a booking link.', expected: 'appointment' },
].map(Object.freeze));

export function negationCandidate(text) {
  // A deliberately limited change: discard whole punctuation-delimited clauses
  // containing "not about". This loses useful text in c3; preserve that regression.
  const remaining = text.split(/[.;!?]/)
    .filter(clause => !/\bnot about\b/i.test(clause))
    .join(' ');
  return baseline(remaining);
}

function validateCases(samples) {
  if (!Array.isArray(samples) || samples.length < 1 || samples.length > 50) throw new TypeError('Provide 1–50 labelled synthetic cases');
  const ids = new Set();
  for (const row of samples) {
    if (!row || typeof row !== 'object' || Array.isArray(row) || Object.keys(row).sort().join(',') !== 'expected,id,text' ||
        typeof row.id !== 'string' || !/^[a-z][a-z0-9-]{0,39}$/.test(row.id) || ids.has(row.id) ||
        typeof row.text !== 'string' || !row.text.trim() || row.text.length > 2000 ||
        !['billing', 'appointment', 'other'].includes(row.expected)) throw new TypeError('Malformed, duplicate or unlabelled case');
    ids.add(row.id);
  }
}

export async function compareCases(samples, candidate = negationCandidate) {
  validateCases(samples);
  const results = [];
  for (const sample of samples) {
    // Only text crosses the predictor boundary. Expected labels remain in review.
    const before = await propose({ id: sample.id, text: sample.text }, baseline);
    const after = await propose({ id: sample.id, text: sample.text }, candidate);
    const baselineCorrect = before.category === sample.expected && !before.error;
    const candidateCorrect = after.category === sample.expected && !after.error;
    results.push({ ...sample, baseline: before, candidate: after,
      baselineCorrect: Boolean(baselineCorrect), candidateCorrect: Boolean(candidateCorrect),
      outcome: baselineCorrect ? (candidateCorrect ? 'unchanged-correct' : 'regression') : (candidateCorrect ? 'improvement' : 'still-wrong') });
  }
  return { total: results.length,
    baselineCorrect: results.filter(row => row.baselineCorrect).length,
    candidateCorrect: results.filter(row => row.candidateCorrect).length,
    improvements: results.filter(row => row.outcome === 'improvement').map(row => row.id),
    regressions: results.filter(row => row.outcome === 'regression').map(row => row.id),
    candidateFailures: results.filter(row => !row.candidateCorrect).map(row => row.id),
    rejectedPredictions: results.filter(row => row.candidate.error).length,
    results };
}

export function reviewOutcome({ remainingFailures, regressions, rejectedPredictions }) {
  for (const value of [remainingFailures, regressions, rejectedPredictions]) {
    if (!Number.isInteger(value) || value < 0) throw new TypeError('Review counts must be nonnegative integers');
  }
  return remainingFailures || regressions || rejectedPredictions ? 'HOLD' : 'REVIEW_REQUIRED';
}

export async function reviewChange() {
  const development = await compareCases(DEVELOPMENT);
  const contrast = await compareCases(CONTRAST);
  const rows = [...development.results, ...contrast.results];
  const counts = { remainingFailures: rows.filter(row => !row.candidateCorrect).length,
    regressions: rows.filter(row => row.outcome === 'regression').length,
    rejectedPredictions: rows.filter(row => row.candidate.error).length };
  return { version: VERSION, baselineVersion: 'original-keyword-baseline', candidateVersion: 'drop-not-about-clause-v1',
    dataStatus: 'Fourteen invented public development/contrast cases; visible during authoring, not independent evaluation',
    sourceSha256: Object.fromEntries(SOURCE_FILES.map(file => [file, createHash('sha256').update(readFileSync(new URL(file, import.meta.url))).digest('hex')])),
    development, contrast,
    summary: { total: rows.length, baselineCorrect: rows.filter(row => row.baselineCorrect).length,
      candidateCorrect: rows.filter(row => row.candidateCorrect).length, ...counts },
    decision: reviewOutcome(counts),
    failureLog: rows.filter(row => !row.candidateCorrect).map(row => ({ id: row.id, text: row.text, expected: row.expected,
      actual: row.candidate.category, error: row.candidate.error ?? null, outcome: row.outcome })),
    boundaries: { learnedModel: false, humanReviewRequired: true, approvalInterface: false,
      sendsMessages: false, independentReview: 'pending', customerDeployment: 'not-performed',
      latency: 'not-measured', totalOperatingCost: 'not-measured', providerCalls: 0 },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 2) throw new TypeError('Usage: node change-review.mjs (no options)');
    const report = await reviewChange();
    console.log(JSON.stringify(report, null, 2));
    // A completed teaching review is not approval; HOLD is expected in this fixture.
    process.exitCode = report.decision === 'HOLD' ? 2 : 0;
  } catch (error) {
    console.error('Change review failed:', error.message);
    process.exitCode = 1;
  }
}

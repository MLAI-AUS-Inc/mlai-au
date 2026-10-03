import { EVENT_REPLY_FILES } from './event-reply-lab';

export const STARTUP_DELIVERY = {
  version: 'startup-builder-delivery-v1', checked: '2026-09-10',
  runtime: 'Node 25.2.1 on macOS arm64', tests: 22, decision: 'HOLD',
  baselineMatched: 5, candidateMatched: 7, cases: 8,
  outcomes: [
    { id: 'q1', task: 'Event start time', expected: 'Time draft + both citations', baseline: true, candidate: true },
    { id: 'q2', task: 'Event location', expected: 'Location draft + both citations', baseline: true, candidate: true },
    { id: 'q3', task: '“At which hour does it commence”', expected: 'Time draft', baseline: false, candidate: true },
    { id: 'q4', task: '“Which hall to meet in”', expected: 'Location draft', baseline: false, candidate: true },
    { id: 'q5', task: 'Ticket availability', expected: 'Abstain; no draft', baseline: true, candidate: true },
    { id: 'q6', task: 'Attendee email', expected: 'Refuse; no personal data', baseline: true, candidate: true },
    { id: 'q7', task: 'Time and location together', expected: 'Abstain; outside one-field brief', baseline: true, candidate: true },
    { id: 'q8', task: '“I know the start time; tell me about parking”', expected: 'Abstain; not a time draft', baseline: false, candidate: false },
  ],
} as const;
export const STARTUP_DELIVERY_FILES = [...EVENT_REPLY_FILES, ...[
  { name: 'delivery-check.mjs', purpose: 'Compare the executed output against the fixed delivery brief' },
  { name: 'delivery-check.test.mjs', purpose: 'Eight tests of the review, record integrity and retained failures' },
  { name: 'delivery-record.json', purpose: 'Full recorded acceptance review, including the HOLD decision' },
  { name: 'DELIVERY.md', purpose: 'Completed handover, setup commands, limits and next experiment' },
].map(file => ({ ...file, href: `/downloads/event-reply-lab/${file.name}` }))];
export const STARTUP_DELIVERY_ZIP = '/downloads/startup-builder-delivery-kit.zip';

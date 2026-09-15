/** Synthetic arithmetic inputs and scripted corrections, never measured pilot evidence. */
export const DECK_PROVENANCE = 'Entirely fictional teaching example, not an MLAI client result. These twenty rows are authored arithmetic inputs. No customer, model run, timed trial or independent review produced them.';
export const DECK_REVIEW_STATUS = 'AI-assisted editorial exercise; independent founder/source and appropriate financial review pending. Retest not run.';
export type DeckPilotRow = { id: string; baselineMinutes: number; reviewMinutes: number; correctionMinutes: number; correctionRef: string | null };
export const DECK_PILOT_ROWS: readonly DeckPilotRow[] = Array.from({ length: 20 }, (_, index) => ({
  id: `Q${String(index + 1).padStart(2, '0')}`,
  baselineMinutes: [8, 9, 10, 11, 12][index % 5],
  reviewMinutes: [5, 5, 6, 6, 8][index % 5],
  correctionMinutes: index % 5 === 3 ? 5 : 0,
  correctionRef: index % 5 === 3 ? `C${Math.floor(index / 5) + 1}` : null,
}));
export const DECK_SETUP_MINUTES = 50;
export function summariseDeckPilot(rows: readonly DeckPilotRow[], setupMinutes: number) {
  if (!rows.length || !Number.isFinite(setupMinutes) || setupMinutes < 0) throw new Error('A non-empty record and known non-negative setup time are required');
  const ids = new Set<string>();
  let baseline = 0, review = 0, corrections = 0, correctedRows = 0;
  for (const row of rows) {
    if (!row.id?.trim() || ids.has(row.id)) throw new Error('Each draft needs a unique non-empty identity');
    ids.add(row.id);
    if (!Number.isFinite(row.baselineMinutes) || row.baselineMinutes <= 0 || !Number.isFinite(row.reviewMinutes) || row.reviewMinutes < 0 || !Number.isFinite(row.correctionMinutes) || row.correctionMinutes < 0) throw new Error('Missing, negative or non-finite times cannot become zero');
    if ((row.correctionMinutes > 0) !== Boolean(row.correctionRef?.trim())) throw new Error('Correction time and its source reference must agree');
    baseline += row.baselineMinutes; review += row.reviewMinutes; corrections += row.correctionMinutes;
    if (row.correctionMinutes > 0) correctedRows++;
  }
  const assisted = review + setupMinutes + corrections;
  const difference = baseline - assisted, differencePercent = difference / baseline * 100;
  if (![baseline, review, corrections, assisted, difference, differencePercent].every(Number.isFinite)) throw new Error('Totals must remain finite');
  return {count: rows.length, baseline, review, setup: setupMinutes, corrections, assisted, difference, differencePercent, correctedRows};
}
export const DECK_CORRECTIONS = [
  { id: 'C1', row: 'Q04', input: 'Two pumps for three days at an illustrative AUD 50 per pump per day. Delivery and taxes are outside this arithmetic example.', draft: 'Hire subtotal: AUD 150.', edit: 'Hire subtotal: 2 × 3 × AUD 50 = AUD 300. Confirm all other charges separately.', lesson: 'The scripted draft omitted the second unit. The five correction minutes are invented, not timed.' },
  { id: 'C2', row: 'Q09', input: 'One unit for four days at an illustrative AUD 30 per day. Other charges are outside this exercise.', draft: 'Hire subtotal: AUD 30.', edit: 'Hire subtotal: 1 × 4 × AUD 30 = AUD 120. Confirm all other charges separately.', lesson: 'The scripted draft omitted the duration. Price arithmetic does not establish quote accuracy for a real customer.' },
  { id: 'C3', row: 'Q14', input: 'Prepare an estimate only. No stock has been reserved and availability has not been checked.', draft: 'Your booking is confirmed.', edit: 'This is an estimate only. Availability is unconfirmed and no stock is reserved.', lesson: 'A fluent reply changed the transaction status. Review must check commitments as well as numbers.' },
  { id: 'C4', row: 'Q19', input: 'Requested pickup location: Depot A. This is a synthetic location label.', draft: 'Collect from Depot B.', edit: 'Requested pickup location: Depot A. Confirm collection arrangements before committing.', lesson: 'The draft changed a supplied fact. The correction is scripted and is not evidence that a deployed system catches this error.' },
] as const;
export const DECK_CLAIMS = [
  { id: 'D1', before: 'AI cut our costs by 40%.', replacement: 'Synthetic 20-draft example: 200 manual minutes versus 190 assisted minutes, including 50 setup and 20 correction minutes. The 5% task-time difference comes from invented inputs. Software costs, maintenance and cash savings are unmeasured.', boundary: 'A 40% reduction in the review subtotal excludes setup and correction. Minutes cannot establish cost savings or causation.' },
  { id: 'D2', before: 'Customers love our product.', replacement: 'This teaching scenario supplies no customer interview, payment, repeat-use or retention evidence.', boundary: 'Twenty drafts are tasks, not twenty customers. Churn is unknown because no paying cohort or period is supplied.' },
  { id: 'D3', before: 'Production-ready AI automation.', replacement: 'Draft-only concept illustrated with four scripted corrections. No live quote was sent and no safety, reliability or production-readiness test ran.', boundary: 'The other sixteen timing rows have no supplied output or correctness review. Zero correction time does not mean an output was correct.' },
] as const;
export const DECK_FIELDS = [
  {label:'Reader and intended decision', value:'A willing community peer checking whether the written D1 claim accurately describes this fictional example. No investment or purchase requested.'},
  {label:'Slide claim in plain language', value:DECK_CLAIMS[0].before},
  {label:'Evidence status', value:'Illustrative arithmetic from invented inputs. It is neither an observed pilot result nor a forecast of a real business.'},
  {label:'Source record, owner and measurement date', value:'Q01–Q20, C1–C4 and one 50-minute setup assumption, authored by MLAI for this exercise on 11 September 2026. Measurement date: none; no timed test occurred.'},
  {label:'Sample, denominator, period, currency and exclusions', value:'20 synthetic draft rows; comparison denominator 200 baseline minutes. One imagined test batch with no observed calendar period. Inputs are in minutes, not currency. Software charges, maintenance, downstream work, taxes and cash effects are unmeasured.'},
  {label:'What the evidence supports', value:'The supplied arithmetic totals 120 review + 20 correction + 50 setup = 190 assisted minutes. Against 200 baseline minutes, the difference is 10 minutes or 5% of baseline.'},
  {label:'What it does not support or contradicts', value:'No 40% cost saving, real time saving, causal benefit, customer count, churn, production readiness or safety conclusion. A higher setup assumption can erase the illustrated difference.'},
  {label:'Permission and redaction before sharing', value:'The supplied text and numbers are fiction. For an actual case, obtain permission for the specific material, minimise identifiers and use approved storage. Public access to a third-party deck does not authorise copying its assets.'},
  {label:'Replacement wording with limitations', value:DECK_CLAIMS[0].replacement},
  {label:'Unanswered question and next test', value:'Why do quantity, duration, booking status and location errors occur? A real test needs comparable cases, observed timings and reviewed outputs. Retest not run; do not turn this plan into a claim of measured improvement.'},
] as const;
export const DECK_READ_THROUGH = [
  {id:'S1', action:'One permitted written review', material:'Fictional peer agrees to read one anonymised teaching slide. The writer shows D1’s replacement wording and the calculation, with no customer data or external deck images.'},
  {id:'S2', action:'An incomplete retelling', material:'Scripted response: “You ran an AI pilot and saved five per cent of costs.” The peer lost both the synthetic status and the distinction between time and money.'},
  {id:'S3', action:'A changed slide title and an open retest', material:'Writer changes the title to “Invented timing example” and places “No real pilot or cash-saving measurement” beside the comparison. Retest not run. The change may help but no actual comprehension improvement has been established.'},
] as const;
export function deckEvidenceWorksheetText() {
 const total = summariseDeckPilot(DECK_PILOT_ROWS, DECK_SETUP_MINUTES);
 return ['MLAI PITCH DECK EVIDENCE REVIEW — 11 September 2026','https://mlai.au/articles/featured/the-best-startup-pitch-deck-ever',DECK_PROVENANCE,DECK_REVIEW_STATUS,
  'Use one record per consequential claim. Complete real-case fields from your own evidence or an explicit unknown. Do not manufacture a source, measurement, permission or testimonial. This download contains no original third-party deck images.',
  'BLANK TEN-FIELD RECORD',...DECK_FIELDS.map((f,i)=>`${i+1}. ${f.label}:\n`),
  'SYNTHETIC TIMING INPUTS\nID | Baseline minutes | Review minutes | Extra correction minutes | Correction reference',
  ...DECK_PILOT_ROWS.map(r=>`${r.id} | ${r.baselineMinutes} | ${r.reviewMinutes} | ${r.correctionMinutes} | ${r.correctionRef??'No output supplied'}`),
  `Totals: ${total.baseline} baseline; ${total.review} review + ${total.corrections} correction + ${total.setup} setup = ${total.assisted} assisted minutes. Difference ${total.difference} minutes (${total.differencePercent}%). Invented inputs, not a measured outcome.`,
  'SENSITIVITY: with 60 setup minutes the totals tie at 200; with 80 setup minutes assisted time is 220, 10% more than baseline. These change an assumption, not the recorded example. No cash-saving claim follows.',
  'FOUR SCRIPTED CORRECTIONS',...DECK_CORRECTIONS.map(c=>`${c.id} / ${c.row}\nInput: ${c.input}\nDraft: ${c.draft}\nEdited: ${c.edit}\nBoundary: ${c.lesson}`),
  'THREE CLAIM REVISIONS',...DECK_CLAIMS.map(c=>`${c.id}\nBefore: ${c.before}\nReplacement: ${c.replacement}\nBoundary: ${c.boundary}`),
  'COMPLETED TEN-FIELD RECORD',...DECK_FIELDS.map((f,i)=>`${i+1}. ${f.label}:\n${f.value}`),
  'SUPPLIED FICTIONAL READ-THROUGH',...DECK_READ_THROUGH.map(s=>`${s.id}: ${s.action}\n${s.material}`),
  'NEXT STEP: identify one weak claim before choosing an appropriate MLAI event. Check whether the listing offers relevant discussion. Attendance does not guarantee deck review, investor access or funding. Event preferences do not upload this worksheet. Independent source/founder review and appropriate real-case permissions remain required.'
 ].join('\n\n')+'\n';
}

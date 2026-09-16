import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import JSZip from 'jszip';
import { agentWorkflowDecisionText } from '../app/lib/agent-workflow-decision';
import { gtmWorksheetText, GTM_RECORDS, summariseGtmChannel, gtmRatio, gtmBudget } from '../app/lib/gtm-channel-test';
import { deckEvidenceWorksheetText, DECK_PILOT_ROWS, summariseDeckPilot } from '../app/lib/pitch-deck-evidence';
import { calculateAiPilot } from '../app/lib/ai-pilot-economics';
import { AUSTRALIAN_ACCELERATOR_PROGRAMS } from '../app/lib/australian-accelerator-programs';
import { acceleratorReadDay, acceleratorIntakeNotice, acceleratorReviewState } from '../app/lib/accelerator-intake';
import { ACCELERATOR_FIT_CRITERIA, emptyAcceleratorFit, assessAcceleratorFit } from '../app/lib/accelerator-fit';

const run = (args: string[]) => {
  const result = spawnSync('node', args, { encoding: 'utf8', timeout: 35_000 });
  if (result.status !== 0) throw new Error(result.stderr || result.error?.message || 'Node run failed');
  return result.stdout;
};
test('editable records preserve the same examples and caveats as their article sources', () => {
  for (const [file, text] of [
    ['agent-workflow-decision.txt', agentWorkflowDecisionText()],
    ['gtm-channel-test.txt', gtmWorksheetText()],
    ['pitch-deck-evidence-review.txt', deckEvidenceWorksheetText()],
  ]) expect(readFileSync(`public/downloads/${file}`, 'utf8')).toBe(text);
});
test('pending payment, unknown fit and exhausted time cannot become a successful acquisition result', () => {
  const result = summariseGtmChannel(GTM_RECORDS, 'session');
  expect(result).toMatchObject({reached: 20, fit: 4, unknownFit: 11, accepted: 1, paid: 0, pendingPayment: 1, activated: 0});
  expect(() => summariseGtmChannel([...GTM_RECORDS, GTM_RECORDS[0]], 'session')).toThrow();
  expect(gtmRatio(0, 0)).toContain('not calculable');
  expect(() => gtmRatio(2, 1)).toThrow();
  expect(gtmBudget(220, 12, 2)).toMatchObject({pause:true, cashRemaining:30, hoursRemaining:0, cashPlusTime:940});
});
test('deck example retains correction and setup time, including a losing sensitivity case', () => {
  expect(summariseDeckPilot(DECK_PILOT_ROWS, 50)).toMatchObject({baseline:200, review:120, corrections:20, assisted:190, differencePercent:5});
  expect(summariseDeckPilot(DECK_PILOT_ROWS, 80).differencePercent).toBe(-10);
  expect(() => summariseDeckPilot([...DECK_PILOT_ROWS, DECK_PILOT_ROWS[0]],50)).toThrow();
  expect(() => summariseDeckPilot(DECK_PILOT_ROWS,NaN)).toThrow();
});
test('released capacity alone produces no cash saving or payback', () => {
  const result=calculateAiPilot({monthlyTasks:100,baselineMinutes:10,pilotMinutes:4,hourlyCost:60,maintenanceHours:0,monthlyCashCost:100,cashablePercent:0,setupCashCost:500,setupHours:2});
  expect(result.releasedHours).toBe(10);
  expect(result.monthlyCashChange).toBe(-100);
  expect(result.cashPaybackMonths).toBeNull();
});
test('source freshness expires at Sydney midnight and never turns a scheduled opening into observed availability', () => {
  const p={...AUSTRALIAN_ACCELERATOR_PROGRAMS[0], lastVerified:'2026-09-15', intakeVerifiedAt:'2026-09-15',reviewAfter:'2026-09-22'};
  expect(acceleratorReviewState(p,acceleratorReadDay(Date.parse('2026-09-21T13:59:59Z')))).toBe('fresh');
  expect(acceleratorReviewState(p,acceleratorReadDay(Date.parse('2026-09-21T14:00:00Z')))).toBe('needs-review');
  expect(acceleratorReviewState({...p,reviewAfter:'2026-02-30'},'2026-09-15')).toBe('unknown');
  const energy={...AUSTRALIAN_ACCELERATOR_PROGRAMS.find(p=>p.id==='energylab')!,lastVerified:'2027-01-10',intakeVerifiedAt:'2027-01-10',reviewAfter:'2027-01-17'};
  expect(acceleratorIntakeNotice(energy,'2027-01-11')).toContain('date alone does not establish it is open');
});
test('one unmet requirement cannot be outweighed by seven supported checks', () => {
  const record=emptyAcceleratorFit();
  for(const {id} of ACCELERATOR_FIT_CRITERIA)record.criteria[id]={status:'verified',evidence:'Synthetic test evidence'};
  record.criteria.eligibility.status='not-met';
  expect(assessAcceleratorFit(record)).toMatchObject({state:'mismatch',verifiedCount:7});
  record.criteria.eligibility={status:'verified',evidence:''};
  expect(assessAcceleratorFit(record)).toMatchObject({state:'clarify',verifiedCount:7});
});
test('downloaded forecast executes, exposes its loss and retains input failure tests', () => {
  const stdout=run(['--test','--test-reporter=tap','public/downloads/data-science-portfolio/forecast.test.mjs']);
  expect(stdout).toContain('# tests 11');expect(stdout).toContain('# fail 0');
  const fresh=JSON.parse(run(['public/downloads/data-science-portfolio/forecast.mjs']));
  expect(fresh).toEqual(JSON.parse(readFileSync('public/downloads/data-science-portfolio/recorded-result.json','utf8')));
  expect(fresh.cases).toHaveLength(14);
  expect(fresh.cases.reduce((sum:number,r:any)=>sum+Math.abs(r.actual-r.baseline),0)).toBe(21);
  expect(fresh.cases.reduce((sum:number,r:any)=>sum+Math.abs(r.actual-r.candidate),0)).toBe(84);
});
test('observability ZIP contains exactly the individually served files and reruns without granting approval', async () => {
  const zip=await JSZip.loadAsync(readFileSync('public/downloads/agent-observability-kit.zip'));
  const files=Object.values(zip.files).filter(f=>!f.dir);
  expect(files).toHaveLength(9);
  for(const f of files){expect(f.name).toMatch(/^agent-trace-lab\/[a-zA-Z.-]+$/);expect(await f.async('nodebuffer')).toEqual(readFileSync(`public/downloads/${f.name}`));}
  const fresh=JSON.parse(run(['public/downloads/agent-trace-lab/run.mjs']));
  const recorded=JSON.parse(readFileSync('public/downloads/agent-trace-lab/recorded-run.json','utf8'));
  expect(fresh.tests.counts).toMatchObject({tests:23,pass:23,fail:0,skipped:0,cancelled:0});
  for(const key of ['sourceSha256','trace','observation'])expect(fresh[key]).toEqual(recorded[key]);
  expect(fresh.independentReview).toBe(false);expect(fresh.productionApproval).toBe(false);
});

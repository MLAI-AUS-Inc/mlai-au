import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, agentScopeFields } from "../app/articles/content/featured/what-is-an-agent-in-artificial-intelligence";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { AGENT_DESIGN_OPTIONS, AGENT_DESIGN_COSTS, AGENT_CASE_RECORDS, AGENT_APPROVAL_STEPS, AGENT_COMPLETED_FIELDS, AGENT_SLOW_REVIEW, agentDecisionMinutes, agentWorkflowDecisionText } from "../app/lib/agent-workflow-decision";

const slug = "featured/what-is-an-agent-in-artificial-intelligence";
const render = () => renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);

test("agent buyer receives comparable costs, exact approval history and a completed decision before the offer", () => {
  const html = render();
  for (const text of ['A completed decision: request M-104', 'Compare the cost of each design', 'D-1', 'D-2', 'Approval A-1', 'No agent justified yet', 'Completed maintenance-office decision', 'not automatically attached']) expect(html).toContain(text);
  expect(html.indexOf('No agent justified yet')).toBeLessThan(html.indexOf('Describe your workflow'));
  expect(html).toContain('data-article-toc-placeholder');
});

test("business agent guide delivers design comparison, approval tests and an honest editable brief", () => {
  const html = render();
  for (const text of ["Fixed automation", "AI-assisted workflow", "Bounded agent", "Reject the stale approval", "does not unsend it", "not automatically cash savings", "not evidence that model parameters changed"]) expect(html).toContain(text);
  expect(html).toContain("The net release is 50 minutes");
  expect(html).toContain("Illustrative scenario, not a customer case study");
  expect(html).not.toContain("Big 4");
  expect(html).toContain('href="/downloads/agent-workflow-decision.txt"');
  const asset = readFileSync("public/downloads/agent-workflow-decision.txt", "utf8");
  expect(agentScopeFields).toHaveLength(12);
  for (const field of agentScopeFields) expect(asset).toContain(field);
  expect(asset).toContain("COMPLETED FICTIONAL EXAMPLE");
  expect(asset).toContain("Unchosen limits mean test not ready");
});

test("agent decision guide selects the buyer brief rather than contractor recruitment", () => {
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + slug].conversion!;
  expect(config.primary).toBe("studio-project");
  expect(config.primaryIcp).toBe("SMB");
  expect(config.version).toBe("agent-owner-decision-v3");
  const html = render();
  expect(html).toContain(config.copy!.button);
  expect(html).toContain('href="/mlai-studio/start-project"');
  expect(html).toContain('data-article-icp="SMB"');
  expect(html).not.toContain('href="/mlai-studio#apply"');
  expect(ARTICLE_REGISTRY[slug].title).toBe(articleMeta.title);
  expect(ARTICLE_REGISTRY[slug].description).toBe(articleMeta.description);
  expect(ARTICLE_REGISTRY[slug].date).toBe("2026-04-17");
  expect(ARTICLE_REGISTRY[slug].dateModified).toBe(articleMeta.dateModified);
  expect(articleMeta.dateModified).toBe('2026-10-29');
});

test('download exactly delivers every source record, design, cost and completed brief field', () => {
 const text = readFileSync('public/downloads/agent-workflow-decision.txt', 'utf8');
 expect(text).toBe(agentWorkflowDecisionText());
 expect(AGENT_COMPLETED_FIELDS).toHaveLength(12);
 expect(AGENT_DESIGN_OPTIONS).toHaveLength(3);
 expect(AGENT_CASE_RECORDS).toHaveLength(4);
 expect(AGENT_APPROVAL_STEPS).toHaveLength(4);
 for (const field of AGENT_COMPLETED_FIELDS) { expect(text).toContain(field.label + ':'); expect(text).toContain(field.value); }
 for (const record of AGENT_CASE_RECORDS) { expect(text).toContain(record.id); expect(text).toContain(record.text); }
 for (const option of AGENT_DESIGN_OPTIONS) for (const value of [option.name, option.caseDecision, option.error, option.owner, option.next]) expect(text).toContain(value);
 for (const step of AGENT_APPROVAL_STEPS) for (const value of [step.step, step.record, step.expected, step.evidence]) expect(text).toContain(value);
 expect(text.match(/Actual: NOT RUN\./g)).toHaveLength(4);
 for (const value of ['BLANK COMPARISON', 'ACTUAL ACCEPTANCE RECORD', 'Downstream evidence', 'not automatically attached', 'Independent owner/technical review pending', 'No AI system, approval gateway or customer workflow was evaluated', 'Unchosen limits mean test not ready']) expect(text).toContain(value);
});

test('common workload arithmetic separates case work, maintenance, setup, cash and unknown costs', () => {
 for (const option of AGENT_DESIGN_OPTIONS) {
  expect(option.inputs.monthlyTasks).toBe(50); expect(option.inputs.baselineMinutes).toBe(8);
  expect(option.inputs.cashablePercent).toBe(0);
  expect(Object.values(option.cash).reduce((sum, value) => sum + value, 0)).toBe(option.inputs.monthlyCashCost);
 }
 expect(AGENT_DESIGN_COSTS.map(r => agentDecisionMinutes(r.netHours))).toEqual([40, 50, 20]);
 expect(AGENT_DESIGN_COSTS.map(r => r.setupEconomicCost)).toEqual([330, 760, 1620]);
 expect(AGENT_DESIGN_COSTS.map(r => r.monthlyCashChange)).toEqual([-20, -50, -90]);
 expect(AGENT_DESIGN_COSTS.map(r => r.cashPaybackMonths)).toEqual([null, null, null]);
 expect(agentDecisionMinutes(AGENT_SLOW_REVIEW.netHours)).toBe(-50);
 expect(AGENT_SLOW_REVIEW.monthlyCashChange).toBe(-50);
 expect(AGENT_DESIGN_OPTIONS[2].next).toContain('No agent justified yet');
 expect(AGENT_DESIGN_OPTIONS[1].next).toContain('not an observed gain');
 expect(agentWorkflowDecisionText()).toContain('exclusions prevent a complete ROI claim');
});

test('approval demonstration preserves authority, version, recovery and unperformed status', () => {
 const html = render();
 for (const value of ['maintenance-contact@example.invalid', 'send-clarification', 'Reject the stale approval; no send', 'Booking commitments also remain prohibited', 'All four demonstration steps: NOT RUN', 'All six cases are NOT RUN', 'Approval cannot grant an action outside']) expect(html).toContain(value);
 expect(AGENT_CASE_RECORDS[3].text).toContain('A larger version label alone does not resolve the conflict');
 for (const label of ['Agent design choices', 'M-104 design decision', 'Agent failure demonstrations', 'Agent design cost assumptions']) expect(html).toContain(`role="region" aria-label="${label}" tabindex="0"`);
 for (const id of ['three-options', 'decision', 'worked-decision', 'approval', 'approval-example', 'failure-tests', 'recovery', 'memory', 'economics', 'brief']) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
 expect(html).toContain('PEAS design and test tutorial');
 expect(html).not.toContain('<strong>1. Prepare D-1</strong>');
 expect(html).not.toContain('FAQPage');
});

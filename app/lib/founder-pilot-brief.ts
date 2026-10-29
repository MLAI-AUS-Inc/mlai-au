import { EXAMPLE_FOUNDER_CAPACITY, founderCapacityText } from "./founder-capacity";

export const FOUNDER_PILOT_DOWNLOAD = "/downloads/founder-pilot-brief.txt";
export const PILOT_BRIEF = [
  "Prototype-to-pilot brief — replace with non-confidential facts",
  "Buyer / user / budget approver and decision to test:",
  "Current workflow, case volume and measured baseline:",
  "Deliverables / users / data / integrations included:",
  "Excluded actions and explicit human approvals:",
  "Acceptance cases, expected results and evidence owner:",
  "Customer dependencies, access and review availability:",
  "Milestones / fee / payment trigger / payment timing to agree:",
  "Running costs / payer / usage ceiling:",
  "Change requests / stop conditions / manual fallback:",
  "Source and configuration ownership / permitted reuse:",
  "Handover / support boundary / unresolved risks:",
  "Pilot decision: stop, revise, repeat or expand, and why:",
].join("\n");
export const CAPACITY_WORKSHEET = [
  "Founder delivery-capacity check — planning aid, not a revenue forecast",
  "Delivery window and immovable startup milestones:",
  "Real weekly hours available after existing commitments:",
  "Build + test + security review + meetings + deployment hours:",
  "Handover + support hours within and after the window:",
  "Contingency allowance and assumptions:",
  "Capacity remaining = available hours minus all delivery obligations:",
  "Fees expected / costs due / likely collection timing:",
  "Conflicts, client permissions and reuse restrictions:",
  "Decision: accept, reduce scope, defer or decline:",
].join("\n");

// This is a completed planning example, not a client engagement or tested system.
export const FOUNDER_PILOT_FIELDS = [
  { label: "Buyer, user and decision", value: "Fictional buyer: an operations lead. User: one weekly-report operator. Budget approver: the business owner. Test whether a review-only project summary is useful enough to justify a separate real-data assessment; do not promise time savings or a production rollout." },
  { label: "Workflow and baseline", value: "One weekly summary covering two projects and up to 12 supplied updates. Assume 45 minutes of manual preparation per summary for planning only; no baseline has been measured. Before judging value, the operator must time matched manual and pilot cases, including checking and correction, and record sample size and case difficulty." },
  { label: "Deliverable and input boundary", value: "One test workspace, one operator, synthetic JSON updates with workspaceId, projectId, updateId and text; no live integration. Deliver a review-only draft, source IDs beside each factual claim, visible conflicts/missing information, source/configuration, evaluation record and operator notes. Source-ID presence alone does not establish that a claim is supported." },
  { label: "Excluded actions", value: "No customer messages, external publication, status changes, other workspaces or real personal/customer data. The operator manually decides what to publish outside the pilot. Remove send/write credentials and verify the boundary; prompt instructions alone are not an access control." },
  { label: "Acceptance and owner", value: "Propose the eight cases below as a minimum starting set, all currently UNRUN. The founder implements and records results; the operations lead must agree expected outcomes and review failures; the owner decides acceptance. These roles are fictional and no reviewer is assigned. Passing eight cases would not establish general reliability or operating approval." },
  { label: "Dependencies and schedule", value: "Four proposed weeks: scope/fixture in week 1, review-only draft in week 2, failure testing in week 3, handover in week 4. Buyer supplies an approved synthetic fixture and two review slots before work starts. Dates, access and availability are unconfirmed. Preserve the founder's existing product release in week 2 and customer demonstration in week 4." },
  { label: "Fee and collection assumptions", value: "Illustrative A$1,800 fee excluding GST, not a quote or agreed rate. Propose A$900 invoiced after agreed scope/start authorisation, assumed collected in week 2, and A$900 after acceptance/handover, optimistically collected in week 4. Payment terms and calendar dates remain unagreed. Test late or absent receipts; acceptance and an invoice are not cash." },
  { label: "Costs, payer and usage stop", value: "Founder-paid hypothetical outlays: week 1 A$100 test infrastructure plus A$250 external-review allowance; weeks 2 and 3 A$100 provider usage each; week 4 A$150 external handover-review allowance. Total A$700 excluding GST. These are allowances, not vendor quotes or completed reviews. Paid external review is separate from the founder's own review hours. Propose a cumulative A$200 provider-usage cap; show a hard stop before an over-budget call. No live running-cost commitment is included; later cash flows are outside the worksheet." },
  { label: "Changes and stop conditions", value: "A new workspace, real data or send/write capability requires a new scope, risk review, estimate and explicit approval. Stop on a permission breach, unsupported factual claim, lost input or absent budget control. Keep original updates available and use the manual report. A failed case is a revise/stop decision, not an automatic new feature allowance." },
  { label: "Ownership and reuse", value: "Propose delivery of permitted source, configuration and operator notes to the buyer. Background code, third-party licences, ownership/licensing and reuse rights require an explicit agreement and appropriate advice. Do not assume client-funded work can become startup IP or a public portfolio. No reuse permission has been granted in this example." },
  { label: "Handover and support boundary", value: "Reserve four founder hours in week 4 for reproduction, disabling/fallback practice, documentation and bounded support. Propose two additional one-hour support slots in week 5 for reproducible defects within agreed scope, not feature changes or ongoing operation. No later hours are reserved yet. Owner acceptance, actual slot dates and support terms remain unconfirmed; legal obligations are not defined by this worksheet." },
  { label: "Current planning decision", value: "NOT READY TO COMMIT. The original plan needs 28 hours within four weeks but has only 24; weeks 1 and 2 are overloaded. Week-5 support needs two more hours with none reserved. Acceptance cases are unrun and terms unresolved. Reduce/resequence scope or negotiate a feasible schedule, reserve support and review cash timing before deciding to accept, defer or decline." },
] as const;

export const FOUNDER_PILOT_CASES = [
  { id: "P1", input: "Routine update: project A / U1 says milestone X is complete; project B / U2 says Y remains blocked.", expected: "Draft preserves both distinct statuses and their correct source IDs; operator can verify each claim. No invented deadline, customer or outcome." },
  { id: "P2", input: "Project A has no update; project B has one approved update.", expected: "Mark project A as missing information. Do not infer progress from silence. Retain the valid project B summary." },
  { id: "P3", input: "Two updates disagree about whether milestone X is complete, without an agreed precedence rule.", expected: "Surface the conflict and both source IDs for human resolution; do not silently choose a convenient status." },
  { id: "P4", input: "An update names an unapproved workspace or project.", expected: "Reject that input before model processing; it is absent from provider requests, draft and exported evidence. Show the operator a non-sensitive error." },
  { id: "P5", input: "An approved update contains an instruction to message customers or reveal another workspace.", expected: "Treat the instruction as untrusted content, retain the original task and demonstrate no send/write/other-workspace capability. Check action logs as well as draft text." },
  { id: "P6", input: "Provider times out or returns malformed output.", expected: "Show a clear failure and retain original inputs for the manual process; do not show an empty or partial draft as accepted success." },
  { id: "P7", input: "Repeat the same input/run request.", expected: "Do not duplicate source records or imply a second independent observation. Record any draft variation for review; no publication action occurs." },
  { id: "P8", input: "A next call would exceed the proposed cumulative A$200 provider cap.", expected: "Stop before the call using reserved cost bounds or provider-enforced limits. If a reliable ceiling cannot be implemented for the chosen service, the budget-control requirement fails." },
] as const;

export const FOUNDER_PILOT_DOWNLOAD_TEXT = [
  "MLAI prototype-to-paid-pilot brief — fictional planning example",
  "Version: founder-capacity-v3. Updated 10 September 2026.",
  "NOT a contract, quote, client case study or delivery approval. All figures are invented assumptions; no pilot was executed and every acceptance case is UNRUN.",
  "", "COMPLETED EXAMPLE", "",
  ...FOUNDER_PILOT_FIELDS.flatMap(field => [field.label.toUpperCase(), field.value, ""]),
  "PROPOSED ACCEPTANCE RECORD — ALL UNRUN", "",
  ...FOUNDER_PILOT_CASES.flatMap(item => [item.id, `Input: ${item.input}`, `Expected: ${item.expected}`, "Observed result: UNRUN", "Evidence / reviewer / date: NOT SUPPLIED", ""]),
  "EXAMPLE CAPACITY AND CASH ASSUMPTIONS", "",
  founderCapacityText(EXAMPLE_FOUNDER_CAPACITY, "Protected startup work: product release in week 2; customer demonstration in week 4. Buyer review slots and week-5 support dates are unconfirmed."),
  "", "BLANK BRIEF — REPLACE ASSUMPTIONS, DO NOT COPY THEM AS AGREED TERMS", "", PILOT_BRIEF,
  "", CAPACITY_WORKSHEET, "",
  "Sources checked 10 September 2026; they support planning/review principles, not the invented scope or prices:",
  "https://business.gov.au/people/contractors/prepare-a-contract",
  "https://business.gov.au/finance/cash-flow/set-up-a-cash-flow-statement",
  "https://docs.github.com/en/copilot/responsible-use/inline-suggestions",
  "", "Authorship: AI-assisted MLAI editorial planning aid; no independent delivery, financial or legal review is claimed.",
  "For binding terms, taxation, liability and jurisdiction-specific obligations, obtain appropriate professional advice.",
  "Article: https://mlai.au/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers", "",
].join("\n");

export const ACCELERATOR_FIT_CRITERIA = [
  { id: "outcome", shortLabel: "Support for your constraint", label: "Support matches our actual constraint", help: "Name the decision to change and evidence that this support can help.", essential: true },
  { id: "eligibility", shortLabel: "Eligibility", label: "Every eligibility requirement is met", help: "Check stage, geography, affiliation, sector, company status and founder commitment.", essential: true },
  { id: "terms", shortLabel: "Offer terms", label: "Complete terms are understood and acceptable", help: "Use actual documents: instrument, fees, rights, conditions and independent adviser questions.", essential: true },
  { id: "capacity", shortLabel: "Attendance and opportunity costs", label: "Attendance and opportunity costs are acceptable", help: "Include preparation, travel, sessions and displaced work; record unknown hours separately.", essential: true },
  { id: "access", shortLabel: "Relevant support and access", label: "Relevant support and access are substantiated", help: "Who helps, with what task and commitment? A mentor list is not guaranteed access.", essential: false },
  { id: "alumni", shortLabel: "Alumni evidence", label: "Relevant alumni evidence has been assessed", help: "Record stage, recruitment source, trade-offs and limits; no interview quota or causal success claim.", essential: false },
  { id: "alternatives", shortLabel: "Alternative comparison", label: "A specific alternative has been compared", help: "Compare the same time and resources with customer work, targeted advice or another path.", essential: false },
  { id: "decision", shortLabel: "Decision and review trigger", label: "A decision rule and review trigger are recorded", help: "What would make you apply, clarify, defer or decline? A complete checklist is not approval.", essential: false },
] as const;
export type AcceleratorFitId = typeof ACCELERATOR_FIT_CRITERIA[number]["id"];
export const ACCELERATOR_FIT_LABELS = { unknown: "Unknown", partial: "Partly supported", verified: "Supported (my evidence)", "not-met": "Not met / unacceptable" } as const;
export type AcceleratorFitStatus = keyof typeof ACCELERATOR_FIT_LABELS;
export type AcceleratorFitRecord = {
  provenance: "reader-entered" | "fictional-teaching-example";
  program: string; cohort: string; checkedOn: string; reviewTrigger: string; decisionNote: string;
  criteria: Record<AcceleratorFitId, { status: AcceleratorFitStatus; evidence: string }>;
};
export function emptyAcceleratorFit(): AcceleratorFitRecord {
  return { provenance: "reader-entered", program: "", cohort: "", checkedOn: "", reviewTrigger: "", decisionNote: "",
    criteria: Object.fromEntries(ACCELERATOR_FIT_CRITERIA.map(({ id }) => [id, { status: "unknown", evidence: "" }])) as AcceleratorFitRecord["criteria"] };
}
function evidenceStatus(record: AcceleratorFitRecord, id: AcceleratorFitId): AcceleratorFitStatus {
  const item = record.criteria[id];
  if (!item || !Object.hasOwn(ACCELERATOR_FIT_LABELS, item.status)) return "unknown";
  // Checking a box without a note must not count as supported evidence.
  return item.status === "verified" && !item.evidence.trim() ? "unknown" : item.status;
}
export function assessAcceleratorFit(record: AcceleratorFitRecord) {
  const verified = ACCELERATOR_FIT_CRITERIA.filter(c => evidenceStatus(record, c.id) === "verified");
  const mismatches = ACCELERATOR_FIT_CRITERIA.filter(c => evidenceStatus(record, c.id) === "not-met");
  const essentialUnknowns = ACCELERATOR_FIT_CRITERIA.filter(c => c.essential && evidenceStatus(record, c.id) !== "verified");
  const missingNotes = ACCELERATOR_FIT_CRITERIA.filter(c => record.criteria[c.id]?.status === "verified" && !record.criteria[c.id].evidence.trim());
  const state = mismatches.length ? "mismatch" : essentialUnknowns.length ? "clarify" : verified.length < ACCELERATOR_FIT_CRITERIA.length ? "incomplete" : "recorded";
  const labels = { mismatch: "Documented mismatch — resolve before treating this as a fit", clarify: "Clarify essential checks", incomplete: "Complete the remaining evidence", recorded: "Checklist recorded — the decision is still yours" };
  return { state, label: labels[state], verifiedCount: verified.length, mismatches, essentialUnknowns, missingNotes };
}

export const ACCELERATOR_FICTIONAL_RECORD: AcceleratorFitRecord = {
  provenance: "fictional-teaching-example", program: "Startmate — fictional HarbourBrief assessment", cohort: "Published 25 January–29 April 2027 dates; EOI route only observed",
  checkedOn: "10 September 2026 public source snapshot, not provider confirmation for this team",
  reviewTrigger: "Recheck the source by 17 September, and reconsider only if founder commitment and attendance change",
  decisionNote: "Defer under the stated assumptions. Neither founder will work on the startup full time, and three in-person weeks cannot be committed. Do not submit an application on the strength of the investment headline. Alternative: continue a bounded customer/data-access investigation within existing capacity; this investigation is not claimed as completed.",
  criteria: {
    outcome: { status: "partial", evidence: "HarbourBrief needs to learn whether quoting-workflow buyers will provide suitable data. Customer support is described, but access to this buyer has not been confirmed." },
    eligibility: { status: "not-met", evidence: "Fictional assumption: both Sydney founders keep full-time outside jobs. Startmate requires at least one co-founder working on the startup full time. Source: https://www.startmate.com/writing/startmate-accelerator-investment-terms-101" },
    terms: { status: "partial", evidence: "The public cash/cap headline was read. No actual offer documents or independent advice have been obtained; future ownership and obligations remain unassessed." },
    capacity: { status: "not-met", evidence: "Fictional founders cannot commit three in-person weeks. Planning arithmetic only: 2 founders × 4 hours × 12 weeks = 96 founder-hours, plus 8 application and 24 travel hours = 128. Actual required hours and cash costs are unknown; these are not provider estimates." },
    access: { status: "unknown", evidence: "No named mentor, customer access or availability confirmed for this team." },
    alumni: { status: "unknown", evidence: "No alumni contacted and no interviews or quotations claimed." },
    alternatives: { status: "verified", evidence: "Within the fictional scenario, the founders compared a smaller customer/data-access investigation with the programme commitment. No experiment results are invented." },
    decision: { status: "verified", evidence: "Defer until a founder can commit full time and the attendance/terms questions are resolved; then reassess against the actual offer." },
  },
};

export function formatAcceleratorFit(record: AcceleratorFitRecord): string {
  const result = assessAcceleratorFit(record);
  return [
    "MLAI ACCELERATOR EVIDENCE RECORD",
    record.provenance === "fictional-teaching-example" ? "FICTIONAL TEACHING EXAMPLE — edits do not make it a real interview, application or outcome." : "READER-ENTERED PLANNING RECORD — not independently verified.",
    "Editorial checklist, not an admission/success predictor or legal/financial advice. No application is submitted.",
    `Programme: ${record.program || "Not entered"}`, `Cohort: ${record.cohort || "Not entered"}`,
    `Source check: ${record.checkedOn || "Not entered"}`, `Review trigger: ${record.reviewTrigger || "Not entered"}`,
    `Evidence summary: ${result.verifiedCount} of 8 items supported by your entries. ${result.label}.`,
    ...ACCELERATOR_FIT_CRITERIA.flatMap(c => ["", c.label, `Status: ${ACCELERATOR_FIT_LABELS[evidenceStatus(record, c.id)]}`, `Evidence / URL / uncertainty: ${record.criteria[c.id]?.evidence.trim() || "Not recorded"}`]),
    "", `Decision / reason: ${record.decisionNote || "Not recorded"}`,
    "Use actual provider terms and appropriate independent advice. Keep private founder or alumni information out of shared copies.", "",
  ].join("\n");
}

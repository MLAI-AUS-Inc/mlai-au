export type FounderWeek = {
  available: number;
  build: number;
  review: number;
  coordination: number;
  handover: number;
  contingency: number;
  receipts: number;
  outlays: number;
};
export type FounderCapacityPlan = { weeks: FounderWeek[]; laterSupport: number; laterAvailable: number };
export const FOUNDER_CAPACITY_VERSION = "founder-capacity-v3";
export const FOUNDER_WEEK_FIELDS: { key: keyof FounderWeek; label: string; hint: string; money?: boolean }[] = [
  { key: "available", label: "Available hours", hint: "After protected startup work and existing commitments." },
  { key: "build", label: "Build hours", hint: "Implementation and integration—not the whole engagement." },
  { key: "review", label: "Test and security-review hours", hint: "Include corrections; avoid counting them again as build time." },
  { key: "coordination", label: "Coordination hours", hint: "Discovery, meetings, client review and administration." },
  { key: "handover", label: "Handover and support hours", hint: "Only work due in this week. Enter later support separately." },
  { key: "contingency", label: "Contingency hours", hint: "A reserve for uncertainty, not capacity you can promise twice." },
  { key: "receipts", label: "Expected receipts (A$)", hint: "When cash may arrive, not when you send the invoice. Not guaranteed income.", money: true },
  { key: "outlays", label: "Direct cash outlays (A$)", hint: "Expected project payments due this week; not your unpaid founder time.", money: true },
];
export const EXAMPLE_FOUNDER_CAPACITY: FounderCapacityPlan = {
  weeks: [
    { available: 6, build: 5, review: 2, coordination: 1, handover: 0, contingency: 1, receipts: 0, outlays: 350 },
    { available: 6, build: 4, review: 1, coordination: 1, handover: 0, contingency: 1, receipts: 900, outlays: 100 },
    { available: 6, build: 3, review: 1, coordination: 1, handover: 0, contingency: 1, receipts: 0, outlays: 100 },
    { available: 6, build: 0, review: 1, coordination: 0, handover: 4, contingency: 1, receipts: 900, outlays: 150 },
  ], laterSupport: 2, laterAvailable: 0,
};
const HOUR_FIELDS = ["build", "review", "coordination", "handover", "contingency"] as const;
const units = (value: number, max: number) => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > max || Math.abs(value * 100 - Math.round(value * 100)) > 1e-6) {
    throw new TypeError(`Use a non-negative number up to ${max}, with at most two decimal places.`);
  }
  return Math.round(value * 100);
};

export function calculateFounderCapacity(plan: FounderCapacityPlan) {
  if (!plan || Object.keys(plan).sort().join(",") !== "laterAvailable,laterSupport,weeks" ||
    !Array.isArray(plan.weeks) || plan.weeks.length < 1 || plan.weeks.length > 12) throw new TypeError("Use 1–12 complete weekly records and later support hours.");
  const laterSupport = units(plan.laterSupport, 1000), laterAvailable = units(plan.laterAvailable, 1000);
  let cash = 0, lowestCash = 0, availableTotal = 0, committedTotal = 0, receiptsTotal = 0, outlaysTotal = 0;
  const weeks = Array.from(plan.weeks, (week, index) => {
    if (!week || Object.keys(week).sort().join(",") !== FOUNDER_WEEK_FIELDS.map(field => field.key).sort().join(",")) throw new TypeError("Weekly fields are missing or unrecognised.");
    const available = units(week.available, 168);
    const committed = HOUR_FIELDS.reduce((sum, field) => sum + units(week[field], 168), 0);
    const receipts = units(week.receipts, 1_000_000), outlays = units(week.outlays, 1_000_000);
    const beforeReceipts = cash - outlays;
    lowestCash = Math.min(lowestCash, beforeReceipts);
    cash = beforeReceipts + receipts;
    availableTotal += available; committedTotal += committed; receiptsTotal += receipts; outlaysTotal += outlays;
    return { week: index + 1, available: available / 100, committed: committed / 100, balance: (available - committed) / 100,
      receipts: receipts / 100, outlays: outlays / 100, beforeReceipts: beforeReceipts / 100, cumulativeCash: cash / 100 };
  });
  return { weeks, available: availableTotal / 100, committed: committedTotal / 100,
    totalBalance: (availableTotal - committedTotal) / 100,
    shortWeeks: weeks.filter(week => week.balance < 0).map(week => week.week),
    laterSupportBalance: (laterAvailable - laterSupport) / 100,
    hasCapacityShortfall: weeks.some(week => week.balance < 0) || laterAvailable < laterSupport,
    receipts: receiptsTotal / 100, outlays: outlaysTotal / 100,
    netProjectCash: cash / 100, largestCashGap: Math.max(0, -lowestCash) / 100 };
}

export function founderCapacityText(plan: FounderCapacityPlan, notes = "") {
  if (typeof notes !== "string" || notes.length > 1500) throw new TypeError("Notes must be at most 1500 characters.");
  const result = calculateFounderCapacity(plan);
  return [
    "MLAI founder project capacity and cash timing — planning estimate, NOT approval",
    `Version: ${FOUNDER_CAPACITY_VERSION}. Currency: AUD; use one consistent GST basis. The fictional example excludes GST.`,
    "Initial on-page values are fictional. Edited figures are user assumptions, not independently verified results.",
    "Protected startup milestones / dependencies / scope notes:", notes || "Not supplied",
    "", ...plan.weeks.flatMap((week, index) => [
      `WEEK ${index + 1}`, ...FOUNDER_WEEK_FIELDS.map(field => `${field.label}: ${week[field.key].toFixed(2)}`),
      `Committed hours: ${result.weeks[index].committed.toFixed(2)}`,
      `Hours remaining: ${result.weeks[index].balance.toFixed(2)}`,
      `Project cash before receipts: ${result.weeks[index].beforeReceipts.toFixed(2)}`,
      `Cumulative project cash after receipts: ${result.weeks[index].cumulativeCash.toFixed(2)}`, "",
    ]),
    `Total available hours: ${result.available.toFixed(2)}; total obligations: ${result.committed.toFixed(2)}; balance: ${result.totalBalance.toFixed(2)}`,
    `Overloaded weeks: ${result.shortWeeks.join(", ") || "None in these inputs"}`,
    `Later support required: ${plan.laterSupport.toFixed(2)} hours; reserved: ${plan.laterAvailable.toFixed(2)}; balance: ${result.laterSupportBalance.toFixed(2)}`,
    `Capacity finding: ${result.hasCapacityShortfall ? "A weekly or later-support shortfall needs resolution" : "No arithmetic shortfall in these inputs; NOT an approval"}`,
    `Expected receipts: A$${result.receipts.toFixed(2)}; direct outlays: A$${result.outlays.toFixed(2)}`,
    `Net project cash in window: A$${result.netProjectCash.toFixed(2)}`,
    `Largest project cash gap, outlays before receipts: A$${result.largestCashGap.toFixed(2)}`,
    "", "Cash starts at zero and counts each week's outlays before its receipts. This is a project-only scenario, not your bank balance, profit or runway.",
    "Exclude double-counting; add all actual paid project labour to outlays. Founder time, taxes, overhead, financing, other commitments and after-window cash flows are not valued here.",
    "Weekly timing cannot reproduce exact daily payment order. Delay/remove expected receipts to test uncertainty; estimated fees are not cash received.",
    "Later support needs its own agreed dates, scope and reserved capacity. Spare later hours cannot repair an earlier missed deadline.",
    "Decision: accept, reduce scope, defer or decline — UNDECIDED until scope, capacity, cash timing and terms are reviewed.",
    "Scope / acceptance owner / evidence / permissions / commercial review: PENDING.",
    "No worksheet data is automatically sent to Studio. Apply separately with permitted work evidence and availability.",
  ].join("\n");
}

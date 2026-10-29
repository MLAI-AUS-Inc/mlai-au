import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import FounderCapacityWorksheet from "../app/components/articles/FounderCapacityWorksheet";
import { calculateFounderCapacity, EXAMPLE_FOUNDER_CAPACITY, founderCapacityText, type FounderCapacityPlan, type FounderWeek } from "../app/lib/founder-capacity";
import { FOUNDER_PILOT_CASES, FOUNDER_PILOT_FIELDS, FOUNDER_PILOT_DOWNLOAD, FOUNDER_PILOT_DOWNLOAD_TEXT } from "../app/lib/founder-pilot-brief";

const example = (): FounderCapacityPlan => structuredClone(EXAMPLE_FOUNDER_CAPACITY);
const zeroWeek = (): FounderWeek => ({ available: 0, build: 0, review: 0, coordination: 0, handover: 0, contingency: 0, receipts: 0, outlays: 0 });

test("fictional example distinguishes weekly overload, later support and outlays-before-receipts cash", () => {
  const r = calculateFounderCapacity(example());
  expect(r.available).toBe(24); expect(r.committed).toBe(28); expect(r.totalBalance).toBe(-4);
  expect(r.weeks.map(w => w.committed)).toEqual([9, 7, 6, 6]);
  expect(r.weeks.map(w => w.balance)).toEqual([-3, -1, 0, 0]);
  expect(r.shortWeeks).toEqual([1, 2]); expect(r.laterSupportBalance).toBe(-2);
  expect(r.hasCapacityShortfall).toBe(true);
  expect(r.receipts).toBe(1800); expect(r.outlays).toBe(700); expect(r.netProjectCash).toBe(1100);
  expect(r.weeks.map(w => w.beforeReceipts)).toEqual([-350, -450, 350, 200]);
  expect(r.weeks.map(w => w.cumulativeCash)).toEqual([-350, 450, 350, 1100]);
  expect(r.largestCashGap).toBe(450);
});

test("balanced total hours do not conceal an overloaded first week", () => {
  const plan = example(); plan.weeks.forEach(w => w.available = 7); plan.laterAvailable = 2;
  const r = calculateFounderCapacity(plan);
  expect(r.totalBalance).toBe(0); expect(r.shortWeeks).toEqual([1]); expect(r.hasCapacityShortfall).toBe(true);
});

test("later capacity cannot fix earlier deadlines and in-window capacity cannot cover later support", () => {
  const plan = example(); plan.laterAvailable = 100;
  expect(calculateFounderCapacity(plan).hasCapacityShortfall).toBe(true);
  plan.weeks.forEach(w => w.available = 10); plan.laterAvailable = 0;
  expect(calculateFounderCapacity(plan).shortWeeks).toEqual([]);
  expect(calculateFounderCapacity(plan).hasCapacityShortfall).toBe(true);
  plan.laterAvailable = 2;
  expect(calculateFounderCapacity(plan).hasCapacityShortfall).toBe(false);
  expect(founderCapacityText(plan)).toContain("NOT an approval");
});

test("late receipts can increase the gap with no change in total fee or closing cash", () => {
  const plan = example(); plan.weeks[1].receipts = 0; plan.weeks[3].receipts = 1800;
  const r = calculateFounderCapacity(plan);
  expect(r.receipts).toBe(1800); expect(r.netProjectCash).toBe(1100); expect(r.largestCashGap).toBe(700);
});

test("absent receipts retain negative cash and same-week receipts do not erase the preceding outlay", () => {
  const plan = example(); plan.weeks.forEach(w => w.receipts = 0);
  expect(calculateFounderCapacity(plan).netProjectCash).toBe(-700);
  expect(calculateFounderCapacity(plan).largestCashGap).toBe(700);
  const one = { weeks: [{ ...zeroWeek(), receipts: 100, outlays: 40 }], laterSupport: 0, laterAvailable: 0 };
  expect(calculateFounderCapacity(one).netProjectCash).toBe(60);
  expect(calculateFounderCapacity(one).largestCashGap).toBe(40);
});

test("integer hundredths avoid accumulating floating-point drift or negative-zero gaps", () => {
  const plan = { weeks: [{ ...zeroWeek(), available: 0.3, build: 0.1, review: 0.2, receipts: 0.3, outlays: 0.1 }, { ...zeroWeek(), outlays: 0.2 }], laterSupport: 0.3, laterAvailable: 0.3 };
  const r = calculateFounderCapacity(plan);
  expect(r.totalBalance).toBe(0); expect(r.netProjectCash).toBe(0); expect(r.hasCapacityShortfall).toBe(false);
  expect(r.receipts).toBe(0.3); expect(r.outlays).toBe(0.3); expect(r.largestCashGap).toBe(0.1);
  expect(Object.is(calculateFounderCapacity({ weeks: [zeroWeek()], laterSupport: 0, laterAvailable: 0 }).largestCashGap, -0)).toBe(false);
});

for (const [label, invalid] of [["negative", -1], ["NaN", NaN], ["infinite", Infinity], ["too precise", 1.001], ["text", "6"], ["null", null], ["missing", undefined]] as const) {
  test(`rejects ${label} input without coercion in every numeric field`, () => {
    for (const field of Object.keys(zeroWeek())) {
      const plan = example(); (plan.weeks[0] as unknown as Record<string, unknown>)[field] = invalid;
      expect(() => calculateFounderCapacity(plan), field).toThrow();
    }
    for (const field of ["laterSupport", "laterAvailable"]) {
      const plan = example(); (plan as unknown as Record<string, unknown>)[field] = invalid;
      expect(() => calculateFounderCapacity(plan), field).toThrow();
    }
  });
}

test("complete finite bounded records only; no sparse arrays or silent extra fields", () => {
  for (const weeks of [[], Array.from({ length: 13 }, zeroWeek), new Array(4), [zeroWeek(), null]]) expect(() => calculateFounderCapacity({ weeks, laterSupport: 0, laterAvailable: 0 } as FounderCapacityPlan)).toThrow();
  for (const invalid of [null, {}, { ...example(), laterAvailable: undefined }, { ...example(), automaticApproval: true }]) expect(() => calculateFounderCapacity(invalid as FounderCapacityPlan)).toThrow();
  const extra = example(); Object.assign(extra.weeks[0], { ignoredCost: 99 });
  expect(() => calculateFounderCapacity(extra)).toThrow();
  const missing = example(); delete (missing.weeks[0] as Partial<FounderWeek>).receipts;
  expect(() => calculateFounderCapacity(missing)).toThrow();
  for (const field of Object.keys(zeroWeek()) as (keyof FounderWeek)[]) {
    const plan = example(); plan.weeks[0][field] = ["receipts", "outlays"].includes(field) ? 1_000_000.01 : 168.01;
    expect(() => calculateFounderCapacity(plan)).toThrow();
  }
  expect(() => calculateFounderCapacity({ ...example(), laterSupport: 1000.01 })).toThrow();
  expect(() => calculateFounderCapacity({ ...example(), laterAvailable: 1000.01 })).toThrow();
  expect(() => calculateFounderCapacity({ weeks: Array.from({ length: 12 }, zeroWeek), laterSupport: 1000, laterAvailable: 1000 })).not.toThrow();
});

test("calculation and export do not mutate inputs, and export includes each assumption and unresolved decision", () => {
  const plan = example(), before = JSON.stringify(plan);
  const text = founderCapacityText(plan, "Protect week 2; no confidential data.");
  expect(JSON.stringify(plan)).toBe(before);
  for (const marker of ["Protect week 2", "Build hours: 5.00", "Expected receipts (A$): 900.00", "Direct cash outlays (A$): 350.00", "Overloaded weeks: 1, 2", "Largest project cash gap, outlays before receipts: A$450.00", "Later support required: 2.00 hours; reserved: 0.00", "not your bank balance, profit or runway", "outlays before", "after-window cash flows", "UNDECIDED", "PENDING", "No worksheet data is automatically sent to Studio"]) expect(text).toContain(marker);
  expect(() => founderCapacityText(plan, "x".repeat(1501))).toThrow();
  expect(() => founderCapacityText(plan, null as unknown as string)).toThrow();
  expect(founderCapacityText(plan, "x".repeat(1500))).toContain("x".repeat(1500));
});

test("completed pilot and downloadable record share every field, case and capacity input", async () => {
  const saved = await Bun.file("public" + FOUNDER_PILOT_DOWNLOAD).text();
  expect(saved).toBe(FOUNDER_PILOT_DOWNLOAD_TEXT);
  expect(FOUNDER_PILOT_FIELDS).toHaveLength(12); expect(FOUNDER_PILOT_CASES).toHaveLength(8);
  for (const field of FOUNDER_PILOT_FIELDS) expect(saved).toContain(field.value);
  for (const item of FOUNDER_PILOT_CASES) { expect(saved).toContain(item.input); expect(saved).toContain(item.expected); }
  expect(saved.match(/Observed result: UNRUN/g)).toHaveLength(8);
  for (const marker of ["no baseline has been measured", "NOT READY TO COMMIT", "No reuse permission", "Version: founder-capacity-v3"]) expect(saved).toContain(marker);
});

test("SSR delivers useful values, labels, privacy boundary and copy fallback", () => {
  const html = renderToStaticMarkup(<FounderCapacityWorksheet />);
  for (const marker of ["Resolve the capacity shortfall before committing", "24.00 / 28.00", "450.00", "1,100.00", "Week 1 Available hours", "Week 4 Expected receipts (A$)", "Support hours required after week 4", "data-clarity-mask", "aria-live=\"polite\"", "tabindex=\"0\"", "View or copy my worksheet", "not attached", "lost on refresh"]) expect(html).toContain(marker);
  expect(html.match(/type="number"/g)).toHaveLength(34);
  expect(html).not.toContain("<form");
});

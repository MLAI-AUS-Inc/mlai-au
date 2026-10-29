import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { readFileSync } from "node:fs";
import { acceleratorIntakeNotice, acceleratorProgramPhase, acceleratorReadDay, acceleratorReviewState } from "../app/lib/accelerator-intake";
import { AUSTRALIAN_ACCELERATOR_PROGRAMS } from "../app/lib/australian-accelerator-programs";
import AcceleratorIntakeNotice from "../app/components/articles/AcceleratorIntakeNotice";
import { ArticleReadTime } from "../app/components/articles/ArticleReadTime";
import * as Article from "../app/articles/content/featured/startup-accelerator-australia";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { ACCELERATOR_FICTIONAL_RECORD, ACCELERATOR_FIT_CRITERIA, assessAcceleratorFit, emptyAcceleratorFit, formatAcceleratorFit } from "../app/lib/accelerator-fit";

const source = AUSTRALIAN_ACCELERATOR_PROGRAMS[0];
test("missing or invalid dates do not create an availability claim", () => {
  for (const date of [null, "", "2026-02-30", "wrong", "2026-09-08"]) {
    expect(acceleratorIntakeNotice(source, date)).toContain("Dated source snapshot");
  }
});
test("the explicit source-review boundary expires and a deadline never implies still open", () => {
  expect(acceleratorReviewState(source, "2026-10-29")).toBe("fresh");
  expect(acceleratorReviewState(source, "2026-10-30")).toBe("needs-review");
  expect(acceleratorIntakeNotice(source, "2026-10-30")).toContain("unverified");
  expect(acceleratorIntakeNotice(source, "2026-11-01")).toContain("exact time and timezone");
  expect(acceleratorIntakeNotice(source, "2026-11-02")).toContain("deadline has passed");
});
test("CSIRO preserves the historic deadline separately from the refreshed closed snapshot", () => {
  const csiro = AUSTRALIAN_ACCELERATOR_PROGRAMS.find(row => row.name === "CSIRO ON Accelerate")!;
  expect(csiro.currentIntake).toContain("applications are closed");
  expect(csiro.intakeVerifiedAt).toBe("2026-10-29");
  expect(csiro.sourceLimit).toContain("31 August");
  expect(acceleratorIntakeNotice(csiro, "2026-10-29")).toContain("applications closed");
  expect(renderToStaticMarkup(<AcceleratorIntakeNotice program={csiro} />)).toContain("Dated source snapshot");
});

const program = (id: string) => AUSTRALIAN_ACCELERATOR_PROGRAMS.find(p => p.id === id)!;
test("all seven source records have explicit review ownership dates and distinct intake kinds", () => {
  expect(AUSTRALIAN_ACCELERATOR_PROGRAMS).toHaveLength(7);
  expect(new Set(AUSTRALIAN_ACCELERATOR_PROGRAMS.map(p => p.id)).size).toBe(7);
  for (const p of AUSTRALIAN_ACCELERATOR_PROGRAMS) {
    expect(p.lastVerified).toBe("2026-10-29"); expect(p.previousFullCheck).toBe("2026-09-10");
    expect(acceleratorReviewState(p, "2026-10-29")).toBe("fresh");
    expect(acceleratorReviewState(p, "2026-10-30")).toBe("needs-review");
  }
  expect(program("unsw").currentIntake).toContain("No dated 2027 intake");
  expect(program("map").duration).toContain("No duration stated");
  expect(program("map").sourceLimit).toContain("Key Dates banner");
  expect(program("antler").eligibilitySignal).toContain("does not invest in solo founders");
});
test("programme phase is independent of the application deadline and does not prove actual activity", () => {
  const google = program("google-anz"), unsw = { ...program("unsw"), lastVerified: "2026-09-10", intakeVerifiedAt: "2026-09-10" };
  expect(acceleratorIntakeNotice(google, "2026-10-29")).toContain("deadline has passed");
  expect(acceleratorProgramPhase(google, "2026-10-29")).toContain("start has passed");
  expect(acceleratorProgramPhase(unsw, "2026-09-10")).toContain("Within published");
  expect(acceleratorProgramPhase(unsw, "2026-10-07")).toContain("end date is today");
  expect(acceleratorProgramPhase(unsw, "2026-10-08")).toContain("window has passed");
  expect(acceleratorProgramPhase(program("antler"), "2026-10-29")).toContain("recurring cadence is not the next cohort");
});
test("EOIs, an Apply link and a reached future opening never imply applications are open", () => {
  expect(acceleratorIntakeNotice({ ...source, intakeKind: "expression-of-interest" }, "2026-10-29")).toContain("Expression-of-interest route");
  expect(source.intakeKind).toBe("application-link");
  expect(source.intakeClosesOn).toBe("2026-11-01");
  expect(source.currentIntake).toContain("11:59 pm AEDT");
  expect(acceleratorIntakeNotice(program("antler"), "2026-10-29")).toContain("Application link observed");
  expect(acceleratorIntakeNotice(program("map"), "2026-10-29")).toContain("No dated application window verified");
  expect(acceleratorIntakeNotice(program("energylab"), "2026-10-29")).toContain("future published date");
  const renewed = { ...program("energylab"), intakeVerifiedAt: "2027-01-10", reviewAfter: "2027-01-17" };
  expect(acceleratorIntakeNotice(renewed, "2027-01-11")).toContain("date alone does not establish it is open");
});
test("invalid source dates, chronology and intake kind fail closed", () => {
  for (const patch of [{ reviewAfter: "2026-02-30" }, { reviewAfter: source.lastVerified }, { programEndsOn: "2026-01-01" }, { intakeOpensOn: "2027-01-01" }, { lastVerified: "2026-10-31" }, { intakeClosesOn: "" }, { intakeKind: "invented" as never }]) {
    expect(acceleratorReviewState({ ...source, ...patch }, "2026-10-29")).toBe("unknown");
    expect(acceleratorIntakeNotice({ ...source, ...patch }, "2026-10-29")).toContain("cannot be established");
  }
});
test("reader day respects Sydney midnight and daylight-saving time without inventing deadline hours", () => {
  expect(acceleratorReadDay(Date.parse("2026-09-16T13:59:59Z"))).toBe("2026-09-16");
  expect(acceleratorReadDay(Date.parse("2026-09-16T14:00:00Z"))).toBe("2026-09-17");
  expect(acceleratorReadDay(Date.parse("2026-10-04T13:00:00Z"))).toBe("2026-10-05");
  for (const time of [null, NaN, Infinity, 1e20]) expect(acceleratorReadDay(time)).toBeNull();
});
test("server response has reader-time status, aligned metadata, complete source cards and no-script fallback", () => {
  const html = renderToStaticMarkup(<MemoryRouter><ArticleReadTime.Provider value="2026-10-29T07:05:00Z"><Article.default /></ArticleReadTime.Provider></MemoryRouter>);
  expect(html.match(/data-accelerator-program=/g)).toHaveLength(7);
  expect(html.match(/data-review-state="fresh"/g)).toHaveLength(7);
  expect(html).toContain("Published programme start has passed");
  expect(html).toContain('data-clarity-mask="true"');
  expect(html).toContain("Interactive editing requires JavaScript");
  expect(html).toContain('<fieldset disabled=""');
  expect(html).toContain('data-article-icp="COMMUNITY"');
  expect(html).toContain('href="/founder-tools/start"');
  expect(html).not.toContain('href="/mlai-studio#apply"');
  const entry = ARTICLE_REGISTRY["featured/" + Article.SLUG];
  expect(entry.date).toBe(Article.DATE_PUBLISHED);
  expect(entry.dateModified).toBe(Article.DATE_MODIFIED);
  expect(entry.description).toBe(Article.DESCRIPTION);
  expect(entry.imageAlt).toBe(Article.articleMeta.imageAlt);
});
test("expired source state applies across all seven rendered records", () => {
  const html = renderToStaticMarkup(<MemoryRouter><ArticleReadTime.Provider value="2026-10-29T13:00:00Z"><Article.default /></ArticleReadTime.Provider></MemoryRouter>);
  expect(html.match(/data-review-state="needs-review"/g)).toHaveLength(7);
  expect(html).not.toContain('data-review-state="fresh"');
});
const supported = () => {
  const record = emptyAcceleratorFit();
  for (const { id } of ACCELERATOR_FIT_CRITERIA) record.criteria[id] = { status: "verified", evidence: "Synthetic unit-test evidence note, not real approval." };
  return record;
};
test("a known failure cannot be outweighed by seven supported checks", () => {
  for (const { id } of ACCELERATOR_FIT_CRITERIA) {
    const record = supported(); record.criteria[id].status = "not-met";
    const result = assessAcceleratorFit(record);
    expect(result.verifiedCount).toBe(7); expect(result.state).toBe("mismatch"); expect(result.mismatches[0].id).toBe(id);
  }
});
test("essential unknowns stay visible and ticked boxes require evidence notes", () => {
  const record = supported(); record.criteria.eligibility.status = "unknown";
  expect(assessAcceleratorFit(record).state).toBe("clarify");
  record.criteria.eligibility.status = "verified"; record.criteria.eligibility.evidence = "  ";
  expect(assessAcceleratorFit(record).verifiedCount).toBe(7);
  expect(assessAcceleratorFit(record).missingNotes[0].id).toBe("eligibility");
  record.criteria.eligibility.evidence = "Synthetic support"; record.criteria.alumni.status = "unknown";
  expect(assessAcceleratorFit(record).state).toBe("incomplete");
  expect(assessAcceleratorFit(supported()).label).toContain("decision is still yours");
});
test("fictional example, real download and blank record agree without fabricated interviews", () => {
  const file = readFileSync("public/downloads/accelerator-decision/evidence-worksheet.txt", "utf8");
  expect(file).toContain(formatAcceleratorFit(ACCELERATOR_FICTIONAL_RECORD));
  expect(file).toContain(formatAcceleratorFit(emptyAcceleratorFit()));
  const example = structuredClone(ACCELERATOR_FICTIONAL_RECORD);
  expect(assessAcceleratorFit(example).state).toBe("mismatch"); expect(assessAcceleratorFit(example).verifiedCount).toBe(2);
  example.program = "My edited example";
  expect(formatAcceleratorFit(example)).toContain("FICTIONAL TEACHING EXAMPLE");
  expect(formatAcceleratorFit(example)).toContain("No alumni contacted");
  expect(formatAcceleratorFit(example)).toContain("128");
  expect(2 * 4 * 12 + 8 + 24).toBe(128);
});
test("worksheet instances do not share input or assessment state", () => {
  const a = emptyAcceleratorFit(), b = emptyAcceleratorFit();
  a.criteria.eligibility.status = "not-met";
  expect(b.criteria.eligibility.status).toBe("unknown");
  const before = JSON.stringify(a); assessAcceleratorFit(a); formatAcceleratorFit(a);
  expect(JSON.stringify(a)).toBe(before);
});

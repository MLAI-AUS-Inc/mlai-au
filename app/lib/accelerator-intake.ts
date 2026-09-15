import type { AustralianAcceleratorProgram } from "./australian-accelerator-programs";

function day(value: string | null | undefined): number | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const ms = Date.parse(value + "T00:00:00Z");
  return Number.isFinite(ms) && new Date(ms).toISOString().slice(0, 10) === value ? ms : null;
}

export function acceleratorReadDay(now: number | null): string | null {
  if (now === null || !Number.isFinite(now) || !Number.isFinite(new Date(now).getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Sydney", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function acceleratorReviewState(program: AustralianAcceleratorProgram, asOf: string | null): "snapshot" | "unknown" | "fresh" | "needs-review" {
  const checked = day(program.intakeVerifiedAt ?? program.lastVerified), fullCheck = day(program.lastVerified), due = day(program.reviewAfter);
  if (checked === null || fullCheck === null || due === null || due <= checked || due <= fullCheck || !["closed", "expression-of-interest", "application-link", "not-stated"].includes(program.intakeKind)) return "unknown";
  for (const value of [program.intakeOpensOn, program.intakeClosesOn, program.programStartsOn, program.programEndsOn]) {
    if (value !== undefined && day(value) === null) return "unknown";
  }
  if (program.programEndsOn && (!program.programStartsOn || day(program.programEndsOn)! < day(program.programStartsOn)!)) return "unknown";
  if (program.intakeOpensOn && program.intakeClosesOn && day(program.intakeClosesOn)! < day(program.intakeOpensOn)!) return "unknown";
  if (asOf === null) return "snapshot";
  const now = day(asOf);
  if (now === null || checked > now || fullCheck > now) return "unknown";
  return now >= due ? "needs-review" : "fresh";
}

export function acceleratorIntakeNotice(program: AustralianAcceleratorProgram, asOf: string | null): string {
  const state = acceleratorReviewState(program, asOf);
  if (state === "snapshot" || state === "unknown") return "Dated source snapshot — current intake cannot be established from this clock or record.";
  const now = day(asOf)!;
  const closes = day(program.intakeClosesOn), opens = day(program.intakeOpensOn);
  if (closes !== null && now > closes) return "Recorded application deadline has passed. An expression of interest does not reopen that round; check for a new intake.";
  if (closes === now) return "Recorded deadline is today — confirm the exact time and timezone with the provider; do not assume it is still open.";
  if (state === "needs-review") return "Source review overdue — current intake is unverified. A link or future date is not an open application.";
  if (opens !== null && now < opens) return "Next opening is a future published date, not an application available now. An expression of interest is separate.";
  if (opens !== null && now >= opens) return "The listed opening date has arrived — recheck the actual application status; the date alone does not establish it is open.";
  switch (program.intakeKind) {
    case "closed": return "Provider reported applications closed at the source check. A next round is not confirmed.";
    case "expression-of-interest": return "Expression-of-interest route observed — not a confirmed application, acceptance or place.";
    case "application-link": return "Application link observed — the dated intake, eligibility and acceptance remain unverified.";
    default: return "No dated application window verified — ask the provider before preparing an application.";
  }
}

export function acceleratorProgramPhase(program: AustralianAcceleratorProgram, asOf: string | null): string {
  const state = acceleratorReviewState(program, asOf), now = day(asOf);
  if (state === "unknown" || state === "snapshot" || now === null) return "Programme phase is unverified.";
  const start = day(program.programStartsOn), end = day(program.programEndsOn);
  if (start === null) return "No exact cohort window verified; a recurring cadence is not the next cohort.";
  if (now < start) return "Future programme start listed — not an open intake or confirmed attendance.";
  if (end !== null && now > end) return "Published programme window has passed — no later cohort is implied.";
  if (end !== null && now === end) return "Published programme end date is today; exact end time is unverified.";
  if (end !== null) return "Within published programme dates — actual activity is not independently confirmed.";
  return "Published programme start has passed; exact finish and actual phase need confirmation.";
}

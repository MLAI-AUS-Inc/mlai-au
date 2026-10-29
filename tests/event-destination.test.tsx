import { expect, test } from "bun:test";
import { compareEventStarts, eventCalendarDate, formatEventStart } from "../app/lib/event-display";

test("civil-day conversion handles mixed zones, month boundaries and DST independently of the runtime", () => {
  expect(eventCalendarDate("2026-09-30T23:30:00Z", "Australia/Melbourne")?.key).toBe("2026-10-01");
  expect(eventCalendarDate("2026-09-30T23:30:00Z", "America/Los_Angeles")?.key).toBe("2026-09-30");
  expect(eventCalendarDate("2026-12-31T12:00:00Z", "Pacific/Auckland")?.key).toBe("2027-01-01");
  expect(formatEventStart("2026-10-03T15:30:00Z", "Australia/Melbourne").time).toContain("1:30 am AEST");
  expect(formatEventStart("2026-10-03T16:30:00Z", "Australia/Melbourne").time).toContain("3:30 am AEDT");
  expect(formatEventStart("2026-10-14T06:00:00Z", "Australia/Melbourne").time).toContain("5:00 pm AEDT");
});

test("invalid or ambiguous instants stay unknown; bad timezone alone falls back to labelled UTC", () => {
  for (const value of ["", "not-a-date", "2026-09-15", "2026-09-15T17:30:00", "2026-02-30T12:00:00Z", "2026-13-01T12:00:00Z"]) {
    expect(eventCalendarDate(value, "Australia/Melbourne")).toBeNull();
    expect(formatEventStart(value, "Australia/Melbourne").valid).toBe(false);
  }
  expect(eventCalendarDate("2028-02-29T12:00:00Z", "UTC")?.key).toBe("2028-02-29");
  expect(formatEventStart("2026-09-15T07:30:00+00:00", "Bad/Zone").time).toContain("UTC");
});

test("article event ordering puts valid instants before ambiguous starts", () => {
  const starts = ["2026-09-30T23:45:00", "2026-10-01T00:00:00Z", "2026-09-30T23:30:00Z", "bad-date"];
  expect(starts.slice().sort(compareEventStarts)).toEqual([starts[2], starts[1], starts[0], starts[3]]);
  expect(compareEventStarts("", "bad-date")).toBe(0);
});

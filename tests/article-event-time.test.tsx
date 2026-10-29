import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { formatEventStart } from "../app/lib/event-display";
import { eventFixture } from "./fixtures/events";
import UpcomingEventsCTA from "../app/components/articles/UpcomingEventsCTA";

describe("event timezone data and article rendering", () => {
  test("renders the supplied organiser timezone in article event cards", () => {
    const event = eventFixture({ name: "AI session" });
    expect(event.timezone).toBe("Australia/Melbourne");
    const start = formatEventStart(event.startDate, event.timezone);
    expect(start.time).toContain("5:30");
    expect(start.time).toContain("AEST");
    const html = renderToStaticMarkup(<MemoryRouter><UpcomingEventsCTA events={[event]} /></MemoryRouter>);
    expect(html).toContain(start.time);
    expect(html).toContain('title="Australia/Melbourne"');
  });
  test("applies daylight saving and date rollover in the supplied zone", () => {
    expect(formatEventStart("2026-12-15T07:30:00Z", "Australia/Melbourne").time).toContain("6:30");
    expect(formatEventStart("2026-12-15T07:30:00Z", "Australia/Melbourne").time).toContain("AEDT");
    expect(formatEventStart("2026-09-15T23:30:00Z", "Pacific/Auckland").date).toMatch(/16 Sep/);
  });
  test("missing or invalid zones explicitly fall back to UTC, not host-local time", () => {
    for (const zone of [undefined, "", "Not/AZone"]) {
      const result = formatEventStart("2026-09-15T07:30:00Z", zone);
      expect(result.timeZone).toBe("UTC");
      expect(result.time).toContain("7:30");
      expect(result.time).toContain("UTC");
    }
  });
  test("invalid dates do not crash a whole article", () => {
    expect(formatEventStart("not-a-date").date).toBe("Date to be confirmed");
  });
});

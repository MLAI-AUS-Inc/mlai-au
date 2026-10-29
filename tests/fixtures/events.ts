import type { Event } from "../../app/lib/events";

/** Synthetic public Event input; UI tests must not depend on a private API mapper. */
export function eventFixture(overrides: Partial<Event> = {}): Event {
  return {
    _id: "fixture", name: "Synthetic event, not a live offer",
    startDate: "2026-09-15T07:30:00Z", timezone: "Australia/Melbourne",
    eventLocation: { address: "" }, slug: "fixture", published: true,
    source: "luma", url: "https://luma.com/example", ...overrides,
  };
}

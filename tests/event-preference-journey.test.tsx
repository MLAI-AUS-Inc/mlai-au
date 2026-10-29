import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup, renderToReadableStream } from "react-dom/server";
import { MemoryRouter, createMemoryRouter, RouterProvider } from "react-router";
import { parseEventPreference, withEventPreference, eventCalendarHref, isEventCalendarHref } from "../app/lib/event-preference";
import { parseArticleAttribution, matchArticleCompletion } from "../app/lib/article-conversions";
import { ArticleReadTime } from "../app/components/articles/ArticleReadTime";
import UpcomingEventsCTA from "../app/components/articles/UpcomingEventsCTA";
import EventFormatPreference from "../app/components/EventFormatPreference";
import MelbourneArticle from "../app/articles/content/featured/where-to-find-ai-events-in-melbourne";
import type { Event } from "../app/lib/events";
import EventsCalendarPage from "../app/routes/events";

const time = "2026-10-29T11:06:00Z";
const now = Date.parse(time);
const render = (node: React.ReactNode, path = "/events") => renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><ArticleReadTime.Provider value={time}>{node}</ArticleReadTime.Provider></MemoryRouter>);
const fixtureEvent = (id: string, startDate = time): Event => ({
  _id: id, name: `Synthetic unknown-format event ${id}`, startDate,
  timezone: "Australia/Melbourne", eventLocation: { address: "" },
  slug: id, published: true, source: "luma", url: `https://luma.com/${id}`,
});

test("only one explicitly supported preference is accepted", () => {
  for (const value of ["online", "melbourne", "sydney"]) expect(parseEventPreference(new URLSearchParams({ event_format: value }))).toBe(value);
  for (const query of ["", "event_format=all", "event_format=ONLINE", "event_format=in-person", "event_format=online&event_format=melbourne", "event_format=online&event_format=online", "event_format=%2F%2Fevil.test", "event_format=%3Cscript%3E", "format=online"]) expect(parseEventPreference(new URLSearchParams(query))).toBe("all");
});

test("article preference updates preserve other parameters without mutating the source", () => {
  const source = new URLSearchParams("cfInspector=1&event_format=bad&event_format=online&campaign=guide");
  const selected = withEventPreference(source, "melbourne");
  expect(selected.toString()).toBe("cfInspector=1&campaign=guide&event_format=melbourne");
  expect(source.getAll("event_format")).toHaveLength(2);
  expect(withEventPreference(selected, "all").toString()).toBe("cfInspector=1&campaign=guide");
});

test("calendar destinations cannot carry arbitrary input, article inspector state or redirects", () => {
  expect(eventCalendarHref("all")).toBe("/events");
  for (const preference of ["online", "melbourne", "sydney"] as const) {
    expect(eventCalendarHref(preference)).toBe(`/events?event_format=${preference}`);
    expect(isEventCalendarHref(eventCalendarHref(preference))).toBe(true);
  }
  for (const value of ["/events?event_format=all", "/events?event_format=online&next=https://evil.test", "/events#online", "//evil.test/events", "/events?event_format=online&event_format=online", "/events?email=synthetic@example.test"]) expect(isEventCalendarHref(value)).toBe(false);
});

test("the article server-rendered selection and primary CTA agree", () => {
  const html = render(<MelbourneArticle />, "/articles/featured/where-to-find-ai-events-in-melbourne?event_format=online");
  expect(html).toContain('<option value="online" selected="">Online options</option>');
  expect(html).toContain('href="/events?event_format=online"');
  expect(html).toContain("your preference is not a reservation");
});

test("shared calendar CTA carries only the supported preference with and without event cards", () => {
  const event = fixtureEvent("fixture");
  for (const preference of ["online", "melbourne", "sydney"] as const) for (const events of [[], [event]]) {
    const html = render(<UpcomingEventsCTA events={events} />, `/articles/fixture?cfInspector=1&event_format=${preference}`);
    expect(html).toContain(`href="${eventCalendarHref(preference)}"`);
    expect(html).not.toContain('href="/events"');
    expect(html).not.toContain("cfInspector");
    if (events.length) {
      expect(html).toContain('href="https://luma.com/fixture"');
      expect(html).not.toContain('href="https://luma.com/fixture?');
    }
  }
});

test("destination retains preference in a native form and explains the unfiltered calendar", () => {
  for (const [preference, label] of [["online", "Online options"], ["melbourne", "Melbourne in person"], ["sydney", "Sydney in person"]]) {
    const html = render(<EventFormatPreference />, `/events?event_format=${preference}`);
    expect(html).toContain(`<option value="${preference}" selected="">${label}</option>`);
    const form = html.match(/<form\b[^>]*>/)?.[0];
    expect(form).toContain('method="get"');
    expect(form).toContain('action="/events"');
    expect(html).toContain(`Selected: ${label}`);
    expect(html).toContain("The full calendar below is not filtered by format");
    expect(html).toContain("confirm location, online ticket choices, availability and admission");
    expect(html).not.toContain("data-format-option");
  }
  expect(render(<EventFormatPreference />, "/events?event_format=invalid")).toContain("Selected: All formats");
});

test("attribution accepts only controlled preference links and still refuses unrelated completion credit", () => {
  const click = { articleSlug: "featured/example", ctaType: "events", placement: "article-inline", primaryIcp: "COMMUNITY", version: "test-v1", clickedAt: time };
  for (const preference of ["all", "melbourne", "sydney", "online"] as const) {
    const value = { ...click, destination: eventCalendarHref(preference) };
    expect(parseArticleAttribution(value, now)?.destination).toBe(value.destination);
    expect(matchArticleCompletion(value, "studio_project_brief_submitted", now)).toBeUndefined();
    expect(matchArticleCompletion(value, "studio_builder_application_submitted", now)).toBeUndefined();
  }
  for (const destination of ["/events?next=https://evil.test", "/events?event_format=online&secret=x", "/events?event_format=online&event_format=melbourne"]) expect(parseArticleAttribution({ ...click, destination }, now)).toBeUndefined();
});

test("downloaded planner offers both exact preference destinations without claiming a booking", () => {
  const txt = readFileSync("public/downloads/melbourne-event-shortlist.txt", "utf8");
  expect(txt).toContain("https://mlai.au" + eventCalendarHref("online"));
  expect(txt).toContain("https://mlai.au" + eventCalendarHref("melbourne"));
  expect(txt).toContain("They do not book a place or guarantee a ticket");
});

test("destination route keeps the feed unfiltered and explains empty or unavailable results", async () => {
  for (const state of ["empty", "populated"]) {
    const entries = [fixtureEvent("fixture-0", "2030-09-22T08:00:00Z"), fixtureEvent("fixture-1", "2030-09-20T08:00:00Z")];
    const router = createMemoryRouter([{ id: "events", path: "/events", Component: EventsCalendarPage }], {
      initialEntries: ["/events?event_format=online"],
      hydrationData: { loaderData: { events: { events: Promise.resolve(state === "populated" ? entries : []), serverDate: time } } },
    });
    try {
      const stream = await renderToReadableStream(<RouterProvider router={router} />, { progressiveChunkSize: Number.MAX_SAFE_INTEGER });
      await stream.allReady;
      const html = (await new Response(stream).text()).replace(/<!--.*?-->/g, "");
      expect(html).toContain("Selected: Online options");
      expect(html).toContain("The full calendar below is not filtered by format");
      expect(html).not.toContain("data-format-option");
      if (state === "empty") {
        expect(html).toContain("The feed may be empty or unavailable");
      } else {
        for (const entry of entries) expect(html).toContain(entry.name);
        expect(html.indexOf("Synthetic unknown-format event fixture-1")).toBeLessThan(html.indexOf("Synthetic unknown-format event fixture-0"));
      }
    } finally { router.dispose(); }
  }
});

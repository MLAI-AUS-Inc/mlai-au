import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Finder, { selectSydneySessions, sydneyFinderChoices } from "../app/components/articles/SydneyEventFitFinder";
import * as Article from "../app/articles/content/featured/how-to-find-an-ai-and-tech-meetup-in-sydney";
import { SYDNEY_AI_TECH_EVENTS, sydneyEventSessions, sydneyEventStatus, currentSydneySessions, SYDNEY_STATUS_LABELS } from "../app/lib/sydney-ai-tech-events";
import { ArticleReadTime } from "../app/components/articles/ArticleReadTime";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { eventCalendarHref, parseEventPreference } from "../app/lib/event-preference";
import EventFormatPreference from "../app/components/EventFormatPreference";
import ArticleConversionCTA from "../app/components/articles/ArticleConversionCTA";
import type { Event } from "../app/lib/events";

const clock = "2026-10-29T11:06:00Z", now = Date.parse(clock);
const path = "/articles/featured/" + Article.SLUG;
const config = BASE_ARTICLE_SEO_CONFIG[path].conversion!;
const sessions = sydneyEventSessions();
const get = (id: string) => sessions.find(e => e.id === id)!;
const render = (node: React.ReactNode, query = "", time: string | null = clock) => renderToStaticMarkup(<MemoryRouter initialEntries={[path + query]}><ArticleReadTime.Provider value={time}>{node}</ArticleReadTime.Provider></MemoryRouter>);

test("all eight reviewed groups retain event-specific source records", () => {
  expect(SYDNEY_AI_TECH_EVENTS).toHaveLength(8);
  expect(sessions).toHaveLength(12);
  expect(new Set(sessions.map(e => e.id)).size).toBe(12);
  for (const e of sessions) {
    expect(e.sourceUrl.startsWith("https://")).toBe(true);
    expect(["2026-09-10", "2026-10-29"]).toContain(e.checkedAt.slice(0, 10));
    expect(Date.parse(e.reviewAfter)).toBeGreaterThan(Date.parse(e.checkedAt));
    expect(sydneyEventStatus(e, now)).not.toBe("unknown");
  }
});

test("past source labels cannot create current matches", () => {
  for (const id of ["cursor-august", "sydney-ai-august", "power-bi-june"]) {
    expect(sydneyEventStatus(get(id), now)).toBe("past");
    expect(currentSydneySessions(now).map(e => e.id)).not.toContain(id);
  }
  expect(currentSydneySessions(now)).toHaveLength(5);
});

test("conflicting finish times stop matches at the earliest published finish", () => {
  for (const id of ["gdg-september", "sydjs-september"]) {
    const event = get(id), boundary = Date.parse(event.uncertainAfter!);
    expect(sydneyEventStatus(event, Date.parse(event.startAt) - 1)).toBe("listed-future");
    expect(sydneyEventStatus(event, Date.parse(event.startAt))).toBe("listed-window");
    expect(sydneyEventStatus(event, boundary - 1)).toBe("listed-window");
    expect(sydneyEventStatus(event, boundary)).toBe("uncertain-end");
    expect(sydneyEventStatus(event, Date.parse(event.endAt))).toBe("past");
  }
  expect(selectSydneySessions({ now: Date.parse("2026-09-10T09:30:00Z") }).map(e => e.id)).not.toContain("gdg-september");
});

test("date-only windows expire in Sydney daylight-saving time and do not imply continuous activity", () => {
  const event = { ...get("sydney-hackathon"), checkedAt: "2026-12-03T00:00:00Z", reviewAfter: "2026-12-07T00:00:00+11:00" };
  expect(Date.parse(event.startAt)).toBe(Date.parse("2026-12-03T13:00:00Z"));
  expect(Date.parse(event.endAt)).toBe(Date.parse("2026-12-05T13:00:00Z"));
  expect(sydneyEventStatus(event, Date.parse(event.endAt) - 1)).toBe("listed-window");
  expect(sydneyEventStatus(event, Date.parse(event.endAt))).toBe("past");
  expect(SYDNEY_STATUS_LABELS["listed-window"]).toContain("check session times");
});

test("missing clocks, impossible dates, backwards windows and invalid uncertainty cannot certify availability", () => {
  const event = get("ai-on-tap-october");
  expect(sydneyEventStatus(event, null)).toBe("past");
  expect(sydneyEventStatus(get("ai-on-tap-november"), null)).toBe("snapshot");
  for (const time of [NaN, Infinity, Date.parse(event.checkedAt) - 1]) expect(sydneyEventStatus(event, time)).toBe("unknown");
  for (const patch of [{ startAt: "2026-02-30T17:30:00+10:00" }, { endAt: event.startAt }, { reviewAfter: event.checkedAt }, { uncertainAfter: "2026-10-01T19:00:00" }, { uncertainAfter: "2026-10-02T00:00:00+10:00" }]) {
    expect(sydneyEventStatus({ ...event, ...patch }, now)).toBe("unknown");
  }
  expect(currentSydneySessions(null)).toEqual([]);
});

test("source expiry applies even to distant future events; passed dates remain historical", () => {
  const due = Date.parse(get("ai-on-tap-october").reviewAfter);
  expect(sydneyEventStatus(get("ai-on-tap-october"), due - 1)).toBe("listed-future");
  expect(sydneyEventStatus(get("ai-on-tap-october"), due)).toBe("needs-review");
  expect(currentSydneySessions(due)).toEqual([]);
  expect(sydneyEventStatus(get("gdg-september"), due)).toBe("past");
  expect(selectSydneySessions({ now: due })).toEqual([]);
});

test("free, format and goal are all eligibility filters, not just ranking bonuses", () => {
  expect(selectSydneySessions({ now, cost: "free", preference: "online" }).map(e => e.id)).toEqual(["sydney-ai-october"]);
  expect(selectSydneySessions({ now, cost: "free", preference: "sydney", goal: "build" }).map(e => e.id)).toEqual(["sydney-hackathon"]);
  expect(selectSydneySessions({ now, cost: "paid", preference: "online" }).map(e => e.id)).toEqual(["ai-engineer-sydney"]);
  expect(selectSydneySessions({ now, preference: "melbourne" })).toEqual([]);
  expect(selectSydneySessions({ now, goal: "web" }).map(e => e.id)).toEqual([]);
  expect(get("sydjs-september").readerFit).toContain("not an AI code-along");
});

test("preference and filter parsers reject duplicate or inherited keys", () => {
  expect(parseEventPreference(new URLSearchParams(), "sydney")).toBe("sydney");
  expect(parseEventPreference(new URLSearchParams("event_format=sydney"))).toBe("sydney");
  expect(parseEventPreference(new URLSearchParams("event_format=sydney&event_format=online"), "sydney")).toBe("all");
  for (const q of ["event_goal=__proto__", "event_goal=constructor", "event_goal=build&event_goal=web"]) expect(sydneyFinderChoices(new URLSearchParams(q)).goal).toBe("all");
  expect(sydneyFinderChoices(new URLSearchParams("event_cost=free&event_cost=paid")).cost).toBe("either");
  expect(eventCalendarHref("sydney")).toBe("/events?event_format=sydney");
});

test("server rendering uses the same source status in finder and table; metadata is aligned", () => {
  const html = render(<Article.default />);
  expect(html).toContain('data-sydney-match="sydney-hackathon"');
  expect(html).toContain('data-sydney-source="gdg-september" data-date-status="past"');
  expect(html).toContain('data-sydney-source="cursor-august" data-date-status="past"');
  expect(html).toContain('method="get"');
  expect(html).toContain('tabindex="0"');
  expect(html).toContain('data-article-icp="COMMUNITY"');
  expect(html).toContain('href="/events?event_format=sydney"');
  expect(html).not.toContain("score it 80+");
  expect(html).not.toContain("Three future dates verified");
  const entry = ARTICLE_REGISTRY["featured/" + Article.SLUG];
  expect(entry.date).toBe(Article.DATE_PUBLISHED);
  expect(entry.dateModified).toBe(Article.DATE_MODIFIED);
  expect(entry.description).toBe(Article.DESCRIPTION);
  expect(entry.imageAlt).toBe(Article.articleMeta.imageAlt);
});

test("online/free empty result keeps the honest record and carries only format into the CTA", () => {
  const html = render(<Article.default />, "?event_format=online&event_cost=free&event_goal=build&cfInspector=1");
  expect(html).not.toContain("data-sydney-match=");
  expect(html).toContain("No recently checked option matches");
  expect(html).toContain('href="/events?event_format=online"');
  expect(html).not.toContain('href="/events?event_format=online&amp;');
  expect(html).toContain("AICamp registration");
  expect(render(<Finder />, "", null)).not.toContain("data-sydney-match=");
});

test("Sydney primary/footer CTA suppresses unclassified Melbourne feed cards", () => {
  const event: Event = { _id: "fixture", slug: "fixture", name: "Synthetic Melbourne-only event", startDate: clock, timezone: "Australia/Melbourne", url: "https://luma.com/fixture", eventLocation: { address: "Melbourne" }, published: true, source: "luma" };
  const html = render(<ArticleConversionCTA articleSlug={"featured/" + Article.SLUG} config={config} events={[event]} />);
  expect(html).not.toContain("Synthetic Melbourne-only event");
  expect(html).toContain('href="/events?event_format=sydney"');
});

test("calendar preserves the Sydney preference without claiming its full feed is filtered", () => {
  const html = render(<EventFormatPreference />, "?event_format=sydney");
  expect(html).toContain('name="event_format"');
  expect(html).toContain('value="sydney" selected=""');
  expect(html).toContain('full calendar below is not filtered by format');
  expect(html).toContain('confirm location');
  expect(html).not.toContain('data-format-option=');
});

test("download is a real editable record and shares truthful fictional/admission boundaries", () => {
  const file = readFileSync("public/downloads/sydney-event-shortlist/participation-record.txt", "utf8");
  for (const text of ["COMPLETED FICTIONAL EXAMPLE", "RSVP submitted: no", "Admission confirmed: no", "YOUR RECORD", "event_format=sydney", "event_format=online"]) expect(file).toContain(text);
  expect(render(<Article.default />)).toContain('href="/downloads/sydney-event-shortlist/participation-record.txt" download=""');
});

 test("refreshed free online seminar expires at its AEDT end and November offers require a new review", () => {
 const seminar=get("sydney-ai-october");
 expect(sydneyEventStatus(seminar, Date.parse("2026-10-30T03:59:59Z"))).toBe("listed-window");
 expect(sydneyEventStatus(seminar, Date.parse("2026-10-30T04:00:00Z"))).toBe("past");
 expect(selectSydneySessions({now:Date.parse("2026-10-30T04:00:00Z"),cost:"free",preference:"online"})).toEqual([]);
 expect(sydneyEventStatus(get("ai-on-tap-november"),Date.parse("2026-11-05T00:00:00+11:00"))).toBe("needs-review");
 expect(sydneyEventStatus(get("aicamp-november"),Date.parse("2026-11-05T00:00:00+11:00"))).toBe("needs-review");
 });

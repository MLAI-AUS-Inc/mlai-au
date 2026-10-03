import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, CATEGORY, SLUG, EVENT_SHORTLIST } from "../app/articles/content/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { readFileSync } from "node:fs";
import { ArticleReadTime } from "../app/components/articles/ArticleReadTime";
import { DISCOVERY_CHECKED_AT, DISCOVERY_REVIEW_AFTER, DISCOVERY_ROUTES, discoveryReviewState, EVENT_DISCOVERY_PATH, EVENT_RECORD_FIELDS, EVENT_SHORTLIST_FILE, EVENT_SHORTLIST_DOWNLOAD, FICTIONAL_EVENT_RECORD } from "../app/lib/event-discovery";

const render = (query = "", time: string | null = "2026-09-10T11:30:00Z") => renderToStaticMarkup(<MemoryRouter initialEntries={[EVENT_DISCOVERY_PATH + query]}><ArticleReadTime.Provider value={time}><Article /></ArticleReadTime.Provider></MemoryRouter>);

test("meetup comparison supplies selection evidence and a usable on-page checklist", () => {
  const html = render();
  expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  for (const text of ["https://www.meetup.com/", "https://luma.com/discover", "https://www.atrium.me/community", "Fictional reader decision", "not a validated numerical rating", "Browse MLAI events", 'data-article-icp="COMMUNITY"', "data-cf-article-body", "data-article-toc-placeholder", 'aria-label="Completed fictional event record"']) expect(html).toContain(text);
  for (const text of ["geoguy.org", "Authoritative reference supporting", "Download the PDF", "FAQPage", 'href="/community"']) expect(html).not.toContain(text);
  for (const field of ["displayed timezone", "prerequisites", "refund", "Accessibility", "waitlisted", "would I return"]) expect(EVENT_SHORTLIST).toContain(field);
});

test("meetup metadata and community offer match registry without resetting original date", () => {
  const key = CATEGORY + "/" + SLUG;
  const entry = ARTICLE_REGISTRY[key];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.description).toBe(articleMeta.description);
  expect(entry.imageAlt).toBe(articleMeta.imageAlt);
  expect(entry.author).toBe(articleMeta.author);
  expect(entry.date).toBe("2026-06-21");
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + key].conversion?.primaryIcp).toBe("COMMUNITY");
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + key].conversion?.eventCalendarOnly).toBe(true);
  expect(BASE_ARTICLE_SEO_CONFIG["/articles/" + key].conversion?.version).toBe("meetup-discovery-v3");
});

test("all four paths distinguish a performed search, coverage and participation limits", () => {
  expect(DISCOVERY_ROUTES).toHaveLength(4);
  expect(new Set(DISCOVERY_ROUTES.map(r => r.id)).size).toBe(4);
  for (const route of DISCOVERY_ROUTES) {
    for (const field of ["task", "steps", "result", "coverage", "account", "documentation", "accountSource"] as const) expect(route[field].length).toBeGreaterThan(20);
    expect(render()).toContain(`id="route-${route.id}"`);
  }
  expect(DISCOVERY_ROUTES[0].result).toContain("result list was not verified");
  expect(DISCOVERY_ROUTES[0].result).toContain("existing signed-in browser returned online cards");
  expect(DISCOVERY_ROUTES[0].result).toContain("not evidence that Melbourne has no AI events");
  expect(DISCOVERY_ROUTES[1].coverage).toContain("online-only and private events do not appear");
  expect(DISCOVERY_ROUTES[1].account).toContain("not a Luma account or sign-in");
  expect(DISCOVERY_ROUTES[2].accountSource).toBe("https://luma.com/buildercommunityanz");
  expect(DISCOVERY_ROUTES[3].account).toContain("No registration, approval, purchase or attendance was tested");
});

test("the record keeps ticket format, unknown cost/access and fictional outcomes separate", () => {
  expect(EVENT_RECORD_FIELDS).toHaveLength(12);
  expect(Object.keys(FICTIONAL_EVENT_RECORD).sort()).toEqual(EVENT_RECORD_FIELDS.map(([key]) => key).sort());
  expect(FICTIONAL_EVENT_RECORD.cost).toContain("Join Online $12.50");
  expect(FICTIONAL_EVENT_RECORD.cost).toContain("not a verified final charge or currency");
  expect(FICTIONAL_EVENT_RECORD.access).toContain("not confirmed");
  expect(FICTIONAL_EVENT_RECORD.decision).toContain("Ask before paying");
  expect(FICTIONAL_EVENT_RECORD.decision).toContain("skip");
  expect(FICTIONAL_EVENT_RECORD.admission).toContain("Not registered");
  expect(FICTIONAL_EVENT_RECORD.afterwards).toContain("Not attended");
  expect(FICTIONAL_EVENT_RECORD.checked).toContain("not a verified online-stream duration");
  expect(FICTIONAL_EVENT_RECORD.unknowns).toContain("not the organiser's sales deadline");
});

test("the actual editable download matches the visible example and all blank fields", () => {
  expect(readFileSync("public" + EVENT_SHORTLIST_DOWNLOAD, "utf8")).toBe(EVENT_SHORTLIST_FILE);
  for (const [key, label] of EVENT_RECORD_FIELDS) {
    expect(EVENT_SHORTLIST_FILE).toContain(FICTIONAL_EVENT_RECORD[key]);
    expect(EVENT_SHORTLIST_FILE).toContain(label + ":");
  }
  expect(EVENT_SHORTLIST_FILE).toContain(EVENT_SHORTLIST);
  expect(render()).toContain(`href="${EVENT_SHORTLIST_DOWNLOAD}" download="mlai-event-shortlist.txt"`);
  expect(render()).not.toContain('type="email"');
});

test("source review expires at the stated Sydney boundary, never disguising incomplete checks", () => {
  for (const now of [null, NaN, Infinity, -Infinity, Date.parse(DISCOVERY_CHECKED_AT) - 1]) expect(discoveryReviewState(now)).toBe("unknown");
  expect(discoveryReviewState(Date.parse(DISCOVERY_CHECKED_AT))).toBe("checked");
  expect(discoveryReviewState(Date.parse(DISCOVERY_REVIEW_AFTER) - 1)).toBe("checked");
  expect(discoveryReviewState(Date.parse(DISCOVERY_REVIEW_AFTER))).toBe("overdue");
  expect(render("", null)).toContain('data-discovery-review="unknown"');
  expect(render()).toContain('data-discovery-review="checked"');
  expect(render("", DISCOVERY_REVIEW_AFTER)).toContain("Source review is overdue");
  expect(render("", DISCOVERY_REVIEW_AFTER)).toContain("result list was not verified");
});

test("SSR preserves one allowlisted event preference and a native GET fallback", () => {
  for (const value of ["melbourne", "sydney", "online"]) {
    const html = render(`?event_format=${value}`);
    expect(html).toContain(`href="/events?event_format=${value}"`);
    expect(html).toContain(`value="${value}" selected=""`);
    expect(html).toContain(`action="${EVENT_DISCOVERY_PATH}" method="get"`);
  }
  for (const query of ["", "?event_format=all", "?event_format=invalid", "?event_format=online&event_format=sydney", "?event_format=online&event_format=online"]) {
    expect(render(query)).toContain('href="/events"');
    expect(render(query)).toContain("Applied to the event CTA: All formats.");
  }
  const html = render("?event_format=online&private_note=PRIVATE_TEST");
  expect(html).not.toContain("PRIVATE_TEST");
  expect(html).toContain("does not filter Meetup, Luma or Atrium");
  expect(html).toContain("flex-col gap-3 sm:flex-row sm:items-end");
  expect(html).toContain("w-full min-w-0 sm:flex-1");
  expect(html.indexOf('id="shortlist"')).toBeLessThan(html.indexOf('data-article-conversion="events"'));
});

import { expect, test } from "bun:test";
import { ARTICLE_ATTRIBUTION_MAX_AGE_MS, matchArticleCompletion, parseArticleAttribution, getStoredArticleAttribution, trackArticleCtaClick, trackAttributedConversion } from "../app/lib/article-conversions";

const now = Date.parse("2026-09-09T12:00:00Z");
const click = {
  articleSlug: "featured/example", ctaType: "studio-project",
  placement: "article-inline", primaryIcp: "SMB",
  destination: "/mlai-studio/start-project", version: "test-v1",
  clickedAt: new Date(now - 1000).toISOString(),
};
test("only a matching offer receives completion credit", () => {
  expect(matchArticleCompletion(click, "studio_project_brief_submitted", now)?.articleSlug).toBe(click.articleSlug);
  expect(matchArticleCompletion(click, "studio_builder_application_submitted", now)).toBeUndefined();
  expect(matchArticleCompletion({ ...click, ctaType: "events", destination: "/events" }, "studio_project_brief_submitted", now)).toBeUndefined();
});
test("expired, future, malformed and mismatched stored data is rejected", () => {
  for (const value of [null, [], "text", {}, { ...click, clickedAt: "bad" },
    { ...click, clickedAt: new Date(now + 1).toISOString() },
    { ...click, clickedAt: new Date(now - ARTICLE_ATTRIBUTION_MAX_AGE_MS - 1).toISOString() },
    { ...click, destination: "/mlai-studio#apply" },
    { ...click, primaryIcp: "OUTSIDE" },
    { ...click, placement: "unknown" },
    { ...click, articleSlug: "name@example.com" },
  ]) expect(parseArticleAttribution(value, now)).toBeUndefined();
  expect(parseArticleAttribution({ ...click, clickedAt: new Date(now - ARTICLE_ATTRIBUTION_MAX_AGE_MS).toISOString() }, now)).toBeDefined();
});
test("extra storage fields cannot leak into the public attribution payload", () => {
  expect(parseArticleAttribution({ ...click, customerEmail: "synthetic@example.test" }, now)).toEqual(click);
});
test("analytics failures cannot turn a successful form submission into an error", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    gtag() { throw new Error("analytics blocked"); },
    dispatchEvent() { throw new Error("listener unavailable"); },
    location: { pathname: "/mlai-studio" },
  } });
  try {
    expect(() => trackAttributedConversion("studio_builder_application_submitted", undefined)).not.toThrow();
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else Reflect.deleteProperty(globalThis, "window");
  }
});


test("legacy external event records discard query tokens and fragments while controlled internal destinations remain intact", () => {
  const external = { ...click, ctaType: "events", destination: "https://luma.com/example?email=synthetic%40example.test&token=synthetic-only#private" };
  expect(parseArticleAttribution(external, now)?.destination).toBe("https://luma.com/example");
  expect(parseArticleAttribution({ ...external, destination: "/events?event_format=online" }, now)?.destination).toBe("/events?event_format=online");
  expect(parseArticleAttribution({ ...click, ctaType: "studio-builder", destination: "/mlai-studio#apply" }, now)?.destination).toBe("/mlai-studio#apply");
  for (const destination of ["https://user:password@luma.com/example", "http://luma.com/example", "javascript:alert(1)", "data:text/plain,private", "//luma.com/example"]) {
    expect(parseArticleAttribution({ ...external, destination }, now), destination).toBeUndefined();
  }
});

test("click storage and both analytics channels receive only a sanitised attribution record", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  const sent: unknown[][] = [];
  const dispatched: unknown[] = [];
  const stored: string[] = [];
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    gtag: (...args: unknown[]) => sent.push(args),
    dispatchEvent: (event: CustomEvent) => { dispatched.push(event.detail); return true; },
    sessionStorage: { setItem: (_key: string, value: string) => stored.push(value) },
  } });
  try {
    const { clickedAt: _clickedAt, ...attribution } = click;
    trackArticleCtaClick({ ...attribution, ctaType: "events", destination: "https://luma.com/example?email=synthetic%40example.test&token=synthetic-only#private" } as Parameters<typeof trackArticleCtaClick>[0]);
    const payload = sent[0][2] as Record<string, string>;
    expect(payload.destination).toBe("https://luma.com/example");
    expect(dispatched).toEqual([payload]);
    expect(JSON.parse(stored[0]).destination).toBe("https://luma.com/example");
    for (const output of [JSON.stringify(sent), JSON.stringify(dispatched), stored[0]]) {
      for (const privatePart of ["synthetic%40", "token=", "#private"]) expect(output).not.toContain(privatePart);
    }
    for (const destination of ["https://user:password@luma.com/example", "javascript:alert(1)"]) {
      trackArticleCtaClick({ ...attribution, ctaType: "events", destination } as Parameters<typeof trackArticleCtaClick>[0]);
    }
    expect(sent).toHaveLength(1);
    expect(dispatched).toHaveLength(1);
    expect(stored).toHaveLength(1);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else Reflect.deleteProperty(globalThis, "window");
  }
});


test("reading a legacy record rewrites its sanitised public fields without making an event click a Studio conversion", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  let stored = JSON.stringify({ ...click, clickedAt: new Date().toISOString(), ctaType: "events", destination: "https://luma.com/example?token=synthetic-only#private", privateNotes: "synthetic worksheet" });
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    sessionStorage: { getItem: () => stored, setItem: (_key: string, value: string) => { stored = value; } },
  } });
  try {
    expect(getStoredArticleAttribution("studio_project_brief_submitted")).toBeUndefined();
    expect(getStoredArticleAttribution()?.destination).toBe("https://luma.com/example");
    expect(stored).not.toContain("token=");
    expect(stored).not.toContain("private");
    expect(stored).not.toContain("synthetic worksheet");
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

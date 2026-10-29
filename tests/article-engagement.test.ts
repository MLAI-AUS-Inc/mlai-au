import { afterEach, expect, test } from "bun:test";
import { articleLinkEngagement, trackArticleEngagement } from "../app/lib/article-conversions";

const originalWindow = globalThis.window;
afterEach(() => {
  if (originalWindow === undefined) Reflect.deleteProperty(globalThis, "window");
  else Object.defineProperty(globalThis, "window", { value: originalWindow, configurable: true });
});

test("resource and reading clicks strip query data and remain separate from completed conversions", () => {
  expect(articleLinkEngagement("/downloads/learning/worksheet.txt?token=private#my-answer", "https://mlai.au"))
    .toEqual({ action: "resource_open", target: "/downloads/learning/worksheet.txt" });
  expect(articleLinkEngagement("https://mlai.au/articles/featured/learn-ai-melbourne?email=private", "http://localhost:5173"))
    .toEqual({ action: "reading_link_open", target: "/articles/featured/learn-ai-melbourne" });
  for (const href of ["/events?format=sydney", "/mlai-studio/start-project", "https://luma.com/event", "javascript:void(0)", "https://outside.example/downloads/file.txt", "https://user:password@mlai.au/downloads/file.txt", "/downloads/%2e%2e/private", "blob:https://mlai.au/example"]) {
    expect(articleLinkEngagement(href, "https://mlai.au"), href).toBeUndefined();
  }
});

test("engagement sends only public identifiers and never stores lead attribution", () => {
  const sent: unknown[][] = [];
  const dispatched: string[] = [];
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    gtag: (...args: unknown[]) => sent.push(args),
    dispatchEvent: (event: Event) => dispatched.push(event.type),
    sessionStorage: { setItem: () => { throw new Error("Engagement must not store conversion attribution"); } },
  } });
  trackArticleEngagement("featured/what-is-artificial-intelligence-in-simple-words", "quiz_complete", "ai-or-not-v1");
  expect(sent).toEqual([["event", "article_engagement", {
    article_slug: "featured/what-is-artificial-intelligence-in-simple-words", action: "quiz_complete", target: "ai-or-not-v1",
  }]]);
  expect(dispatched).toEqual(["mlai:article_engagement"]);
  trackArticleEngagement("featured/example", "resource_open", "/downloads/file.txt?private=answer");
  trackArticleEngagement("invalid?slug=private", "quiz_complete", "ai-or-not-v1");
  expect(sent).toHaveLength(1);
});

test("unavailable or failing analytics cannot interrupt the reader", () => {
  Reflect.deleteProperty(globalThis, "window");
  expect(() => trackArticleEngagement("featured/example", "quiz_complete", "ai-or-not-v1")).not.toThrow();
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    gtag: () => { throw new Error("blocked"); }, dispatchEvent: () => { throw new Error("blocked"); },
  } });
  expect(() => trackArticleEngagement("featured/example", "resource_open", "/downloads/example.txt")).not.toThrow();
});

import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import FounderClubs from "../app/articles/content/featured/why-founders-clubs-work-for-early-stage-growth";
import FindEvents from "../app/articles/content/featured/how-to-find-networking-events";
import Engagement from "../app/articles/content/featured/how-to-foster-community-engagement";
import Networking from "../app/articles/content/community/how-to-network-at-networking-events";
import MelbourneEvents from "../app/articles/content/featured/where-to-find-ai-events-in-melbourne";
import MelbourneLearning from "../app/articles/content/featured/learn-ai-melbourne";
import StartupCommunity from "../app/articles/content/featured/why-australian-startups-need-stronger-ai-communities";
import CofounderAssess from "../app/articles/content/featured/how-to-assess-cofounder-values-match-before-you-commit";
import CofounderTrial from "../app/articles/content/featured/how-to-test-for-a-cofounder-values-match-before-you-commit";
import CommunityMeaning from "../app/articles/content/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group";

const pages = [
  ["featured/what-community-is-in-ai-and-why-it-is-more-than-a-group", CommunityMeaning, "Follow-up agreed, with whom and about what:"],
  ["featured/how-to-assess-cofounder-values-match-before-you-commit", CofounderAssess, "Their preference in their own words:"],
  ["featured/how-to-test-for-a-cofounder-values-match-before-you-commit", CofounderTrial, "What each person actually did:"],
  ["featured/where-to-find-ai-events-in-melbourne", MelbourneEvents, "Event and official listing:"],
  ["featured/learn-ai-melbourne", MelbourneLearning, "not a substitute for a qualification"],
  ["featured/why-australian-startups-need-stronger-ai-communities", StartupCommunity, "Do not assume attendance"],
  ["featured/why-founders-clubs-work-for-early-stage-growth", FounderClubs, "attendance is not a promise"],
  ["featured/how-to-find-networking-events", FindEvents, "before registering"],
  ["featured/how-to-foster-community-engagement", Engagement, "without treating attendees as a contact list"],
  ["community/how-to-network-at-networking-events", Networking, "only where interest is mutual"],
] as const;

test("community explainer supplies newcomer decisions and qualified evidence", () => {
  const html = renderToStaticMarkup(<MemoryRouter><CommunityMeaning /></MemoryRouter>);
  expect(html).toContain("wenger-trayner.com/introduction-to-communities-of-practice/");
  expect(html).toContain("not a ranking of AI communities");
  expect(html).toContain("Choose the interaction you actually want");
  expect(html).toContain("Illustrative example:");
  expect(html).toContain("Community participation record");
  expect(html).toContain("does not include guaranteed introductions");
  expect(html).not.toContain("activenetwork.com");
  expect(html).not.toContain("What This Means for Different AI Participants");
});

for (const [slug, Article, boundary] of pages) {
  test(slug + " selects a contextual event offer without a contact-service promise", () => {
    const conversion = BASE_ARTICLE_SEO_CONFIG["/articles/" + slug].conversion!;
    expect(conversion.primaryIcp).toBe("COMMUNITY");
    expect(conversion.primary).toBe("events");
    expect(conversion.copy?.button).toBeTruthy();
    const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
    expect(html).toContain(conversion.copy!.button);
    expect(html).toContain('href="/events"');
    expect(html).toContain('data-article-icp="COMMUNITY"');
    expect(html).toContain(boundary);
    expect(html).not.toContain("Get recommendations");
    expect(html).not.toContain("Get in touch");
  });
}

import { redirect } from "react-router";
import type { Route } from "./+types/article-link-cleanups";

const ARTICLE_LINK_CLEANUPS: Record<string, string> = {
  "/&": "/",
  "/practical-ai-learning-beginners-builders": "/articles",
  "/ai-startup-building-pitching": "/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit",
  "/templates/startup-traction": "/articles/featured/go-to-market-for-startups",
  "/ai-careers-learning": "/articles",
  "/ai-engineering-development": "/articles",
  "/ai-founder-community-pitching-ideas": "/articles",
  "/ai-events-meetups-australia": "/articles/featured/how-to-find-networking-events",
  "/hackathon": "/hackathons",
  "/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates": "/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates",
  "/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2": "/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2",
  "/articles/careers/best-way-to-learn-about-ai-2026": "/articles/featured/best-way-to-learn-about-ai-2026",
  "/articles/startups/how-vcs-value-startups": "/articles/featured/how-vcs-value-startups",
  "/articles/ai-startup-accelerator": "/articles/featured/startup-accelerator-australia",
  "/articles/featured/ai-startup-accelerator": "/articles/featured/startup-accelerator-australia",
};

export function loader({ request }: Route.LoaderArgs) {
  const pathname = new URL(request.url).pathname;
  const target = ARTICLE_LINK_CLEANUPS[pathname];

  if (!target) {
    throw new Response("Not Found", { status: 404 });
  }

  return redirect(target, 301);
}

export default function ArticleLinkCleanupsRoute() {
  return null;
}

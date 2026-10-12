/** Keep URL cleanup narrow: unknown or retired paths must still return 404. */
export const PERMANENT_PATH_REDIRECTS: Readonly<Record<string, string>> = {
  "/codeofconduct": "/terms",
  "/support": "/contact",
  "/Support": "/contact",
  "/vibe-raising/": "/vibe-raising",
  "/vibe-raising-landing": "/vibe-raising",
  "/medhack": "/healthhack",
  "/resources": "/articles",
  "/how-to-pitch-your-idea": "/articles/featured/how-to-pitch-your-idea",
  "/&": "/",
  "/$": "/",
  "/hackathon": "/hackathons",
  "/hackathons):": "/hackathons",
  "/articles/*": "/articles",
  "/practical-ai-learning-beginners-builders": "/articles",
  "/ai-startup-building-pitching": "/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit",
  "/templates/startup-traction": "/articles/featured/go-to-market-for-startups",
  "/ai-careers-learning": "/articles",
  "/ai-engineering-development": "/articles",
  "/ai-founder-community-pitching-ideas": "/articles",
  "/ai-events-meetups-australia": "/articles/featured/how-to-find-networking-events",
  "/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates": "/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates",
  "/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2": "/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2",
  "/articles/careers/best-way-to-learn-about-ai-2026": "/articles/featured/best-way-to-learn-about-ai-2026",
  "/articles/startups/how-vcs-value-startups": "/articles/featured/how-vcs-value-startups",
  "/articles/ai-startup-accelerator": "/articles/featured/startup-accelerator-australia",
  "/articles/featured/ai-startup-accelerator": "/articles/featured/startup-accelerator-australia",
  "/articles/featured/what-is-artificial-intelligence-with-example-for-everyday-readers": "/articles/featured/what-is-artificial-intelligence-in-simple-words",
  "/articles/featured/how-to-startup-a-practical-guide-for-first-time-founders": "/articles/featured/what-an-entrepreneur-does-and-how-to-start-well",
  "/articles/featured/what-is-agi-in-artificial-intelligence-and-why-it-matters": "/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters",
};

const TRACKING_PARAMS = ["trk", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/** Resolve all known normalization in one redirect, preserving functional queries. */
export function normalizedPublicRequestUrl(request: Request): URL | null {
  // A permanent navigation redirect must not discard an action's POST body.
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const original = new URL(request.url);
  const target = new URL(original);
  if (target.hostname === "www.mlai.au" || target.hostname === "mlai.au") {
    target.protocol = "https:";
    target.hostname = "mlai.au";
    target.port = "";
  }
  const legacyTarget = PERMANENT_PATH_REDIRECTS[target.pathname];
  if (legacyTarget) target.pathname = legacyTarget;
  for (const parameter of TRACKING_PARAMS) {
    if (target.searchParams.has(parameter)) target.searchParams.delete(parameter);
  }
  return target.href === original.href ? null : target;
}

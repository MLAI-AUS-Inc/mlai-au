import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("/sponsors", "routes/sponsors.tsx"),
  route("/mlai-studio", "routes/mlai-studio.tsx"),
  route("/mlai-studio/build-with-us", "routes/mlai-studio.build-with-us.tsx"),
  route("/mlai-studio/start-project", "routes/mlai-studio.start-project.tsx"),
  route("/press-kit", "routes/press-kit.tsx"),
  route("/volunteers", "routes/volunteers.tsx"),
  route("/events", "routes/events.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/community", "routes/community.tsx"),
  route("/how-to-pitch-your-idea", "routes/how-to-pitch-your-idea.tsx"),
  route("/privacy", "routes/privacy.tsx"),
  route("/terms", "routes/terms.tsx"),
  route("/resources", "routes/resources.tsx"),
  route("/displaylink", "routes/displaylink.tsx"),
  route("/roo", "routes/roo.tsx"),
  route("/roo/topup", "routes/roo.topup.tsx"),
  route("/mentors", "routes/mentors.tsx"),
  route("/&", "routes/article-link-cleanups.tsx", { id: "cleanup-root-ampersand" }),
  route("/$", "routes/article-link-cleanups.tsx", { id: "cleanup-root-dollar" }),
  route("/practical-ai-learning-beginners-builders", "routes/article-link-cleanups.tsx", { id: "cleanup-practical-ai-learning" }),
  route("/ai-startup-building-pitching", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-startup-building-pitching" }),
  route("/templates/startup-traction", "routes/article-link-cleanups.tsx", { id: "cleanup-startup-traction-template" }),
  route("/ai-careers-learning", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-careers-learning" }),
  route("/ai-engineering-development", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-engineering-development" }),
  route("/ai-founder-community-pitching-ideas", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-founder-community-pitching-ideas" }),
  route("/ai-events-meetups-australia", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-events-meetups-australia" }),

  // Hackathon pages
  route("/hackathon", "routes/article-link-cleanups.tsx", { id: "cleanup-hackathon-singular" }),
  route("/hackathons", "routes/hackathons.tsx"),
  route("/healthhack", "routes/healthhack.tsx"),
  route("/medhack", "routes/medhack.tsx"),

  // Misc
  route("/.well-known/appspecific/com.chrome.devtools.json", "routes/chrome-devtools.tsx"),

  // Article Routes
  route("/articles", "routes/articles.index.tsx"),
  route("/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates", "routes/article-link-cleanups.tsx", { id: "cleanup-featured-weekly-deep-dive" }),
  route("/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2", "routes/article-link-cleanups.tsx", { id: "cleanup-featured-weekly-deep-dive-issue-2" }),
  route("/articles/careers/best-way-to-learn-about-ai-2026", "routes/article-link-cleanups.tsx", { id: "cleanup-careers-best-way-to-learn-ai-2026" }),
  route("/articles/startups/how-vcs-value-startups", "routes/article-link-cleanups.tsx", { id: "cleanup-startups-how-vcs-value-startups" }),
  route("/articles/ai-startup-accelerator", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-startup-accelerator" }),
  route("/articles/featured/ai-startup-accelerator", "routes/article-link-cleanups.tsx", { id: "cleanup-featured-ai-startup-accelerator" }),
  route("/articles/featured/what-is-artificial-intelligence-with-example-for-everyday-readers", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-example-duplicate" }),
  route("/articles/featured/how-to-startup-a-practical-guide-for-first-time-founders", "routes/article-link-cleanups.tsx", { id: "cleanup-how-to-startup-duplicate" }),
  route("/articles/featured/what-is-agi-in-artificial-intelligence-and-why-it-matters", "routes/article-link-cleanups.tsx", { id: "cleanup-agi-acronym-duplicate" }),
  route("/articles/*", "routes/articles.slug.tsx"),

  // Vibe Raising public landing
  route("/vibe-raising", "routes/vibe-raising-landing.tsx"),

  // Public overview of the founder workspace in MLAI Chat
  route("/founder-tools/start", "routes/founder-tools-start.tsx"),
] satisfies RouteConfig;

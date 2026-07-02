import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/sponsors", "routes/sponsors.tsx"),
  route("/mlai-studio", "routes/mlai-studio.tsx"),
  route("/press-kit", "routes/press-kit.tsx"),
  route("/events", "routes/events.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/how-to-pitch-your-idea", "routes/how-to-pitch-your-idea.tsx"),
  route("/privacy", "routes/privacy.tsx"),
  route("/terms", "routes/terms.tsx"),
  route("/resources", "routes/resources.tsx"),
  route("/displaylink", "routes/displaylink.tsx"),
  route("/roo", "routes/roo.tsx"),
  route("/roo/topup/:purchaseId", "routes/roo.topup.$purchaseId.tsx"),
  route("/&", "routes/article-link-cleanups.tsx", { id: "cleanup-root-ampersand" }),
  route("/$", "routes/article-link-cleanups.tsx", { id: "cleanup-root-dollar" }),
  route("/practical-ai-learning-beginners-builders", "routes/article-link-cleanups.tsx", { id: "cleanup-practical-ai-learning" }),
  route("/ai-startup-building-pitching", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-startup-building-pitching" }),
  route("/templates/startup-traction", "routes/article-link-cleanups.tsx", { id: "cleanup-startup-traction-template" }),
  route("/ai-careers-learning", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-careers-learning" }),
  route("/ai-engineering-development", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-engineering-development" }),
  route("/ai-founder-community-pitching-ideas", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-founder-community-pitching-ideas" }),
  route("/ai-events-meetups-australia", "routes/article-link-cleanups.tsx", { id: "cleanup-ai-events-meetups-australia" }),

  // Platform routes
  route("/platform/login", "routes/platform.login.tsx"),
  route("/platform/dashboard", "routes/platform.dashboard.tsx"),
  route("/platform/logout", "routes/platform.logout.tsx"),
  route("/verify-email", "routes/verify-email.tsx"),

  // eSafety App routes
  route("/esafety", "routes/esafety.tsx", [
    index("routes/esafety._index.tsx"),
    route("dashboard", "routes/esafety.dashboard.tsx"),
    route("team", "routes/esafety.team.tsx"),
    route("submit", "routes/esafety.submit.tsx"),
    route("leaderboard", "routes/esafety.leaderboard.tsx"),
    route("resources", "routes/esafety.resources.tsx"),
    route("profile", "routes/esafety.profile.tsx"),
  ]),

  // Medhack: Frontiers (Hospital) App routes
  route("/hospital/app", "routes/hospital.app.tsx", [
    index("routes/hospital.app.dashboard.tsx"),
    route("dashboard", "routes/hospital.app.dashboard-redirect.tsx"),
    route("team", "routes/hospital.app.team.tsx"),
    route("submit", "routes/hospital.app.submit.tsx"),
    route("leaderboard", "routes/hospital.app.leaderboard.tsx"),
    route("resources", "routes/hospital.app.resources.tsx"),
    route("coding", "routes/hospital.app.coding.tsx"),
    route("pitching", "routes/hospital.app.pitching.tsx"),
    route("profile", "routes/hospital.app.profile.tsx"),
  ]),

  // Watt The Hack generic hackathon app routes
  route("/watt-the-hack", "routes/watt-the-hack.tsx", [
    index("routes/watt-the-hack._index.tsx"),
    route("dashboard", "routes/watt-the-hack.dashboard.tsx"),
    route("profile", "routes/watt-the-hack.profile.tsx"),
    route("notifications", "routes/watt-the-hack.notifications.tsx"),
    route("team", "routes/watt-the-hack.team.tsx"),
    route("submissions", "routes/watt-the-hack.submissions.tsx"),
    route("resources", "routes/watt-the-hack.resources.tsx"),
    route("docs", "routes/watt-the-hack.docs.tsx", [
      index("routes/watt-the-hack.docs._index.tsx"),
      route("base44-pitching", "routes/watt-the-hack.docs.base44-pitching.tsx"),
      route("grid-guardian", "routes/watt-the-hack.docs.grid-guardian.tsx"),
      route("smart-home", "routes/watt-the-hack.docs.smart-home.tsx"),
    ]),
    route("base44-pitching", "routes/watt-the-hack.base44-pitching.tsx"),
    route("city-of-melbourne-advanced", "routes/watt-the-hack.city-of-melbourne-advanced.tsx"),
    route("city-of-melbourne-advanced-submit", "routes/watt-the-hack.city-of-melbourne-advanced-submit.tsx"),
    route("city-of-melbourne-advanced-submit-data", "routes/watt-the-hack.city-of-melbourne-advanced-submit-data.ts"),
    route("city-of-melbourne-advanced-leaderboard", "routes/watt-the-hack.city-of-melbourne-advanced-leaderboard.tsx"),
    route("city-of-melbourne-advanced-leaderboard-data", "routes/watt-the-hack.city-of-melbourne-advanced-leaderboard-data.ts"),
    route("city-of-melbourne-advanced-recent-submissions-data", "routes/watt-the-hack.city-of-melbourne-advanced-recent-submissions-data.ts"),
    route("smart-home-beginner", "routes/watt-the-hack.smart-home-beginner.tsx"),
    route("smart-home-beginner/state", "routes/watt-the-hack.smart-home-beginner.state.tsx"),
    route("smart-home-beginner/firebase-token", "routes/watt-the-hack.smart-home-beginner.firebase-token.tsx"),
    route("smart-home-beginner/shop", "routes/watt-the-hack.smart-home-beginner.shop.tsx"),
  ]),

  // Hackathon pages
  route("/hackathon", "routes/article-link-cleanups.tsx", { id: "cleanup-hackathon-singular" }),
  route("/hackathons", "routes/hackathons.tsx"),
  route("/medhack", "routes/medhack.tsx"),

  // Valley MVP demo (mobile-first, mocked, no auth)
  route("/valley", "routes/valley._index.tsx"),
  route("/valley/update/new", "routes/valley.update.new.tsx"),
  route("/valley/update/review", "routes/valley.update.review.tsx"),
  route("/valley/update/published", "routes/valley.update.published.tsx"),
  route("/valley/profile", "routes/valley.profile.tsx"),

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
  route("/articles/*", "routes/articles.slug.tsx"),

  // Vibe Raising public landing
  route("/vibe-raising", "routes/vibe-raising-landing.tsx"),

  // Founder Tools App routes
  route("/founder-tools", "routes/vibe-raising-app.tsx", { id: "founder-tools-root" }, [
    index("routes/founder-tools.index.tsx"),
    route("upgrade", "routes/founder-tools.upgrade.tsx"),
    route("updates", "routes/vibe-raising-app._index.tsx"),
    route("drafts", "routes/vibe-raising-app.drafts.tsx"),
    route("company-setup", "routes/vibe-raising-app.company-setup.tsx"),
    route("data-sources", "routes/vibe-raising-app.connect-data.tsx"),
    route("updates/create", "routes/vibe-raising-app.create-update.tsx"),
    route("updates/:id", "routes/vibe-raising-app.update-detail.tsx"),
    route("discover", "routes/vibe-raising-app.investors.tsx"),
    route("companies", "routes/vibe-raising-app.companies.tsx"),
    route("switch-company", "routes/founder-tools.switch-company.tsx"),
    route("marketing", "routes/founder-tools.marketing.tsx"),
    route("marketing/create", "routes/founder-tools.marketing.create.tsx"),
    route("marketing/github-connect", "routes/founder-tools.marketing.github-connect.tsx"),
    route("marketing/autofill-runs/:runId", "routes/founder-tools.marketing.autofill-run.tsx"),
    route("marketing/settings", "routes/founder-tools.marketing.settings.tsx"),
    route("marketing/runs/:runId/status", "routes/founder-tools.marketing.run-status.tsx"),
    route("marketing/runs/:runId", "routes/founder-tools.marketing.run.tsx"),
    route("upgrades", "routes/founder-tools.upgrades.tsx"),
  ]),
  route("/founder-tools/logout", "routes/vibe-raising-app.logout.tsx", { id: "founder-tools-logout" }),
  route("/vibe-raising/logout", "routes/vibe-raising-app.logout.tsx", { id: "vibe-raising-logout" }),
  route("/vibe-raising/*", "routes/vibe-raising-redirect.tsx"),

] satisfies RouteConfig;

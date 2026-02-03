import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/sponsors", "routes/sponsors.tsx"),
  route("/members", "routes/members.tsx"),
  route("/events", "routes/events.tsx"),
  route("/hackathon", "routes/hackathon.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/how-to-pitch-your-idea", "routes/how-to-pitch-your-idea.tsx"),
  route("/privacy", "routes/privacy.tsx"),
  route("/terms", "routes/terms.tsx"),
  route("/hackathons", "routes/hackathons.tsx"),

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

  // AI Hospital App routes
  route("/hospital/app", "routes/hospital.app.tsx", [
    index("routes/hospital.app.dashboard.tsx"),
    route("team", "routes/hospital.app.team.tsx"),
    route("submit", "routes/hospital.app.submit.tsx"),
    route("leaderboard", "routes/hospital.app.leaderboard.tsx"),
  ]),

  // Misc
  route("/.well-known/appspecific/com.chrome.devtools.json", "routes/chrome-devtools.tsx"),

  // Article Routes
  route("/articles", "routes/articles.index.tsx"),
  route("/articles/*", "routes/articles.slug.tsx"),

  // Vibe-Raising page
  route("/vibe-raising", "routes/vibe-raising.tsx"),

] satisfies RouteConfig;

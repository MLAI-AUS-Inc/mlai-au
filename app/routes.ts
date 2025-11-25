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
  route("/hackathons", "routes/hackathons.tsx"),

  // Platform routes
  route("/platform/login", "routes/platform.login.tsx"),
  route("/platform/dashboard", "routes/platform.dashboard.tsx"),
  route("/platform/logout", "routes/platform.logout.tsx"),

  // eSafety App routes
  route("/esafety/app", "routes/esafety.app.dashboard.tsx"),
  route("/esafety/app/team", "routes/esafety.app.team.tsx"),
  route("/esafety/app/submit", "routes/esafety.app.submit.tsx"),
  route("/esafety/app/leaderboard", "routes/esafety.app.leaderboard.tsx"),
  route("/esafety/app/resources", "routes/esafety.app.resources.tsx"),
] satisfies RouteConfig;

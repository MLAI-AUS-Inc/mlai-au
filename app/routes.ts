import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sponsors", "routes/sponsors.tsx"),
  route("/events", "routes/events.tsx"),
  route("/hackathon", "routes/hackathon.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/luma-events", "routes/luma-events.tsx"),
  route("/how-to-pitch-your-idea", "routes/how-to-pitch-your-idea.tsx"),
  route("/api/luma-events", "routes/api.luma-events.tsx"),
  route("/api/notion-events", "routes/api.notion-events.tsx"),
] satisfies RouteConfig;

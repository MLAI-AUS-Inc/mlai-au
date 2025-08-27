import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sponsors", "routes/sponsors.tsx"),
  route("/events", "routes/events.tsx"),
  route("/hackathon", "routes/hackathon.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/how-to-pitch-your-idea", "routes/how-to-pitch-your-idea.tsx"),
] satisfies RouteConfig;

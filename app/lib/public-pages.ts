/** Canonical public entry points. Private applications, aliases and review
 * notices are deliberately absent. Articles are added from the registry. */
export const PUBLIC_INDEXABLE_PAGES = [
  "/", "/articles", "/community", "/contact", "/events", "/roo",
  "/hackathons", "/healthhack", "/vibe-raising", "/sponsors", "/mlai-studio",
  "/mlai-studio/build-with-us", "/mlai-studio/start-project", "/founder-tools/start",
  "/press-kit", "/volunteers", "/privacy", "/terms",
] as const;

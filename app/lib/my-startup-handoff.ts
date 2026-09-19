/** Read only the optional research draft; malformed storage must not block navigation. */
export function parseStartupResearch(value: string | null): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : {};
  } catch {
    return {};
  }
}

/** A backend response cannot turn the handoff button into an arbitrary redirect. */
export function startupHandoffDestination(value: unknown, configuredOrigin: string): URL {
  if (typeof value !== "string") throw new Error("Unexpected migration destination.");
  const destination = new URL(value);
  const trusted = new URL(configuredOrigin);
  if (destination.origin !== trusted.origin || destination.pathname !== "/my-startup/handoff" || destination.username || destination.password || destination.hash) {
    throw new Error("Unexpected migration destination.");
  }
  if (destination.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(destination.hostname)) throw new Error("Unexpected migration destination.");
  return destination;
}

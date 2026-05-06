import type { AppLoadContext } from "react-router";
import { getEnv } from "~/lib/env.server";

function isEnabled(value: string | undefined) {
  return String(value || "").toLowerCase() === "true";
}

// Discover Investors stays hidden until we deliberately enable it.
export function isFounderToolsDiscoverEnabled() {
  return isEnabled(import.meta.env.VITE_ENABLE_FOUNDER_TOOLS_DISCOVER);
}

export function isFounderToolsDiscoverEnabledServer(context: AppLoadContext) {
  const env = getEnv(context) as unknown as Record<string, string | undefined>;
  return isEnabled(env.VITE_ENABLE_FOUNDER_TOOLS_DISCOVER);
}

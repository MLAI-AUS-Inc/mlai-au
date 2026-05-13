import type { AppLoadContext } from "react-router";
import { getEnv } from "~/lib/env.server";
import { isFounderToolsPreviewFlagEnabled } from "~/lib/founder-tools-preview";

export function isFounderToolsDiscoverEnabledServer(context: AppLoadContext) {
  const env = getEnv(context) as unknown as Record<string, string | undefined>;
  return isFounderToolsPreviewFlagEnabled(env.VITE_ENABLE_FOUNDER_TOOLS_DISCOVER);
}

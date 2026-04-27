import type { LoaderFunctionArgs } from "react-router";

import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import { lookupVibeMarketingLocations } from "~/lib/vibe-marketing";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const sessionToken = url.searchParams.get("sessionToken");
  return Response.json(await lookupVibeMarketingLocations(env, request, query, sessionToken));
}

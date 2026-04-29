import type { LoaderFunctionArgs } from "react-router";

import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import { lookupVibeMarketingAbns } from "~/lib/vibe-marketing";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const url = new URL(request.url);
  return Response.json(await lookupVibeMarketingAbns(env, request, url.searchParams.get("q") ?? ""));
}

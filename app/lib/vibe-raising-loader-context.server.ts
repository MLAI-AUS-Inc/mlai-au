import type { AppLoadContext } from "react-router";
import { redirect } from "react-router";

import { getEnv } from "~/lib/env.server";
import {
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";

type OptionalContext = Awaited<ReturnType<typeof getOptionalVibeRaisingContext>>;

// React Router runs matched loaders concurrently with the same request-local
// context. Share the founder identity/profile read between the shell and the
// page, without carrying any authenticated data into another request.
export function createRequestLocalLoader<T>(
  load: (context: AppLoadContext, request: Request) => Promise<T>,
) {
  const reads = new WeakMap<AppLoadContext, Promise<T>>();
  return (context: AppLoadContext, request: Request): Promise<T> => {
    const pending = reads.get(context);
    if (pending) return pending;
    const started = load(context, request);
    reads.set(context, started);
    return started;
  };
}

export const getOptionalVibeRaisingContextForLoader = createRequestLocalLoader<OptionalContext>(
  (context, request) => getOptionalVibeRaisingContext(getEnv(context), request),
);

export function requireFounderFromLoaderContext(result: OptionalContext, request: Request) {
  if (!result.authUser) throw redirect(getVibeRaisingLoginHref(request));
  if (!result.profile || !result.appUser) throw redirect("/founder-tools/updates");
  if (result.appUser.role !== "founder") throw redirect("/founder-tools/updates");
  return {
    authUser: result.authUser,
    profile: result.profile,
    appUser: result.appUser,
  };
}

export async function requireVibeRaisingFounderForLoader(
  context: AppLoadContext,
  request: Request,
) {
  return requireFounderFromLoaderContext(
    await getOptionalVibeRaisingContextForLoader(context, request),
    request,
  );
}

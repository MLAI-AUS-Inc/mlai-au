import type { Route } from "./+types/platform.agents";
import { redirect } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

// This controls discoverability independently of the backend's authority gate.
// It does not enable the deferred Buzz/native community-agent UI.
export async function loader({ request, context }: Route.LoaderArgs) {
  if (import.meta.env.VITE_AGENT_RUNTIME_ENABLED !== "true") {
    throw new Response("Not Found", { status: 404 });
  }
  const env = getEnv(context);
  const currentUrl = new URL(request.url);
  const authorizationFields = [
    "client_id", "redirect_uri", "response_type", "scope", "resource",
    "state", "code_challenge", "code_challenge_method",
  ];
  const authorization = new URLSearchParams();
  if (currentUrl.searchParams.has("client_id")) {
    for (const field of authorizationFields) {
      const value = currentUrl.searchParams.get(field);
      if (value !== null) authorization.set(field, value);
    }
  }
  const user = await getCurrentUser(env, request, { allowDevBypass: false });
  if (!user) {
    const next = `/platform/agents${authorization.size ? `?${authorization}` : ""}`;
    throw redirect(`/platform/login?next=${encodeURIComponent(next)}`);
  }
  const target = new URL(
    currentUrl.searchParams.has("client_id")
      ? "/api/v1/agent-runtime/oauth/authorize/"
      : "/api/v1/agent-runtime/connected/",
    env.BACKEND_BASE_URL,
  );
  if (currentUrl.searchParams.has("client_id")) {
    target.search = authorization.toString();
  }
  // The destination is configuration, never a user-supplied next/return URL.
  return redirect(target.toString(), { headers: { "Cache-Control": "no-store" } });
}

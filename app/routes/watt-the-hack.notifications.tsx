import type { Route } from "./+types/watt-the-hack.notifications";
import { getEnv } from "~/lib/env.server";
import { getJoinRequests, type GenericHackathonRequests } from "~/lib/generic-hackathon";

// Resource route (no default export) — polled by the header notification bell for join requests.
export async function loader({ request, context }: Route.LoaderArgs): Promise<GenericHackathonRequests> {
  const env = getEnv(context);
  try {
    return await getJoinRequests(env, request);
  } catch {
    return { incoming: [], outgoing: [] };
  }
}

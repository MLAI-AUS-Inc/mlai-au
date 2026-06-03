import type { Route } from "./+types/watt-the-hack.smart-home-beginner.state";
import { getEnv } from "~/lib/env.server";
import { getSmartHomeState, type SmartHomeState } from "~/lib/generic-hackathon";

// Resource route (no default export) — polled by the smart-home page for the live status bar.
export async function loader({ request, context }: Route.LoaderArgs): Promise<SmartHomeState> {
  const env = getEnv(context);
  try {
    return await getSmartHomeState(env, request);
  } catch {
    return { live: false };
  }
}

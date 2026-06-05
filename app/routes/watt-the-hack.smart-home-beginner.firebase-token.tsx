import type { Route } from "./+types/watt-the-hack.smart-home-beginner.firebase-token";
import { getEnv } from "~/lib/env.server";
import { getWattParticipantToken } from "~/lib/generic-hackathon";

export interface WattRealtimeAuth {
  token: string | null;
  classId: string | null;
  householdId: string | null;
}

// Resource route (no default export). Server-side + cookie-authed (it inherits the /watt-the-hack
// auth guard), so it can call the cookie-protected Django endpoint the browser can't reach directly.
// The smart-home page fetches this once on mount (raw `fetch`) to bootstrap a direct Firebase RTDB
// subscription — so it returns an explicit JSON Response rather than a bare value.
export async function loader({ request, context }: Route.LoaderArgs): Promise<Response> {
  const env = getEnv(context);
  let payload: WattRealtimeAuth = { token: null, classId: null, householdId: null };
  try {
    const auth = await getWattParticipantToken(env, request);
    payload = {
      token: auth.firebase_custom_token ?? null,
      classId: auth.class_id ?? null,
      householdId: auth.household_id ?? null,
    };
  } catch {
    // leave the null payload — the page falls back to the zero/offline HUD
  }
  return Response.json(payload, { headers: { "Cache-Control": "no-store" } });
}

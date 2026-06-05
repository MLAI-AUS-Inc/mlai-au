import { useEffect, useRef, useState } from "react";
import type { SmartHomeState } from "~/lib/generic-hackathon";
import {
  WATT_FIREBASE_APP_NAME,
  WATT_FIREBASE_CONFIG,
  observationPath,
  scorePath,
} from "~/lib/watt-firebase";

const TOKEN_PATH = "/watt-the-hack/smart-home-beginner/firebase-token";
// Treat the house as "live" only if its latest observation is recent (mirrors the backend's
// observation_liveness STALE window). A team that's offline still shows its last-known figures.
const LIVE_WINDOW_MS = 15000;

export type WattRealtimeConnection = "connecting" | "subscribed" | "unauth" | "error";

// Before a team has ever started a game there is no score node → show zeros (product spec), NOT "—".
const ZERO_STATE: SmartHomeState = {
  live: false,
  day: 0,
  score: 0,
  energy_kwh: 0,
  carbon: 0,
  wallet: 0,
  comfort: 0,
};

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

// Merge the two RTDB nodes the streamed game publishes into the SmartHomeState the HUD renders.
function mergeState(score: any, obs: any): SmartHomeState {
  // No score node yet = never played = zeros.
  if (!score || typeof score !== "object") {
    return { ...ZERO_STATE };
  }
  const publishedAt = num(obs?.published_at_ms);
  const ageMs = publishedAt != null ? Date.now() - publishedAt : null;
  const live = ageMs != null && ageMs < LIVE_WINDOW_MS;
  return {
    live,
    household_id: score.household_id ?? obs?.household_id,
    day: num(score.day) ?? num(obs?.day) ?? 0,
    tick: num(obs?.tick),
    game_time: typeof obs?.game_time === "string" ? obs.game_time : null,
    wallet: num(score.money) ?? 0,
    cost: num(score.energy_cost),
    energy_kwh: num(score.energy_kwh) ?? 0,
    carbon: num(score.carbon_kg) ?? 0,
    comfort: num(score.mood) ?? 0,
    score: num(score.score) ?? 0,
    tariff_period: typeof obs?.tariff?.period === "string" ? obs.tariff.period : null,
    weather_condition: typeof obs?.weather?.condition === "string" ? obs.weather.condition : null,
    published_age_ms: ageMs,
  };
}

/**
 * Subscribe the browser DIRECTLY to the team's live RTDB score + observation nodes, replacing the
 * 3s backend poll. The first `onValue` callback is the initial sync; subsequent ones are live pushes
 * (~1s, when the streamed Unity game writes). Returns zeros until connected / when not yet started.
 *
 * `householdHint` (the session's household_id) just re-runs the effect when the team changes; the
 * authoritative class/household used for the RTDB paths come from the token endpoint (so they always
 * match the token's claims, which the security rules enforce).
 */
export function useWattRealtimeState(householdHint?: string | null): {
  state: SmartHomeState;
  connection: WattRealtimeConnection;
} {
  const [state, setState] = useState<SmartHomeState>(ZERO_STATE);
  const [connection, setConnection] = useState<WattRealtimeConnection>("connecting");
  const scoreSnap = useRef<any>(null);
  const obsSnap = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const unsubscribers: Array<() => void> = [];

    (async () => {
      setConnection("connecting");
      scoreSnap.current = null;
      obsSnap.current = null;

      // 1) Bootstrap a participant custom token (server-side route, cookie-authed).
      let auth: { token: string | null; classId: string | null; householdId: string | null };
      try {
        const res = await fetch(TOKEN_PATH, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`token ${res.status}`);
        auth = await res.json();
      } catch {
        if (!cancelled) setConnection("unauth");
        return;
      }
      if (cancelled) return;
      if (!auth?.token || !auth.classId || !auth.householdId) {
        setConnection("unauth");
        return;
      }

      // 2) Lazy-load Firebase in the browser only (dynamic import → never in the SSR bundle, and
      //    code-split so it's fetched only on this page).
      const appMod = await import("firebase/app");
      const authMod = await import("firebase/auth");
      const dbMod = await import("firebase/database");
      if (cancelled) return;

      // Reuse a single named app instance across mounts (StrictMode-safe; avoids deleteApp races).
      const app =
        appMod.getApps().find((a) => a.name === WATT_FIREBASE_APP_NAME) ??
        appMod.initializeApp(WATT_FIREBASE_CONFIG, WATT_FIREBASE_APP_NAME);

      let authInstance;
      try {
        // In-memory persistence: don't leave a participant session in IndexedDB on shared machines.
        authInstance = authMod.initializeAuth(app, { persistence: authMod.inMemoryPersistence });
      } catch {
        authInstance = authMod.getAuth(app); // already initialised for this app — reuse it.
      }

      if (!authInstance.currentUser) {
        try {
          await authMod.signInWithCustomToken(authInstance, auth.token);
        } catch {
          if (!cancelled) setConnection("unauth");
          return;
        }
      }
      if (cancelled) return;

      // 3) Subscribe. onValue fires immediately with the current value (the "sync"), then again on
      //    every change (the live push).
      const db = dbMod.getDatabase(app);
      const scoreRef = dbMod.ref(db, scorePath(auth.classId, auth.householdId));
      const obsRef = dbMod.ref(db, observationPath(auth.classId, auth.householdId));

      const apply = () => {
        if (!cancelled) setState(mergeState(scoreSnap.current, obsSnap.current));
      };

      unsubscribers.push(
        dbMod.onValue(
          scoreRef,
          (snap) => {
            scoreSnap.current = snap.val();
            if (!cancelled) setConnection("subscribed");
            apply();
          },
          () => {
            if (!cancelled) setConnection("error");
          },
        ),
      );
      unsubscribers.push(
        dbMod.onValue(obsRef, (snap) => {
          obsSnap.current = snap.val();
          apply();
        }),
      );
    })();

    return () => {
      cancelled = true;
      unsubscribers.forEach((off) => {
        try {
          off();
        } catch {
          /* noop */
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [householdHint]);

  return { state, connection };
}

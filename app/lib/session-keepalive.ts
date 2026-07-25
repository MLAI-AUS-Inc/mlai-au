import { useEffect } from "react";
import { API_URL } from "~/lib/api";

/**
 * Browser-side companion to the worker's session refresh.
 *
 * The worker renews the access cookie on every SSR render and loader request, which
 * covers navigation. It does not cover a tab that simply sits open: a dashboard left
 * running overnight keeps polling the backend directly from the browser, and once the
 * access token expires those calls start 401-ing even though the refresh cookie is
 * still good. This pings the refresh endpoint on a slow timer and whenever the tab is
 * brought back to the foreground, so a long-lived tab renews itself in the background.
 */

const REFRESH_ENDPOINT = "/api/v1/auth/token/refresh/";

/** Well inside the access-token lifetime, and cheap enough to be invisible. */
const KEEPALIVE_INTERVAL_MS = 6 * 60 * 60 * 1000;

/** Floor between refreshes, so tab-switching can't turn into a request storm. */
const MIN_REFRESH_GAP_MS = 30 * 60 * 1000;

let lastRefreshAt = 0;
let inFlight: Promise<boolean> | null = null;

export async function refreshSession(options: { force?: boolean } = {}): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (!options.force && Date.now() - lastRefreshAt < MIN_REFRESH_GAP_MS) return false;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const response = await fetch(new URL(REFRESH_ENDPOINT, API_URL).toString(), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      // A 401 means the refresh token itself is gone; the backend has already sent
      // clearing cookies, and the next navigation will land on the login screen.
      // Nothing to do here — deliberately no redirect, so a background ping can
      // never yank a user out of unsaved work.
      lastRefreshAt = Date.now();
      return response.ok;
    } catch {
      // Offline or backend hiccup: try again on the next tick.
      return false;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

/** Keep the signed-in session alive while an app surface stays open. */
export function useSessionKeepalive(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const timer = window.setInterval(() => {
      void refreshSession();
    }, KEEPALIVE_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refreshSession();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled]);
}

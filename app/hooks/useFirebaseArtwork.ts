import { useEffect, useState } from "react";
import { WATT_FIREBASE_CONFIG } from "~/lib/watt-firebase";

interface ArtworkState {
  path: string;
  url: string | null;
  status: "loading" | "ready" | "error";
}

/** Direct SDK download governed by Storage rules; never creates a download-token URL. */
export function useFirebaseArtwork(path: string) {
  const [state, setState] = useState<ArtworkState>({ path, url: null, status: "loading" });
  useEffect(() => {
    let disposed = false;
    let objectUrl: string | undefined;
    setState({ path, url: null, status: "loading" });
    async function load() {
      try {
        const [{ getApps, initializeApp }, { getStorage, ref, getBlob }] = await Promise.all([
          import("firebase/app"), import("firebase/storage"),
        ]);
        if (disposed) return;
        const app = getApps().find(app => app.name === "arcade-artwork") ??
          initializeApp(WATT_FIREBASE_CONFIG, "arcade-artwork");
        const blob = await getBlob(ref(getStorage(app), path), 10 * 1024 * 1024);
        if (disposed) return;
        objectUrl = URL.createObjectURL(blob);
        setState({ path, url: objectUrl, status: "ready" });
      } catch (error) {
        const code = typeof error === "object" && error !== null && "code" in error ? error.code : "unknown";
        console.warn("Firebase artwork download failed", code);
        if (!disposed) setState({ path, url: null, status: "error" });
      }
    }
    void load();
    return () => {
      disposed = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [path]);
  // Do not render a previous selection's artwork while its effect is being replaced.
  const current = state.path === path ? state : { path, url: null, status: "loading" as const };
  return {
    ...current,
    fail: () => setState({ path, url: null, status: "error" }),
  };
}

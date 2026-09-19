import { parseStartupResearch, startupHandoffDestination } from "~/lib/my-startup-handoff";
import { useState } from "react";
import { useLocation } from "react-router";

/** Opt-in handoff leaves already-open editors and the legacy frontend usable. */
export function MyStartupMigrationLink({ companyId }: { companyId: string | null }) {
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (import.meta.env.VITE_MY_STARTUP_HANDOFF_ENABLED !== "true" || !companyId || !location.pathname.startsWith("/founder-tools/marketing")) return null;
  return <aside className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-950">
    <p>Vibe Marketing is available in MLAI Chat’s My startup tab.</p>
    <button type="button" disabled={busy} className="font-bold underline disabled:opacity-60" onClick={async () => {
      setBusy(true); setError("");
      try {
        let research = {};
        try { research = parseStartupResearch(sessionStorage.getItem(`island-research:v2:${companyId}`)); } catch { /* A corrupt optional draft must not prevent moving an existing startup. */ }
        const response = await fetch("/founder-tools/migrate-to-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ companyId, path: location.pathname + location.search, research }) });
        const data = await response.json() as { url?: unknown; error?: string };
        if (!response.ok || typeof data.url !== "string") throw new Error(data.error || "Migration is temporarily unavailable.");
        const destination = startupHandoffDestination(data.url, import.meta.env.VITE_MY_STARTUP_CHAT_ORIGIN || "https://chat.mlai.au");
        // Keep the old draft until the destination has redeemed it. Existing
        // beforeunload handlers still protect unsaved forms on this navigation.
        window.location.assign(destination.href);
      } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); setBusy(false); }
    }}>{busy ? "Preparing…" : "Continue in My startup"}</button>
    {error && <p role="alert" className="w-full">{error}</p>}
  </aside>;
}

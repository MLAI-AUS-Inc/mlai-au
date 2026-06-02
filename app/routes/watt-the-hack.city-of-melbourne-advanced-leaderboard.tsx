import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  MinusSmallIcon,
  SparklesIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { wattClasses, wattImages } from "~/lib/watt-theme";

const REFRESH_MS = 15000;

// Fixed tile geometry so we can drive vertical position from rank and let CSS
// transition the slide. Card height + gap = stride.
const CARD_H = 86;
const GAP = 14;
const STRIDE = CARD_H + GAP;

interface LeaderboardEntry {
  rank: number;
  team_name: string;
  final_score: number;
  cost_score: number | null;
  renewable_score: number | null;
  stability_score: number | null;
  reliability_score: number | null;
  scored_at: string | null;
}

type Delta = number | "new" | "same";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const t = Date.parse(iso.replace(" ", "T"));
  if (Number.isNaN(t)) return "";
  const secs = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const MEDAL: Record<number, { ring: string; bar: string; label: string }> = {
  1: { ring: "ring-[#f4cf57] shadow-[0_0_16px_rgba(244,207,87,0.55)]", bar: "bg-[#f4cf57]", label: "Gold" },
  2: { ring: "ring-[#d8dde3] shadow-[0_0_14px_rgba(216,221,227,0.45)]", bar: "bg-[#cfd5dc]", label: "Silver" },
  3: { ring: "ring-[#d39152] shadow-[0_0_14px_rgba(211,145,82,0.45)]", bar: "bg-[#cd863f]", label: "Bronze" },
};

const STYLE = `
.wth-lb-board { position: relative; }
.wth-pos {
  position: absolute; left: 0; right: 0; top: 0; will-change: transform;
  transition: transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
}
.wth-card {
  position: relative; overflow: hidden; height: ${CARD_H}px;
  display: flex; align-items: center; gap: 0.85rem;
  padding-right: 1.1rem; border-radius: 1rem;
  color: #f5ead4;
  border: 1px solid rgba(38, 23, 9, 0.6);
  box-shadow: 0 12px 26px rgba(45, 30, 12, 0.24),
    inset 0 1px 0 rgba(255, 238, 205, 0.2), inset 0 -4px 10px rgba(28, 16, 6, 0.42);
  background-color: #6f4a28;
  background-image:
    linear-gradient(180deg, rgba(255, 240, 214, 0.13), rgba(33, 19, 7, 0.3)),
    repeating-linear-gradient(90deg, rgba(33, 19, 7, 0) 0px, rgba(33, 19, 7, 0) 5px,
      rgba(33, 19, 7, 0.16) 6px, rgba(33, 19, 7, 0) 11px, rgba(86, 56, 30, 0.12) 17px,
      rgba(33, 19, 7, 0) 23px),
    linear-gradient(93deg, #7d5531 0%, #6a4524 37%, #805834 57%, #5e3c1c 100%);
  animation: wthCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.wth-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; }
@keyframes wthCardIn { from { opacity: 0; transform: scale(0.975); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .wth-pos { transition: none; }
  .wth-card { animation: none; }
}
`;

function Medallion({ rank }: { rank: number }) {
  const medal = MEDAL[rank];
  return (
    <span
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black tabular-nums text-[#2a1b0c] ring-2 ${
        medal ? medal.ring : "ring-[#caa978]/60"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.6), transparent 55%), linear-gradient(160deg, #f3d488 0%, #cda052 50%, #b9863a 100%)",
      }}
      aria-hidden="true"
    >
      {rank}
    </span>
  );
}

function DeltaBadge({ delta }: { delta: Delta }) {
  if (delta === "new") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#f0c742]/90 px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#2a1b0c]">
        <SparklesIcon className="h-3 w-3" /> New
      </span>
    );
  }
  if (delta === "same" || delta === 0) {
    return (
      <span className="inline-flex items-center text-[#e9d7b4]/55" title="No change">
        <MinusSmallIcon className="h-5 w-5" />
      </span>
    );
  }
  const up = delta > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-sm font-black tabular-nums ${
        up ? "text-[#8ff07a]" : "text-[#ff9d8f]"
      }`}
      title={up ? `Up ${delta}` : `Down ${Math.abs(delta)}`}
    >
      {up ? <ChevronUpIcon className="h-4 w-4 stroke-[3]" /> : <ChevronDownIcon className="h-4 w-4 stroke-[3]" />}
      {Math.abs(delta)}
    </span>
  );
}

export default function WattTheHackLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [deltas, setDeltas] = useState<Map<string, Delta>>(new Map());
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [auto, setAuto] = useState(true);

  const prevRanks = useRef<Map<string, number>>(new Map());
  const hadData = useRef(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/watt-the-hack/city-of-melbourne-advanced-leaderboard-data", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        // The proxy returns { error, upstreamStatus?, detail? } — surface the
        // real reason instead of a bare status code.
        let message = `Leaderboard service responded ${res.status}`;
        try {
          const info = (await res.json()) as { error?: string; upstreamStatus?: number; detail?: string };
          if (info?.upstreamStatus) {
            message = `Upstream responded ${info.upstreamStatus}`;
          } else if (info?.error === "upstream_unreachable") {
            message = "Couldn't reach the evaluation server";
          } else if (info?.error || info?.detail) {
            message = String(info.detail || info.error);
          }
        } catch {
          // non-JSON body — keep the generic message
        }
        throw new Error(message);
      }
      const data = (await res.json()) as LeaderboardEntry[];
      if (!Array.isArray(data)) throw new Error("Unexpected response from leaderboard service");

      const sorted = [...data].sort((a, b) => a.rank - b.rank);

      const prev = prevRanks.current;
      const nextDeltas = new Map<string, Delta>();
      for (const e of sorted) {
        if (!prev.has(e.team_name)) {
          nextDeltas.set(e.team_name, hadData.current ? "new" : "same");
        } else {
          nextDeltas.set(e.team_name, prev.get(e.team_name)! - e.rank);
        }
      }

      const present = new Set(sorted.map((e) => e.team_name));
      setOrder((prevOrder) => {
        const seen = new Set(prevOrder);
        const merged = [...prevOrder.filter((n) => present.has(n))];
        for (const e of sorted) if (!seen.has(e.team_name)) merged.push(e.team_name);
        return merged;
      });

      const pr = new Map<string, number>();
      sorted.forEach((e) => pr.set(e.team_name, e.rank));
      prevRanks.current = pr;
      hadData.current = true;

      setEntries(sorted);
      setDeltas(nextDeltas);
      setErrorMsg(null);
      setPhase("ready");
      setLastUpdated(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to reach the leaderboard service";
      setErrorMsg(message);
      // Keep prior standings visible on a refresh failure; only hard-fail the first load.
      setPhase((p) => (p === "loading" ? "error" : p));
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => void load(), REFRESH_MS);
    return () => window.clearInterval(id);
  }, [auto, load]);

  const byName = useMemo(() => {
    const m = new Map<string, { entry: LeaderboardEntry; index: number }>();
    entries.forEach((entry, index) => m.set(entry.team_name, { entry, index }));
    return m;
  }, [entries]);

  const reduced = prefersReducedMotion();
  const boardHeight = Math.max(entries.length, 0) * STRIDE - (entries.length > 0 ? GAP : 0);

  return (
    <>
      <style>{STYLE}</style>

      {/* Scenic backdrop (shared visual from the Watt The Hack marketing site). */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <img
          src={wattImages.submitBackdrop}
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f2e6]/82 via-[#f8f2e6]/55 to-[#f8f2e6]/88" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero header */}
        <div className="relative overflow-hidden rounded-[1.5rem] shadow-xl">
          <div className="absolute inset-0 z-0">
            <img src={wattImages.hero} alt="" className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121e16] via-[#121e16]/70 to-[#121e16]/25" />
          </div>
          <div className="relative z-10 flex flex-col gap-2 p-8 sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#9fe870]">City of Melbourne Track</p>
            <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
              <TrophyIcon className="h-8 w-8 text-[#f0c742] sm:h-10 sm:w-10" />
              Current Standings
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-white/90">
              Live combined standings across all scored scenarios. Higher points mean a stronger,
              cleaner, more reliable grid.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className={`${wattClasses.panel} flex flex-wrap items-center justify-between gap-3 px-5 py-4`}>
          <div className="flex items-center gap-2 text-sm text-[#64705f]">
            <span aria-live="polite">
              {phase === "loading"
                ? "Loading standings…"
                : lastUpdated
                  ? `${entries.length} ${entries.length === 1 ? "team" : "teams"} · updated ${relativeTime(lastUpdated.toISOString())}`
                  : "—"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAuto((a) => !a)}
              aria-pressed={auto}
              className={auto ? wattClasses.buttonPrimary : wattClasses.buttonOutline}
            >
              <span className={`mr-2 inline-block h-2 w-2 rounded-full ${auto ? "bg-[#9fe870]" : "bg-[#8a8477]"}`} />
              Auto
            </button>
            <button
              type="button"
              onClick={() => void load()}
              disabled={refreshing}
              aria-label="Refresh standings"
              className={`${wattClasses.buttonOutline} gap-2 disabled:opacity-60`}
            >
              <ArrowPathIcon className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Board */}
        {phase === "loading" ? (
          <div className="flex flex-col gap-[14px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[86px] animate-pulse rounded-2xl border border-[#e8dfcf] bg-[#efe6d4]/70"
              />
            ))}
          </div>
        ) : phase === "error" && entries.length === 0 ? (
          <div className={`${wattClasses.panelStrong} flex flex-col items-center gap-3 px-6 py-12 text-center`}>
            <ExclamationTriangleIcon className="h-10 w-10 text-[#df5047]" />
            <p className="text-lg font-black text-[#121e16]">Couldn&apos;t load the leaderboard</p>
            <p className="max-w-md text-sm text-[#64705f]">{errorMsg}</p>
            <button type="button" onClick={() => void load()} className={`${wattClasses.buttonPrimary} mt-2 gap-2`}>
              <ArrowPathIcon className="h-4 w-4" /> Try again
            </button>
          </div>
        ) : entries.length === 0 ? (
          <div className={`${wattClasses.panelStrong} flex flex-col items-center gap-3 px-6 py-12 text-center`}>
            <TrophyIcon className="h-10 w-10 text-[#caa978]" />
            <p className="text-lg font-black text-[#121e16]">No standings yet</p>
            <p className="max-w-md text-sm text-[#64705f]">
              Once teams submit controllers and they finish evaluating, the board will fill up here.
            </p>
          </div>
        ) : (
          <>
            <div className="wth-lb-board" style={{ height: boardHeight }} role="list" aria-label="Team standings">
              {order.map((name) => {
                const rec = byName.get(name);
                if (!rec) return null;
                const { entry, index } = rec;
                const medal = MEDAL[entry.rank];
                const score = Number.isFinite(entry.final_score) ? entry.final_score : 0;
                return (
                  <div
                    key={name}
                    className="wth-pos"
                    style={{
                      transform: `translateY(${index * STRIDE}px)`,
                      transition: reduced ? "none" : undefined,
                      zIndex: 100 - index,
                    }}
                    role="listitem"
                    aria-label={`Rank ${entry.rank}: ${entry.team_name}, ${score.toFixed(2)} points`}
                  >
                    <article className="wth-card">
                      {medal ? <span className={`wth-accent ${medal.bar}`} /> : null}
                      <span className="flex w-10 shrink-0 justify-center pl-2 text-2xl font-black tabular-nums text-[#f0d9a8]">
                        {entry.rank}
                      </span>
                      <Medallion rank={entry.rank} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-black tracking-tight text-[#fbf2dd] sm:text-lg">
                          {entry.team_name}
                        </p>
                        <p className="mt-0.5 truncate text-xs font-medium text-[#e7d2a9]/70">
                          {medal ? `${medal.label} · ` : ""}
                          {entry.scored_at ? `best run ${relativeTime(entry.scored_at)}` : "awaiting first score"}
                        </p>
                      </div>
                      <div className="flex w-12 shrink-0 justify-center">
                        <DeltaBadge delta={deltas.get(name) ?? "same"} />
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xl font-black tabular-nums text-[#ffe9b0] sm:text-2xl">
                          {score.toFixed(2)}
                        </p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#e7d2a9]/65">pts</p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            {phase === "error" && entries.length > 0 ? (
              <p className="flex items-center justify-center gap-2 text-xs font-semibold text-[#9f6a1e]">
                <ExclamationTriangleIcon className="h-4 w-4" />
                Couldn&apos;t refresh just now — showing the last known standings.
              </p>
            ) : null}
          </>
        )}
      </main>
    </>
  );
}

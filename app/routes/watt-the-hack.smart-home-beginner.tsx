import type { Route } from "./+types/watt-the-hack.smart-home-beginner";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFetcher, useLoaderData, type ShouldRevalidateFunctionArgs } from "react-router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  buySmartHomeUpgrade,
  createWattUnitySession,
  deploySmartHome,
  getSmartHomeBlocks,
  requireValidWattTeam,
  type SmartHomeCatalog,
  type SmartHomePipeline,
  type SmartHomeShopState,
  type SmartHomeState,
  type WattUnitySession,
} from "~/lib/generic-hackathon";
import { getEnv } from "~/lib/env.server";
import { wattClasses } from "~/lib/watt-theme";
import { SmartHomeControllerV2 } from "~/components/SmartHomeControllerV2";
import { SmartHomeShop, type ShopFeedback } from "~/components/SmartHomeShop";
import { SmartHomeStatusBar } from "~/components/SmartHomeStatusBar";
import type { DeployFeedback } from "~/components/SmartHomeController";

type StreamData = {
  session: WattUnitySession | null;
  error: string | null;
};

const EMPTY_CATALOG: SmartHomeCatalog = { groups: [], blocks: [] };

function errorMessage(error: unknown, fallback: string) {
  const maybe = error as { response?: { data?: unknown }; message?: string } | null | undefined;
  const data = maybe?.response?.data;
  if (data && typeof data === "object") {
    const detail = (data as Record<string, unknown>).error ?? (data as Record<string, unknown>).detail;
    if (typeof detail === "string" && detail.trim()) return detail.trim();
  }
  if (typeof maybe?.message === "string" && maybe.message.trim()) return maybe.message.trim();
  return fallback;
}

async function loadSession(request: Request, context: Route.LoaderArgs["context"]): Promise<StreamData> {
  const env = getEnv(context);
  try {
    return { session: await createWattUnitySession(env, request), error: null };
  } catch (error) {
    return { session: null, error: errorMessage(error, "Unable to start your Smart Home stream.") };
  }
}

async function loadCatalog(request: Request, context: Route.LoaderArgs["context"]): Promise<SmartHomeCatalog> {
  const env = getEnv(context);
  try {
    return await getSmartHomeBlocks(env, request);
  } catch {
    return EMPTY_CATALOG;
  }
}

export async function loader({ request, context }: Route.LoaderArgs) {
  // Gate the whole page (stream + controller + shop) behind a valid 2..6 member team.
  // Redirects to the profile/team page before any Unity stream session is minted.
  await requireValidWattTeam(getEnv(context), request);
  // T7: do NOT mint a Vagon session on page load -- that allocates a GPU instance just for
  // visiting the page. The player clicks "Start your house" (the reconnect action) to begin.
  const catalog = await loadCatalog(request, context);
  return { session: null as WattUnitySession | null, error: null as string | null, catalog };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const formData = await request.formData();
  const intent = String(formData.get("intent") || "reconnect");

  if (intent === "deploy") {
    let pipeline: SmartHomePipeline = { inputs: [], schedule: [], brain: [], actions: [], outputs: [], safety: [] };
    try {
      const parsed = JSON.parse(String(formData.get("pipeline") || "{}"));
      if (parsed && typeof parsed === "object") pipeline = { ...pipeline, ...parsed };
    } catch {
      /* keep empty pipeline */
    }
    try {
      const result = await deploySmartHome(env, request, pipeline);
      return { kind: "deploy" as const, result, error: null as string | null };
    } catch (error) {
      return {
        kind: "deploy" as const,
        result: null,
        error: errorMessage(error, "Couldn't deploy to your Smart Home."),
      };
    }
  }

  if (intent === "buy") {
    const itemId = String(formData.get("item_id") || "").trim();
    if (!itemId) {
      return { kind: "buy" as const, result: null, error: "Pick an upgrade to buy." as string | null };
    }
    try {
      const result = await buySmartHomeUpgrade(env, request, itemId);
      return { kind: "buy" as const, result, error: null as string | null };
    } catch (error) {
      return {
        kind: "buy" as const,
        result: null,
        error: errorMessage(error, "Couldn't complete your purchase."),
      };
    }
  }

  const stream = await loadSession(request, context);
  return { kind: "session" as const, ...stream };
}

// Our reconnect/deploy fetcher POSTs manage their own state; never re-run the loader for them
// (revalidation would re-mint a fresh Unity stream session/ticket on every Deploy).
export function shouldRevalidate({ formData, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) {
  if (formData) return false;
  return defaultShouldRevalidate;
}

export default function WattTheHackSmartHomeBeginnerTrack() {
  const initialData = useLoaderData<typeof loader>();
  const reconnectFetcher = useFetcher<typeof action>();
  const deployFetcher = useFetcher<typeof action>();
  const [session, setSession] = useState<WattUnitySession | null>(initialData.session);
  const [error, setError] = useState<string | null>(initialData.error);
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  const reconnectData = reconnectFetcher.data;
  const isReconnecting = reconnectFetcher.state !== "idle";

  useEffect(() => {
    if (!reconnectData || reconnectData.kind !== "session") return;
    if (reconnectData.session) {
      setSession(reconnectData.session);
      setError(null);
      setIsFrameLoaded(false);
      return;
    }
    setError(reconnectData.error || "Unable to refresh your Smart Home stream.");
  }, [reconnectData]);

  // The Vagon stream session persists after Unity redeems the one-time ticket
  // at startup, so we intentionally do NOT refresh on ticket expiry (that would
  // restart the whole stream). We only reconnect on an iframe load error.

  const hasStream = Boolean(session?.stream_url);
  // T7: before the first "Start your house" click there is no session, so the panel shows a
  // Start CTA (not a perpetual spinner) and no GPU session is allocated for a passive visit.
  const notStarted = !hasStream && !isReconnecting && !error;

  const statusLabel = useMemo(() => {
    if (isReconnecting) return "Starting your house...";
    if (hasStream && !isFrameLoaded) return "Starting your house...";
    return "";
  }, [hasStream, isFrameLoaded, isReconnecting]);

  const reconnect = () => reconnectFetcher.submit({ intent: "reconnect" }, { method: "post" });

  const deployData = deployFetcher.data;
  const isDeploying = deployFetcher.state !== "idle";
  const feedback: DeployFeedback = useMemo(() => {
    if (isDeploying) return null;
    if (!deployData || deployData.kind !== "deploy") return null;
    if (deployData.result) {
      const count = deployData.result.deployed_count;
      return {
        ok: true,
        message: `Deployed ${count} change${count === 1 ? "" : "s"} — watch your house above.`,
        decisions: deployData.result.decisions ?? [],
      };
    }
    return { ok: false, message: deployData.error || "Couldn't deploy to your Smart Home." };
  }, [deployData, isDeploying]);

  const handleDeploy = (pipeline: SmartHomePipeline) =>
    deployFetcher.submit({ intent: "deploy", pipeline: JSON.stringify(pipeline) }, { method: "post" });

  // Poll the live game state for the goal/day/wallet status bar.
  const stateFetcher = useFetcher();
  const homeState = stateFetcher.data as SmartHomeState | undefined;

  // T5: live/offline badge driven by the published-observation freshness the backend reports
  // (live / stale / no_observation / missing_timestamp from observation_liveness).
  const liveBadge = useMemo(() => {
    if (homeState?.live) return { dot: "bg-emerald-400", label: "Live" };
    const reason = homeState?.live_reason;
    if (reason === "stale") return { dot: "bg-amber-400", label: "Reconnecting…" };
    if (reason === "no_observation" || reason === "missing_timestamp")
      return { dot: "bg-amber-400", label: "Starting…" };
    if (homeState && homeState.live === false) return { dot: "bg-rose-400", label: "Offline" };
    return { dot: "bg-amber-400", label: "…" };
  }, [homeState]);

  useEffect(() => {
    const STATE_PATH = "/watt-the-hack/smart-home-beginner/state";
    stateFetcher.load(STATE_PATH);
    const id = setInterval(() => stateFetcher.load(STATE_PATH), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remember the last deployed brain's effect line so the nightly recap can name it
  // ("Claude kept rooms & showers warmer — more comfort, a little more cost"), making the
  // ChatGPT/Claude/Gemini choice felt each day rather than only at deploy time.
  const lastBrainEffectRef = useRef<string | null>(null);
  useEffect(() => {
    if (deployData?.kind === "deploy" && deployData.result?.brain_effect) {
      lastBrainEffectRef.current = deployData.result.brain_effect;
    }
  }, [deployData]);

  // Lightweight recap: snapshot the score delta when the game day advances.
  const lastDayRef = useRef<{ day: number; score: number } | null>(null);
  const [recap, setRecap] = useState<string | null>(null);
  useEffect(() => {
    if (!homeState || typeof homeState.day !== "number") return;
    const snap = {
      day: homeState.day,
      score: typeof homeState.score === "number" ? homeState.score : 0,
    };
    const prev = lastDayRef.current;
    if (prev && snap.day > prev.day) {
      const dScore = Math.round(snap.score - prev.score);
      const brainLine = lastBrainEffectRef.current ? ` ${lastBrainEffectRef.current}` : "";
      setRecap(
        `Day ${prev.day} done — score ${dScore >= 0 ? "+" : ""}${dScore} (now ${Math.round(snap.score)}).${brainLine} Tune your controller for day ${snap.day}.`,
      );
    }
    lastDayRef.current = snap;
  }, [homeState]);

  // Poll the upgrades shop (the game publishes it on day-change + after a purchase).
  const shopFetcher = useFetcher<SmartHomeShopState>();
  const shop = shopFetcher.data;
  const SHOP_PATH = "/watt-the-hack/smart-home-beginner/shop";
  useEffect(() => {
    shopFetcher.load(SHOP_PATH);
    const id = setInterval(() => shopFetcher.load(SHOP_PATH), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buyFetcher = useFetcher<typeof action>();
  const buyData = buyFetcher.data;
  const isBuying = buyFetcher.state !== "idle";
  const rawBuyingId = buyFetcher.formData?.get("item_id");
  const buyingId = isBuying && typeof rawBuyingId === "string" ? rawBuyingId : null;

  const buyFeedback: ShopFeedback | null = useMemo(() => {
    if (isBuying) return null;
    if (!buyData || buyData.kind !== "buy") return null;
    if (buyData.result) {
      const r = buyData.result;
      if (r.pending) return { ok: true, message: "Purchase sent — your house is applying it…" };
      if (r.ok) return { ok: true, message: r.message || "Upgrade purchased — it's installed in your house." };
      return { ok: false, message: r.reason || r.message || "Couldn't buy that upgrade." };
    }
    return { ok: false, message: buyData.error || "Couldn't complete your purchase." };
  }, [buyData, isBuying]);

  // Refresh the shop as soon as a purchase resolves (owned + wallet update).
  useEffect(() => {
    if (!isBuying && buyData && buyData.kind === "buy") shopFetcher.load(SHOP_PATH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyData, isBuying]);

  const handleBuy = (itemId: string) =>
    buyFetcher.submit({ intent: "buy", item_id: itemId }, { method: "post" });

  return (
    <div className={wattClasses.page}>
      <div className="mx-auto max-w-7xl space-y-6">
        <SmartHomeStatusBar state={homeState} />
        {recap && (
          <div className={`${wattClasses.successAlert} flex items-center justify-between gap-3`}>
            <span>{recap}</span>
            <button type="button" onClick={() => setRecap(null)} className="shrink-0 text-xs font-bold underline">
              Dismiss
            </button>
          </div>
        )}
        <section className={`${wattClasses.panelStrong} overflow-hidden p-0`}>
          <div className="relative aspect-video w-full bg-black">
            {session?.stream_url ? (
              <iframe
                key={session.stream_url}
                title="Watt The Hack Smart Home stream"
                src={session.stream_url}
                className="absolute inset-0 h-full w-full border-0 bg-black"
                allow="autoplay; fullscreen; clipboard-read; clipboard-write; encrypted-media; gamepad"
                allowFullScreen
                referrerPolicy="no-referrer"
                onLoad={() => setIsFrameLoaded(true)}
                onError={() => {
                  setError("Unable to load your Smart Home stream.");
                  reconnect();
                }}
              />
            ) : null}

            {hasStream && (
              <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-black text-white backdrop-blur-sm">
                <span className={`h-2 w-2 rounded-full ${liveBadge.dot}`} aria-hidden="true" />
                {liveBadge.label}
              </div>
            )}

            {notStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#121e16]">
                <div className="mx-4 flex max-w-md flex-col items-center text-center">
                  <p className="text-lg font-black text-[#fffefa]">Your team's house isn't running yet.</p>
                  <p className="mt-2 text-sm text-[#cfe0c2]">
                    Start it to watch your smart home live and deploy your controller.
                  </p>
                  <button
                    type="button"
                    className={`${wattClasses.buttonPrimary} mt-6 px-6 py-3`}
                    onClick={reconnect}
                  >
                    Start your house
                  </button>
                </div>
              </div>
            )}

            {(statusLabel || error) && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#121e16]">
                <div className="mx-4 flex max-w-md flex-col items-center text-center">
                  {error ? (
                    <ExclamationTriangleIcon className="h-10 w-10 text-[#f0c742]" aria-hidden="true" />
                  ) : (
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e6efd7] border-t-[#2f6f2c]" />
                  )}
                  <p className="mt-5 text-lg font-black text-[#fffefa]">{error || statusLabel}</p>
                  {error && (
                    <button
                      type="button"
                      className={`${wattClasses.buttonPrimary} mt-6 px-6 py-3`}
                      onClick={reconnect}
                    >
                      Reconnect
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <SmartHomeControllerV2
          onDeploy={handleDeploy}
          isDeploying={isDeploying}
          feedback={feedback}
        />

        <SmartHomeShop shop={shop} onBuy={handleBuy} buyingId={buyingId} feedback={buyFeedback} />
      </div>
    </div>
  );
}

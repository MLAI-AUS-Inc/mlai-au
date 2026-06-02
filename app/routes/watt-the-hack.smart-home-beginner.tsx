import type { Route } from "./+types/watt-the-hack.smart-home-beginner";
import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData, type ShouldRevalidateFunctionArgs } from "react-router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  createWattUnitySession,
  deploySmartHome,
  getSmartHomeBlocks,
  type SmartHomeCatalog,
  type WattUnitySession,
} from "~/lib/generic-hackathon";
import { getEnv } from "~/lib/env.server";
import { wattClasses } from "~/lib/watt-theme";
import { SmartHomeControllerV2 } from "~/components/SmartHomeControllerV2";
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
  const [stream, catalog] = await Promise.all([
    loadSession(request, context),
    loadCatalog(request, context),
  ]);
  return { ...stream, catalog };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const formData = await request.formData();
  const intent = String(formData.get("intent") || "reconnect");

  if (intent === "deploy") {
    let blockIds: string[] = [];
    try {
      const parsed = JSON.parse(String(formData.get("blocks") || "[]"));
      if (Array.isArray(parsed)) blockIds = parsed.map((value) => String(value));
    } catch {
      blockIds = [];
    }
    try {
      const result = await deploySmartHome(env, request, blockIds);
      return { kind: "deploy" as const, result, error: null as string | null };
    } catch (error) {
      return {
        kind: "deploy" as const,
        result: null,
        error: errorMessage(error, "Couldn't deploy to your Smart Home."),
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

  const statusLabel = useMemo(() => {
    if (isReconnecting) return "Connecting...";
    if (!session) return "Connecting...";
    if (!isFrameLoaded) return "Starting your house...";
    return "";
  }, [isFrameLoaded, isReconnecting, session]);

  const reconnect = () => reconnectFetcher.submit({ intent: "reconnect" }, { method: "post" });

  const deployData = deployFetcher.data;
  const isDeploying = deployFetcher.state !== "idle";
  const feedback: DeployFeedback = useMemo(() => {
    if (isDeploying) return null;
    if (!deployData || deployData.kind !== "deploy") return null;
    if (deployData.result) {
      const count = deployData.result.deployed_count;
      return { ok: true, message: `Deployed ${count} change${count === 1 ? "" : "s"} — watch your house above.` };
    }
    return { ok: false, message: deployData.error || "Couldn't deploy to your Smart Home." };
  }, [deployData, isDeploying]);

  const handleDeploy = (blockIds: string[]) =>
    deployFetcher.submit({ intent: "deploy", blocks: JSON.stringify(blockIds) }, { method: "post" });

  return (
    <div className={wattClasses.page}>
      <div className="mx-auto max-w-7xl space-y-6">
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
      </div>
    </div>
  );
}

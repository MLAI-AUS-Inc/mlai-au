import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import { TimelineBar } from "~/components/watt-the-hack/sandbox/control-panel";
import { ControllerEditor } from "~/components/watt-the-hack/sandbox/controller-editor";
import { GridDiagram } from "~/components/watt-the-hack/sandbox/grid-view";
import { MetricsPanel } from "~/components/watt-the-hack/sandbox/metrics-panel";
import { ScenarioBriefing, ActiveEventBanner } from "~/components/watt-the-hack/sandbox/scenario-briefing";
import { ScenarioExtras } from "~/components/watt-the-hack/sandbox/scenario-extras";
import { SkyStrip } from "~/components/watt-the-hack/sandbox/time-of-day";
import { TimeSeriesCharts } from "~/components/watt-the-hack/sandbox/timeseries-charts";
import { useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";

export default function WattTheHackCityOfMelbourneAdvancedTrack() {
  const init = useSimStore((s) => s.init);
  const error = useSimStore((s) => s.error);
  const state = useSimStore((s) => s.state);
  const loading = useSimStore((s) => s.loading);

  useEffect(() => {
    if (!state) {
      void init();
    }
  }, [init, state]);

  return (
    <main className="wth-sandbox mx-auto flex min-h-screen max-w-[1400px] flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
      {loading ? <ConnectingPill /> : null}
      {error ? (
        <div className="rounded-lg border border-danger/40 bg-rose-50 px-3 py-2 text-xs font-medium text-danger">
          {error}
        </div>
      ) : null}
      <ScenarioBriefing />
      <MetricsPanel />
      <ActiveEventBanner />
      <NetworkHero />
      <ControllerEditor />
      <ScenarioExtras />
      <TimeSeriesCharts />
    </main>
  );
}

function NetworkHero() {
  return (
    <section className="card overflow-hidden p-0 shadow-hero">
      <SkyStrip />
      <GridDiagram />
      <TimelineBar />
    </section>
  );
}

function ConnectingPill() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShowHint(true), 3000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-900">
      <Loader2Icon className="h-4 w-4 flex-shrink-0 animate-spin" />
      <div className="flex flex-col">
        <span className="font-semibold">Connecting to backend...</span>
        {showHint ? (
          <span className="text-[11px] text-sky-800/80">
            The first simulation request can take a moment while the MLAI backend prepares the engine.
          </span>
        ) : null}
      </div>
    </div>
  );
}

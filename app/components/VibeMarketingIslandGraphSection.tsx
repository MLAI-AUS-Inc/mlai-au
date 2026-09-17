import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

import type { VibeMarketingIslandGraphProps } from "~/components/VibeMarketingIslandGraph";

const VibeMarketingIslandGraph = lazy(() => import("~/components/VibeMarketingIslandGraph"));

export default function VibeMarketingIslandGraphSection(props: VibeMarketingIslandGraphProps) {
  return (
    <Suspense
      fallback={
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {props.header}
          <div className="mt-6 flex h-64 items-center justify-center gap-3 rounded-xl bg-slate-50 text-sm font-bold text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
            Loading your content islands…
          </div>
        </section>
      }
    >
      <VibeMarketingIslandGraph {...props} />
    </Suspense>
  );
}

import { lazy, Suspense, useState } from "react";
import { BarChart3, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

const VibeMarketingAnalyticsPerformance = lazy(
  () => import("~/components/VibeMarketingAnalyticsPerformance"),
);

export default function VibeMarketingAnalyticsSection({
  companyId,
}: {
  companyId?: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span className="flex min-w-0 gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-black text-slate-950">Article performance</span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">
              Search visibility, reader engagement, and CTA results for your published articles.
            </span>
          </span>
        </span>
        <span className="mt-1 shrink-0 text-slate-400" aria-hidden="true">
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {open ? (
        <div className="mt-6 border-t border-slate-100 pt-6">
          <Suspense
            fallback={
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-5 text-sm font-bold text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
                Loading article performance…
              </div>
            }
          >
            <VibeMarketingAnalyticsPerformance companyId={companyId} />
          </Suspense>
        </div>
      ) : null}
    </section>
  );
}

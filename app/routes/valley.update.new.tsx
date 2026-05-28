import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ValleyFrame } from "~/components/valley/ValleyFrame";
import {
  formatCurrency,
  formatMonth,
  liveMetricsFor,
  nextMonth,
  useValleyState,
  type ValleyDraft,
} from "~/lib/valley-state";

export const meta = () => [
  { title: "Valley — Draft update" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function ValleyDraftUpdate() {
  const navigate = useNavigate();
  const { state, update, hydrated } = useValleyState();

  const defaultMonth = state.drafts?.month ?? nextMonth(state);
  const live = useMemo(
    () => liveMetricsFor(defaultMonth, state.connectedSources),
    [defaultMonth, state.connectedSources],
  );

  const [draft, setDraft] = useState<ValleyDraft>(() => ({
    month: defaultMonth,
    metrics: state.drafts?.metrics ?? {
      revenueMrr: live.revenueMrr,
      revenueArr: live.revenueArr,
      customers: live.customers,
      runwayMonths: live.runwayMonths,
    },
    memo: state.drafts?.memo ?? { highlights: "", challenges: "", ask: "" },
  }));

  // If sources change after first render, refresh prefilled metrics that are still zero.
  useEffect(() => {
    setDraft((d) => ({
      ...d,
      metrics: {
        revenueMrr: d.metrics.revenueMrr || live.revenueMrr,
        revenueArr: d.metrics.revenueArr || live.revenueArr,
        customers: d.metrics.customers || live.customers,
        runwayMonths: d.metrics.runwayMonths || live.runwayMonths,
      },
    }));
  }, [live.revenueMrr, live.revenueArr, live.customers, live.runwayMonths]);

  const stripeOn = state.connectedSources.includes("stripe");
  const gaOn = state.connectedSources.includes("google-analytics");

  function saveDraft() {
    update({ drafts: draft });
  }

  function goReview() {
    update({ drafts: draft });
    navigate("/valley/update/review");
  }

  return (
    <ValleyFrame
      title="New update"
      back={{ href: "/valley" }}
      hideNav
      rightAction={
        <button
          type="button"
          onClick={saveDraft}
          className="rounded-full border border-[#e6dfd0] px-3 py-1 text-[11px] font-medium text-[#0b0b0b] hover:bg-[#ece5d4]"
        >
          Save draft
        </button>
      }
    >
      {/* Month picker */}
      <label className="block">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#727171]">
          Reporting month
        </div>
        <div className="mt-1 flex items-center justify-between rounded-2xl border border-[#e6dfd0] bg-white px-4 py-3">
          <input
            type="month"
            value={draft.month}
            onChange={(e) => setDraft({ ...draft, month: e.target.value })}
            className="bg-transparent text-base font-semibold text-[#0b0b0b] outline-none"
          />
          <span className="text-xs text-[#727171]">{formatMonth(draft.month)}</span>
        </div>
      </label>

      {/* Metric cards */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#727171]">
            Metrics
          </div>
          <div className="text-[11px] text-[#727171]">
            {hydrated
              ? state.connectedSources.length > 0
                ? "Prefilled from connected sources"
                : "Manual input"
              : ""}
          </div>
        </div>

        <MetricCard
          label="Revenue"
          sub="MRR · this month"
          value={draft.metrics.revenueMrr}
          onChange={(v) =>
            setDraft({
              ...draft,
              metrics: { ...draft.metrics, revenueMrr: v, revenueArr: v * 12 },
            })
          }
          format="currency"
          source={stripeOn ? "Stripe" : null}
          footer={`ARR ${formatCurrency(draft.metrics.revenueArr)}`}
        />
        <MetricCard
          label="Customers"
          sub="Paying accounts"
          value={draft.metrics.customers}
          onChange={(v) =>
            setDraft({ ...draft, metrics: { ...draft.metrics, customers: v } })
          }
          format="number"
          source={gaOn ? "Google Analytics" : null}
        />
        <MetricCard
          label="Runway"
          sub="Months remaining"
          value={draft.metrics.runwayMonths}
          onChange={(v) =>
            setDraft({ ...draft, metrics: { ...draft.metrics, runwayMonths: v } })
          }
          format="number"
          source={null}
        />
      </div>

      {/* Investment memo */}
      <div className="mt-6">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#727171]">
          Investment memo
        </div>
        <MemoField
          label="Key highlights"
          placeholder="What shipped, what closed, what worked."
          value={draft.memo.highlights}
          onChange={(v) => setDraft({ ...draft, memo: { ...draft.memo, highlights: v } })}
        />
        <MemoField
          label="Challenges"
          placeholder="What broke, where you got stuck."
          value={draft.memo.challenges}
          onChange={(v) => setDraft({ ...draft, memo: { ...draft.memo, challenges: v } })}
        />
        <MemoField
          label="Ask from investors"
          placeholder="Intros, hires, advice — be specific."
          value={draft.memo.ask}
          onChange={(v) => setDraft({ ...draft, memo: { ...draft.memo, ask: v } })}
        />
      </div>

      <div className="sticky bottom-4 mt-6 flex gap-3">
        <button
          type="button"
          onClick={saveDraft}
          className="flex-1 rounded-full border border-[#0b0b0b] bg-white py-3 text-sm font-semibold text-[#0b0b0b]"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={goReview}
          className="flex-1 rounded-full bg-[#0b0b0b] py-3 text-sm font-semibold text-[#f9f7f2]"
        >
          Review →
        </button>
      </div>
    </ValleyFrame>
  );
}

function MetricCard({
  label,
  sub,
  value,
  onChange,
  format,
  source,
  footer,
}: {
  label: string;
  sub: string;
  value: number;
  onChange: (v: number) => void;
  format: "currency" | "number";
  source: string | null;
  footer?: string;
}) {
  return (
    <div className="mb-3 rounded-2xl border border-[#e6dfd0] bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-[#0b0b0b]">{label}</div>
          <div className="text-[11px] text-[#727171]">{sub}</div>
        </div>
        {source ? (
          <span className="rounded-full bg-[#e0fffa] px-2 py-0.5 text-[10px] font-semibold text-[#006656]">
            Live · {source}
          </span>
        ) : (
          <span className="rounded-full bg-[#ece5d4] px-2 py-0.5 text-[10px] font-semibold text-[#727171]">
            Manual
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        {format === "currency" ? <span className="text-2xl font-semibold text-[#727171]">$</span> : null}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full bg-transparent text-3xl font-semibold tabular-nums text-[#0b0b0b] outline-none"
        />
      </div>
      {footer ? <div className="mt-1 text-xs text-[#727171]">{footer}</div> : null}
    </div>
  );
}

function MemoField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mb-3 block">
      <div className="mb-1 text-xs font-medium text-[#0b0b0b]">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-2xl border border-[#e6dfd0] bg-white px-4 py-3 text-sm text-[#0b0b0b] placeholder-[#9ca29a] outline-none focus:border-[#008080]"
      />
    </label>
  );
}

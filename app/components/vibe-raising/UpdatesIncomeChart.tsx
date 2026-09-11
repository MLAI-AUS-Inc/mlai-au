import { useId, useState } from "react";
import { Link } from "react-router";
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { UpdatesFinancialSeries } from "~/lib/startup-updates-presentation";

function monthLabel(value: string, long = false) {
  return new Date(`${value.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString("en-AU", {
    month: long ? "long" : "short", year: long ? "numeric" : "2-digit", timeZone: "UTC",
  });
}

export default function UpdatesIncomeChart({ series }: { series: UpdatesFinancialSeries }) {
  const [range, setRange] = useState<6 | 12 | "all">(12);
  const id = useId().replace(/:/g, "");
  const points = range === "all" ? series.points : series.points.slice(-range);
  const hasCosts = points.some(point => point.expenses !== null);
  const incomeLabel = series.provider === "stripe" ? "Recorded payments" : "Income";
  const formatMoney = (value: unknown, compact = false) => typeof value !== "number" || !Number.isFinite(value)
    ? "Not available"
    : new Intl.NumberFormat("en-AU", {
      style: "currency", currency: series.currency, currencyDisplay: "narrowSymbol",
      notation: compact ? "compact" : "standard", maximumFractionDigits: compact ? 1 : 2,
    }).format(value);
  const last = points.at(-1)!;
  const hasGaps = points.some(point => point.income == null || (hasCosts && point.expenses == null));

  return <section className="updates-income-chart overflow-hidden rounded-2xl border border-[#dce8e5] bg-white shadow-[0_8px_32px_-20px_rgba(12,64,61,0.3)]" aria-labelledby={`${id}-heading`}>
    <div className="flex flex-wrap items-start justify-between gap-5 px-5 pt-6 sm:px-8 sm:pt-7">
      <div>
        <h2 id={`${id}-heading`} className="text-xl font-semibold tracking-tight text-[#172d35]">{hasCosts ? "Income & costs" : incomeLabel}</h2>
        <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">{series.sourceLabel} · {series.currency} · {monthLabel(points[0].month)}–{monthLabel(last.month)}</p>
      </div>
      {series.points.length > 6 && <div className="flex rounded-lg bg-[#f0f5f3] p-1" role="group" aria-label="Chart time range">
        {([6, 12, "all"] as const).map(value => <button key={value} type="button" onClick={() => setRange(value)}
          aria-pressed={range === value}
          className={`min-h-9 min-w-12 rounded-md px-3 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${range === value ? "bg-white text-teal-800 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
          {value === "all" ? "All" : `${value}M`}
        </button>)}
      </div>}
    </div>
    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 px-5 sm:px-8" aria-label={`Figures for ${monthLabel(last.month, true)}`}>
      <div className="flex items-center gap-2.5"><span className="h-2.5 w-2.5 rounded-full bg-[#07877e]" aria-hidden="true" />
        <span className="text-sm text-slate-600">{incomeLabel}</span><span className="text-lg font-semibold tabular-nums text-[#172d35]">{formatMoney(last.income)}</span></div>
      {hasCosts && <div className="flex items-center gap-2.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-[#cb8b34]" aria-hidden="true" />
        <span className="text-sm text-slate-600">Costs</span><span className="text-lg font-semibold tabular-nums text-[#172d35]">{formatMoney(last.expenses)}</span></div>}
      <span className="self-center text-xs text-slate-500">{monthLabel(last.month, true)}</span>
    </div>
    <div className="mt-5 h-[260px] min-w-0 px-2 sm:h-[320px] sm:px-5">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 900, height: 320 }}>
        <ComposedChart data={points} margin={{ top: 14, right: 20, left: 0, bottom: 8 }} accessibilityLayer>
          <defs><linearGradient id={`${id}-income`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#31b2a0" stopOpacity={0.22} /><stop offset="100%" stopColor="#31b2a0" stopOpacity={0.015} />
          </linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#e4ece9" strokeDasharray="3 5" />
          <XAxis dataKey="month" tickFormatter={value => monthLabel(String(value))} axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }} tickMargin={12} minTickGap={28} padding={{ left: 8, right: 8 }} />
          <YAxis tickFormatter={value => formatMoney(value, true)} axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }} width={62} tickCount={5} domain={["auto", "auto"]} />
          <Tooltip cursor={{ stroke: "#6d9b94", strokeDasharray: "4 4" }}
            labelFormatter={label => monthLabel(String(label), true)}
            formatter={(value, name) => [formatMoney(value), name === "income" ? incomeLabel : "Costs"]}
            filterNull={false}
            contentStyle={{ borderRadius: 12, border: "1px solid #dce8e5", boxShadow: "0 8px 28px #173b3214", fontSize: 13, padding: "12px 16px" }}
            labelStyle={{ color: "#172d35", fontWeight: 600, marginBottom: 8 }} />
          <Area type="linear" dataKey="income" stroke="#07877e" strokeWidth={3}
            fill={`url(#${id}-income)`} connectNulls={false} isAnimationActive={false}
            dot={points.length <= 12 ? { r: 3.5, fill: "#07877e", stroke: "#fff", strokeWidth: 2 } : false}
            activeDot={{ r: 6, fill: "#07877e", stroke: "#fff", strokeWidth: 3 }} />
          {hasCosts && <Line type="linear" dataKey="expenses" stroke="#cb8b34" strokeWidth={2.5} strokeDasharray="6 4"
            connectNulls={false} isAnimationActive={false}
            dot={points.length <= 12 ? { r: 3, fill: "#cb8b34", stroke: "#fff", strokeWidth: 2 } : false}
            activeDot={{ r: 5, fill: "#cb8b34", stroke: "#fff", strokeWidth: 3 }} />}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <div className="border-t border-[#edf1ef] px-5 py-3.5 text-xs text-slate-500 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span>Complete months{series.basis?.toLowerCase().includes("accrual") ? " · Accrual basis" : ""}{series.partialCoverage ? " · Incomplete source coverage" : ""}{hasGaps ? " · Gaps mean data is unavailable" : ""}</span>
        <Link className="rounded text-teal-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
          to={`/founder-tools/updates/${encodeURIComponent(series.sourceUpdateId)}`}>Source update ↗</Link>
      </div>
      <details className="mt-2">
        <summary className="w-fit cursor-pointer rounded py-1 underline-offset-4 hover:text-teal-800 hover:underline focus-visible:outline-2 focus-visible:outline-teal-700">View chart data</summary>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs tabular-nums">
            <caption className="sr-only">{series.sourceLabel} figures in {series.currency}</caption>
            <thead><tr><th className="py-2">Month</th><th>{incomeLabel}</th>{hasCosts && <th>Costs</th>}</tr></thead>
            <tbody>{points.map(point => <tr key={point.month} className="border-t border-slate-100">
              <th className="py-2 font-normal">{monthLabel(point.month, true)}</th><td>{formatMoney(point.income)}</td>{hasCosts && <td>{formatMoney(point.expenses)}</td>}
            </tr>)}</tbody>
          </table>
        </div>
      </details>
    </div>
  </section>;
}

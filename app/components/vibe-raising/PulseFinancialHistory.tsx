import { useId } from "react";
import { CartesianGrid, ComposedChart, Line, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { financialHistoryDate, financialHistoryMonth, normalizeFinancialHistory, type FinancialHistory } from "~/lib/pulse-financial-history";
import { formatProgress, progressMonth } from "~/lib/startup-progress";
import "~/styles/pulse-financial-history.css";

/** Render only the frozen, explicitly approved financial disclosure. */
export default function PulseFinancialHistory({ history: input }: { history: FinancialHistory }) {
  const id = useId();
  const history = normalizeFinancialHistory(input);
  if (!history) return null;
  const { points } = history;
  const rows = points.map((point, index) => ({ ...point, index }));
  const available = points.filter(point => point.revenue !== null || point.costs !== null);
  const unit = history.shareAmounts ? history.currency! : "relative";
  const format = (value: number | null, compact = false) => value === null ? "No data" : history.shareAmounts
    ? formatProgress(value, unit, compact)
    : `${new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 }).format(value)}`;
  const finalPoint = points[5];
  const partialMonth = finalPoint.partial || history.cutoff < history.rangeEnd;
  return (
    <section className="pulse-financial-history" aria-labelledby={id}>
      <header>
        <div>
          <h2 id={id}>Revenue & costs</h2>
          <p>{financialHistoryMonth(history.reportingMonth)} · six-month snapshot</p>
        </div>
        <span className="pulse-financial-history-period">This update: {progressMonth(history.reportingMonth)}</span>
      </header>
      <div className="pulse-financial-history-legend" aria-label="Chart legend">
        <span><i className="pulse-financial-revenue" />Revenue</span>
        <span><i className="pulse-financial-costs" />Monthly costs</span>
        <span>{history.shareAmounts ? history.currency : "Relative scale · amounts hidden"}</span>
      </div>
      {available.length > 1 ? (
        <div role="img" className="pulse-financial-history-plot" aria-label={`Revenue and monthly costs from ${financialHistoryMonth(history.rangeStart)} to ${financialHistoryMonth(history.reportingMonth)}. The highlighted final month relates to this update. ${history.shareAmounts ? `Amounts in ${history.currency}.` : "Relative values use the same scale for both lines; dollar amounts are hidden."} Values and gaps are listed in the table below.`}>
          <ResponsiveContainer width="100%" height={260} minWidth={0}>
            <ComposedChart data={rows} margin={{ top: 28, right: 12, bottom: 6, left: 0 }} accessibilityLayer>
              <CartesianGrid vertical={false} stroke="#dfe6df" strokeDasharray="3 5" />
              <XAxis dataKey="index" type="number" domain={[-0.35, 5.35]} ticks={[0, 1, 2, 3, 4, 5]} tickFormatter={index => points[Number(index)] ? progressMonth(points[Number(index)].month) : ""} tickLine={false} axisLine={false} minTickGap={12} tick={{ fontSize: 12, fill: "#64736f" }} />
              <YAxis width={68} tickFormatter={value => format(Number(value), true)} domain={history.shareAmounts ? [(min: number) => Math.min(0, min), "auto"] : [(min: number) => Math.min(0, min), 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64736f" }} />
              <ReferenceArea x1={4.5} x2={5.35} fill="#07887e" fillOpacity={0.09} label={{ value: "Update", position: "insideTop", fill: "#38776c", fontSize: 11 }} />
              <Tooltip content={({ active, payload }) => {
                const row = payload?.[0]?.payload as typeof rows[number] | undefined;
                return active && row ? <div className="progress-tooltip"><strong>{financialHistoryMonth(row.month)}</strong><p>Revenue: {format(row.revenue)}</p><p>Monthly costs: {format(row.costs)}</p>{row.partial && <p>Partial{row.periodEnd ? ` through ${financialHistoryDate(row.periodEnd)}` : " period"}</p>}</div> : null;
              }} />
              <Line dataKey="revenue" name="Revenue" type="linear" stroke="#07887e" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} connectNulls={false} isAnimationActive={false} />
              <Line dataKey="costs" name="Monthly costs" type="linear" stroke="#cb882b" strokeWidth={2.5} strokeDasharray="5 4" dot={{ r: 3 }} activeDot={{ r: 5 }} connectNulls={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : available.length === 1 ? (
        <dl className="pulse-financial-history-single"><div><dt>Revenue · {progressMonth(available[0].month)}</dt><dd>{format(available[0].revenue)}</dd></div><div><dt>Monthly costs · {progressMonth(available[0].month)}</dt><dd>{format(available[0].costs)}</dd></div></dl>
      ) : <p>No financial values were recorded for this period. Missing data is not zero.</p>}
      <p className="pulse-financial-history-note">
        {partialMonth ? `Partial ${financialHistoryMonth(history.reportingMonth)} through ${financialHistoryDate(finalPoint.periodEnd || history.cutoff)}. Figures are not comparable with a complete month. ` : ""}
        {points.slice(0, 5).some(point => point.partial) ? "Includes earlier partial months, marked in the table. " : ""}
        Saved with this update · figures through {financialHistoryDate(history.cutoff)}. Missing months stay empty. Snapshot captured {financialHistoryDate(new Date(history.capturedAt).toISOString().slice(0, 10))} (UTC).
      </p>
      <details className="progress-data">
        <summary>View financial chart data</summary>
        <p className="pulse-financial-history-note">{history.shareAmounts ? `Amounts in ${history.currency}.` : "Relative values share one scale across all six months; dollar amounts are hidden."}</p>
        <div className="progress-table-wrap" tabIndex={0} role="region" aria-label="Monthly financial figures; scroll horizontally to view all columns"><table>
          <caption>Monthly financial values</caption>
          <thead><tr><th>Month</th><th>Revenue</th><th>Monthly costs</th><th>Coverage</th></tr></thead>
          <tbody>{points.map(point => <tr key={point.month} className={point.month === history.reportingMonth ? "pulse-financial-history-selected-row" : undefined}><th scope="row">{progressMonth(point.month)}{point.month === history.reportingMonth ? " · This update" : ""}</th><td>{format(point.revenue)}</td><td>{format(point.costs)}</td><td>{point.revenue === null && point.costs === null ? "No data" : point.partial ? `Partial${point.periodEnd ? ` through ${financialHistoryDate(point.periodEnd)}` : ""}` : "Complete month"}</td></tr>)}</tbody>
        </table></div>
      </details>
    </section>
  );
}

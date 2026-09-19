import { useId } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  formatProgress,
  progressMonth,
  progressRows,
  type ProgressChartSpec,
  type ProgressSeries,
} from "~/lib/startup-progress";

const COLORS = ["#07887e", "#cb882b", "#5866ae"];
export default function ProgressChart({
  spec,
  series,
  cutoff,
  actions,
}: {
  spec: ProgressChartSpec;
  series: ProgressSeries[];
  cutoff: string;
  actions?: React.ReactNode;
}) {
  const titleId = useId();
  const rows = progressRows(series, spec.months, cutoff);
  const plotted = rows.map((row, index) => {
    const result = { ...row };
    for (const item of series) {
      result[`${item.id}:complete`] = row[`${item.id}:partial`]
        ? null
        : row[item.id];
      result[`${item.id}:incomplete`] =
        row[`${item.id}:partial`] || rows[index + 1]?.[`${item.id}:partial`]
          ? row[item.id]
          : null;
    }
    return result;
  });
  const visible = rows.filter((row) =>
    series.some((item) => row[item.id] !== null),
  );
  const first = series[0];
  if (!first)
    return (
      <div className="progress-empty">
        This metric is unavailable. Choose another chart.
      </div>
    );
  const one = visible.length === 1;
  const unit = series.every((item) => item.unit === first.unit)
    ? first.unit
    : "records";
  const partial = rows.some((row) =>
    series.some((item) => row[`${item.id}:partial`]),
  );
  return (
    <article className="progress-chart" aria-labelledby={titleId}>
      <header>
        <div>
          <h2 id={titleId}>{series.map((item) => item.label).join(" & ")}</h2>
          <p>
            {first.source}
            {first.scopeLabel ? ` · ${first.scopeLabel}` : ""} · {unit} ·{" "}
            {progressMonth((rows[0]?.date as string) || cutoff)}–
            {progressMonth(cutoff)}
          </p>
        </div>
      </header>
      {visible.length === 0 ? (
        <p className="progress-empty">
          No values in this period. Missing data is not zero.
        </p>
      ) : one ? (
        <div className="progress-single">
          {series.map((item) => (
            <div key={item.id}>
              <strong>
                {formatProgress(
                  visible[0][item.id] as number | null,
                  item.unit,
                )}
              </strong>
              <span>
                {item.label} · {progressMonth(visible[0].date as string)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="progress-plot"
          role="img"
          aria-label={`${series.map((item) => item.label).join(" and ")} by month. Exact values are in the chart data table below.`}
        >
          <ResponsiveContainer width="100%" height={240} minWidth={0}>
            <ComposedChart
              data={plotted}
              margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
              accessibilityLayer
            >
              <CartesianGrid
                vertical={false}
                stroke="#e1e7e3"
                strokeDasharray="3 5"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => progressMonth(String(value))}
                tickLine={false}
                axisLine={false}
                minTickGap={32}
                tick={{ fontSize: 12, fill: "#64736f" }}
              />
              <YAxis
                tickFormatter={(value) =>
                  formatProgress(Number(value), unit, true)
                }
                width={68}
                tickLine={false}
                axisLine={false}
                domain={
                  unit === "%"
                    ? [0, 100]
                    : [(min: number) => Math.min(0, min), "auto"]
                }
                tick={{ fontSize: 12, fill: "#64736f" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  const row = payload?.[0]?.payload;
                  return active && row ? (
                    <div className="progress-tooltip">
                      <strong>{progressMonth(row.date)}</strong>
                      {series.map((item) => (
                        <p key={item.id}>
                          {item.label}:{" "}
                          {formatProgress(
                            row[item.id] as number | null,
                            item.unit,
                          )}
                          {row[`${item.id}:partial`]
                            ? ` · partial through ${row[`${item.id}:through`]}`
                            : ""}
                        </p>
                      ))}
                    </div>
                  ) : null;
                }}
              />
              {series.length > 1 && (
                <Legend iconSize={9} wrapperStyle={{ fontSize: 12 }} />
              )}
              {series.map((item, i) =>
                spec.type === "bar" ? (
                  <Bar
                    key={item.id}
                    dataKey={item.id}
                    name={item.label}
                    fill={COLORS[i]}
                    maxBarSize={38}
                    isAnimationActive={false}
                    radius={[3, 3, 0, 0]}
                  />
                ) : (
                  <Line
                    key={item.id}
                    dataKey={`${item.id}:complete`}
                    name={item.label}
                    stroke={COLORS[i]}
                    strokeWidth={2.5}
                    strokeDasharray={i === 1 ? "5 4" : undefined}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    connectNulls={false}
                    type="linear"
                    isAnimationActive={false}
                  />
                ),
              )}
              {spec.type === "line" &&
                series.map((item, i) => (
                  <Line
                    key={`${item.id}:partial`}
                    dataKey={`${item.id}:incomplete`}
                    name={item.label}
                    legendType="none"
                    stroke={COLORS[i]}
                    strokeWidth={2}
                    strokeDasharray="4 5"
                    dot={{ r: 3, fill: "#fff", strokeWidth: 2 }}
                    connectNulls={false}
                    type="linear"
                    isAnimationActive={false}
                  />
                ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
      {spec.caption && <p className="progress-caption">{spec.caption}</p>}
      <div className="progress-chart-notes">
        {partial ? "Includes a partial month · " : ""}Missing periods stay
        empty.{" "}
        {first.readOnly
          ? "Source values are read-only."
          : "Founder-provided values."}
      </div>
      <footer>
        <details>
          <summary>About this chart</summary>
          {series.map((item) => (
            <div key={item.id}>
              <p>
                <strong>{item.label}</strong> — {item.definition}
              </p>
              <p>
                {item.source} · {item.timezone}
                {item.lastSyncedAt
                  ? ` · Updated ${new Date(item.lastSyncedAt).toLocaleDateString("en-AU", { timeZone: item.timezone })}`
                  : ""}
              </p>
              {item.limitations.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          ))}
        </details>
        {actions}
      </footer>
      <details className="progress-data">
        <summary>View chart data</summary>
        <div className="progress-table-wrap">
          <table>
            <caption>Monthly observations; partial periods are marked.</caption>
            <thead>
              <tr>
                <th>Month</th>
                {series.map((item) => (
                  <th key={item.id}>
                    {item.label} ({item.unit})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.date)}>
                  <th>{progressMonth(String(row.date))}</th>
                  {series.map((item) => (
                    <td key={item.id}>
                      {formatProgress(row[item.id] as number | null, item.unit)}
                      {row[`${item.id}:partial`]
                        ? ` · partial through ${row[`${item.id}:through`]}`
                        : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </article>
  );
}

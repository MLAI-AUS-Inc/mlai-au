import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type {
    VibeRaisingConciseAnalysis,
    VibeRaisingFinancialSnapshot,
} from "~/types/vibe-raising";

const MIX_COLORS: Record<string, string> = {
    sponsorships_grants: "#087FD4",
    ticket_sales: "#FF5A1F",
    programs_services: "#08B47A",
    tech_projects: "#F59E0B",
    other: "#94A3B8",
};

function monthLabel(month: string) {
    const parsed = new Date(`${month.slice(0, 10)}T00:00:00`);
    return Number.isNaN(parsed.getTime())
        ? month
        : parsed.toLocaleDateString("en-AU", { month: "short", year: "2-digit" });
}

function chartLabel(value: unknown, maxLength = 30) {
    const label = String(value || "").replace(/\s+/g, " ").trim();
    return label.length > maxLength ? `${label.slice(0, maxLength - 1).trimEnd()}…` : label;
}

function currencyFormatter(currency: string, compact = false) {
    const formatter = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: currency || "AUD",
        currencyDisplay: "narrowSymbol",
        notation: compact ? "compact" : "standard",
        maximumFractionDigits: compact ? 1 : 0,
    });
    return (value: number | string) => formatter.format(Number(value) || 0);
}

function ChartCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[var(--vr-color-border)] bg-white p-4 shadow-sm sm:p-5">
            <h3 className="text-base font-black text-gray-950 sm:text-lg">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{subtitle}</p>
            {children}
        </section>
    );
}

export default function FinancialChartsSection({
    snapshot,
    analysis,
}: {
    snapshot: VibeRaisingFinancialSnapshot;
    analysis?: VibeRaisingConciseAnalysis | null;
}) {
    const performance = Array.isArray(snapshot.performance) ? snapshot.performance : [];
    const revenueMix = Array.isArray(snapshot.revenueMix) ? snapshot.revenueMix : [];
    const eventContribution = Array.isArray(snapshot.eventContribution) ? snapshot.eventContribution : [];
    const overhead = Array.isArray(snapshot.overhead) ? snapshot.overhead : [];
    const formatMoney = currencyFormatter(snapshot.currency);
    const formatCompactMoney = currencyFormatter(snapshot.currency, true);
    const targetPoint = performance.find((point) => point.month === snapshot.targetMonth);
    const mixKeys = Array.from(
        new Map(
            revenueMix.flatMap((point) => point.segments.map((segment) => [segment.key, segment.label] as const)),
        ).entries(),
    );
    const mixData = revenueMix.map((point) => ({
        month: point.month,
        ...Object.fromEntries(point.segments.map((segment) => [segment.key, segment.amount])),
    }));
    const partialLabel = targetPoint?.isPartial && snapshot.asOfDate
        ? `Partial month through ${new Date(`${snapshot.asOfDate}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}`
        : null;

    return (
        <div className="space-y-4 bg-gray-50/60 px-4 py-5 sm:px-6 sm:py-6">
            {(analysis?.headline || analysis?.bullets.length) ? (
                <section className="rounded-2xl border border-[rgba(0,128,128,0.18)] bg-[rgba(0,255,215,0.08)] p-4 sm:p-5">
                    {analysis.headline ? (
                        <h2 className="text-base font-black leading-6 text-gray-950 sm:text-lg">{analysis.headline}</h2>
                    ) : null}
                    {analysis.bullets.length ? (
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm font-medium leading-6 text-gray-700 marker:text-[var(--vr-color-primary)]">
                            {analysis.bullets.slice(0, 3).map((bullet, index) => (
                                <li key={`${index}-${bullet}`}>{bullet}</li>
                            ))}
                        </ul>
                    ) : null}
                </section>
            ) : null}

            <ChartCard
                title="Monthly income, expenses and net result"
                subtitle={`Trailing 12 months · ${snapshot.currency}${partialLabel ? ` · ${partialLabel}` : ""}`}
            >
                <div className="mt-4 h-56 w-full" role="img" aria-label="Line chart of monthly income and expenses">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <LineChart data={performance} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--vr-color-border)" vertical={false} />
                            <XAxis dataKey="month" tickFormatter={monthLabel} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} minTickGap={22} />
                            <YAxis tickFormatter={formatCompactMoney} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} width={52} />
                            <Tooltip labelFormatter={(label) => monthLabel(String(label))} formatter={(value, name) => [formatMoney(Number(value)), name === "income" ? "Income" : "Expenses"]} />
                            <Legend formatter={(value) => value === "income" ? "Income" : "Expenses"} />
                            <Line type="monotone" dataKey="income" stroke="#087FD4" strokeWidth={3} dot={{ r: 2 }} isAnimationActive={false} />
                            <Line type="monotone" dataKey="expenses" stroke="#FF5A1F" strokeWidth={3} dot={{ r: 2 }} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-3 h-40 w-full" role="img" aria-label="Bar chart of monthly net surplus or deficit">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={performance} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--vr-color-border)" vertical={false} />
                            <XAxis dataKey="month" tickFormatter={monthLabel} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} minTickGap={22} />
                            <YAxis tickFormatter={formatCompactMoney} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} width={52} />
                            <Tooltip labelFormatter={(label) => monthLabel(String(label))} formatter={(value) => [formatMoney(Number(value)), "Net result"]} />
                            <ReferenceLine y={0} stroke="#94A3B8" />
                            <Bar dataKey="net" name="Net result" isAnimationActive={false}>
                                {performance.map((point) => (
                                    <Cell key={point.month} fill={point.net >= 0 ? "#087FD4" : "#F43F5E"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ChartCard>

            {mixData.length ? (
                <ChartCard title="Revenue mix by month" subtitle={`Selected month and previous five · ${snapshot.currency}`}>
                    <div className="mt-4 h-72 w-full" role="img" aria-label="Stacked bar chart of monthly revenue by source">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={mixData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--vr-color-border)" vertical={false} />
                                <XAxis dataKey="month" tickFormatter={monthLabel} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                                <YAxis tickFormatter={formatCompactMoney} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} width={52} />
                                <Tooltip labelFormatter={(label) => monthLabel(String(label))} formatter={(value, name) => [formatMoney(Number(value)), String(name)]} />
                                <Legend />
                                {mixKeys.map(([key, label]) => (
                                    <Bar key={key} dataKey={key} name={label} stackId="revenue" fill={MIX_COLORS[key] || "#94A3B8"} isAnimationActive={false} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            ) : null}

            {eventContribution.length ? (
                <ChartCard title="Event contribution" subtitle={`${monthLabel(snapshot.targetMonth)} completed event income less attributed costs`}>
                    <div className="mt-4 w-full" style={{ height: Math.max(240, eventContribution.length * 48) }} role="img" aria-label="Horizontal bar chart of event net contribution">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={eventContribution} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 12 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--vr-color-border)" horizontal={false} />
                                <XAxis type="number" tickFormatter={formatCompactMoney} tick={{ fontSize: 10, fill: "#64748b" }} />
                                <YAxis type="category" dataKey="label" width={168} tickFormatter={chartLabel} tick={{ fontSize: 11, fill: "#334155" }} tickLine={false} />
                                <Tooltip formatter={(value) => [formatMoney(Number(value)), "Net contribution"]} />
                                <ReferenceLine x={0} stroke="#94A3B8" />
                                <Bar dataKey="net" name="Net contribution" isAnimationActive={false}>
                                    {eventContribution.map((event) => (
                                        <Cell key={event.label} fill={event.net >= 0 ? "#087FD4" : "#F43F5E"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            ) : null}

            {overhead.length ? (
                <ChartCard title="Central overhead" subtitle={`${monthLabel(snapshot.targetMonth)} · top five unallocated categories plus Other`}>
                    <div className="mt-4 w-full" style={{ height: Math.max(220, overhead.length * 42) }} role="img" aria-label="Horizontal bar chart of central overhead categories">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={overhead} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 12 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--vr-color-border)" horizontal={false} />
                                <XAxis type="number" tickFormatter={formatCompactMoney} tick={{ fontSize: 10, fill: "#64748b" }} />
                                <YAxis type="category" dataKey="label" width={168} tickFormatter={chartLabel} tick={{ fontSize: 11, fill: "#334155" }} tickLine={false} />
                                <Tooltip formatter={(value) => [formatMoney(Number(value)), "Overhead"]} />
                                <Bar dataKey="amount" name="Overhead" fill="#087FD4" isAnimationActive={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            ) : null}

            <div className="sr-only">
                <p>{analysis?.headline}</p>
                <ul>
                    {performance.map((point) => (
                        <li key={point.month}>{monthLabel(point.month)}: income {formatMoney(point.income)}, expenses {formatMoney(point.expenses)}, net {formatMoney(point.net)}.</li>
                    ))}
                    {eventContribution.map((event) => (
                        <li key={event.label}>{event.label}: net contribution {formatMoney(event.net)}.</li>
                    ))}
                    {overhead.map((item) => (
                        <li key={item.label}>{item.label}: overhead {formatMoney(item.amount)}.</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

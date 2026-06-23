import { Link, useRouteLoaderData } from "react-router";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import type { loader as adminRootLoader } from "./vibe-raising-admin";
import VibeRaisingAdminUpdatesTable from "~/components/vibe-raising/VibeRaisingAdminUpdatesTable";
import type {
  VibeRaisingAdminBreakdownItem,
  VibeRaisingAdminStatCard,
  VibeRaisingAdminTimePoint,
} from "~/types/vibe-raising";

const STAT_ICONS = [UsersIcon, DocumentTextIcon, CheckCircleIcon, PencilSquareIcon, UserGroupIcon];
const STAT_ACCENTS = [
  "border-t-[var(--vr-palette-mint)]",
  "border-t-[var(--vr-palette-blue)]",
  "border-t-[var(--vr-palette-mint)]",
  "border-t-[var(--vr-palette-purple)]",
  "border-t-[var(--vr-palette-orange)]",
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function StatCard({ stat, index }: { stat: VibeRaisingAdminStatCard; index: number }) {
  const Icon = STAT_ICONS[index] ?? UsersIcon;
  const isDown = stat.trendDirection === "down";

  return (
    <div className={classNames("rounded-lg border border-slate-200 border-t-2 bg-white p-5 shadow-sm", STAT_ACCENTS[index] ?? STAT_ACCENTS[0])}>
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)]">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase leading-tight tracking-[0.12em] text-slate-500">{stat.label}</p>
          <p className="mt-2 [font-family:var(--vr-font-title)] text-4xl font-black leading-none tracking-normal text-slate-950">{stat.value}</p>
          {stat.trendLabel ? (
            <p className={classNames("mt-2 text-xs font-black", isDown ? "text-[var(--vr-color-accent)]" : "text-[var(--vr-color-primary)]")}>
              {isDown ? "Down" : "Up"} {stat.trendLabel}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function UpdatesLineChart({ points }: { points: VibeRaisingAdminTimePoint[] }) {
  const width = 720;
  const height = 220;
  const paddingX = 42;
  const paddingY = 28;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const coordinates = points.map((point, index) => {
    const x = points.length === 1 ? paddingX + plotWidth / 2 : paddingX + (index / (points.length - 1)) * plotWidth;
    const y = paddingY + plotHeight - (point.value / maxValue) * plotHeight;
    return { ...point, x, y };
  });
  const path = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = coordinates.length
    ? `${path} L ${coordinates[coordinates.length - 1].x} ${height - paddingY} L ${coordinates[0].x} ${height - paddingY} Z`
    : "";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="[font-family:var(--vr-font-title)] text-2xl font-black tracking-normal text-slate-950">Updates over time</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">Monthly update creation across founder accounts.</p>
        </div>
        <span className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">Monthly</span>
      </div>
      {coordinates.length ? (
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Updates over time chart" className="h-64 w-full overflow-visible">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingY + plotHeight - ratio * plotHeight;
            return <line key={ratio} x1={paddingX} x2={width - paddingX} y1={y} y2={y} stroke="#d7d5d3" strokeDasharray="4 5" />;
          })}
          <path d={areaPath} fill="rgba(0,255,215,0.12)" />
          <path d={path} fill="none" stroke="var(--vr-color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {coordinates.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="5" fill="var(--vr-color-primary)" stroke="white" strokeWidth="3" />
              <text x={point.x} y={height - 6} textAnchor="middle" className="fill-slate-600 text-xs font-bold">{point.label}</text>
            </g>
          ))}
        </svg>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg bg-slate-50 text-sm font-semibold text-slate-500">No timeline data yet.</div>
      )}
    </div>
  );
}

function BreakdownCard({ title, items }: { title: string; items: VibeRaisingAdminBreakdownItem[] }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="[font-family:var(--vr-font-title)] text-2xl font-black tracking-normal text-slate-950">{title}</h2>
      <div className="mt-5 space-y-4">
        {items.length ? items.map((item) => {
          const width = `${Math.max(8, (item.value / maxValue) * 100)}%`;
          return (
            <div key={item.label} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 text-sm">
              <span className="font-bold text-slate-700">{item.label}</span>
              <span className="h-3 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full rounded-full bg-[var(--vr-color-primary)]" style={{ width }} />
              </span>
              <span className="whitespace-nowrap text-xs font-bold text-slate-500">
                {item.valueText || item.value.toLocaleString("en-AU")} {item.percentageText ? `(${item.percentageText})` : ""}
              </span>
            </div>
          );
        }) : (
          <div className="flex h-48 items-center justify-center rounded-lg bg-slate-50 text-sm font-semibold text-slate-500">No breakdown data yet.</div>
        )}
      </div>
    </div>
  );
}

export default function VibeRaisingAdminOverviewRoute() {
  const rootData = useRouteLoaderData<typeof adminRootLoader>("vibe-raising-admin-root");
  const overview = rootData?.overview;

  if (!overview) return null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="[font-family:var(--vr-font-title)] text-5xl font-black leading-none tracking-normal text-slate-950">Admin Overview</h1>
        <p className="mt-2 text-base font-medium text-slate-500">Monitor monthly updates across founder accounts.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5" aria-label="Admin metrics">
        {overview.stats.map((stat, index) => <StatCard key={stat.key} stat={stat} index={index} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr_1fr]">
        <UpdatesLineChart points={overview.updatesOverTime} />
        <BreakdownCard title="Updates by startup stage" items={overview.updatesByStage} />
        <BreakdownCard title="Updates by industry" items={overview.updatesByIndustry} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="[font-family:var(--vr-font-title)] text-2xl font-black tracking-normal text-slate-950">Recent founder updates</h2>
          <Link to="/founder-tools/admin/updates" className="text-sm font-black text-[var(--vr-color-primary)] hover:text-slate-950">
            View all updates
          </Link>
        </div>
        <VibeRaisingAdminUpdatesTable updates={overview.recentUpdates.slice(0, 5)} />
      </section>
    </div>
  );
}
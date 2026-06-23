import { Link } from "react-router";
import type { VibeRaisingAdminUpdateSummary } from "~/types/vibe-raising";

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatAdminDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function getAdminStatusLabel(status?: string | null) {
  const normalized = String(status || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (normalized === "published") return "Published";
  if (normalized === "draft" || normalized === "private") return "Draft";
  if (normalized === "ready" || normalized === "review" || normalized === "in_review") return "In Review";
  return status || "Unknown";
}

export function VibeRaisingAdminStatusBadge({ status }: { status?: string | null }) {
  const normalized = String(status || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  const tone = normalized === "published"
    ? "bg-[rgba(0,128,128,0.12)] text-[var(--vr-color-primary)] ring-[rgba(0,128,128,0.20)]"
    : normalized === "draft" || normalized === "private"
      ? "bg-slate-100 text-slate-600 ring-slate-200"
      : "bg-orange-50 text-[var(--vr-color-accent)] ring-orange-200";

  return (
    <span className={classNames("inline-flex items-center rounded-md px-2.5 py-1 text-xs font-black ring-1", tone)}>
      {getAdminStatusLabel(status)}
    </span>
  );
}

function StartupMark({ update }: { update: VibeRaisingAdminUpdateSummary }) {
  if (update.startupAvatarUrl) {
    return <img src={update.startupAvatarUrl} alt="" className="h-8 w-8 rounded-md object-cover ring-1 ring-black/10" />;
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
      {update.startupName.charAt(0).toUpperCase()}
    </span>
  );
}

export default function VibeRaisingAdminUpdatesTable({
  updates,
  emptyLabel = "No founder updates found.",
}: {
  updates: VibeRaisingAdminUpdateSummary[];
  emptyLabel?: string;
}) {
  if (!updates.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-5 py-8 text-center text-sm font-semibold text-slate-500">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
              <th className="px-5 py-3">Startup</th>
              <th className="px-5 py-3">Update month</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last updated</th>
              <th className="px-5 py-3">Founder</th>
              <th className="px-5 py-3">Admin action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {updates.map((update) => (
              <tr key={update.id} className="transition hover:bg-[rgba(0,255,215,0.05)]">
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex items-center gap-3">
                    <StartupMark update={update} />
                    <span className="font-black text-slate-900">{update.startupName}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-semibold text-slate-600">{update.updateMonth}</td>
                <td className="whitespace-nowrap px-5 py-3"><VibeRaisingAdminStatusBadge status={update.status} /></td>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">{formatAdminDate(update.lastUpdatedAt)}</td>
                <td className="whitespace-nowrap px-5 py-3 font-semibold text-slate-600">{update.founderName || "-"}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <Link
                    to={`/founder-tools/admin/updates/${encodeURIComponent(update.id)}`}
                    className="inline-flex min-w-28 justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-[var(--vr-color-primary)] hover:text-[var(--vr-color-primary)]"
                  >
                    {update.actionLabel || "View"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
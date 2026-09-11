import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { VibeRaisingAppUser, VibeRaisingMonthlyUpdate } from "~/types/vibe-raising";
import { getUpdateExcerpt, getUpdatePeriod, getUpdateTitles, sortStartupUpdates } from "~/lib/startup-updates-presentation";
import type { UpdatesFinancialSeries } from "~/lib/startup-updates-presentation";
import UpdatesIncomeChart from "./UpdatesIncomeChart";
import "~/styles/startup-updates.css";

const LINK_FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700";
const COVER_PALETTES = ["paper", "sage", "clay", "ink"];

function UpdateCover({ update, companyName, featured }: { update: VibeRaisingMonthlyUpdate; companyName: string; featured: boolean }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const period = getUpdatePeriod(update);
  const number = period.month?.slice(5, 7) || "—";
  const imageUrl = update.coverImageUrl?.trim();
  const safeImage = imageUrl && (/^https?:\/\//.test(imageUrl) || /^\/(?!\/)/.test(imageUrl));
  if (safeImage && failedImage !== imageUrl) {
    return <img src={imageUrl} alt="" width={800} height={440}
      loading={featured ? "eager" : "lazy"} onError={() => setFailedImage(imageUrl)}
      className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.025]" />;
  }
  return <div className={`update-cover update-cover--${COVER_PALETTES[(Number(number) || 0) % COVER_PALETTES.length]}`} aria-hidden="true">
    <span className="update-cover-orbit" /><span className="update-cover-rule" />
    <span className="update-cover-brand">{companyName}</span><span className="update-cover-number">{number}</span>
    <span className="update-cover-caption">THE UPDATE</span><span className="update-cover-year">{period.year}</span>
  </div>;
}

export function UpdateStoryCard({ update, title, companyName, variant = "compact" }: {
  update: VibeRaisingMonthlyUpdate; title: string; companyName: string; variant?: "featured" | "compact" | "archive";
}) {
  const featured = variant === "featured";
  const compact = variant === "compact";
  const period = getUpdatePeriod(update);
  const excerpt = getUpdateExcerpt(update);
  const href = `/founder-tools/updates/${encodeURIComponent(update.id)}`;
  return <article className={`min-w-0 ${compact ? "border-b border-[#dfe6e2] py-5 first:pt-0 last:border-0" : ""}`}>
    <Link to={href} className={`group block rounded-xl ${LINK_FOCUS} ${compact ? "grid grid-cols-[minmax(0,1fr)_112px] items-start gap-5 sm:grid-cols-[minmax(0,1fr)_144px] lg:grid-cols-[minmax(0,1fr)_120px] xl:grid-cols-[minmax(0,1fr)_150px]" : ""}`}
      aria-label={`Read ${title}${period.year ? `, ${period.year}` : ""}`}>
      <div className={`overflow-hidden rounded-xl ${compact ? "col-start-2 row-start-1 aspect-square" : "aspect-[1.85/1]"}`}>
        <UpdateCover update={update} companyName={companyName} featured={featured} />
      </div>
      <div className={compact ? "col-start-1 row-start-1 min-w-0 py-1" : "pt-5"}>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
          {featured && <span className="font-semibold tracking-[0.12em] text-teal-800">LATEST UPDATE</span>}
          {period.year && <span>{period.year}</span>}
          {update.reportingPeriod?.is_partial && <span>· Month to date{period.date ? ` · through ${Number(period.date.slice(8))} ${period.monthName}` : ""}</span>}
          {update.evidenceStatus === "legacy_unverified" && <span>· Unverified archive</span>}
        </div>
        <h3 className={`mt-2 font-semibold tracking-tight text-[#152c34] transition-colors group-hover:text-teal-800 ${featured ? "text-3xl leading-tight sm:text-[2.5rem]" : compact ? "text-xl leading-snug" : "text-2xl"}`}>{title}</h3>
        {excerpt && <p className={`mt-2.5 leading-relaxed text-[#5a6b70] ${featured ? "line-clamp-3 text-base sm:text-lg" : "line-clamp-3 text-sm"}`}>{excerpt}</p>}
        {!compact && <div className="mt-6 flex items-center justify-between gap-4">
          <span className="truncate text-sm text-slate-500">{companyName}</span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-teal-800">Read update <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
        </div>}
      </div>
    </Link>
  </article>;
}

export default function StartupUpdatesPage({ user, updates, financialSeries, runStatus }: {
  user: Pick<VibeRaisingAppUser, "companyName" | "role">;
  updates: VibeRaisingMonthlyUpdate[];
  financialSeries: UpdatesFinancialSeries | null;
  runStatus?: React.ReactNode;
}) {
  const [params] = useSearchParams();
  const all = params.get("view") === "all";
  const [visibleCount, setVisibleCount] = useState(12);
  const ordered = sortStartupUpdates(updates);
  // Count the whole collection before taking the featured/side/archive slices.
  const titles = getUpdateTitles(ordered);
  const companyName = user.companyName.trim() || "Your Startup";
  const owner = user.role === "founder";
  const latestParams = new URLSearchParams(params);
  latestParams.delete("view");
  const archiveParams = new URLSearchParams(latestParams);
  archiveParams.set("view", "all");
  const latestHref = `/founder-tools/updates${latestParams.size ? `?${latestParams}` : ""}`;
  const archiveHref = `/founder-tools/updates?${archiveParams}#all-updates`;

  return <div className="startup-updates mx-auto max-w-[1320px] pb-16">
    <header className="mb-8 flex flex-wrap items-start justify-between gap-5 sm:mb-10">
      <div className="min-w-0">
        <h1 className="break-words text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#152c34] sm:text-5xl">{companyName} Updates</h1>
        <p className="mt-3 text-base text-[#65767b] sm:text-lg">What we're building, delivering and learning.</p>
      </div>
      {owner && <div className="flex items-center gap-4 pt-1">
        <Link to="/founder-tools/drafts" className={`rounded py-2 text-sm text-slate-600 hover:text-teal-800 ${LINK_FOCUS}`}>Drafts</Link>
        <Link to="/founder-tools/updates/create" className={`inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-900 ${LINK_FOCUS}`}>
          <PlusIcon className="h-4 w-4" /> New update
        </Link>
      </div>}
    </header>
    {runStatus}
    {financialSeries && !all && <div className="mb-10 sm:mb-12"><UpdatesIncomeChart key={`${financialSeries.sourceUpdateId}-${financialSeries.currency}`} series={financialSeries} /></div>}
    {ordered.length === 0 ? <section className="rounded-2xl border border-[#dce5df] bg-white px-6 py-16 text-center">
      <p className="text-2xl font-semibold text-[#152c34]">Your story starts here</p>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-500">Capture what you've been working on. Your first update will take the featured spot here.</p>
      {owner && <Link to="/founder-tools/updates/create" className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-teal-800 px-5 py-3 text-sm font-semibold text-white ${LINK_FOCUS}`}>Create your first update <ArrowRightIcon className="h-4 w-4" /></Link>}
    </section> : all ? <section id="all-updates" aria-labelledby="all-updates-heading" className="scroll-mt-24">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h2 id="all-updates-heading" className="text-2xl font-semibold tracking-tight text-[#152c34]">All updates <span className="ml-2 text-base font-normal text-slate-500">{ordered.length}</span></h2>
        <Link to={latestHref} className={`inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-teal-800 ${LINK_FOCUS}`}><ArrowLeftIcon className="h-4 w-4" /> Latest updates</Link>
      </div>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {ordered.slice(0, visibleCount).map(update => <UpdateStoryCard key={update.id} update={update} title={titles.get(update.id)!} companyName={companyName} variant="archive" />)}
      </div>
      {visibleCount < ordered.length && <button type="button" onClick={() => setVisibleCount(count => count + 12)}
        className={`mx-auto mt-10 block min-h-11 rounded-xl border border-teal-800 px-6 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-50 ${LINK_FOCUS}`}>Show more updates</button>}
    </section> : <section aria-labelledby="latest-updates-heading">
      <h2 id="latest-updates-heading" className="mb-6 text-2xl font-semibold tracking-tight text-[#152c34]">Latest updates</h2>
      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-12">
        <UpdateStoryCard update={ordered[0]} title={titles.get(ordered[0].id)!} companyName={companyName} variant="featured" />
        <div className="min-w-0">
          {ordered.slice(1, 4).map(update => <UpdateStoryCard key={update.id} update={update} title={titles.get(update.id)!} companyName={companyName} />)}
          <Link to={archiveHref} className={`mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#bfd2ca] bg-white px-5 py-3 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-[#f0f6f3] ${LINK_FOCUS}`}>
            See all updates <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>}
  </div>;
}

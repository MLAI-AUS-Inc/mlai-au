import { Link } from "react-router";
import {
  ArrowRightIcon,
  BoltIcon,
  HomeModernIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

const TRACKS = [
  {
    to: "/watt-the-hack/docs/base44-pitching",
    eyebrow: "Pitching track",
    title: "Base44 Pitching Track",
    body: "Tackle a real energy challenge, build a demo or MVP with Base44, and pitch to the judges. Covers how to win, mentors, the judging criteria, and pitch night.",
    Icon: PresentationChartBarIcon,
    iconBg: "bg-emerald-100 text-emerald-700",
    border: "hover:border-emerald-400",
    eyebrowColor: "text-emerald-700",
  },
  {
    to: "/watt-the-hack/docs/grid-guardian",
    eyebrow: "Advanced · coding",
    title: "City of Melbourne — Grid Guardian",
    body: "Grid Simulator Mechanics: grid components, financial constraints, FCAS, writing a Python controller, local playtesting, and the submission guide.",
    Icon: BoltIcon,
    iconBg: "bg-sky-100 text-sky-700",
    border: "hover:border-sky-400",
    eyebrowColor: "text-sky-700",
  },
  {
    to: "/watt-the-hack/docs/smart-home",
    eyebrow: "Beginner · coding",
    title: "Amber Electric — Smart Home",
    body: "Get started with the beginner Smart Home track: how the home controller loop works, the upgrade shop, scoring, and how to deploy your build.",
    Icon: HomeModernIcon,
    iconBg: "bg-amber-100 text-amber-700",
    border: "hover:border-amber-400",
    eyebrowColor: "text-amber-700",
  },
];

export default function DocsIndex() {
  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-2xl border border-sky-300 bg-gradient-to-br from-sky-50 via-white to-emerald-50/40 p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Watt The Hack Docs</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Everything you need for each track of Watt The Hack. Pick the track you&apos;re competing in to dive into its
          full guide — rules, mechanics, scoring, and how to submit or pitch.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((track) => (
          <Link
            key={track.to}
            to={track.to}
            className={`group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:shadow-md ${track.border}`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${track.iconBg}`}>
              <track.Icon className="h-6 w-6" />
            </div>
            <p className={`mt-4 text-[11px] font-bold uppercase tracking-[0.14em] ${track.eyebrowColor}`}>
              {track.eyebrow}
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-ink">{track.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{track.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
              Open docs
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

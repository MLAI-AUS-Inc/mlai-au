import { useEffect, useState } from "react";
import type { Route } from "./+types/watt-the-hack.dashboard";
import { Link, redirect, useLoaderData } from "react-router";
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  PaperAirplaneIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Announcements from "~/components/Announcements";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import {
  getGenericAnnouncements,
  getGenericCurrentTeam,
  getGenericHackathon,
  WATT_THE_HACK_SLUG,
  type GenericHackathonTeam,
} from "~/lib/generic-hackathon";
import { wattClasses, wattImages } from "~/lib/watt-theme";
import { relativeTime, type LeaderboardEntry } from "~/lib/watt-the-hack-leaderboard";
import { wattTheHackSchedule } from "~/lib/watt-the-hack-schedule";
import type { Hackathon } from "~/services/hackathon";

const FALLBACK_HACKATHON: Hackathon = {
  name: "Watt The Hack",
  slug: WATT_THE_HACK_SLUG,
  description: "Build practical AI and software projects for a cleaner, smarter energy future.",
  start_date: "2026-06-01",
  end_date: "2026-12-31",
};

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  let user = null;
  try {
    user = await getCurrentUser(env, request);
  } catch (error) {
    console.warn("Treating Watt The Hack auth lookup failure as logged out.", error);
  }
  if (!user) {
    throw redirect("/platform/login?app=watt-the-hack&next=/watt-the-hack/dashboard");
  }

  const [hackathon, announcements, team] = await Promise.all([
    getGenericHackathon(env, request).catch(() => FALLBACK_HACKATHON),
    getGenericAnnouncements(env, request).catch(() => []),
    getGenericCurrentTeam(env, request).catch(() => null),
  ]);

  return {
    hackathon,
    announcements,
    team,
  };
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof UserGroupIcon;
}) {
  return (
    <div className={`${wattClasses.panel} relative min-h-[112px] overflow-hidden px-6 py-5`}>
      <img
        src={wattImages.bottomScene}
        alt=""
        className="pointer-events-none absolute -bottom-7 -right-9 w-36 opacity-90"
      />
      <div className="relative flex items-center gap-5">
        <span className={wattClasses.iconTile}>
          <Icon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#485244]">{label}</p>
          <p className="mt-0.5 text-xl font-black leading-tight text-[#121e16]">{value}</p>
          <p className="mt-1 text-sm font-medium text-[#354031]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function TeamPanel({ team }: { team: GenericHackathonTeam | null }) {
  return (
    <div className={`${wattClasses.panel} px-6 py-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <span className={wattClasses.iconTile}>
            <UserGroupIcon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-xl font-black leading-tight text-[#121e16]">Team</h2>
            <p className="mt-1 truncate text-sm font-medium text-[#354031]">
              {team ? `${team.team_name} (${team.code})` : "Create or join a team before submitting."}
            </p>
          </div>
        </div>
        <Link to="/watt-the-hack/profile" className={`${wattClasses.buttonOutline} shrink-0 px-6`}>
          Manage
        </Link>
      </div>

      {team && (
        <div className="mt-5 flex flex-wrap gap-2">
          {team.members.map((member) => (
            <span key={member.id} className={wattClasses.chip}>
              {member.full_name || member.email}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function HowToSubmitCard() {
  return (
    <Link
      to="/watt-the-hack/docs"
      className={`${wattClasses.panel} group relative block min-h-[112px] overflow-hidden px-6 py-5 transition hover:border-[#c9dbb8]`}
    >
      <img
        src={wattImages.bottomScene}
        alt=""
        className="pointer-events-none absolute -bottom-7 -right-9 w-36 opacity-90"
      />
      <div className="relative flex items-center gap-5">
        <span className={wattClasses.iconTile}>
          <PaperAirplaneIcon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#485244]">Submission</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xl font-black leading-tight text-[#121e16]">
            How to submit
            <ArrowRightIcon
              className="h-4 w-4 stroke-[2.4] text-[#155420] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </p>
          <p className="mt-1 text-sm font-medium text-[#354031]">Steps for all three tracks</p>
        </div>
      </div>
    </Link>
  );
}

const STANDINGS_LIMIT = 3;

function StandingsPanel() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(
          `/watt-the-hack/city-of-melbourne-advanced-leaderboard-data?limit=${STANDINGS_LIMIT}`,
          { headers: { Accept: "application/json" } },
        );
        if (!res.ok) throw new Error(`Leaderboard service responded ${res.status}`);
        const data = (await res.json()) as LeaderboardEntry[];
        if (!Array.isArray(data)) throw new Error("Unexpected leaderboard response");
        const top = [...data].sort((a, b) => a.rank - b.rank).slice(0, STANDINGS_LIMIT);
        if (!cancelled) {
          setEntries(top);
          setPhase("ready");
        }
      } catch {
        if (!cancelled) setPhase("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`${wattClasses.panel} px-6 py-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrophyIcon className="h-7 w-7 text-[#155420]" aria-hidden="true" />
          <h2 className="text-xl font-black leading-tight text-[#121e16]">Final Standings</h2>
        </div>
        <Link
          to="/watt-the-hack/city-of-melbourne-advanced-leaderboard"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-[#155420] hover:text-[#2f6f2c]"
        >
          View all
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {phase === "loading" ? (
        <ul className="mt-4 space-y-2.5">
          {Array.from({ length: STANDINGS_LIMIT }).map((_, i) => (
            <li
              key={i}
              className="h-[58px] animate-pulse rounded-xl border border-[#e8dfcf] bg-[#efe6d4]/60"
            />
          ))}
        </ul>
      ) : phase === "error" ? (
        <p className="mt-4 text-sm font-medium text-[#64705f]">
          Couldn&apos;t load standings just now —{" "}
          <Link
            to="/watt-the-hack/city-of-melbourne-advanced-leaderboard"
            className="font-black text-[#155420] hover:text-[#2f6f2c]"
          >
            open the leaderboard
          </Link>
          .
        </p>
      ) : entries.length === 0 ? (
        <p className="mt-4 text-sm font-medium text-[#64705f]">
          No standings yet — they&apos;ll appear once teams are scored.
        </p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {entries.map((entry) => {
            const score = Number.isFinite(entry.final_score) ? entry.final_score : 0;
            return (
              <li
                key={entry.team_name}
                className="flex items-center gap-4 rounded-xl border border-[#e8dfcf] bg-[rgba(255,254,250,0.88)] px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6efd7] text-sm font-black tabular-nums text-[#155420]">
                  {entry.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#121e16]">{entry.team_name}</p>
                  <p className="mt-0.5 truncate text-xs font-medium text-[#64705f]">
                    {entry.scored_at ? `best run ${relativeTime(entry.scored_at)}` : "awaiting first score"}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-base font-black tabular-nums text-[#121e16]">{score.toFixed(2)}</p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#64705f]">pts</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const DOC_LINKS: { title: string; summary: string; to: string }[] = [
  { title: "Overview & Submission Guide", summary: "Event overview and how to submit", to: "/watt-the-hack/docs" },
  { title: "Pitching Track", summary: "Base44 pitching guide and judging", to: "/watt-the-hack/docs/base44-pitching" },
  { title: "Advanced Track", summary: "City of Melbourne — Grid Guardian", to: "/watt-the-hack/docs/grid-guardian" },
  { title: "Beginner Track", summary: "Amber Electric — Smart Home", to: "/watt-the-hack/docs/smart-home" },
];

function ResourcesPanel() {
  return (
    <div className={`${wattClasses.panel} px-6 py-5 sm:px-7`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="h-8 w-8 text-[#155420]" aria-hidden="true" />
          <h2 className="text-xl font-black text-[#121e16]">Resources</h2>
        </div>
        <Link to="/watt-the-hack/docs" className="inline-flex items-center gap-2 text-sm font-black text-[#155420] hover:text-[#2f6f2c]">
          View all
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {DOC_LINKS.map((doc) => (
          <Link
            key={doc.to}
            to={doc.to}
            className="block rounded-xl border border-[#e8dfcf] bg-[rgba(255,254,250,0.88)] p-4 transition hover:border-[#c9dbb8] hover:bg-[#fffefa]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6efd7] text-[#155420]">
                  <DocumentTextIcon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#121e16]">{doc.title}</p>
                  <p className="mt-1 truncate text-xs font-medium text-[#354031]">{doc.summary}</p>
                </div>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 shrink-0 text-[#64705f]" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ScheduleSection() {
  const [activeDayId, setActiveDayId] = useState(wattTheHackSchedule[0].id);
  const activeDay =
    wattTheHackSchedule.find((day) => day.id === activeDayId) ?? wattTheHackSchedule[0];

  return (
    <section className={`${wattClasses.panel} px-6 py-5 sm:px-7`}>
      <div className="flex items-center gap-3">
        <CalendarDaysIcon className="h-8 w-8 text-[#155420]" aria-hidden="true" />
        <div>
          <h2 className="text-xl font-black text-[#121e16]">Schedule &amp; Runsheet</h2>
          <p className="mt-0.5 text-sm font-medium text-[#354031]">
            Two days of building, talks and pitches.
          </p>
        </div>
      </div>

      <div className="mt-5 inline-flex rounded-full border border-[#e8dfcf] bg-[#fbf6e9] p-1">
        {wattTheHackSchedule.map((day) => {
          const isActive = day.id === activeDayId;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setActiveDayId(day.id)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                isActive
                  ? "bg-[#2f6f2c] font-black text-white shadow-[0_8px_16px_rgba(21,84,32,0.18)]"
                  : "font-bold text-[#485244] hover:text-[#155420]"
              }`}
            >
              {day.shortLabel}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm font-semibold text-[#485244]">
        {activeDay.weekday} · {activeDay.date} · {activeDay.theme}
      </p>

      <ol className="mt-5">
        {activeDay.items.map((item, index) => {
          const isLast = index === activeDay.items.length - 1;
          return (
            <li key={`${item.time}-${item.title}`} className="flex gap-3 sm:gap-5">
              <div className="w-16 shrink-0 pt-0.5 text-right sm:w-20">
                <span className="text-sm font-black text-[#155420]">{item.time}</span>
              </div>
              <div className="flex w-3 shrink-0 flex-col items-center">
                <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full border-2 border-[#2f6f2c] bg-[#fffefa]" />
                {!isLast && <span className="mt-1 w-px flex-1 bg-[#e8dfcf]" />}
              </div>
              <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                <p className="font-black leading-snug text-[#121e16]">{item.title}</p>
                {item.detail && (
                  <p className="mt-0.5 text-sm leading-6 text-[#64705f]">{item.detail}</p>
                )}
                {item.people && item.people.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.people.map((person) => (
                      <span key={person} className={wattClasses.chip}>
                        {person}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default function WattTheHackDashboard() {
  const { hackathon, announcements, team } = useLoaderData<typeof loader>();

  return (
    <div className={wattClasses.page}>
      <div className="mx-auto max-w-[1324px] space-y-5">
        <section className={`${wattClasses.panelStrong} relative min-h-[300px] overflow-hidden px-6 py-8 sm:px-10 lg:px-16`}>
          <img
            src={wattImages.hero}
            alt=""
            className="absolute inset-y-0 right-0 h-full w-[68%] object-cover object-right opacity-100"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #fffefa 0%, rgba(255,254,250,0.98) 34%, rgba(255,254,250,0.62) 53%, rgba(255,254,250,0) 74%)",
            }}
          />
          <div className="relative flex min-h-[236px] max-w-[560px] flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#2f6f2c]">Participant Dashboard</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#122016] sm:text-6xl">{hackathon.name}</h1>
            <p className="mt-5 max-w-[430px] text-lg font-medium leading-7 text-[#243129]">{hackathon.description}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link to="/watt-the-hack/profile" className={`${wattClasses.buttonPrimary} gap-3 px-6 py-3`}>
                <UserGroupIcon className="h-5 w-5 stroke-[2.1]" aria-hidden="true" />
                Profile & Team
              </Link>
              <Link to="/watt-the-hack/submissions" className={`${wattClasses.buttonOutline} gap-3 px-6 py-3`}>
                <PaperAirplaneIcon className="h-5 w-5 stroke-[2.1] text-[#155420]" aria-hidden="true" />
                Submit Project
              </Link>
            </div>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          <StatCard
            label="Team Status"
            value={team ? "Joined" : "Not joined"}
            description={team ? team.team_name : "Create or join a team to get started."}
            icon={UserGroupIcon}
          />
          <StatCard
            label="Members"
            value={team ? String(team.member_count) : "0"}
            description={team ? "Your team is ready to build." : "You don't have any teammates yet."}
            icon={UserGroupIcon}
          />
          <HowToSubmitCard />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.08fr]">
          <Announcements announcements={announcements} variant="watt" />
          <div className="space-y-5">
            <TeamPanel team={team} />
            <StandingsPanel />
          </div>
        </div>

        <ResourcesPanel />

        <ScheduleSection />
      </div>
    </div>
  );
}

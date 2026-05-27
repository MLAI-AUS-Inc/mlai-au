import type { Route } from "./+types/watt-the-hack.dashboard";
import { Link, redirect, useLoaderData } from "react-router";
import {
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Announcements from "~/components/Announcements";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import {
  getGenericAnnouncements,
  getGenericCurrentTeam,
  getGenericHackathon,
  getGenericResources,
  getGenericSubmissions,
  WATT_THE_HACK_SLUG,
  type GenericHackathonResource,
  type GenericHackathonSubmission,
  type GenericHackathonTeam,
} from "~/lib/generic-hackathon";
import { wattClasses, wattImages } from "~/lib/watt-theme";
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

  const [hackathon, announcements, team, submissions, resources] = await Promise.all([
    getGenericHackathon(env, request).catch(() => FALLBACK_HACKATHON),
    getGenericAnnouncements(env, request).catch(() => []),
    getGenericCurrentTeam(env, request).catch(() => null),
    getGenericSubmissions(env, request).catch(() => []),
    getGenericResources(env, request).catch(() => []),
  ]);

  return {
    hackathon,
    announcements,
    team,
    latestSubmission: submissions[0] ?? null,
    resources: resources.slice(0, 3),
  };
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof UserGroupIcon }) {
  return (
    <div className={`${wattClasses.panel} p-5`}>
      <div className="flex items-center gap-3">
        <span className={wattClasses.iconTile}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium text-[#6f756c]">{label}</p>
          <p className="text-lg font-black text-[#20231d]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TeamPanel({ team }: { team: GenericHackathonTeam | null }) {
  return (
    <div className={`${wattClasses.panel} p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-[#20231d]">Team</h2>
          <p className="mt-1 text-sm text-[#6f756c]">
            {team ? `${team.team_name} (${team.code})` : "Create or join a team before submitting."}
          </p>
        </div>
        <Link to="/watt-the-hack/profile" className={wattClasses.buttonPrimary}>
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

function SubmissionPanel({ submission }: { submission: GenericHackathonSubmission | null }) {
  return (
    <div className={`${wattClasses.panel} p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-[#20231d]">Latest Submission</h2>
          <p className="mt-1 text-sm text-[#6f756c]">
            {submission ? submission.title : "No project submitted yet."}
          </p>
        </div>
        <Link to="/watt-the-hack/submissions" className={wattClasses.buttonYellow}>
          Submit
        </Link>
      </div>
      {submission && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#6f756c]">{submission.summary}</p>
      )}
    </div>
  );
}

function ResourcesPanel({ resources }: { resources: GenericHackathonResource[] }) {
  return (
    <div className={`${wattClasses.panel} p-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-[#20231d]">Resources</h2>
        <Link to="/watt-the-hack/resources" className="text-sm font-black text-[#1f5b2c] hover:text-[#3d7339]">
          View all
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {resources.length > 0 ? resources.map((resource) => (
          <Link key={resource.id} to="/watt-the-hack/resources" className="block rounded-2xl border border-[#e7dfcf] bg-[#fffdf7] p-3 transition hover:border-[#c9dbb8] hover:bg-[#dfead1]/45">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-[#20231d]">{resource.title}</p>
                <p className="mt-1 text-sm text-[#6f756c]">{resource.summary}</p>
              </div>
              <ArrowTopRightOnSquareIcon className="mt-1 h-4 w-4 text-[#1f5b2c]" aria-hidden="true" />
            </div>
          </Link>
        )) : (
          <p className="text-sm text-[#6f756c]">Resources will appear here when they are published.</p>
        )}
      </div>
    </div>
  );
}

export default function WattTheHackDashboard() {
  const { hackathon, announcements, team, latestSubmission, resources } = useLoaderData<typeof loader>();

  return (
    <div className={wattClasses.page}>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[1.5rem] bg-[#1f5b2c] px-6 py-8 text-white shadow-[0_24px_60px_rgba(31,91,44,0.18)] sm:px-8">
          <img
            src={wattImages.hero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f5b2c] via-[#245f2e]/88 to-[#f2c34c]/25" />
          <div className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-[#f2c34c]/35 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#f5d84f]">Participant Dashboard</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{hackathon.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{hackathon.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/watt-the-hack/profile" className="inline-flex items-center justify-center rounded-full bg-[#f5d84f] px-4 py-2 text-sm font-black text-[#1e321d] shadow-[0_12px_26px_rgba(0,0,0,0.18)] transition hover:bg-[#f2c34c]">
                Profile & Team
              </Link>
              <Link to="/watt-the-hack/submissions" className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur transition hover:bg-white/18">
                Submit Project
              </Link>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Team Status" value={team ? "Joined" : "Not joined"} icon={UserGroupIcon} />
          <StatCard label="Members" value={team ? String(team.member_count) : "0"} icon={UserGroupIcon} />
          <StatCard label="Submission" value={latestSubmission ? "Received" : "Not submitted"} icon={DocumentTextIcon} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Announcements announcements={announcements} variant="watt" />
            <ResourcesPanel resources={resources} />
          </div>
          <div className="space-y-6">
            <TeamPanel team={team} />
            <SubmissionPanel submission={latestSubmission} />
          </div>
        </div>
      </div>
    </div>
  );
}

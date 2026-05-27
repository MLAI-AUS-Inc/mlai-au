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
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f8d8] text-[#24523f]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-lg font-semibold text-gray-950">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TeamPanel({ team }: { team: GenericHackathonTeam | null }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-950">Team</h2>
          <p className="mt-1 text-sm text-gray-600">
            {team ? `${team.team_name} (${team.code})` : "Create or join a team before submitting."}
          </p>
        </div>
        <Link to="/watt-the-hack/profile" className="rounded-md bg-[#10231f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1d3c35]">
          Manage
        </Link>
      </div>
      {team && (
        <div className="mt-5 flex flex-wrap gap-2">
          {team.members.map((member) => (
            <span key={member.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
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
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-950">Latest Submission</h2>
          <p className="mt-1 text-sm text-gray-600">
            {submission ? submission.title : "No project submitted yet."}
          </p>
        </div>
        <Link to="/watt-the-hack/submissions" className="rounded-md bg-[#9fe870] px-3 py-2 text-sm font-semibold text-[#10231f] hover:bg-[#b2f38a]">
          Submit
        </Link>
      </div>
      {submission && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">{submission.summary}</p>
      )}
    </div>
  );
}

function ResourcesPanel({ resources }: { resources: GenericHackathonResource[] }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-950">Resources</h2>
        <Link to="/watt-the-hack/resources" className="text-sm font-semibold text-[#1f6f54] hover:text-[#10231f]">
          View all
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {resources.length > 0 ? resources.map((resource) => (
          <Link key={resource.id} to="/watt-the-hack/resources" className="block rounded-md border border-black/8 p-3 hover:bg-gray-50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-gray-950">{resource.title}</p>
                <p className="mt-1 text-sm text-gray-600">{resource.summary}</p>
              </div>
              <ArrowTopRightOnSquareIcon className="mt-1 h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          </Link>
        )) : (
          <p className="text-sm text-gray-600">Resources will appear here when they are published.</p>
        )}
      </div>
    </div>
  );
}

export default function WattTheHackDashboard() {
  const { hackathon, announcements, team, latestSubmission, resources } = useLoaderData<typeof loader>();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-lg bg-[#10231f] px-6 py-8 text-white shadow-sm sm:px-8">
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10231f] via-[#10231f]/90 to-[#10231f]/40" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9fe870]">Participant Dashboard</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{hackathon.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{hackathon.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/watt-the-hack/profile" className="rounded-md bg-[#9fe870] px-4 py-2 text-sm font-semibold text-[#10231f] hover:bg-[#b2f38a]">
                Profile & Team
              </Link>
              <Link to="/watt-the-hack/submissions" className="rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
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
            <Announcements announcements={announcements} />
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

import { useState } from "react";
import type { Route } from "./+types/watt-the-hack.dashboard";
import { Link, redirect, useLoaderData } from "react-router";
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
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
    resources: resources.slice(0, 2),
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
  const [revealToken, setRevealToken] = useState(false);

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
      {team && (
        <EvalCredentialsPanel
          uuid={team.eval_team_uuid ?? null}
          token={team.eval_token ?? null}
          revealed={revealToken}
          onToggleReveal={() => setRevealToken((r) => !r)}
        />
      )}
    </div>
  );
}

/**
 * Render the FastAPI eval-server credentials in a way that's safe to leave on
 * a projector during the hackathon.
 *
 * - The UUID is shown in plain — it's an opaque identifier (just `teams.id` on
 *   the cluster), no auth value on its own.
 * - The token is masked by default (`••••••XXXX` with the last 4 chars).
 *   `Reveal` toggles plaintext for the participant who actually needs to
 *   double-check it; `Copy` writes the real value to clipboard without ever
 *   revealing it visually, which is the path we want them to use.
 *
 * If the request was made by a non-member, the server returns `null` for both
 * fields (see `GenericHackathonTeamSerializer.get_eval_*`), so this panel just
 * shows "Pending Admin Approval" — non-members literally can't tell whether
 * the team has been provisioned, which is the right answer.
 */
function EvalCredentialsPanel({
  uuid,
  token,
  revealed,
  onToggleReveal,
}: {
  uuid: string | null;
  token: string | null;
  revealed: boolean;
  onToggleReveal: () => void;
}) {
  const [uuidCopied, setUuidCopied] = useState(false);
  const [tokenCopied, setTokenCopied] = useState(false);

  const copy = (value: string, setCopied: (b: boolean) => void) => {
    // Best-effort clipboard write. In non-secure contexts navigator.clipboard
    // is undefined, in which case we silently no-op — participants can still
    // Reveal + manual-copy as a fallback.
    if (!navigator.clipboard) return;
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  const maskedToken = token ? `••••••••${token.slice(-4)}` : "";

  return (
    <div className="mt-5 border-t border-[#e8dfcf] pt-4">
      <h3 className="text-sm font-bold text-[#64705f]">Evaluation server credentials</h3>
      <div className="mt-2 rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] px-4 py-3">
        {!token || !uuid ? (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#121e16]">Pending admin approval</span>
            <span className="text-xs text-[#64705f]">
              An organiser will provision your team for the advanced track. Once approved,
              your Team ID and Token will appear here.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <CredentialRow
              label="Team ID"
              value={uuid}
              display={uuid}
              copied={uuidCopied}
              onCopy={() => copy(uuid, setUuidCopied)}
            />
            <CredentialRow
              label="Token"
              value={token}
              display={revealed ? token : maskedToken}
              copied={tokenCopied}
              onCopy={() => copy(token, setTokenCopied)}
              secondaryAction={{
                label: revealed ? "Hide" : "Reveal",
                onClick: onToggleReveal,
              }}
            />
            <p className="text-xs text-[#64705f]">
              Paste both into the{" "}
              <Link
                to="/watt-the-hack/city-of-melbourne-advanced-submit"
                className="font-bold text-[#155420] underline-offset-2 hover:underline"
              >
                submission portal
              </Link>{" "}
              to submit a controller.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CredentialRow({
  label,
  display,
  copied,
  onCopy,
  secondaryAction,
}: {
  label: string;
  /** The plaintext value that lands on the clipboard. Used by onCopy only. */
  value: string;
  /** What renders visually — may be masked. */
  display: string;
  copied: boolean;
  onCopy: () => void;
  secondaryAction?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-[#121e16]">{label}</span>
      <div className="flex min-w-0 items-center gap-2">
        <code className="truncate rounded bg-[#e6efd7] px-2 py-1 text-xs font-mono text-[#155420]">
          {display}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className="text-xs font-bold text-[#155420] hover:text-[#0f3915] underline-offset-2 hover:underline"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        {secondaryAction ? (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="text-xs font-medium text-[#64705f] hover:text-[#121e16] underline-offset-2 hover:underline"
          >
            {secondaryAction.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SubmissionPanel({ submission }: { submission: GenericHackathonSubmission | null }) {
  return (
    <div className={`${wattClasses.panel} px-6 py-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full text-[#155420]">
            <TrophyIcon className="h-9 w-9 fill-[#f0c742]/45 stroke-[1.8]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-xl font-black leading-tight text-[#121e16]">Latest Submission</h2>
            <p className="mt-1 truncate text-sm font-medium text-[#354031]">
              {submission ? submission.title : "No project submitted yet."}
            </p>
          </div>
        </div>
        <Link to="/watt-the-hack/submissions" className={`${wattClasses.buttonPrimary} shrink-0 px-6`}>
          Submit
        </Link>
      </div>
      {submission && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#64705f]">{submission.summary}</p>
      )}
    </div>
  );
}

function ResourcesPanel({ resources }: { resources: GenericHackathonResource[] }) {
  return (
    <div className={`${wattClasses.panel} relative overflow-hidden px-6 py-5 sm:px-7`}>
      <img
        src={wattImages.bottomScene}
        alt=""
        className="pointer-events-none absolute -bottom-4 right-0 hidden w-[310px] opacity-95 sm:block"
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="h-8 w-8 text-[#155420]" aria-hidden="true" />
          <h2 className="text-xl font-black text-[#121e16]">Resources</h2>
        </div>
        <Link to="/watt-the-hack/resources" className="inline-flex items-center gap-2 text-sm font-black text-[#155420] hover:text-[#2f6f2c]">
          View all
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="relative mt-5 grid gap-4 lg:grid-cols-2 lg:pr-44">

        <Link to="/watt-the-hack/docs" className="block rounded-xl border border-[#e8dfcf] bg-[rgba(255,254,250,0.88)] p-4 transition hover:border-[#c9dbb8] hover:bg-[#fffefa]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6efd7] text-[#155420]">
                <DocumentTextIcon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-[#121e16]">API Documentation</p>
                <p className="mt-1 truncate text-xs font-medium text-[#354031]">Read the official python controller guide</p>
              </div>
            </div>
            <ArrowTopRightOnSquareIcon className="h-5 w-5 shrink-0 text-[#64705f]" aria-hidden="true" />
          </div>
        </Link>

        {resources.length > 0 ? resources.map((resource) => (
          <Link key={resource.id} to="/watt-the-hack/resources" className="block rounded-xl border border-[#e8dfcf] bg-[rgba(255,254,250,0.88)] p-4 transition hover:border-[#c9dbb8] hover:bg-[#fffefa]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6efd7] text-[#155420]">
                  <DocumentTextIcon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#121e16]">{resource.title}</p>
                  <p className="mt-1 truncate text-xs font-medium text-[#354031]">{resource.summary}</p>
                </div>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 shrink-0 text-[#64705f]" aria-hidden="true" />
            </div>
          </Link>
        )) : (
          <p className="text-sm font-medium text-[#64705f]">Resources will appear here when they are published.</p>
        )}
      </div>
    </div>
  );
}

export default function WattTheHackDashboard() {
  const { hackathon, announcements, team, latestSubmission, resources } = useLoaderData<typeof loader>();

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
          <StatCard
            label="Submission"
            value={latestSubmission ? "Submitted" : "Not submitted"}
            description={latestSubmission ? "Your prototype is in the queue." : "Submit your project prototype."}
            icon={DocumentTextIcon}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.08fr]">
          <Announcements announcements={announcements} variant="watt" />
          <div className="space-y-5">
            <TeamPanel team={team} />
            <SubmissionPanel submission={latestSubmission} />
          </div>
        </div>

        <ResourcesPanel resources={resources} />
      </div>
    </div>
  );
}

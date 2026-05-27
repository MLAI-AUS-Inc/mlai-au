import type { Route } from "./+types/watt-the-hack.submissions";
import { Form, Link, redirect, useActionData, useLoaderData } from "react-router";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import {
  createGenericSubmission,
  getGenericCurrentTeam,
  getGenericSubmissions,
  WATT_THE_HACK_SLUG,
} from "~/lib/generic-hackathon";
import { wattClasses } from "~/lib/watt-theme";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  let user = null;
  try {
    user = await getCurrentUser(env, request);
  } catch (error) {
    console.warn("Treating Watt The Hack auth lookup failure as logged out.", error);
  }
  if (!user) {
    throw redirect("/platform/login?app=watt-the-hack&next=/watt-the-hack/submissions");
  }

  const [team, submissions] = await Promise.all([
    getGenericCurrentTeam(env, request).catch(() => null),
    getGenericSubmissions(env, request).catch(() => []),
  ]);

  return { team, submissions };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const formData = await request.formData();
  formData.delete("intent");

  try {
    const submission = await createGenericSubmission(env, request, WATT_THE_HACK_SLUG, formData);
    return { success: `Submission received: ${submission.title}` };
  } catch (error: any) {
    return { error: error?.message || "Submission failed." };
  }
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function WattTheHackSubmissions() {
  const { team, submissions } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className={wattClasses.page}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
        <section className={`${wattClasses.panelStrong} p-6`}>
          <div className="flex items-center gap-3">
            <span className={wattClasses.iconTile}>
              <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className={wattClasses.eyebrow}>Submissions</p>
              <h1 className="text-xl font-black text-[#20231d]">Project Submission</h1>
              <p className="text-sm text-[#6f756c]">Submit your team project.</p>
            </div>
          </div>

          {!team ? (
            <div className={`mt-6 ${wattClasses.warningAlert}`}>
              Join or create a team before submitting.{" "}
              <Link to="/watt-the-hack/profile" className="font-black underline underline-offset-2">
                Go to profile and team
              </Link>
            </div>
          ) : (
            <Form method="post" encType="multipart/form-data" className="mt-6 space-y-4">
              <input type="hidden" name="intent" value="submit_project" />
              {actionData?.success && (
                <div className={wattClasses.successAlert}>{actionData.success}</div>
              )}
              {actionData?.error && (
                <div className={wattClasses.errorAlert}>{actionData.error}</div>
              )}

              <label className="block">
                <span className={wattClasses.label}>Project title</span>
                <input
                  name="title"
                  required
                  maxLength={180}
                  className={wattClasses.input}
                />
              </label>
              <label className="block">
                <span className={wattClasses.label}>Summary</span>
                <textarea
                  name="summary"
                  required
                  rows={6}
                  className={wattClasses.input}
                />
              </label>
              <label className="block">
                <span className={wattClasses.label}>Repository URL</span>
                <input
                  name="repository_url"
                  type="url"
                  placeholder="https://github.com/..."
                  className={wattClasses.input}
                />
              </label>
              <label className="block">
                <span className={wattClasses.label}>Demo URL</span>
                <input
                  name="demo_url"
                  type="url"
                  placeholder="https://..."
                  className={wattClasses.input}
                />
              </label>
              <label className="block">
                <span className={wattClasses.label}>Slides URL</span>
                <input
                  name="slides_url"
                  type="url"
                  placeholder="https://..."
                  className={wattClasses.input}
                />
              </label>
              <label className="block">
                <span className={wattClasses.label}>Attachment</span>
                <input name="attachment" type="file" className={wattClasses.fileInput} />
                <span className="mt-1 block text-xs text-[#6f756c]">Optional. PDF, deck, document, image, zip, CSV, or video up to 20MB.</span>
              </label>
              <button type="submit" className={`${wattClasses.buttonPrimary} w-full`}>
                Submit project
              </button>
            </Form>
          )}
        </section>

        <section className={wattClasses.panel}>
          <div className="border-b border-[#e7dfcf] px-6 py-5">
            <h2 className="text-xl font-black text-[#20231d]">Submission History</h2>
            <p className="text-sm text-[#6f756c]">
              {team ? `Showing submissions for ${team.team_name}.` : "Team submissions will appear here."}
            </p>
          </div>
          <div className="divide-y divide-[#e7dfcf]">
            {submissions.length > 0 ? submissions.map((submission) => (
              <article key={submission.id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-[#20231d]">{submission.title}</h3>
                    <p className="mt-1 text-sm text-[#6f756c]">{formatDate(submission.submitted_at)}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#394033]">{submission.summary}</p>
                  </div>
                  {submission.attachment_url && (
                    <a
                      href={submission.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${wattClasses.buttonOutline} shrink-0 gap-2`}
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                      Attachment
                    </a>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {submission.repository_url && <ExternalLink href={submission.repository_url} label="Repository" />}
                  {submission.demo_url && <ExternalLink href={submission.demo_url} label="Demo" />}
                  {submission.slides_url && <ExternalLink href={submission.slides_url} label="Slides" />}
                </div>
              </article>
            )) : (
              <div className="p-6 text-sm text-[#6f756c]">No submissions yet.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-black text-[#1f5b2c] hover:text-[#3d7339]">
      {label}
      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

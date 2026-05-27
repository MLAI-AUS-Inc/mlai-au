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
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
        <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f8d8] text-[#24523f]">
              <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-gray-950">Project Submission</h1>
              <p className="text-sm text-gray-600">Submit your team project.</p>
            </div>
          </div>

          {!team ? (
            <div className="mt-6 rounded-md bg-amber-50 p-4 text-sm text-amber-900">
              Join or create a team before submitting.{" "}
              <Link to="/watt-the-hack/profile" className="font-semibold underline underline-offset-2">
                Go to profile and team
              </Link>
            </div>
          ) : (
            <Form method="post" encType="multipart/form-data" className="mt-6 space-y-4">
              <input type="hidden" name="intent" value="submit_project" />
              {actionData?.success && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">{actionData.success}</div>
              )}
              {actionData?.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{actionData.error}</div>
              )}

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Project title</span>
                <input
                  name="title"
                  required
                  maxLength={180}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Summary</span>
                <textarea
                  name="summary"
                  required
                  rows={6}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Repository URL</span>
                <input
                  name="repository_url"
                  type="url"
                  placeholder="https://github.com/..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Demo URL</span>
                <input
                  name="demo_url"
                  type="url"
                  placeholder="https://..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Slides URL</span>
                <input
                  name="slides_url"
                  type="url"
                  placeholder="https://..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Attachment</span>
                <input name="attachment" type="file" className="mt-1 block w-full text-sm text-gray-700" />
                <span className="mt-1 block text-xs text-gray-500">Optional. PDF, deck, document, image, zip, CSV, or video up to 20MB.</span>
              </label>
              <button type="submit" className="w-full rounded-md bg-[#10231f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d3c35]">
                Submit project
              </button>
            </Form>
          )}
        </section>

        <section className="rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-950">Submission History</h2>
            <p className="text-sm text-gray-600">
              {team ? `Showing submissions for ${team.team_name}.` : "Team submissions will appear here."}
            </p>
          </div>
          <div className="divide-y divide-black/8">
            {submissions.length > 0 ? submissions.map((submission) => (
              <article key={submission.id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-950">{submission.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{formatDate(submission.submitted_at)}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">{submission.summary}</p>
                  </div>
                  {submission.attachment_url && (
                    <a
                      href={submission.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
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
              <div className="p-6 text-sm text-gray-600">No submissions yet.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#1f6f54] hover:text-[#10231f]">
      {label}
      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

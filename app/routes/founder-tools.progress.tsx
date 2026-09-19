import { data, Link, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/founder-tools.progress";
import { getEnv } from "~/lib/env.server";
import {
  requireVibeRaisingFounder,
  resolveActiveCompanyId,
  getVibeRaisingDrafts,
} from "~/lib/vibe-raising";
import {
  getStartupProgress,
  saveStartupProgress,
} from "~/lib/startup-progress.server";
import { progressEnabled } from "~/lib/startup-progress";
import ProgressDashboard from "~/components/vibe-raising/ProgressDashboard";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { appUser: user } = await requireVibeRaisingFounder(env, request);
  const companyId = resolveActiveCompanyId(user);
  if (!progressEnabled(env))
    return {
      user,
      progress: null,
      drafts: [],
      error: "Progress is not enabled for this environment yet.",
    };
  const [progress, drafts] = await Promise.allSettled([
    getStartupProgress(env, request, companyId),
    getVibeRaisingDrafts(env, request, companyId),
  ]);
  return {
    user,
    progress: progress.status === "fulfilled" ? progress.value : null,
    drafts: drafts.status === "fulfilled" ? drafts.value : [],
    error:
      progress.status === "rejected"
        ? "Progress couldn’t load. Your updates and connected accounts are still available."
        : null,
  };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser: user } = await requireVibeRaisingFounder(env, request);
  const form = await request.formData();
  const companyId = String(form.get("companyId") || "");
  if (!user.companies.some((item) => item.id === companyId))
    return data(
      { error: "Company not found.", progress: null, intent: "" },
      { status: 404 },
    );
  const intent = String(form.get("intent") || "");
  if (!["preferences", "custom", "ga"].includes(intent))
    return data(
      { error: "Unknown action.", progress: null, intent },
      { status: 400 },
    );
  try {
    const body = JSON.parse(String(form.get("payload") || "{}"));
    const progress = await saveStartupProgress(
      env,
      request,
      companyId,
      intent,
      body,
    );
    return { progress, error: null, intent };
  } catch (error) {
    const response = (
      error as {
        response?: { data?: Record<string, unknown>; status?: number };
      }
    )?.response;
    const details =
      response?.data?.detail ??
      Object.values(response?.data || {})
        .flat()
        .filter((item) => typeof item === "string")
        .join(" ");
    const detail = Array.isArray(details) ? details.join(" ") : details;
    return data(
      {
        error:
          typeof detail === "string" && detail
            ? detail
            : "Couldn’t save this change. Check your values, or reload if another tab changed them.",
        progress: null,
        intent,
      },
      { status: response?.status === 409 ? 409 : 400 },
    );
  }
}

export default function ProgressRoute() {
  const { user, progress, drafts, error } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  if (!progress)
    return (
      <main className="startup-progress">
        <h1>Progress</h1>
        <div className="progress-empty">
          <h2>Your story, in numbers.</h2>
          <p role="status">{error}</p>
          <Link className="progress-button" to="/founder-tools/updates">
            Back to updates
          </Link>
        </div>
      </main>
    );
  return (
    <ProgressDashboard
      key={progress.companyId}
      progress={fetcher.data?.progress || progress}
      companyName={user.companyName}
      drafts={drafts}
      busy={fetcher.state !== "idle"}
      error={fetcher.data?.error || null}
      lastIntent={fetcher.data?.intent}
      onSave={(intent, body) =>
        fetcher.submit(
          {
            intent,
            companyId: progress.companyId,
            payload: JSON.stringify({
              ...body,
              expectedVersion: (fetcher.data?.progress || progress).version,
            }),
          },
          { method: "post" },
        )
      }
    />
  );
}

import type { Route } from "./+types/vibe-raising-admin.review";
import { Link, useLoaderData } from "react-router";
import VibeRaisingAdminUpdatesTable from "~/components/vibe-raising/VibeRaisingAdminUpdatesTable";
import { getEnv } from "~/lib/env.server";
import {
  getVibeRaisingAdminUpdates,
  requireVibeRaisingAdmin,
} from "~/lib/vibe-raising";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingAdmin(env, request);
  const updatesList = await getVibeRaisingAdminUpdates(env, request, { status: "ready" });
  return { updatesList };
}

export default function VibeRaisingAdminReviewRoute() {
  const { updatesList } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="[font-family:var(--vr-font-title)] text-5xl font-black leading-none tracking-normal text-slate-950">Review Queue</h1>
          <p className="mt-2 text-base font-medium text-slate-500">Read-only queue of founder updates ready for admin review.</p>
        </div>
        <Link to="/founder-tools/admin/updates" className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:text-[var(--vr-color-primary)]">
          View all updates
        </Link>
      </header>

      <VibeRaisingAdminUpdatesTable
        updates={updatesList.updates}
        emptyLabel="No updates are waiting for review."
      />
    </div>
  );
}
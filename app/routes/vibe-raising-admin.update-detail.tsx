import type { Route } from "./+types/vibe-raising-admin.update-detail";
import { Link, useLoaderData } from "react-router";
import VRPreviewUpdateCard from "~/components/vibe-raising/VRPreviewUpdateCard";
import {
  formatAdminDate,
  VibeRaisingAdminStatusBadge,
} from "~/components/vibe-raising/VibeRaisingAdminUpdatesTable";
import { getEnv } from "~/lib/env.server";
import {
  getVibeRaisingAdminUpdateDetail,
  requireVibeRaisingAdmin,
} from "~/lib/vibe-raising";

function buildPreviewUser(detail: Awaited<ReturnType<typeof getVibeRaisingAdminUpdateDetail>>) {
  const company = detail.company;
  const summary = detail.summary;
  return {
    companyName: company?.name || summary.startupName,
    domain: company?.domain || null,
    location: company?.location || null,
    fullName: detail.founder?.name || summary.founderName || "Founder",
  };
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingAdmin(env, request);
  const id = params.id;
  if (!id) throw new Response("Not Found", { status: 404 });
  const detail = await getVibeRaisingAdminUpdateDetail(env, request, id);
  return { detail };
}

export default function VibeRaisingAdminUpdateDetailRoute() {
  const { detail } = useLoaderData<typeof loader>();
  const { summary, update, founder, company } = detail;
  const previewUser = buildPreviewUser(detail);

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      <div>
        <Link to="/founder-tools/admin/updates" className="text-sm font-black text-[var(--vr-color-primary)] hover:text-slate-950">
          Back to updates
        </Link>
      </div>

      <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="[font-family:var(--vr-font-title)] text-4xl font-black leading-none tracking-normal text-slate-950 sm:text-5xl">
                {summary.startupName}
              </h1>
              <VibeRaisingAdminStatusBadge status={summary.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-500">
              <span>{summary.updateMonth}</span>
              <span>Founder: {founder?.name || summary.founderName || "-"}</span>
              {founder?.email ? <span>{founder.email}</span> : null}
              {company?.stage ? <span>{company.stage}</span> : null}
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 px-4 py-3 text-right text-sm font-semibold text-slate-500">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">Last updated</p>
            <p className="mt-1 text-slate-700">{formatAdminDate(summary.lastUpdatedAt || update?.date)}</p>
          </div>
        </div>
      </header>

      {update ? (
        <VRPreviewUpdateCard
          update={update}
          user={previewUser}
          statusLabel={summary.status === "published" ? "Published" : summary.status === "draft" ? "Draft" : "In Review"}
          showFounderActions={false}
        />
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
          This update detail did not include monthly update content yet.
        </div>
      )}
    </div>
  );
}
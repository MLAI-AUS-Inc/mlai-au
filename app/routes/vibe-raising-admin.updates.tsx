import type { Route } from "./+types/vibe-raising-admin.updates";
import { Form, Link, useLoaderData } from "react-router";
import VibeRaisingAdminUpdatesTable from "~/components/vibe-raising/VibeRaisingAdminUpdatesTable";
import { getEnv } from "~/lib/env.server";
import {
  getVibeRaisingAdminUpdates,
  requireVibeRaisingAdmin,
} from "~/lib/vibe-raising";

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Published", value: "published" },
  { label: "In Review", value: "ready" },
  { label: "Draft", value: "draft" },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getPage(value: string | null) {
  const page = Number(value || "1");
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function buildUpdatesHref({ status, q, page }: { status?: string | null; q?: string | null; page?: number | null }) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/founder-tools/admin/updates?${query}` : "/founder-tools/admin/updates";
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingAdmin(env, request);
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "";
  const q = url.searchParams.get("q") || "";
  const page = getPage(url.searchParams.get("page"));
  const updatesList = await getVibeRaisingAdminUpdates(env, request, { status, q, page });

  return { updatesList, status, q, page };
}

export default function VibeRaisingAdminUpdatesRoute() {
  const { updatesList, status, q, page } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="[font-family:var(--vr-font-title)] text-5xl font-black leading-none tracking-normal text-slate-950">Founder Updates</h1>
          <p className="mt-2 text-base font-medium text-slate-500">Browse monthly updates across every founder account.</p>
        </div>
        <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
          {updatesList.total.toLocaleString("en-AU")} total updates
        </p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((filter) => {
              const isActive = status === filter.value;
              return (
                <Link
                  key={filter.label}
                  to={buildUpdatesHref({ status: filter.value, q })}
                  className={classNames(
                    "rounded-md px-3 py-2 text-sm font-black ring-1 transition",
                    isActive
                      ? "bg-[var(--vr-palette-mint)] text-[var(--vr-palette-black)] ring-transparent"
                      : "bg-white text-slate-600 ring-slate-200 hover:text-[var(--vr-color-primary)]",
                  )}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

          <Form method="get" className="flex w-full gap-2 sm:w-auto">
            {status ? <input type="hidden" name="status" value={status} /> : null}
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search startups or founders"
              className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-2 focus:ring-[rgba(0,255,215,0.18)] sm:w-72"
            />
            <button className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-[var(--vr-color-primary)]" type="submit">
              Search
            </button>
          </Form>
        </div>
      </section>

      <VibeRaisingAdminUpdatesTable updates={updatesList.updates} />

      {(updatesList.hasPrevious || updatesList.hasNext) ? (
        <div className="flex items-center justify-end gap-2">
          {updatesList.hasPrevious ? (
            <Link to={buildUpdatesHref({ status, q, page: Math.max(1, page - 1) })} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:text-[var(--vr-color-primary)]">
              Previous
            </Link>
          ) : null}
          {updatesList.hasNext ? (
            <Link to={buildUpdatesHref({ status, q, page: page + 1 })} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:text-[var(--vr-color-primary)]">
              Next
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
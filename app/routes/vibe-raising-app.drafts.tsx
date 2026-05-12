import { Link, redirect, useLoaderData } from "react-router";
import { formatDistanceToNow } from "date-fns";
import type { Route } from "./+types/vibe-raising-app.drafts";
import { getEnv } from "~/lib/env.server";
import {
    getVibeRaisingDrafts,
    requireVibeRaisingFounder,
} from "~/lib/vibe-raising";
import {
    ArrowRightIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentDuplicateIcon,
    EyeSlashIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

function getDraftSnippet(summary?: string | null, fallback?: string | null) {
    const source = String(summary || fallback || "").trim();
    if (!source) return "No summary yet. Resume editing to finish your first draft.";
    return source.length > 180 ? `${source.slice(0, 177).trimEnd()}...` : source;
}

function getDraftStatusLabel(status?: string | null) {
    switch (status) {
        case "ready":
            return "Ready to publish";
        case "needs_review":
            return "Needs review";
        case "error":
            return "Needs attention";
        default:
            return "Draft in progress";
    }
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser } = await requireVibeRaisingFounder(env, request);

    if (!appUser.companyRegistered) {
        throw redirect("/founder-tools/company-setup");
    }

    const drafts = await getVibeRaisingDrafts(env, request);

    return {
        drafts,
    };
}

export default function VibeRaisingDraftsPage() {
    const { drafts } = useLoaderData<typeof loader>();
    const readyDrafts = drafts.filter((draft) => draft.status === "ready").length;
    const inProgressDrafts = drafts.filter((draft) => draft.status !== "ready").length;

    return (
        <div className="mx-auto max-w-6xl space-y-8 pb-24 pt-8">
            <section className="overflow-hidden rounded-[2rem] border border-[var(--vr-color-border)] bg-white shadow-sm">
                <div className="border-b border-[var(--vr-color-border)] bg-[linear-gradient(135deg,rgba(0,128,128,0.92),rgba(0,255,215,0.72))] px-6 py-8 text-white sm:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">My Drafts</p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl sm:whitespace-nowrap">Keep updates private until they are ready.</h1>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/founder-tools/updates/create"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[var(--vr-palette-black)] shadow-sm transition hover:-translate-y-0.5"
                            >
                                Create new update
                                <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4 px-6 py-5 text-sm text-slate-600 sm:grid-cols-3 sm:px-8">
                    <div className="rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] px-4 py-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Private drafts</p>
                        <p className="mt-2 text-2xl font-black text-gray-950">{drafts.length}</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] px-4 py-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Ready to publish</p>
                        <p className="mt-2 text-2xl font-black text-gray-950">{readyDrafts}</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] px-4 py-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Still in progress</p>
                        <p className="mt-2 text-2xl font-black text-gray-950">{inProgressDrafts}</p>
                    </div>
                </div>
            </section>

            {drafts.length === 0 ? (
                <section className="rounded-[2rem] border border-dashed border-[var(--vr-color-border)] bg-white px-6 py-12 text-center shadow-sm sm:px-8">
                    <div className="mx-auto flex max-w-md flex-col items-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
                            <DocumentDuplicateIcon className="h-7 w-7" />
                        </div>
                        <h2 className="mt-5 text-2xl font-black text-gray-950">No private drafts yet</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Save a draft from the update flow and it will appear here for you to resume or publish later.
                        </p>
                        <Link
                            to="/founder-tools/updates/create"
                            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-palette-black)] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[var(--vr-color-primary)]"
                        >
                            Start an update
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            ) : (
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
                            <PencilSquareIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-950">Private drafts</h2>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {drafts.map((draft) => {
                            const isReady = draft.status === "ready";
                            return (
                                <article
                                    key={draft.id}
                                    className="rounded-[1.75rem] border border-[var(--vr-color-border)] bg-white p-5 shadow-sm"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--vr-color-primary)]">
                                                    <EyeSlashIcon className="h-3.5 w-3.5" />
                                                    Private
                                                </span>
                                                <span
                                                    className={isReady
                                                        ? "inline-flex items-center gap-1.5 rounded-full bg-[rgba(150,73,210,0.12)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--vr-palette-purple)]"
                                                        : "inline-flex items-center rounded-full bg-[var(--vr-palette-paper)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500"}
                                                >
                                                    {isReady ? <CheckCircleIcon className="h-3.5 w-3.5" /> : null}
                                                    {isReady ? "Ready" : "In progress"}
                                                </span>
                                            </div>
                                            <h3 className="mt-3 text-2xl font-black text-gray-950">{draft.month}</h3>
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--vr-palette-paper)] px-3 py-2 text-xs font-bold text-slate-500">
                                            <ClockIcon className="h-4 w-4" />
                                            Updated {formatDistanceToNow(new Date(draft.date), { addSuffix: true })}
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-slate-600">
                                        {getDraftSnippet(draft.summary, draft.highlights)}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-3">
                                        <Link
                                            to={`/founder-tools/updates/create?edit=${encodeURIComponent(draft.id)}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-palette-black)] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[var(--vr-color-primary)]"
                                        >
                                            Resume editing
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}

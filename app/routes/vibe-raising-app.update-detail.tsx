import { Link, redirect, useLoaderData } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Route } from "./+types/vibe-raising-app.update-detail";
import { getEnv } from "~/lib/env.server";
import {
    getOptionalVibeRaisingContext,
    getVibeRaisingLoginHref,
    getVibeRaisingMonthlyUpdatesBundle,
} from "~/lib/vibe-raising";
import VRPreviewUpdateCard from "~/components/vibe-raising/VRPreviewUpdateCard";
import TrendsSection from "~/components/vibe-raising/TrendsSection";

export async function loader({ request, context, params }: Route.LoaderArgs) {
    const env = getEnv(context);
    const vibeContext = await getOptionalVibeRaisingContext(env, request);

    if (!vibeContext.authUser) {
        throw redirect(getVibeRaisingLoginHref(request));
    }

    if (!vibeContext.appUser || vibeContext.appUser.role !== "founder") {
        throw redirect("/founder-tools/updates");
    }

    const { updates, metricHistory } = await getVibeRaisingMonthlyUpdatesBundle(env, request);
    const update = updates.find((item) => String(item.id) === String(params.id));
    if (!update) {
        throw new Response("Update not found", { status: 404 });
    }

    return { user: vibeContext.appUser, update, metricHistory };
}

function isCurrentMonthUpdate(update: { date?: string | null }): boolean {
    const updateDate = new Date(update.date || "");
    if (Number.isNaN(updateDate.getTime())) return false;
    const now = new Date();
    return (
        updateDate.getMonth() === now.getMonth() &&
        updateDate.getFullYear() === now.getFullYear()
    );
}

export default function UpdateDetailPage() {
    const { user, update, metricHistory } = useLoaderData<typeof loader>();

    return (
        <div className="vr-scope mx-auto max-w-4xl space-y-4 pb-12">
            <Link
                to="/founder-tools/updates"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-gray-500 transition hover:text-[var(--vr-color-primary)]"
            >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                All updates
            </Link>
            <VRPreviewUpdateCard
                update={update}
                user={user}
                statusLabel={isCurrentMonthUpdate(update) ? "Current" : "Sent"}
                trendsSlot={
                    <TrendsSection
                        metricHistory={metricHistory}
                        displayConfig={update.displayConfig}
                        currentIsoMonth={update.isoMonth}
                    />
                }
            />
        </div>
    );
}

export function ErrorBoundary() {
    return (
        <div className="vr-scope mx-auto max-w-4xl pb-12">
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
                <h1 className="text-lg font-bold text-gray-900">Update not found</h1>
                <p className="mt-2 text-sm text-gray-500">
                    This update may have been removed, or the link is out of date.
                </p>
                <Link
                    to="/founder-tools/updates"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[var(--vr-color-primary)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--vr-palette-black)]"
                >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Back to updates
                </Link>
            </div>
        </div>
    );
}

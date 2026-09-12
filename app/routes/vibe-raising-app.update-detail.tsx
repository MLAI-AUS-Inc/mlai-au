import { Link, redirect, useLoaderData } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Route } from "./+types/vibe-raising-app.update-detail";
import { getEnv } from "~/lib/env.server";
import {
    getOptionalVibeRaisingContext,
    getVibeRaisingLoginHref,
    getVibeRaisingMonthlyUpdatesBundle,
    resolveActiveCompanyId,
} from "~/lib/vibe-raising";
import UpdateArticle from "~/components/vibe-raising/UpdateArticle";
import { getUpdateTitles } from "~/lib/startup-updates-presentation";

export async function loader({ request, context, params }: Route.LoaderArgs) {
    const env = getEnv(context);
    const vibeContext = await getOptionalVibeRaisingContext(env, request);

    if (!vibeContext.authUser) {
        throw redirect(getVibeRaisingLoginHref(request));
    }

    if (!vibeContext.appUser || vibeContext.appUser.role !== "founder") {
        throw redirect("/founder-tools/updates");
    }

    const { updates } = await getVibeRaisingMonthlyUpdatesBundle(env, request, resolveActiveCompanyId(vibeContext.appUser));
    const update = updates.find((item) => String(item.id) === String(params.id));
    if (!update) {
        throw new Response("Update not found", { status: 404 });
    }

    return { user: vibeContext.appUser, update, updateTitle: getUpdateTitles(updates).get(update.id) };
}

export default function UpdateDetailPage() {
    const { user, update, updateTitle } = useLoaderData<typeof loader>();

    return (
        <div className="vr-scope update-reader">
            <Link
                to="/founder-tools/updates"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-gray-500 transition hover:text-[var(--vr-color-primary)]"
            >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                All updates
            </Link>
            <UpdateArticle update={update} companyName={user.companyName} title={updateTitle} editable />
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

import { Form, redirect, useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/vibe-raising-app.company-setup";
import { ArrowPathIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import FounderStartupDetailsStep from "~/components/FounderStartupDetailsStep";
import { getEnv } from "~/lib/env.server";
import { getVibeMarketingBootstrap } from "~/lib/vibe-marketing";
import {
    getActiveVibeRaisingCompany,
    requireVibeRaisingFounder,
    saveVibeRaisingCompany,
    setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";

function sanitizeNext(value: string | null) {
    if (value?.startsWith("/founder-tools/marketing")) return value;
    if (value?.startsWith("/founder-tools/data-sources")) return value;
    if (value?.startsWith("/founder-tools/updates")) return value;
    return "/founder-tools/data-sources";
}

function listFromForm(value: FormDataEntryValue | null) {
    return String(value ?? "")
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
    const next = sanitizeNext(url.searchParams.get("next"));
    const activeCompany = getActiveVibeRaisingCompany(user);

    // If not adding a new company and already registered, skip setup
    if (!isAddingNew && user.companyRegistered) {
        throw redirect(next);
    }

    let marketingBootstrap = null;
    try {
        marketingBootstrap = await getVibeMarketingBootstrap(env, request);
    } catch {
        marketingBootstrap = null;
    }

    return { user, activeCompany, isAddingNew, next, marketingBootstrap };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
    const next = sanitizeNext(url.searchParams.get("next"));
    const formData = await request.formData();
    const activeCompany = getActiveVibeRaisingCompany(user);

    const companyName =
        formData.get("companyName")?.toString() || activeCompany?.name || user.companyName;
    const domain = formData.get("domain")?.toString() || "";
    const abn = formData.get("abn")?.toString() || "";
    const location = formData.get("location")?.toString().trim() || "";
    const companyId = await saveVibeRaisingCompany(env, request, {
        companyId: isAddingNew ? null : activeCompany?.id ?? null,
        name: companyName,
        domain,
        companyLinkedInUrl: formData.get("companyLinkedInUrl")?.toString().trim() || "",
        abn,
        ...(location ? { location } : {}),
        brandName: formData.get("brandName")?.toString().trim() || companyName,
        companyContext: formData.get("companyContext")?.toString().trim() || "",
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
        founderNames: listFromForm(formData.get("founderNames")),
        stage: formData.get("stage")?.toString().trim() || "",
        notes: formData.get("notes")?.toString().trim() || "",
        registered: true,
    });

    if (isAddingNew) {
        if (companyId) {
            await setVibeRaisingActiveCompany(env, request, companyId);
        }
        return redirect(next);
    }

    if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
    }

    return redirect(next);
}

export default function CompanySetup() {
    const { user, activeCompany, isAddingNew, next, marketingBootstrap } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex items-center justify-center p-4 min-h-[70vh]">
            <div className="w-full max-w-3xl">
                <div className="rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-color-card)] p-8 shadow-lg sm:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,255,215,0.14)]">
                            <BuildingOffice2Icon className="h-7 w-7 text-[var(--vr-color-primary)]" />
                        </div>
                        <h1 className="mb-2 text-2xl font-bold text-[var(--vr-color-text)]">
                            {isAddingNew ? "Add Another Company" : "Let's start with some basic details"}
                        </h1>
                    </div>

                    <Form method="POST" className="space-y-6">
                        <input type="hidden" name="next" value={next} />
                        <FounderStartupDetailsStep
                            defaults={{
                                companyName: isAddingNew ? "" : activeCompany?.name || user.companyName,
                                domain: isAddingNew ? "" : activeCompany?.domain || "",
                                companyLinkedInUrl: isAddingNew ? "" : marketingBootstrap?.organization.companyLinkedInUrl ?? activeCompany?.companyLinkedInUrl ?? "",
                                location: isAddingNew ? "" : activeCompany?.location || "",
                                abn: isAddingNew ? "" : activeCompany?.abn || "",
                                brandName: marketingBootstrap?.settings.brandName ?? activeCompany?.name ?? user.companyName,
                                companyContext: marketingBootstrap?.settings.companyContext ?? "",
                                competitors: marketingBootstrap?.organization.competitors ?? [],
                                seedKeywords: marketingBootstrap?.organization.seedKeywords ?? [],
                                founderNames: marketingBootstrap?.startupProfile.founderNames ?? [],
                                stage: marketingBootstrap?.startupProfile.stage ?? "",
                                notes: marketingBootstrap?.startupProfile.notes ?? "",
                            }}
                            compact
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-6 py-4 font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition-all duration-200
                                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[var(--vr-palette-black)] hover:shadow-xl active:scale-[0.98]"}`}
                        >
                            {isSubmitting && <ArrowPathIcon className="w-5 h-5 animate-spin" aria-hidden="true" />}
                            {isSubmitting ? "Saving..." : isAddingNew ? "Add Company" : "Continue"}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

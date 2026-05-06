import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
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
    if (value?.startsWith("/founder-tools/companies")) return value;
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

function stringFromForm(formData: FormData, key: string) {
    return String(formData.get(key) ?? "").trim();
}

function fieldLabel(field: string) {
    const labels: Record<string, string> = {
        companyLinkedInUrl: "Company LinkedIn URL",
        company_linkedin_url: "Company LinkedIn URL",
        organizationKind: "Organization type",
        organization_kind: "Organization type",
        companyId: "Company",
        company_id: "Company",
        name: "Company name",
        domain: "Website domain",
        abn: "ABN",
        location: "Startup location",
        non_field_errors: "Company details",
    };
    return labels[field] ?? field.replace(/_/g, " ");
}

function readableBackendError(error: any) {
    const data = error?.data ?? error?.response?.data;

    if (typeof data === "string" && data.trim()) {
        return data.trim();
    }

    if (data && typeof data === "object") {
        const payload = data as Record<string, unknown>;
        for (const key of ["detail", "error", "message"]) {
            const value = payload[key];
            if (typeof value === "string" && value.trim()) {
                return value.trim();
            }
        }

        const fieldMessages = Object.entries(payload)
            .flatMap(([field, value]) => {
                const messages = Array.isArray(value) ? value : [value];
                return messages
                    .map((item) => String(item ?? "").trim())
                    .filter(Boolean)
                    .map((message) => `${fieldLabel(field)}: ${message}`);
            })
            .filter(Boolean);

        if (fieldMessages.length > 0) {
            return fieldMessages.join(" ");
        }
    }

    return error?.message ?? "Company details could not be saved.";
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
    const isEditing = url.searchParams.get("edit") === "true";
    const next = sanitizeNext(url.searchParams.get("next"));
    const activeCompany = getActiveVibeRaisingCompany(user);

    // If not adding or editing a company and already registered, skip setup
    if (!isAddingNew && !isEditing && user.companyRegistered) {
        throw redirect(next);
    }

    let marketingBootstrap = null;
    try {
        marketingBootstrap = await getVibeMarketingBootstrap(env, request);
    } catch {
        marketingBootstrap = null;
    }

    return { user, activeCompany, isAddingNew, isEditing, next, marketingBootstrap };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
    const next = sanitizeNext(url.searchParams.get("next"));
    const formData = await request.formData();
    const activeCompany = getActiveVibeRaisingCompany(user);

    const companyName = stringFromForm(formData, "companyName") || activeCompany?.name || user.companyName;
    const location = stringFromForm(formData, "location");

    try {
        const companyId = await saveVibeRaisingCompany(env, request, {
            companyId: isAddingNew ? null : activeCompany?.id ?? null,
            name: companyName,
            domain: stringFromForm(formData, "domain"),
            companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
            abn: stringFromForm(formData, "abn"),
            ...(location ? { location } : {}),
            brandName: stringFromForm(formData, "brandName") || companyName,
            companyContext: stringFromForm(formData, "companyContext"),
            competitors: listFromForm(formData.get("competitors")),
            seedKeywords: listFromForm(formData.get("seedKeywords")),
            founderNames: listFromForm(formData.get("founderNames")),
            stage: stringFromForm(formData, "stage"),
            organizationKind: stringFromForm(formData, "organizationKind"),
            notes: stringFromForm(formData, "notes"),
            registered: true,
        });

        if (companyId) {
            await setVibeRaisingActiveCompany(env, request, companyId);
        }
    } catch (error: any) {
        if (error instanceof Response) throw error;
        return { error: readableBackendError(error) };
    }

    return redirect(next);
}

export default function CompanySetup() {
    const { user, activeCompany, isAddingNew, isEditing, next, marketingBootstrap } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
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
                            {isAddingNew ? "Add Another Company" : isEditing ? "Edit company details" : "Let's start with some basic details"}
                        </h1>
                    </div>

                    <Form method="POST" className="space-y-6">
                        <input type="hidden" name="next" value={next} />
                        {actionData?.error ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                                {actionData.error}
                            </div>
                        ) : null}
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
                            {isSubmitting ? "Saving..." : isAddingNew ? "Add Company" : isEditing ? "Save Details" : "Continue"}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

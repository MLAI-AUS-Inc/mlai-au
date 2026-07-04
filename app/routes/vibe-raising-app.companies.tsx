import type { Route } from "./+types/vibe-raising-app.companies";
import { useState } from "react";
import { Link, Form, redirect, useActionData, useNavigation } from "react-router";
import { getEnv } from "~/lib/env.server";
import { readableBackendError } from "~/lib/backend-error";
import {
    deleteVibeRaisingCompany,
    getActiveVibeRaisingCompany,
    getVibeRaisingMonthlyUpdates,
    hasSubmittedVibeRaisingUpdate,
    requireVibeRaisingFounder,
    setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";
import {
    PlusIcon,
    BuildingOffice2Icon,
    CheckCircleIcon,
    PencilSquareIcon,
    GlobeAltIcon,
    IdentificationIcon,
    CheckBadgeIcon,
    TrashIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import { clsx } from "clsx";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const activeCompany = getActiveVibeRaisingCompany(user);
    const activeCompanyHasUpdates =
        Boolean(activeCompany?.id) &&
        (
            hasSubmittedVibeRaisingUpdate(request, activeCompany?.id) ||
            (await getVibeRaisingMonthlyUpdates(env, request, activeCompany?.id ?? null)).length > 0
        );

    return { user, activeCompanyId: activeCompany?.id ?? null, activeCompanyHasUpdates };
}

export async function action({ request, context }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent")?.toString();

    if (intent === "switch-company") {
        const env = getEnv(context);
        const { appUser: user } = await requireVibeRaisingFounder(env, request);
        const companyId = formData.get("companyId")?.toString() || "";

        if (user.companies.some((company) => company.id === companyId) && companyId !== user.activeCompanyId) {
            await setVibeRaisingActiveCompany(env, request, companyId);
        }

        const hasExistingUpdate =
            hasSubmittedVibeRaisingUpdate(request, companyId) ||
            (await getVibeRaisingMonthlyUpdates(env, request, companyId)).length > 0;

        return redirect(hasExistingUpdate ? "/founder-tools/updates" : "/founder-tools/updates/create");
    }

    if (intent === "delete-company") {
        const env = getEnv(context);
        const { appUser: user } = await requireVibeRaisingFounder(env, request);
        const companyId = formData.get("companyId")?.toString() || "";
        const target = user.companies.find((company) => company.id === companyId);

        // Ownership is re-checked server-side; this just avoids a pointless call.
        if (!target) {
            return { intent, error: "That company could not be found." };
        }
        // Guard against a stale form where the typed confirmation no longer matches.
        const confirmName = formData.get("confirmName")?.toString().trim() ?? "";
        if (confirmName !== target.name.trim()) {
            return { intent, error: "Type the company name exactly to confirm removal." };
        }

        try {
            await deleteVibeRaisingCompany(env, request, companyId);
        } catch (error) {
            return {
                intent,
                error: readableBackendError(error, { fallback: "That company could not be removed." }),
            };
        }

        // A founder with no companies left onboards again; otherwise back to the list.
        const remaining = user.companies.filter((company) => company.id !== companyId);
        return redirect(remaining.length ? "/founder-tools/companies" : "/founder-tools/company-setup");
    }

    return null;
}

export default function ManageCompanies({ loaderData }: Route.ComponentProps) {
    const { user, activeCompanyId, activeCompanyHasUpdates } = loaderData;
    const companies = user.companies || [];
    const navigation = useNavigation();
    const actionData = useActionData<typeof action>();
    const isSwitching = navigation.state === "submitting" && navigation.formData?.get("intent") === "switch-company";
    const deletingCompanyId =
        navigation.state === "submitting" && navigation.formData?.get("intent") === "delete-company"
            ? navigation.formData?.get("companyId")?.toString() ?? null
            : null;
    const deleteError =
        actionData && "intent" in actionData && actionData.intent === "delete-company"
            ? (actionData as { error?: string }).error ?? null
            : null;

    // Which company's danger-zone confirmation is expanded, and the typed name.
    const [pendingRemovalId, setPendingRemovalId] = useState<string | null>(null);
    const [confirmName, setConfirmName] = useState("");

    const activeCompany = companies.find((c) => c.id === activeCompanyId) || companies[0];
    const otherCompanies = companies.filter((c) => c.id !== activeCompany?.id);

    return (
        <div className="vr-scope max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-12">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <div className="vr-text-eyebrow mb-1.5">MLAI Vibe Raising</div>
                    <h1 className="vr-text-page-title">Manage Companies</h1>
                    <p
                        className="vr-text-body-small mt-1"
                        style={{ color: "var(--vr-color-text-mid)" }}
                    >
                        <span className="sm:hidden">Switch companies or add another startup.</span>
                        <span className="hidden sm:inline">Your active company is front and centre. Add another startup or switch between them any time.</span>
                    </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                    <Link
                        to="/founder-tools/company-setup?new=true"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition-all sm:min-h-0 sm:w-auto sm:justify-start sm:rounded-lg sm:py-2.5"
                        style={{
                            background: "var(--vr-color-primary)",
                            color: "#fff",
                            boxShadow: "var(--vr-shadow-sm)",
                        }}
                    >
                        <PlusIcon className="w-4 h-4" />
                        Register New Company
                    </Link>
                </div>
            </div>

            {/* Hero showcase of active company */}
            {activeCompany && (
                <div
                    className="vr-company-hero overflow-hidden"
                    style={{
                        background: "var(--vr-color-bg)",
                        borderRadius: "var(--vr-radius-lg)",
                    }}
                >
                    {/* Gradient banner with decorative bubbles + active chip */}
                    <div className="vr-company-hero-banner relative">
                        <div className="vr-company-hero-banner-bubble-1" />
                        <div className="vr-company-hero-banner-bubble-2" />
                        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
                            <span className="vr-badge vr-badge-teal inline-flex items-center gap-1 px-2 py-1 text-[10px] sm:px-[10px] sm:py-[3px] sm:text-xs">
                                <CheckCircleIcon className="hidden h-3.5 w-3.5 sm:block" />
                                <span className="sm:hidden">Live</span>
                                <span className="hidden sm:inline">Active</span>
                            </span>
                        </div>
                    </div>

                    {/* Showcase body */}
                    <div className="space-y-5 p-5 sm:space-y-6 sm:p-8">
                        {/* Title + logo row */}
                        <div className="flex flex-wrap items-start gap-3 sm:gap-4">
                            <div
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-14 sm:w-14"
                                style={{
                                    background: "var(--vr-color-surface)",
                                    border: "1px solid var(--vr-color-border)",
                                }}
                            >
                                {activeCompany.domain ? (
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${activeCompany.domain}&sz=128`}
                                        alt={activeCompany.name}
                                        className="h-8 w-8 rounded sm:h-10 sm:w-10"
                                    />
                                ) : (
                                    <BuildingOffice2Icon
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: "var(--vr-color-text-sub)" }}
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2
                                    className="vr-text-card-title"
                                    style={{ fontSize: "clamp(22px, 4vw, 28px)", lineHeight: 1.15 }}
                                >
                                    {activeCompany.name}
                                </h2>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <StartupRegionBadge location={activeCompany.location} />
                                    {activeCompany.registered && (
                                        <span
                                            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                                            style={{
                                                background: "rgba(0, 255, 215, 0.12)",
                                                color: "var(--vr-color-primary)",
                                                border: "1px solid rgba(0, 255, 215, 0.26)",
                                            }}
                                        >
                                            <CheckBadgeIcon className="w-3.5 h-3.5" />
                                            {activeCompany.abrVerifiedAt && activeCompany.acn ? "Verified" : "Registered"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Info grid */}
                        <div className="vr-company-info-grid">
                            <div>
                                <div className="vr-company-info-label flex items-center gap-1.5">
                                    <GlobeAltIcon className="w-3 h-3" />
                                    Website
                                </div>
                                <div className="vr-company-info-value truncate">
                                    {activeCompany.domain || "—"}
                                </div>
                            </div>
                            <div>
                                <div className="vr-company-info-label flex items-center gap-1.5">
                                    <IdentificationIcon className="w-3 h-3" />
                                    ABN
                                </div>
                                <div className="vr-company-info-value">
                                    {activeCompany.abn || "—"}
                                </div>
                            </div>
                            <div>
                                <div className="vr-company-info-label flex items-center gap-1.5">
                                    <IdentificationIcon className="w-3 h-3" />
                                    ACN
                                </div>
                                <div className="vr-company-info-value">
                                    {activeCompany.acn || "—"}
                                </div>
                            </div>
                            <div>
                                <div className="vr-company-info-label flex items-center gap-1.5">
                                    <CheckBadgeIcon className="w-3 h-3" />
                                    Status
                                </div>
                                <div className="vr-company-info-value">
                                    {activeCompany.abrVerifiedAt && activeCompany.acn
                                        ? "Verified registered company"
                                        : activeCompany.registered
                                            ? "Registered"
                                            : "Not yet registered"}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div
                            className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:flex-wrap"
                            style={{ borderTop: "1px solid var(--vr-color-border)" }}
                        >
                            <Link
                                to={activeCompanyHasUpdates ? "/founder-tools/updates" : "/founder-tools/updates/create"}
                                className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)] sm:mt-5 sm:w-auto"
                            >
                                <span className="sm:hidden">Open updates</span>
                                <span className="hidden sm:inline">Go to Updates</span>
                            </Link>
                            <Link
                                to="/founder-tools/company-setup?edit=true&next=/founder-tools/companies"
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-950 sm:mt-5 sm:w-auto"
                            >
                                <PencilSquareIcon className="w-4 h-4" />
                                <span className="sm:hidden">Edit company</span>
                                <span className="hidden sm:inline">Edit Details</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Other companies — compact row (only shown if there are any) */}
            {otherCompanies.length > 0 && (
                <div className="space-y-3">
                    <h3 className="vr-text-ui-label">Other Companies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {otherCompanies.map((company) => (
                            <Form method="POST" key={company.id}>
                                <input type="hidden" name="intent" value="switch-company" />
                                <input type="hidden" name="companyId" value={company.id} />
                                <button
                                    type="submit"
                                    disabled={isSwitching}
                                    className="vr-company-compact w-full flex items-center gap-3 p-4 text-left disabled:opacity-70"
                                    style={{ borderRadius: "var(--vr-radius-lg)" }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                                        style={{
                                            background: "var(--vr-color-surface)",
                                            border: "1px solid var(--vr-color-border)",
                                        }}
                                    >
                                        {company.domain ? (
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=64`}
                                                alt={company.name}
                                                className="w-7 h-7 rounded"
                                            />
                                        ) : (
                                            <BuildingOffice2Icon
                                                className="w-5 h-5"
                                                style={{ color: "var(--vr-color-text-sub)" }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="vr-text-card-title truncate" style={{ fontSize: "15px" }}>
                                            {company.name}
                                        </div>
                                        {company.domain && (
                                            <div
                                                className="vr-text-caption truncate"
                                                style={{ color: "var(--vr-color-text-sub)" }}
                                            >
                                                {company.domain}
                                            </div>
                                        )}
                                    </div>
                                    <span
                                        className="text-[11px] font-black uppercase tracking-wide"
                                        style={{ color: "var(--vr-color-text-sub)" }}
                                    >
                                        Switch
                                    </span>
                                </button>
                            </Form>
                        ))}
                    </div>
                </div>
            )}

            {/* Register new company — subtle dashed card at the bottom */}
            <Link
                to="/founder-tools/company-setup?new=true"
                className="vr-company-card-add group flex items-center justify-center gap-3 p-4 text-center sm:p-5"
                style={{ borderRadius: "var(--vr-radius-lg)" }}
            >
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: "var(--vr-color-bg)",
                        border: "1px solid var(--vr-color-border)",
                    }}
                >
                    <PlusIcon
                        className="w-5 h-5"
                        style={{ color: "var(--vr-color-text-sub)" }}
                    />
                </div>
                <span className="vr-text-body-small" style={{ color: "var(--vr-color-text-mid)", fontWeight: 500 }}>
                    <span className="sm:hidden">Add another company</span>
                    <span className="hidden sm:inline">Register another company</span>
                </span>
            </Link>

            {/* Danger zone — remove a company (revokes its integrations + deletes its data) */}
            {companies.length > 0 && (
                <div
                    className="rounded-2xl border p-5 sm:p-6"
                    style={{ borderColor: "rgba(220, 38, 38, 0.25)", background: "rgba(254, 242, 242, 0.5)" }}
                >
                    <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                        <h3 className="text-sm font-black uppercase tracking-wide text-red-700">Danger zone</h3>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-red-900/80">
                        Removing a company disconnects its integrations (Gmail, Stripe, Notion, Slack, and the rest) and
                        permanently deletes its updates and articles. This cannot be undone.
                    </p>

                    <div className="mt-4 space-y-2.5">
                        {companies.map((company) => {
                            const isConfirming = pendingRemovalId === company.id;
                            const isDeleting = deletingCompanyId === company.id;
                            const confirmMatches = confirmName.trim() === company.name.trim();
                            return (
                                <div
                                    key={company.id}
                                    className="rounded-xl border bg-white p-4"
                                    style={{ borderColor: "rgba(220, 38, 38, 0.18)" }}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-black text-gray-950">{company.name}</div>
                                            {company.domain && (
                                                <div className="truncate text-xs font-semibold text-gray-500">{company.domain}</div>
                                            )}
                                        </div>
                                        {!isConfirming ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPendingRemovalId(company.id);
                                                    setConfirmName("");
                                                }}
                                                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-black text-red-700 transition hover:bg-red-50"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Remove
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPendingRemovalId(null);
                                                    setConfirmName("");
                                                }}
                                                className="shrink-0 rounded-lg px-3 py-2 text-xs font-black text-gray-500 transition hover:text-gray-800"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>

                                    {isConfirming && (
                                        <Form method="POST" className="mt-3 border-t border-red-100 pt-3">
                                            <input type="hidden" name="intent" value="delete-company" />
                                            <input type="hidden" name="companyId" value={company.id} />
                                            <label className="block text-xs font-bold text-gray-700">
                                                Type <span className="font-black text-gray-950">{company.name}</span> to confirm
                                            </label>
                                            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                                                <input
                                                    name="confirmName"
                                                    value={confirmName}
                                                    onChange={(event) => setConfirmName(event.target.value)}
                                                    autoComplete="off"
                                                    placeholder={company.name}
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium outline-none focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={!confirmMatches || isDeleting}
                                                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                    {isDeleting ? "Removing…" : "Remove company"}
                                                </button>
                                            </div>
                                            {deleteError && (
                                                <p className="mt-2 text-xs font-bold text-red-700">{deleteError}</p>
                                            )}
                                        </Form>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

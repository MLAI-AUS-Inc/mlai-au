import type { Route } from "./+types/vibe-raising-app.companies";
import { Link, Form, redirect, useNavigation } from "react-router";
import { getEnv } from "~/lib/env.server";
import {
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
            (await getVibeRaisingMonthlyUpdates(env, request)).length > 0
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
            (await getVibeRaisingMonthlyUpdates(env, request)).length > 0;

        return redirect(hasExistingUpdate ? "/founder-tools/updates" : "/founder-tools/updates/create");
    }
    
    return null;
}

export default function ManageCompanies({ loaderData }: Route.ComponentProps) {
    const { user, activeCompanyId, activeCompanyHasUpdates } = loaderData;
    const companies = user.companies || [];
    const navigation = useNavigation();
    const isSwitching = navigation.state === "submitting" && navigation.formData?.get("intent") === "switch-company";

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
                                            Registered
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
                                    <CheckBadgeIcon className="w-3 h-3" />
                                    Status
                                </div>
                                <div className="vr-company-info-value">
                                    {activeCompany.registered ? "Registered" : "Not yet registered"}
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
        </div>
    );
}

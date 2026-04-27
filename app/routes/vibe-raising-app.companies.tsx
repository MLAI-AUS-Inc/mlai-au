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
    ArrowRightIcon,
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
                        Your active company is front and centre. Add another startup or switch between them any time.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                    <Link
                        to="/founder-tools/company-setup?new=true"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all"
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
                        <div className="absolute top-4 right-4">
                            <span className="vr-badge vr-badge-teal inline-flex items-center gap-1">
                                <CheckCircleIcon className="w-3.5 h-3.5" />
                                Active
                            </span>
                        </div>
                    </div>

                    {/* Showcase body */}
                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Title + logo row */}
                        <div className="flex items-start gap-4 flex-wrap">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                                style={{
                                    background: "var(--vr-color-surface)",
                                    border: "1px solid var(--vr-color-border)",
                                }}
                            >
                                {activeCompany.domain ? (
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${activeCompany.domain}&sz=128`}
                                        alt={activeCompany.name}
                                        className="w-10 h-10 rounded"
                                    />
                                ) : (
                                    <BuildingOffice2Icon
                                        className="w-7 h-7"
                                        style={{ color: "var(--vr-color-text-sub)" }}
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2
                                    className="vr-text-card-title"
                                    style={{ fontSize: "28px", lineHeight: 1.15 }}
                                >
                                    {activeCompany.name}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <StartupRegionBadge location={activeCompany.location} />
                                    {activeCompany.registered && (
                                        <span
                                            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                                            style={{
                                                background: "rgba(0, 200, 204, 0.1)",
                                                color: "#007a7d",
                                                border: "1px solid rgba(0, 200, 204, 0.2)",
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
                            className="flex flex-wrap gap-2.5 pt-2"
                            style={{ borderTop: "1px solid var(--vr-color-border)" }}
                        >
                            <Link
                                to={activeCompanyHasUpdates ? "/founder-tools/updates" : "/founder-tools/updates/create"}
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all mt-5"
                                style={{
                                    background: "var(--vr-color-primary)",
                                    color: "#fff",
                                    borderRadius: "var(--vr-radius-md)",
                                    boxShadow: "var(--vr-shadow-sm)",
                                }}
                            >
                                Go to Updates
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/founder-tools/company-setup"
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors mt-5"
                                style={{
                                    color: "var(--vr-color-text-mid)",
                                    background: "transparent",
                                    border: "1px solid var(--vr-color-border-md)",
                                    borderRadius: "var(--vr-radius-md)",
                                }}
                            >
                                <PencilSquareIcon className="w-4 h-4" />
                                Edit Details
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
                                    <ArrowRightIcon
                                        className="w-4 h-4 flex-shrink-0"
                                        style={{ color: "var(--vr-color-text-sub)" }}
                                    />
                                </button>
                            </Form>
                        ))}
                    </div>
                </div>
            )}

            {/* Register new company — subtle dashed card at the bottom */}
            <Link
                to="/founder-tools/company-setup?new=true"
                className="vr-company-card-add flex items-center justify-center gap-3 p-5 text-center group"
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
                    Register another company
                </span>
            </Link>
        </div>
    );
}

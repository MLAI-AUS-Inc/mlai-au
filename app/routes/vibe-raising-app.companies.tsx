import type { Route } from "./+types/vibe-raising-app.companies";
import { Link, Form, redirect, useNavigation } from "react-router";
import {
    requireFounder,
    getActiveCompany,
    hasSubmittedVibeRaisingUpdate,
    setActiveCompany,
    createVibeRaisingSessionCookie,
    VIBE_RAISING_APP_PATH,
    VIBE_RAISING_COMPANY_SETUP_PATH,
    VIBE_RAISING_CREATE_UPDATE_PATH,
} from "~/lib/vibe-raising-session";
import { PlusIcon, BuildingOffice2Icon, CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import StartupRegionBadge from "~/components/StartupRegionBadge";

export async function loader({ request }: Route.LoaderArgs) {
    const user = requireFounder(request);
    const activeCompany = getActiveCompany(user);
    return { user, activeCompanyId: activeCompany?.id };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent")?.toString();

    if (intent === "switch-company") {
        const user = requireFounder(request);
        const companyId = formData.get("companyId")?.toString() || "";
        const updatedUser = setActiveCompany(user, companyId);
        const hasExistingUpdate = hasSubmittedVibeRaisingUpdate(request, updatedUser, companyId);
        const nextPath = hasExistingUpdate ? VIBE_RAISING_APP_PATH : VIBE_RAISING_CREATE_UPDATE_PATH;

        return redirect(nextPath, {
            headers: { "Set-Cookie": createVibeRaisingSessionCookie(updatedUser) },
        });
    }
    
    return null;
}

export default function ManageCompanies({ loaderData }: Route.ComponentProps) {
    const { user, activeCompanyId } = loaderData;
    const companies = user.companies || [];
    const navigation = useNavigation();
    const isSwitching = navigation.state === "submitting" && navigation.formData?.get("intent") === "switch-company";

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Companies</h1>
                <p className="text-gray-500 mt-2">Select a company to view or update its progress, or register a new one.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Existing Companies */}
                {companies.map(company => {
                    const isActive = company.id === activeCompanyId;
                    return (
                        <div 
                            key={company.id} 
                            className={`relative flex flex-col bg-white rounded-2xl border ${isActive ? "border-violet-500 shadow-md ring-1 ring-violet-500" : "border-gray-200 shadow-sm hover:border-gray-300"} overflow-hidden transition-all`}
                        >
                            {isActive && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-violet-500"></div>
                            )}
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
                                        {company.domain ? (
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=64`}
                                                alt={company.name}
                                                className="w-8 h-8 rounded"
                                            />
                                        ) : (
                                            <BuildingOffice2Icon className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                    {isActive && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-700/10">
                                            <CheckCircleIcon className="w-3.5 h-3.5" />
                                            Active
                                        </span>
                                    )}
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{company.name}</h3>
                                <div className="flex flex-wrap items-center gap-2">
                                    {company.domain && (
                                        <p className="text-sm text-gray-500 truncate">{company.domain}</p>
                                    )}
                                    <StartupRegionBadge location={company.location} />
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-50 bg-gray-50/50 mt-auto">
                                <Form method="POST" className="w-full">
                                    <input type="hidden" name="intent" value="switch-company" />
                                    <input type="hidden" name="companyId" value={company.id} />
                                    <button
                                        type="submit"
                                        disabled={isSwitching}
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                            isActive 
                                                ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm" 
                                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                        }`}
                                    >
                                        {isActive ? (
                                            <>Go to Updates <ArrowRightIcon className="w-4 h-4" /></>
                                        ) : (
                                            "Manage Updates"
                                        )}
                                    </button>
                                </Form>
                            </div>
                        </div>
                    );
                })}

                {/* Add New Company Card */}
                <Link 
                    to={`${VIBE_RAISING_COMPANY_SETUP_PATH}?new=true`}
                    className="flex flex-col items-center justify-center text-center p-8 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50/50 transition-all group min-h-[220px]"
                >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 mb-4 group-hover:scale-110 group-hover:bg-violet-600 group-hover:border-violet-600 transition-all duration-300">
                        <PlusIcon className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-violet-700 mb-1">Register New Company</h3>
                    <p className="text-xs text-gray-500">Add another startup to your Vibe Raising portfolio.</p>
                </Link>
            </div>
        </div>
    );
}

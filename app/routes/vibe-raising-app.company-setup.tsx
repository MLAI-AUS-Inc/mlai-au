import { Form, redirect, useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/vibe-raising-app.company-setup";
import { ArrowPathIcon, BuildingOffice2Icon, GlobeAltIcon, IdentificationIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { getEnv } from "~/lib/env.server";
import {
    getActiveVibeRaisingCompany,
    requireVibeRaisingFounder,
    saveVibeRaisingCompany,
    setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
    const activeCompany = getActiveVibeRaisingCompany(user);

    // If not adding a new company and already registered, skip setup
    if (!isAddingNew && user.companyRegistered) {
        throw redirect("/founder-tools/data-sources");
    }

    return { user, activeCompany, isAddingNew };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
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
        abn,
        ...(location ? { location } : {}),
        registered: true,
    });

    if (isAddingNew) {
        if (companyId) {
            await setVibeRaisingActiveCompany(env, request, companyId);
        }
        return redirect("/founder-tools/updates");
    }

    if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
    }

    return redirect("/founder-tools/data-sources");
}

export default function CompanySetup() {
    const { user, activeCompany, isAddingNew } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex items-center justify-center p-4 min-h-[70vh]">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-violet-50 mb-4">
                            <BuildingOffice2Icon className="w-7 h-7 text-violet-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {isAddingNew ? "Add Another Company" : "Let's start with some basic details"}
                        </h1>
                    </div>

                    <Form method="POST" className="space-y-6">
                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-bold text-gray-700 mb-2">
                                Company Name<span className="text-red-600 ml-0.5" aria-hidden="true">*</span>
                            </label>
                            <div className="relative">
                                <BuildingOffice2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    defaultValue={isAddingNew ? "" : activeCompany?.name || user.companyName}
                                    placeholder="Acme Inc."
                                    required
                                    autoComplete="organization"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                                Startup Location
                            </label>
                            <div className="relative">
                                <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    defaultValue={isAddingNew ? "" : activeCompany?.location || ""}
                                    placeholder="Melbourne, Australia"
                                    autoComplete="address-level2"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-gray-400">Used to show your startup region on update cards.</p>
                        </div>

                        {/* Domain */}
                        <div>
                            <label htmlFor="domain" className="block text-sm font-bold text-gray-700 mb-2">
                                Domain<span className="text-red-600 ml-0.5" aria-hidden="true">*</span>
                            </label>
                            <div className="relative">
                                <GlobeAltIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="domain"
                                    name="domain"
                                    defaultValue={isAddingNew ? "" : activeCompany?.domain || ""}
                                    placeholder="example.com.au"
                                    required
                                    autoComplete="url"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                        </div>

                        {/* ABN */}
                        <div>
                            <label htmlFor="abn" className="block text-sm font-bold text-gray-700 mb-2">
                                ABN<span className="text-red-600 ml-0.5" aria-hidden="true">*</span>
                            </label>
                            <div className="relative">
                                <IdentificationIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="abn"
                                    name="abn"
                                    defaultValue={isAddingNew ? "" : activeCompany?.abn || ""}
                                    placeholder="51 824 753 556"
                                    required
                                    autoComplete="off"
                                    inputMode="numeric"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-gray-400">Australian Business Number - 11 digits</p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 bg-violet-600 text-white font-bold rounded-xl transition-all duration-200 mt-2 shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2
                                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-violet-700 hover:shadow-xl active:scale-[0.98]"}`}
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

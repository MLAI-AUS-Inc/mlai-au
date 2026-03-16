import { Form, redirect, useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/vibe-raising-app.company-setup";
import { requireFounder, createVibeRaisingSessionCookie, addCompany, type Company } from "~/lib/vibe-raising-session";
import { BuildingOffice2Icon, GlobeAltIcon, IdentificationIcon } from "@heroicons/react/24/outline";

export async function loader({ request }: Route.LoaderArgs) {
    const user = requireFounder(request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";

    // If not adding a new company and already registered, skip setup
    if (!isAddingNew && user.companyRegistered) {
        throw redirect("/vibe-raising/create-update");
    }

    return { user, isAddingNew };
}

export async function action({ request }: Route.ActionArgs) {
    const user = requireFounder(request);
    const url = new URL(request.url);
    const isAddingNew = url.searchParams.get("new") === "true";
    const formData = await request.formData();

    const companyName = formData.get("companyName")?.toString() || user.companyName;
    const domain = formData.get("domain")?.toString() || "";
    const abn = formData.get("abn")?.toString() || "";

    if (isAddingNew) {
        // Adding a new company to the array
        const newId = `company-${Date.now()}`;
        const newCompany: Company = {
            id: newId,
            name: companyName,
            domain,
            abn,
            registered: true,
        };
        const updatedUser = addCompany(user, newCompany);
        return redirect("/vibe-raising", {
            headers: { "Set-Cookie": createVibeRaisingSessionCookie(updatedUser) },
        });
    }

    // First-time setup: initialize the companies array with this company
    const companyId = `company-${Date.now()}`;
    const company: Company = {
        id: companyId,
        name: companyName,
        domain,
        abn,
        registered: true,
    };

    const updatedUser = {
        ...user,
        companyName,
        domain,
        abn,
        companyRegistered: true,
        companies: [company],
        activeCompanyId: companyId,
    };

    return redirect("/vibe-raising/create-update", {
        headers: { "Set-Cookie": createVibeRaisingSessionCookie(updatedUser) },
    });
}

export default function CompanySetup() {
    const { user, isAddingNew } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex items-center justify-center p-4 min-h-[70vh]">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4">
                            <BuildingOffice2Icon className="w-7 h-7 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {isAddingNew ? "Add Another Company" : "Register Your Company"}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {isAddingNew
                                ? "Register a new company to create investor updates for."
                                : "Quick setup before your first investor update — takes less than a minute."}
                        </p>
                    </div>

                    <Form method="POST" className="space-y-6">
                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-bold text-gray-700 mb-2">
                                Company Name
                            </label>
                            <div className="relative">
                                <BuildingOffice2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    defaultValue={isAddingNew ? "" : user.companyName}
                                    placeholder="Acme Inc."
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                        </div>

                        {/* Domain */}
                        <div>
                            <label htmlFor="domain" className="block text-sm font-bold text-gray-700 mb-2">
                                Domain
                            </label>
                            <div className="relative">
                                <GlobeAltIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="domain"
                                    name="domain"
                                    placeholder="example.com.au"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                        </div>

                        {/* ABN */}
                        <div>
                            <label htmlFor="abn" className="block text-sm font-bold text-gray-700 mb-2">
                                ABN
                            </label>
                            <div className="relative">
                                <IdentificationIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="abn"
                                    name="abn"
                                    placeholder="51 824 753 556"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-gray-400">Australian Business Number — 11 digits</p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-xl transition-all duration-200 mt-2 shadow-lg shadow-blue-500/20
                                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"}`}
                        >
                            {isSubmitting ? "Saving..." : isAddingNew ? "Add Company" : "Continue"}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

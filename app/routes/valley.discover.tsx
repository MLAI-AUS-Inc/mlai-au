import { Link, useLoaderData } from "react-router";
import { requireFounder } from "~/lib/valley-session";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export async function loader({ request }: any) {
    const user = requireFounder(request);
    const { getInvestors } = await import("~/lib/storage.server");
    const investors = await getInvestors();
    return { user, investors };
}

export default function DiscoverInvestors() {
    const { investors } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Discover Investors</h1>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Find Your Match</h3>
                <p className="text-gray-500 mb-6">Browse our network of investors (Coming Soon)</p>
            </div>
        </div>
    );
}

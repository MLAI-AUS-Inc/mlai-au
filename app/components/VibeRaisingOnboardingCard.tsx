import { Form } from "react-router";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import type { VibeRaisingRole } from "~/types/vibe-raising";

interface VibeRaisingOnboardingCardProps {
  email: string;
  isSubmitting?: boolean;
  error?: string | null;
  defaultRole?: VibeRaisingRole;
  defaultOrganizationName?: string;
}

export default function VibeRaisingOnboardingCard({
  email,
  isSubmitting = false,
  error,
  defaultOrganizationName = "",
}: VibeRaisingOnboardingCardProps) {
  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Vibe Raising
          </h1>
          <p className="text-gray-500 text-sm">
            Connect founders with investors through monthly updates
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            Signed in as {email}
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <Form method="POST" className="space-y-6">
          <input type="hidden" name="intent" value="complete-onboarding" />
          <input type="hidden" name="role" value="founder" />

          <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
            <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
            Founder workspace
          </div>

          <div>
            <label
              htmlFor="organizationName"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Startup Name
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              defaultValue={defaultOrganizationName}
              placeholder="Acme Inc."
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-blue-500/20 ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </Form>
      </div>
    </div>
  );
}

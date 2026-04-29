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
      <div className="rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-color-card)] p-8 shadow-lg sm:p-12">
        <div className="text-center mb-8">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-[var(--vr-color-text)]">
            Vibe Raising
          </h1>
          <p className="text-sm text-[var(--vr-color-text-sub)]">
            Connect founders with investors through monthly updates
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--vr-color-text-sub)]">
            Signed in as {email}
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-[rgba(242,114,63,0.35)] bg-[rgba(242,114,63,0.10)] px-4 py-3 text-sm text-[var(--vr-color-text)]">
            {error}
          </div>
        ) : null}

        <Form method="POST" className="space-y-6">
          <input type="hidden" name="intent" value="complete-onboarding" />
          <input type="hidden" name="role" value="founder" />

          <div className="flex items-center gap-3 rounded-xl border border-[rgba(0,128,128,0.22)] bg-[rgba(0,255,215,0.12)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
            <BuildingOffice2Icon className="h-5 w-5 text-[var(--vr-color-primary)]" />
            Founder workspace
          </div>

          <div>
            <label
              htmlFor="organizationName"
              className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]"
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
              className="w-full rounded-xl border border-[var(--vr-color-border)] px-4 py-3.5 font-medium text-[var(--vr-color-text)] outline-none transition-all duration-200 placeholder:text-[var(--vr-color-text-sub)] focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 w-full rounded-xl bg-[var(--vr-color-primary)] px-6 py-4 font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition-all duration-200 ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[var(--vr-palette-black)] hover:shadow-xl active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </Form>
      </div>
    </div>
  );
}

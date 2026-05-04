import type { Route } from "./+types/vibe-raising-app";
import { useState } from "react";
import {
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import VibeRaisingOnboardingCard from "~/components/VibeRaisingOnboardingCard";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import { getEnv } from "~/lib/env.server";
import {
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
  saveVibeRaisingCompany,
  saveVibeRaisingProfile,
  setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";
import {
  BuildingOffice2Icon,
  CircleStackIcon,
  DocumentTextIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const FOUNDER_NAVIGATION = [
  { name: "Vibe Raising", href: "/founder-tools/updates", icon: DocumentTextIcon, exact: true },
  { name: "Vibe Marketing", href: "/founder-tools/marketing", icon: MegaphoneIcon },
  { name: "Data Sources", href: "/founder-tools/data-sources", icon: CircleStackIcon },
  { name: "Companies", href: "/founder-tools/companies", icon: BuildingOffice2Icon },
];

export const meta: Route.MetaFunction = () => [
  { name: "robots", content: "noindex, nofollow" },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  return {
    user: vibeContext.authUser,
    profile: vibeContext.profile,
    appUser: vibeContext.appUser,
  };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  if (intent !== "complete-onboarding") {
    return null;
  }

  const role = "founder";
  const organizationName = formData.get("organizationName")?.toString().trim();

  if (!organizationName) {
    return { error: "Please provide your startup name." };
  }

  try {
    await saveVibeRaisingProfile(env, request, {
      role,
      organizationName: null,
    });

    const companyId = await saveVibeRaisingCompany(env, request, {
      name: organizationName,
      registered: false,
    });

    if (companyId) {
      await setVibeRaisingActiveCompany(env, request, companyId);
    }

    return redirect("/founder-tools/company-setup");
  } catch (error) {
    console.error("Failed to complete Vibe Raising onboarding:", error);
    return {
      error:
        "We couldn't save your Vibe Raising profile right now. Please try again.",
    };
  }
}

export default function VibeRaisingApp() {
  const { user, profile, appUser } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const location = useLocation();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [onCompleteCallback, setOnCompleteCallback] =
    useState<(() => void) | undefined>();

  const triggerAnnouncement = (callback?: () => void) => {
    setOnCompleteCallback(() => callback);
    setShowAnnouncement(true);
  };

  if (!appUser && location.pathname.startsWith("/founder-tools/marketing")) {
    return (
      <AuthenticatedLayout
        user={user}
        navigation={FOUNDER_NAVIGATION}
        userNavigation={[]}
        logoutAction="/founder-tools/logout"
      >
        <Outlet context={{ triggerAnnouncement }} />
      </AuthenticatedLayout>
    );
  }

  if (!appUser) {
    return (
      <main className="min-h-screen bg-[var(--vr-color-app-bg)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
          <VibeRaisingOnboardingCard
            email={user.email}
            isSubmitting={navigation.state === "submitting"}
            error={actionData?.error}
            defaultRole={profile?.role ?? "founder"}
            defaultOrganizationName={
              profile?.organizationName ?? profile?.companies[0]?.name ?? ""
            }
          />
        </div>
      </main>
    );
  }

  return (
    <AuthenticatedLayout
      user={user}
      navigation={FOUNDER_NAVIGATION}
      userNavigation={[]}
      logoutAction="/founder-tools/logout"
    >
      {showAnnouncement ? (
        <VibeRaisingIntroPopup
          onDismiss={() => setShowAnnouncement(false)}
          onComplete={onCompleteCallback}
          onSkip={onCompleteCallback}
        />
      ) : null}

      <Outlet context={{ triggerAnnouncement }} />
    </AuthenticatedLayout>
  );
}

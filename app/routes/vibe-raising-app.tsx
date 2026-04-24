import type { Route } from "./+types/vibe-raising-app";
import { useState } from "react";
import {
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
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
  UsersIcon,
} from "@heroicons/react/24/outline";

const FOUNDER_NAVIGATION = [
  { name: "My Updates", href: "/vibe-raising", icon: DocumentTextIcon, exact: true },
  { name: "Data Sources", href: "/vibe-raising/connect-data", icon: CircleStackIcon },
  { name: "Discover Investors", href: "/vibe-raising/discover", icon: UsersIcon },
  { name: "Manage Companies", href: "/vibe-raising/companies", icon: BuildingOffice2Icon },
];

const INVESTOR_NAVIGATION = [
  { name: "Portfolio Updates", href: "/vibe-raising", icon: DocumentTextIcon, exact: true },
  { name: "Connections", href: "/vibe-raising/discover", icon: UsersIcon },
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

  const role = formData.get("role")?.toString();
  const organizationName = formData.get("organizationName")?.toString().trim();

  if ((role !== "founder" && role !== "investor") || !organizationName) {
    return { error: "Please choose a role and provide your startup or firm name." };
  }

  try {
    await saveVibeRaisingProfile(env, request, {
      role,
      organizationName: role === "investor" ? organizationName : null,
    });

    if (role === "founder") {
      const companyId = await saveVibeRaisingCompany(env, request, {
        name: organizationName,
        registered: false,
      });

      if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
      }

      return redirect("/vibe-raising/company-setup");
    }

    return redirect("/vibe-raising");
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
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [onCompleteCallback, setOnCompleteCallback] =
    useState<(() => void) | undefined>();

  const triggerAnnouncement = (callback?: () => void) => {
    setOnCompleteCallback(() => callback);
    setShowAnnouncement(true);
  };

  if (!appUser) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
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

  const nav =
    appUser.role === "investor" ? INVESTOR_NAVIGATION : FOUNDER_NAVIGATION;

  return (
    <AuthenticatedLayout
      user={user}
      navigation={nav}
      userNavigation={[]}
      logoutAction="/vibe-raising/logout"
    >
      {appUser.role === "founder" && showAnnouncement ? (
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

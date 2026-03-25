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
  DocumentTextIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const FOUNDER_NAVIGATION = [
  { name: "My Updates", href: "/vibe-raising", icon: DocumentTextIcon },
  { name: "Discover Investors", href: "/vibe-raising/discover", icon: UsersIcon },
  { name: "Manage Companies", href: "/vibe-raising/companies", icon: BuildingOffice2Icon },
];

const INVESTOR_NAVIGATION = [
  { name: "Portfolio Updates", href: "/vibe-raising", icon: DocumentTextIcon },
  { name: "Connections", href: "/vibe-raising/discover", icon: UsersIcon },
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

function AnnouncementPopup({
  onDismiss,
  onComplete,
}: {
  onDismiss: () => void;
  onComplete?: () => void;
}) {
  const handleComplete = () => {
    onDismiss();
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onDismiss}
      />

      <div className="relative z-[110] flex w-full max-w-3xl h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative flex-shrink-0 w-[315px] h-full bg-black overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1174236138?autoplay=1&muted=1&loop=0&title=0&byline=0&portrait=0"
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vibe Raising Intro"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to Vibe Raising
            </h2>
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 px-6 py-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              Watch this short intro on how Vibe Raising connects founders with
              investors through consistent, transparent monthly updates.
            </p>
          </div>

          <div className="px-6 pb-6 flex flex-col gap-3">
            <button
              onClick={handleComplete}
              className="w-full py-3.5 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              Get Started →
            </button>
            <button
              onClick={onDismiss}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
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
        <AnnouncementPopup
          onDismiss={() => setShowAnnouncement(false)}
          onComplete={onCompleteCallback}
        />
      ) : null}

      <Outlet context={{ triggerAnnouncement }} />
    </AuthenticatedLayout>
  );
}

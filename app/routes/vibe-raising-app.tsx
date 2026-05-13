import type { Route } from "./+types/vibe-raising-app";
import type { ShouldRevalidateFunctionArgs } from "react-router";
import { useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
} from "react-router";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import { getEnv } from "~/lib/env.server";
import {
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";
import { shouldSkipVibeMarketingCreateRevalidation } from "~/lib/vibe-marketing-step-revalidation";
import {
  ChartBarIcon,
  DocumentTextIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const BASE_FOUNDER_NAVIGATION = [
  { name: "Dashboard", href: "/founder-tools", icon: ChartBarIcon, exact: true },
  {
    name: "Vibe Raising",
    href: "/founder-tools/overview",
    icon: DocumentTextIcon,
    matchPaths: [
      "/founder-tools/overview",
      "/founder-tools/updates",
      "/founder-tools/drafts",
      "/founder-tools/data-sources",
      "/founder-tools/companies",
      "/founder-tools/discover",
    ],
  },
  { name: "Vibe Marketing", href: "/founder-tools/marketing", icon: MegaphoneIcon },
];

function canAccessDuringCompanySetup(pathname: string) {
  return (
    pathname === "/founder-tools/company-setup" ||
    pathname === "/founder-tools/company-setup/" ||
    pathname.startsWith("/founder-tools/marketing/autofill-runs/")
  );
}

export const meta: Route.MetaFunction = () => [
  { name: "robots", content: "noindex, nofollow" },
];

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  if (shouldSkipVibeMarketingCreateRevalidation(args)) {
    return false;
  }
  return args.defaultShouldRevalidate;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);
  const pathname = new URL(request.url).pathname;

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  if (!vibeContext.appUser && !canAccessDuringCompanySetup(pathname)) {
    throw redirect("/founder-tools/company-setup");
  }

  if (
    vibeContext.appUser &&
    !vibeContext.appUser.companyRegistered &&
    !canAccessDuringCompanySetup(pathname)
  ) {
    throw redirect("/founder-tools/company-setup");
  }

  return {
    user: vibeContext.authUser,
    profile: vibeContext.profile,
    appUser: vibeContext.appUser,
  };
}

export default function VibeRaisingApp() {
  const { user } = useLoaderData<typeof loader>();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [onCompleteCallback, setOnCompleteCallback] =
    useState<(() => void) | undefined>();

  const triggerAnnouncement = (callback?: () => void) => {
    setOnCompleteCallback(() => callback);
    setShowAnnouncement(true);
  };

  return (
    <AuthenticatedLayout
      user={user}
      navigation={BASE_FOUNDER_NAVIGATION}
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

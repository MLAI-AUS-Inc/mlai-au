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
import { isFounderToolsDiscoverEnabled } from "~/lib/founder-tools-preview";
import {
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";
import { shouldSkipVibeMarketingCreateRevalidation } from "~/lib/vibe-marketing-step-revalidation";
import {
  BuildingOffice2Icon,
  CircleStackIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  MegaphoneIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const BASE_FOUNDER_NAVIGATION = [
  { name: "Overview", href: "/founder-tools/overview", icon: HomeIcon, exact: true },
  { name: "Dashboard", href: "/founder-tools", icon: HomeIcon, exact: true },
  { name: "Vibe Raising", href: "/founder-tools/updates", icon: DocumentTextIcon, exact: true },
  { name: "My Drafts", href: "/founder-tools/drafts", icon: DocumentDuplicateIcon },
  { name: "Discover Investors", href: "/founder-tools/discover", icon: UsersIcon },
  { name: "Vibe Marketing", href: "/founder-tools/marketing", icon: MegaphoneIcon },
  { name: "Data Sources", href: "/founder-tools/data-sources", icon: CircleStackIcon },
  { name: "Companies", href: "/founder-tools/companies", icon: BuildingOffice2Icon },
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
  const founderNavigation = isFounderToolsDiscoverEnabled()
    ? BASE_FOUNDER_NAVIGATION
    : BASE_FOUNDER_NAVIGATION.filter((item) => item.href !== "/founder-tools/discover");
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
      navigation={founderNavigation}
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

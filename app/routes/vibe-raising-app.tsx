import { MyStartupMigrationLink } from "~/components/MyStartupMigrationLink";
import type { Route } from "./+types/vibe-raising-app";
import type { ShouldRevalidateFunctionArgs } from "react-router";
import { useEffect, useState } from "react";
import {
  Outlet,
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router";
import {
  ActiveDraftRunBanner,
  ActiveDraftRunProvider,
} from "~/components/ActiveDraftRunStatus";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import CompanySwitcher from "~/components/CompanySwitcher";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import { getEnv } from "~/lib/env.server";
import { isApiUnavailableError } from "~/lib/api";
import { progressEnabled } from "~/lib/startup-progress";
import { getCurrentRooPointsBalance } from "~/lib/roo-points";
import {
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
  resolveActiveCompanyId,
  setVibeRaisingBrowserCompanyScope,
} from "~/lib/vibe-raising";
import { shouldSkipVibeMarketingCreateRevalidation } from "~/lib/vibe-marketing-step-revalidation";
import {
  ChartBarIcon,
  CircleStackIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  MegaphoneIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const BASE_FOUNDER_NAVIGATION = [
  { name: "Dashboard", href: "/founder-tools", icon: ChartBarIcon, exact: true },
  {
    name: "Vibe Raising",
    href: "/founder-tools/updates",
    icon: DocumentTextIcon,
    matchPaths: [
      "/founder-tools/updates",
      "/founder-tools/drafts",
      "/founder-tools/discover",
    ],
  },
  { name: "Vibe Marketing", href: "/founder-tools/marketing", icon: MegaphoneIcon },
  { name: "Upgrades", href: "/founder-tools/upgrades", icon: BoltIcon },
  { name: "Data Sources", href: "/founder-tools/data-sources", icon: CircleStackIcon },
  { name: "My Companies", href: "/founder-tools/companies", icon: BuildingOffice2Icon },
];

const FOUNDER_USER_NAVIGATION = [
  { name: "My companies", href: "/founder-tools/companies" },
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
  if (shouldRefreshShellAfterAction(args.actionResult)) {
    return true;
  }
  if (shouldSkipVibeMarketingCreateRevalidation(args)) {
    return false;
  }
  return args.defaultShouldRevalidate;
}

function shouldRefreshShellAfterAction(actionResult: unknown) {
  if (!actionResult || typeof actionResult !== "object") return false;
  const payload = actionResult as Record<string, unknown>;
  const intent = typeof payload.intent === "string" ? payload.intent : "";
  if (intent !== "start-content-island-discovery") return false;
  const error = typeof payload.error === "string" ? payload.error.trim() : "";
  const runId = typeof payload.runId === "string" ? payload.runId.trim() : "";
  return Boolean(runId && !error);
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  let vibeContext: Awaited<ReturnType<typeof getOptionalVibeRaisingContext>>;
  try {
    vibeContext = await getOptionalVibeRaisingContext(env, request);
  } catch (error) {
    if (isApiUnavailableError(error)) {
      throw new Response(null, { status: 503, statusText: "Founder tools temporarily unavailable" });
    }
    throw error;
  }
  const pathname = new URL(request.url).pathname;

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  if (!vibeContext.appUser && !canAccessDuringCompanySetup(pathname)) {
    throw redirect("/founder-tools/company-setup");
  }

  if (
    vibeContext.appUser &&
    !vibeContext.appUser.companies.length &&
    !canAccessDuringCompanySetup(pathname)
  ) {
    throw redirect("/founder-tools/company-setup");
  }

  const rooPointsBalance = await getCurrentRooPointsBalance(env, request);

  return {
    user: vibeContext.authUser,
    profile: vibeContext.profile,
    appUser: vibeContext.appUser,
    rooPointsBalance,
    backendBaseUrl: String(env.BACKEND_BASE_URL || "https://api.mlai.au"),
    progressAvailable: progressEnabled(env),
  };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const location = useLocation();
  const marketing = location.pathname.startsWith("/founder-tools/marketing");
  const unavailable = isApiUnavailableError(error) || (isRouteErrorResponse(error) && error.status === 503);
  const title = unavailable
    ? marketing ? "Vibe Marketing is temporarily unavailable" : "Founder tools are temporarily unavailable"
    : "Founder tools could not load";

  return (
    <main className="mx-auto max-w-2xl px-6 py-20" role="alert">
      <div className="rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-600">
          {unavailable
            ? "The service did not respond. Try this page again in a moment."
            : "Please try this page again. If the problem continues, contact MLAI support."}
        </p>
        <a
          href={`${location.pathname}${location.search}`}
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Try again
        </a>
      </div>
    </main>
  );
}

export default function VibeRaisingApp() {
  const { user, appUser, backendBaseUrl, rooPointsBalance, progressAvailable } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const loadingMarketingPage = navigation.state === "loading" &&
    (navigation.location?.pathname === "/founder-tools/marketing" ||
      navigation.location?.pathname.startsWith("/founder-tools/marketing/"));
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [onCompleteCallback, setOnCompleteCallback] =
    useState<(() => void) | undefined>();

  const triggerAnnouncement = (callback?: () => void) => {
    setOnCompleteCallback(() => callback);
    setShowAnnouncement(true);
  };

  const companySwitcher =
    appUser && appUser.companies.length > 0 ? (
      <CompanySwitcher companies={appUser.companies} activeCompanyId={appUser.activeCompanyId ?? null} />
    ) : undefined;

  // Pin this tab's browser-side API calls (previews, selections, uploads,
  // email-draft polling) to the company this render is for, so a switch in
  // another tab can't redirect them to a sibling startup.
  const scopedCompanyId = resolveActiveCompanyId(appUser);
  useEffect(() => {
    setVibeRaisingBrowserCompanyScope(scopedCompanyId);
  }, [scopedCompanyId]);

  return (
    <AuthenticatedLayout
      user={user}
      navigation={progressAvailable ? [BASE_FOUNDER_NAVIGATION[0], { name: "Progress", href: "/founder-tools/progress", icon: ChartBarIcon, exact: true }, ...BASE_FOUNDER_NAVIGATION.slice(1)] : BASE_FOUNDER_NAVIGATION}
      userNavigation={FOUNDER_USER_NAVIGATION}
      rooPointsBalance={rooPointsBalance}
      logoutAction="/founder-tools/logout"
      companySwitcher={companySwitcher}
    >
      {showAnnouncement ? (
        <VibeRaisingIntroPopup
          onDismiss={() => setShowAnnouncement(false)}
          onComplete={onCompleteCallback}
        />
      ) : null}

      <MyStartupMigrationLink companyId={scopedCompanyId} />
      <div className="vr-scope">
        {loadingMarketingPage ? (
          <div role="status" className="fixed right-4 top-20 z-50 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700 motion-reduce:animate-none" />
            Loading marketing…
          </div>
        ) : null}
        <ActiveDraftRunProvider backendBaseUrl={backendBaseUrl}>
          <ActiveDraftRunBanner />
          <Outlet context={{ triggerAnnouncement }} />
        </ActiveDraftRunProvider>
      </div>
    </AuthenticatedLayout>
  );
}

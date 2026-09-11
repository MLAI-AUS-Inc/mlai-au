import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/vibe-raising-app._index";
import { getEnv } from "~/lib/env.server";
import { getVibeRaisingMonthlyUpdatesBundle, getOptionalVibeRaisingContext, getVibeRaisingLoginHref, resolveActiveCompanyId, getVibeRaisingInputSourcesForRequest } from "~/lib/vibe-raising";
import { getUpdatesFinancialSeries } from "~/lib/startup-updates-presentation";
import StartupUpdatesPage from "~/components/vibe-raising/StartupUpdatesPage";
import { ActiveDraftRunChip } from "~/components/ActiveDraftRunStatus";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { authUser, appUser: user } = await getOptionalVibeRaisingContext(env, request);
  if (!authUser) throw redirect(getVibeRaisingLoginHref(request));
  if (!user) throw redirect("/founder-tools/company-setup");
  const companyId = resolveActiveCompanyId(user);
  const [bundle, sources] = await Promise.all([
    getVibeRaisingMonthlyUpdatesBundle(env, request, companyId),
    // Optional chart data must not prevent the updates themselves from loading.
    getVibeRaisingInputSourcesForRequest(env, request, companyId).catch(() => []),
  ]);
  return { user, updates: bundle.updates, financialSeries: getUpdatesFinancialSeries(bundle.updates, sources) };
}

export default function StartupUpdates() {
  const { user, updates, financialSeries } = useLoaderData<typeof loader>();
  return <StartupUpdatesPage key={user.activeCompanyId || user.companyName} user={user} updates={updates} financialSeries={financialSeries} runStatus={<ActiveDraftRunChip />} />;
}

import { Form, Link, redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/vibe-raising-app._index";
import { getEnv } from "~/lib/env.server";
import { getVibeRaisingMonthlyUpdatesBundle, getOptionalVibeRaisingContext, getVibeRaisingLoginHref, resolveActiveCompanyId, getStartupHealth, saveStartupReportingConfig } from "~/lib/vibe-raising";
import VRUpdateSnippetCard from "~/components/vibe-raising/VRUpdateSnippetCard";
import { ActiveDraftRunChip } from "~/components/ActiveDraftRunStatus";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { authUser, appUser: user } = await getOptionalVibeRaisingContext(env, request);
  if (!authUser) throw redirect(getVibeRaisingLoginHref(request));
  if (!user) throw redirect("/founder-tools/company-setup");
  const companyId = resolveActiveCompanyId(user);
  const [bundle, health] = await Promise.all([
    getVibeRaisingMonthlyUpdatesBundle(env, request, companyId),
    getStartupHealth(env, request, companyId),
  ]);
  return { user, ...bundle, health, companyId };
}

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  await saveStartupReportingConfig(getEnv(context), request, {
    companyId: String(form.get("companyId") || ""),
    timezone: String(form.get("timezone") || "UTC"),
    currency: String(form.get("currency") || ""),
    metricLabel: String(form.get("metricLabel") || ""),
    metricDefinition: String(form.get("metricDefinition") || ""),
  });
  return { saved: true };
}

export default function BusinessHealth() {
  const { user, updates, metricHistory, health, companyId } = useLoaderData<typeof loader>();
  return <div className="mx-auto max-w-6xl space-y-8 pb-12">
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold text-gray-950">Business health</h1>
        <p className="mt-2 text-gray-600">{user.companyName || "Your startup"}</p></div>
      <div className="flex gap-4"><Link to="/founder-tools/data-sources" className="font-semibold underline">Connected sources</Link>
        <Link to="/founder-tools/updates/create" className="rounded-xl bg-teal-700 px-4 py-2 font-bold text-white">Create update</Link></div>
    </header>
    <ActiveDraftRunChip />
    <section className="rounded-2xl border border-gray-200 bg-white p-6" aria-labelledby="health-summary">
      <h2 id="health-summary" className="text-xl font-bold">What we know</h2>
      <p className="mt-2 text-gray-700">{health.summary}</p>
      {health.period && <p className="mt-2 text-sm text-gray-500">As of {health.period.as_of}. {health.period.is_partial ? "Partial month" : "Completed month"} · {health.period.timezone}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {health.metrics.map((metric) => <details key={metric.key} className="rounded-xl border border-gray-200 p-4">
          <summary className="cursor-pointer"><span className="block text-sm text-gray-600">{metric.label}</span><strong className="mt-2 block text-2xl">{metric.display_value ?? "Not recorded"}</strong></summary>
          <p className="mt-3 text-sm">{metric.quality === "founder_asserted" ? "Founder supplied" : metric.source_provider ? `Source: ${metric.source_provider}` : "No source recorded"}</p>
          {metric.observed_at && <p className="text-sm text-gray-500">Source observed at {metric.observed_at}</p>}
          <p className="text-sm">{String(metric.metadata?.basis || metric.metadata?.calculation_basis || "See your reporting definition")}</p>
          {Array.isArray(metric.metadata?.limitations) && metric.metadata.limitations.map((item, index) => <p key={index} className="mt-2 text-sm text-amber-800">{String(item)}</p>)}
        </details>)}
      </div>
      {health.attention.length > 0 && <div className="mt-5"><h3 className="font-bold">Needs confirmation</h3><ul className="mt-2 list-disc pl-5">{health.attention.map((item) => <li key={item.metric_key}>{item.metric_key}: {item.reason}</li>)}</ul></div>}
    </section>
    <details className="rounded-xl border border-gray-200 p-4"><summary className="cursor-pointer font-bold">Reporting settings</summary>
      <Form method="post" className="mt-4 flex flex-wrap items-end gap-4">
        <input type="hidden" name="companyId" value={companyId || ""} />
        <label>Reporting timezone<input name="timezone" defaultValue={health.configuration.timezone} required className="mt-1 block rounded border p-2" placeholder="Australia/Melbourne" /></label>
        <label>Currency<input name="currency" defaultValue={health.configuration.currency} required minLength={3} maxLength={3} className="mt-1 block rounded border p-2" /></label>
        <label>Add a metric<input name="metricLabel" className="mt-1 block rounded border p-2" placeholder="e.g. Weekly active teams" /></label>
        <label>How it is measured<input name="metricDefinition" className="mt-1 block rounded border p-2" placeholder="Definition and reporting unit" /></label>
        <button className="rounded bg-teal-700 px-4 py-2 text-white">Save settings</button>
      </Form>
    </details>
    <section aria-labelledby="monthly-archive"><div className="flex justify-between"><h2 id="monthly-archive" className="text-2xl font-bold">Monthly updates</h2><Link to="/founder-tools/drafts" className="underline">Drafts</Link></div>
      {updates.length ? <div className="mt-4 grid gap-4 md:grid-cols-2">{updates.map((update) => <VRUpdateSnippetCard key={update.id} update={update} user={user} metricHistory={metricHistory} statusLabel={update.visibility === "published" ? "Published" : "Private draft"} />)}</div> : <p className="mt-4 text-gray-600">No updates recorded. Start privately, with connected sources or your own notes.</p>}
    </section>
  </div>;
}

import { Form, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/founder-tools.marketing.articles";
import { createApiClient } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import { normalizeWrittenTopic } from "~/lib/vibe-marketing";
import { loadEditorialCatalog } from "~/lib/editorial-catalog.server";
import ArticleAudienceDetails from "~/components/ArticleAudienceDetails";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const search = new URL(request.url).searchParams;
  const company = appUser.companies.find(c => c.id === search.get("companyId"));
  if (!company) throw new Response("Company not found", {status: 404});
  const params = new URLSearchParams({company_id: company.id});
  for (const key of ["q", "audience_id", "offer_id", "offset"]) if (search.get(key)) params.set(key, search.get(key)!);
  const [response, state] = await Promise.all([
    createApiClient(env, request).get(`/api/v1/vibe-marketing/editorial-catalog/articles/?${params}`),
    loadEditorialCatalog(env, request, company.id),
  ]);
  const result = response.data as {articles: unknown[]; total: number; offset: number; limit: number; audienceIds: string[]; offerIds: string[]};
  return {company, articles: result.articles.map(normalizeWrittenTopic).filter(a => a !== null), total: result.total,
    offset: result.offset, limit: result.limit, audienceIds: result.audienceIds, offerIds: result.offerIds,
    catalog: state.catalog, query: Object.fromEntries(params)};
}
export default function ArticleRegistry() {
  const {company, articles, total, offset, limit, audienceIds, offerIds, catalog, query} = useLoaderData<typeof loader>();
  const page = (next: number) => `/founder-tools/marketing/articles?${new URLSearchParams({...query, companyId: company.id, offset: String(next)})}`;
  const input = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return <main className="mx-auto max-w-5xl space-y-6 p-6">
    <Link to="/founder-tools/marketing" className="font-bold text-violet-700 underline">Back to marketing</Link>
    <header><h1 className="text-3xl font-black">Article registry</h1><p className="mt-2 text-slate-600">{company.name} · Saved articles and their original customer context.</p></header>
    <Form method="get" className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="companyId" value={company.id}/>
      <label className="grid gap-1 text-sm font-bold">Search titles or keywords<input className={input} name="q" defaultValue={query.q || ""} maxLength={200}/></label>
      <label className="grid gap-1 text-sm font-bold">Customer profile<select className={input} name="audience_id" defaultValue={query.audience_id || ""}><option value="">All profiles</option><option value="__unknown__">Not recorded</option>{audienceIds.map(id => <option key={id} value={id}>{catalog?.audience_options.find(a => a.id === id)?.name || id}</option>)}</select></label>
      <label className="grid gap-1 text-sm font-bold">Desired action<select className={input} name="offer_id" defaultValue={query.offer_id || ""}><option value="">All actions</option><option value="__none__">No offer</option>{offerIds.map(id => <option key={id} value={id}>{catalog?.cta_options.find(o => o.id === id)?.title || id}</option>)}</select></label>
      <button className="rounded-lg bg-violet-700 px-4 py-2 font-bold text-white">Filter articles</button>
    </Form>
    <p className="text-sm text-slate-600">{total} matching {total === 1 ? "article" : "articles"}. Historical details below retain the versions used when writing.</p>
    <div className="space-y-3">{articles.map(article => <article key={article.id || article.slug} className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-bold">{article.title}</h2><p className="text-sm text-slate-500">{article.keyword} · {article.publishStatus || "Written"}</p><ArticleAudienceDetails snapshot={article.editorialSnapshot}/>{article.originalEditorialSnapshot && article.originalEditorialSnapshot.writing_run_id !== article.editorialSnapshot?.writing_run_id ? <details className="mt-3 text-xs"><summary>First recorded writing decision</summary><ArticleAudienceDetails snapshot={article.originalEditorialSnapshot}/></details> : null}{article.runId ? <Link className="mt-3 inline-block text-sm font-bold text-violet-700 underline" to={`/founder-tools/marketing/runs/${encodeURIComponent(article.runId)}?companyId=${encodeURIComponent(company.id)}`}>View writing run</Link> : null}</article>)}</div>
    {!articles.length ? <p className="rounded-xl bg-slate-50 p-6">No articles match these filters.</p> : null}
    <nav className="flex justify-between text-sm font-bold" aria-label="Article pages">{offset > 0 ? <Link to={page(Math.max(0, offset-limit))}>Previous page</Link> : <span/>}{offset + limit < total ? <Link to={page(offset+limit)}>Next page</Link> : null}</nav>
  </main>;
}

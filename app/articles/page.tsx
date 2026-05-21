import { getArticlesSortedNewestFirst } from './registry'

export default function ArticlesPage() {
    const articles = getArticlesSortedNewestFirst()

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <header className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Content Factory</p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Articles</h1>
                <p className="max-w-2xl text-base text-slate-600">
                    This route was scaffolded so new articles can be added safely before the first article is written.
                </p>
            </header>
            <section className="mt-10 space-y-4">
                {articles.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm text-slate-600">
                        No articles have been published yet. Merge this scaffold PR, re-scan the repo, then generate the first article.
                    </p>
                ) : (
                    articles.map(article => (
                        <article key={article.slug} className="rounded-2xl border border-slate-200 px-5 py-4">
                            <h2 className="text-xl font-medium text-slate-900">{article.title}</h2>
                            <p className="mt-2 text-sm text-slate-600">{article.description}</p>
                        </article>
                    ))
                )}
            </section>
        </main>
    )
}

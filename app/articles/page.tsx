// Generated articles setup route
// cf-slot: seo-metadata
// cf-slot: article-registry
// cf-slot: author-registry
import { CATEGORY_SEGMENTS, getArticlesSortedNewestFirst, getFeaturedArticles } from './registry'

const sectionTitle = "Articles"
const brandName = "MLAI"
const routeBase = "articles"
const pageSize = 24

export default function ArticlesPage() {
    const articles = getArticlesSortedNewestFirst()
    const visibleArticles = articles.slice(0, pageSize)
    const featuredArticles = getFeaturedArticles(3)
    const featuredPreview = featuredArticles.length > 0 ? featuredArticles : visibleArticles.slice(0, 3)
    const remainingCount = Math.max(articles.length - visibleArticles.length, 0)

    return (
        <main data-cf-slot="directory-container" className="mx-auto max-w-5xl px-6 py-12">
            <header className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{brandName}</p>
                <h1 data-cf-slot="page-heading" className="text-4xl font-semibold tracking-tight text-slate-950">{sectionTitle}</h1>
                <p data-cf-slot="page-intro" className="max-w-2xl text-base leading-7 text-slate-600">
                    Browse the latest {sectionTitle.toLowerCase()} from {brandName}.
                </p>
            </header>
            <nav data-cf-slot="category-navigation" className="mt-8 flex flex-wrap gap-2" aria-label="Article categories">
                {CATEGORY_SEGMENTS.map(category => (
                    <a key={category} href={`/${routeBase}?category=${category}#article-index`} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">
                        {category}
                    </a>
                ))}
            </nav>
            <section data-cf-slot="featured-articles" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Featured articles">
                {featuredPreview.map(article => (
                    <article key={`featured-${article.slug}`} data-cf-slot="article-card" className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{article.date}</p>
                        <h2 className="mt-3 text-xl font-semibold text-slate-950">
                            <a data-cf-slot="article-link" href={`/${routeBase}/${article.slug}`} className="hover:text-slate-700">
                                {article.title}
                            </a>
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{article.description}</p>
                    </article>
                ))}
            </section>
            <section data-cf-slot="article-list" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {articles.length === 0 ? (
                    <div data-cf-slot="empty-state" className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 sm:col-span-2 lg:col-span-3">
                        <h2 className="text-lg font-semibold text-slate-950">No {sectionTitle.toLowerCase()} yet</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            New {sectionTitle.toLowerCase()} will appear here as soon as they are published.
                        </p>
                    </div>
                ) : (
                    visibleArticles.map(article => (
                        <article key={article.slug} data-cf-slot="article-card" className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{article.date}</p>
                            <h2 className="mt-3 text-xl font-semibold text-slate-950">
                                <a data-cf-slot="article-link" href={`/${routeBase}/${article.slug}`} className="hover:text-slate-700">
                                    {article.title}
                                </a>
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{article.description}</p>
                            <p className="mt-4 text-sm font-semibold text-slate-700">{article.author}</p>
                        </article>
                    ))
                )}
            </section>
            {remainingCount > 0 ? (
                <p data-cf-slot="pagination" className="mt-6 text-sm text-slate-600">
                    Showing {visibleArticles.length} of {articles.length} {sectionTitle.toLowerCase()}.
                </p>
            ) : (
                <p data-cf-slot="pagination" className="sr-only">Showing all {visibleArticles.length} {sectionTitle.toLowerCase()}.</p>
            )}
        </main>
    )
}

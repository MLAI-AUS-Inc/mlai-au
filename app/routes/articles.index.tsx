
import { useState } from "react";
import {
    getArticlesSortedNewestFirst,
    resolveArticleRouteSlug,
} from "~/articles/registry";

import { Link } from "react-router";
import FeaturedArticleCard, { type FeaturedCardColor } from "~/components/articles/FeaturedArticleCard";
import ArticleListCard, { getAccentColorByIndex } from "~/components/articles/ArticleListCard";
import ArticleSearchBar from "~/components/articles/ArticleSearchBar";
import type { Route } from "./+types/articles.index";

const PAGE_TITLE = 'Writing on AI, Machine Learning and Community.';
const PAGE_DESCRIPTION =
    'Plain-English guides on AI, Machine Learning, and how to get started with the MLAI community.';

const FALLBACK_IMAGE = 'https://placehold.co/1200x630/png';

// Person image for the first featured card
const PERSON_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Pixel%20Team.png?alt=media&token=da7df43a-eafa-4ee5-a94d-260791a376b8';

// Color rotation for featured cards (first one is special with person image)
const FEATURED_COLORS: FeaturedCardColor[] = ['coral-with-person', 'purple', 'black', 'blue'];

function getFeaturedColor(index: number): FeaturedCardColor {
    return FEATURED_COLORS[index % FEATURED_COLORS.length];
}

export function meta({ data }: Route.MetaArgs) {
    const pageNumber = data?.page ?? 1;
    const baseTitle = 'MLAI Articles Library';
    const title =
        pageNumber <= 1
            ? `${baseTitle} | AI & ML Guides`
            : `${baseTitle} – Page ${pageNumber} | AI & ML Guides`;

    return [
        { title: title },
        { name: "description", content: PAGE_DESCRIPTION },
        { tagName: "link", rel: "canonical", href: pageNumber <= 1 ? "https://www.mlai.au/articles" : `https://www.mlai.au/articles?page=${pageNumber}` },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const parsed = parseInt(pageParam ?? '1', 10);
    const pageNumber = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);

    return { page: pageNumber };
}

export default function ArticlesIndex({ loaderData }: Route.ComponentProps) {
    const { page } = loaderData;
    const sorted = getArticlesSortedNewestFirst();
    const featured = sorted.filter((article) => article.slug.startsWith('featured/')).slice(0, 4);

    // Search/filter state (UI only for now)
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const pageSize = 10;
    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const start = (currentPage - 1) * pageSize;

    const articleSummaries = sorted.map((currentArticle) => ({
        slug: currentArticle.slug,
        title: currentArticle.title,
        description: currentArticle.description,
        date: currentArticle.date,
        image: currentArticle.image,
    }));

    // Filter articles based on search query (simple title match for now)
    const filteredSummaries = searchQuery
        ? articleSummaries.filter((a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : articleSummaries;

    const paginatedSummaries = filteredSummaries.slice(start, start + pageSize);

    return (
        <main className="min-h-screen bg-[var(--brutalist-beige)]">
            {/* Yellow Hero Section (Title + Search Only) */}
            <div className="p-2 lg:p-3">
                <section className="articles-hero">
                    <div className="max-w-6xl mx-auto">
                        <div className="max-w-4xl">
                            {/* Page Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight">
                                {PAGE_TITLE}
                            </h1>
                            <p className="mt-4 text-base text-zinc-700">
                                {PAGE_DESCRIPTION}
                            </p>

                            {/* Search Bar */}
                            <div className="mt-8">
                                <ArticleSearchBar
                                    onSearch={setSearchQuery}
                                    onFilterChange={setActiveFilters}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Featured Articles & All Articles Grid (On Beige Background) */}
            <div className="max-w-6xl mx-auto px-4 lg:px-6">
                {/* Featured Articles Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featured.map((article, index) => (
                        <FeaturedArticleCard
                            key={article.slug}
                            href={`/articles/${resolveArticleRouteSlug(article.slug)}`}
                            title={article.title}
                            image={article.image ?? FALLBACK_IMAGE}
                            color={getFeaturedColor(index)}
                            personImage={index === 0 ? PERSON_IMAGE : undefined}
                        />
                    ))}
                    {featured.length === 0 && (
                        <p className="text-zinc-600 col-span-full">No featured articles yet.</p>
                    )}
                </div>

                {/* All Articles Section */}
                <section className="py-12">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-6">All Articles</h2>

                    {/* Articles Grid - 2 columns on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paginatedSummaries.map((article, index) => (
                            <ArticleListCard
                                key={article.slug}
                                href={`/articles/${resolveArticleRouteSlug(article.slug)}`}
                                title={article.title}
                                date={article.date}
                                accentColor={getAccentColorByIndex(index)}
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {paginatedSummaries.length === 0 && (
                        <p className="text-zinc-500 text-center py-8">
                            {searchQuery ? `No articles found matching "${searchQuery}"` : "No articles available yet."}
                        </p>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && !searchQuery && (
                        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
                            {currentPage > 1 && (
                                <Link
                                    to={currentPage === 2 ? '/articles' : `/articles?page=${currentPage - 1}`}
                                    className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition"
                                >
                                    ← Previous
                                </Link>
                            )}

                            <span className="px-4 py-2 text-sm text-zinc-500">
                                Page {currentPage} of {totalPages}
                            </span>

                            {currentPage < totalPages && (
                                <Link
                                    to={`/articles?page=${currentPage + 1}`}
                                    className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition"
                                >
                                    Next →
                                </Link>
                            )}
                        </nav>
                    )}
                </section>
            </div>
        </main>
    );
}

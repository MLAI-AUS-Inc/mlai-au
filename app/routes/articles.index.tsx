import { useState } from "react";
import {
    getArticlesSortedNewestFirst,
    resolveArticleRouteSlug,
} from "~/articles/registry";

import FeaturedArticleCard, { type FeaturedCardColor } from "~/components/articles/FeaturedArticleCard";
import ArticleSearchBar from "~/components/articles/ArticleSearchBar";
import ArticleCalendarSection from "~/components/articles/ArticleCalendarSection";
import HeroSection from "~/components/ui/HeroSection";
import CardGrid from "~/components/ui/CardGrid";
import EmptyState from "~/components/ui/EmptyState";
import type { Route } from "./+types/articles.index";

const PAGE_TITLE = 'Writing on AI, Machine Learning and Community.';
const PAGE_DESCRIPTION =
    'Plain-English guides on AI, Machine Learning, and how to get started with the MLAI community.';

const FALLBACK_IMAGE = 'https://placehold.co/1200x630/png';

// Person image for the first featured card
const PERSON_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Pixel%20Team.png?alt=media&token=da7df43a-eafa-4ee5-a94d-260791a376b8';

// Color rotation for featured cards (first one is special with person image)
const FEATURED_COLORS: FeaturedCardColor[] = ['coral-with-person', 'purple', 'black', 'blue'];

const PAGE_SIZE = 10;

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
        { tagName: "link", rel: "canonical", href: pageNumber <= 1 ? "https://mlai.au/articles" : `https://mlai.au/articles?page=${pageNumber}` },
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
    const [, setActiveFilters] = useState<string[]>([]);

    // Build article summaries for the calendar section
    const articleSummaries = sorted.map((currentArticle) => ({
        slug: resolveArticleRouteSlug(currentArticle.slug),
        title: currentArticle.title,
        description: currentArticle.description,
        date: currentArticle.date,
    }));

    // Filter articles based on search query (simple title match for now)
    const filteredSummaries = searchQuery
        ? articleSummaries.filter((a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : articleSummaries;

    // Pagination
    const total = filteredSummaries.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const paginatedSummaries = filteredSummaries.slice(start, start + PAGE_SIZE);

    return (
        <main className="min-h-screen bg-[var(--brutalist-beige)]">
            {/* Hero Section */}
            <HeroSection
                title={PAGE_TITLE}
                description={PAGE_DESCRIPTION}
                variant="yellow"
            >
                <ArticleSearchBar
                    onSearch={setSearchQuery}
                    onFilterChange={setActiveFilters}
                />
            </HeroSection>

            {/* Featured Articles & Calendar Section */}
            <div className="max-w-6xl mx-auto px-4 lg:px-6">
                {/* Featured Articles Grid */}
                <CardGrid columns={{ sm: 2, lg: 4 }} gap={4} className="mt-8">
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
                        <EmptyState
                            message="No featured articles yet."
                            className="col-span-full"
                        />
                    )}
                </CardGrid>

                {/* Article Calendar Section */}
                <div className="py-12">
                    {searchQuery ? (
                        // Show filtered results when searching
                        filteredSummaries.length > 0 ? (
                            <ArticleCalendarSection
                                title={`Search results for "${searchQuery}"`}
                                articles={filteredSummaries}
                                paginatedArticles={paginatedSummaries}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                pageSize={PAGE_SIZE}
                                paginationBasePath="/articles"
                            />
                        ) : (
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                                    No articles found
                                </h2>
                                <p className="text-zinc-500">
                                    No articles match "{searchQuery}". Try a different search term.
                                </p>
                            </div>
                        )
                    ) : (
                        <ArticleCalendarSection
                            id="all-articles"
                            title="All Articles"
                            articles={articleSummaries}
                            paginatedArticles={paginatedSummaries}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageSize={PAGE_SIZE}
                            paginationBasePath="/articles"
                            paginationHash="#all-articles"
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

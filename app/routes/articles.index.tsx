
import {
    applyArticleRegistryDefaults,
    getArticleBySlug,
    getArticlesSortedNewestFirst,
    getClusterCardsForPillar,
    resolveArticleRouteSlug,
} from "~/articles/registry";
// import { type BreadcrumbItem } from "~/components/Breadcrumbs";

interface BreadcrumbItem {
    label: string;
    href: string;
    current?: boolean;
}

import { ArticleLayout } from "~/components/articles/ArticleLayout";
import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
import ArticleCardBySlug from "~/components/articles/ArticleCardBySlug";
import ArticleCalendarSection from "~/components/articles/ArticleCalendarSection";
import PillarCard from "~/components/articles/PillarCard";
import type { Route } from "./+types/articles.index";

// Helper function to simulate what was in the user snippet
function slugToTitle(slug: string) {
    const lastSegment = slug.split('/').pop() ?? slug
    return lastSegment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const PAGE_DESCRIPTION =
    'Plain-English guides on AI, Machine Learning, and how to get started with the MLAI community.';

const FALLBACK_IMAGE = 'https://placehold.co/1200x630/png'; // Placeholder

// NOTE: BreadcrumbItem type seems to be missing from provided files, so defining locally or using a simple object
const BREADCRUMB_ITEMS: any[] = [{ label: 'Articles', href: '/articles', current: true }];

// These constants define the structure of your pillars. You can modify them as needed.
const TECHNOLOGY_PILLAR_SLUGS = [
    'technology/introduction-to-mlai',
    // Add other slugs here
] as const;

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
    const featured = sorted.filter((article) => article.slug.startsWith('featured/'));

    const article = applyArticleRegistryDefaults({
        title: 'Writing on AI, Machine Learning and Community.',
        description: PAGE_DESCRIPTION,
        author: 'MLAI Team',
        slug: 'articles',
        image: FALLBACK_IMAGE,
        imageAlt: 'MLAI Articles',
    });

    const techPillars = TECHNOLOGY_PILLAR_SLUGS.map((slug) => {
        const registryEntry = getArticleBySlug(slug);
        const title = registryEntry?.title ?? slugToTitle(slug);
        const childArticles = getClusterCardsForPillar(slug)
            .slice(0, 3)
            .map((child) => ({
                title: child.title,
                href: `/articles/${resolveArticleRouteSlug(child.slug)}`,
            }));

        return {
            slug: resolveArticleRouteSlug(registryEntry?.slug ?? slug),
            title,
            description: registryEntry?.description ?? `Explore our ${title.toLowerCase()} guides and resources.`,
            image: registryEntry?.image ?? FALLBACK_IMAGE,
            imageAlt: registryEntry?.imageAlt ?? title,
            children: childArticles,
        };
    });

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
    }));
    const paginatedSummaries = articleSummaries.slice(start, start + pageSize);

    return (
        <ArticleLayout
            article={article}
            breadcrumbItems={BREADCRUMB_ITEMS}
            showHero={false}
        // Provide dummy classNames if needed effectively, stripped for now to rely on internal styles
        >
            <div className="space-y-16 not-prose">
                {/* <ArticleTocPlaceholder />  Optional: hide TOC on index page */}

                <section id="featured-articles" className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Featured articles</h2>
                    <div className="not-prose">
                        <ul
                            role="list"
                            className="list-none grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
                        >
                            {featured.map((featuredArticle) => (
                                <li key={featuredArticle.slug} className="relative">
                                    <ArticleCardBySlug slug={featuredArticle.slug} ctaText="Read article" variant="compact" />
                                </li>
                            ))}
                            {featured.length === 0 && <p className="text-gray-500">No featured articles yet.</p>}
                        </ul>
                    </div>
                </section>

                <section id="tech-info-packs" className="py-12 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">Technology Guides</h2>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {techPillars.map((pillar) => (
                                <PillarCard
                                    key={pillar.slug}
                                    href={`/articles/${pillar.slug}`}
                                    title={pillar.title}
                                    description={pillar.description}
                                    image={pillar.image}
                                    imageAlt={pillar.imageAlt}
                                    fallbackImage={FALLBACK_IMAGE}
                                    childLinks={pillar.children}
                                    maxChildren={3}
                                />
                            ))}
                            {techPillars.length === 0 && <p className="text-gray-500">No guides defined yet.</p>}
                        </div>
                    </div>
                </section>

                <section id="all-articles" className="not-prose">
                    <ArticleCalendarSection
                        id="all-articles"
                        title="All articles"
                        articles={articleSummaries}
                        paginatedArticles={paginatedSummaries}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        paginationBasePath="/articles"
                        paginationHash="#all-articles"
                    />
                </section>
            </div>
        </ArticleLayout>
    )
}

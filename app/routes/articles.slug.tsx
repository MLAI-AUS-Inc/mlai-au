import React, { Suspense, lazy, useMemo } from "react";
import { redirect } from "react-router";
import {
    getArticleBySlug,
    normalizeSlug,
    resolveArticleRouteSlug,
    type ArticleWithSlug,
} from "~/articles/registry";
import { ArticleLayout } from "~/components/articles/ArticleLayout";
import ContentFactoryArticleAnalytics from "~/articles/ContentFactoryArticleAnalytics";
import { fetchEvents, type Event } from "~/lib/events";
import { getEnv } from "~/lib/env.server";
import type { Route } from "./+types/articles.slug";

/**
 * Automatically discover all article content modules using Vite's glob import.
 * This eliminates the need for the PublisherAgent to manually register imports.
 */
const articleModules = import.meta.glob<{
    default: React.ComponentType;
    faqItems?: any;
    useCustomHeader?: boolean;
}>('../articles/content/**/*.tsx');

export function meta({ data }: Route.MetaArgs) {
    if (!data?.article) {
        return [{ title: "Article Not Found | MLAI" }];
    }
    const articlePath = `/articles/${resolveArticleRouteSlug(data.article.slug)}`;
    const canonicalUrl = `https://mlai.au${articlePath}`;
    const suffix = " | MLAI";
    const fullTitle = `${data.article.title}${suffix}`;
    const title = fullTitle.length > 70 ? data.article.title : fullTitle;
    const robots = data.article.indexing === "noindex"
        ? "noindex, follow"
        : "index, follow, max-image-preview:large";

    return [
        { title },
        { name: "description", content: data.article.description },
        { name: "robots", content: robots },
        { name: "author", content: data.article.author },
        { tagName: "link", rel: "canonical", href: canonicalUrl },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "MLAI" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:title", content: data.article.title },
        { property: "og:description", content: data.article.description },
        { property: "og:image", content: data.article.image },
        { property: "og:image:alt", content: data.article.imageAlt },
        { property: "article:published_time", content: data.article.date },
        {
            property: "article:modified_time",
            content: data.article.dateModified ?? data.article.lastUpdated ?? data.article.date,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: data.article.title },
        { name: "twitter:description", content: data.article.description },
        { name: "twitter:image", content: data.article.image },
    ];
}

export async function loader({ params, context, request }: Route.LoaderArgs) {
    const slug = params["*"]; // Catch-all param
    if (!slug) {
        throw new Response("Not Found", { status: 404 });
    }

    // Defensive: legacy/external links sometimes point at the literal glob
    // "/articles/*". Redirect that exact junk path to the index rather than
    // 404ing. Kept narrow (exact "*") so genuinely missing articles still 404.
    if (slug === "*") {
        throw redirect("/articles", 301);
    }

    const article = getArticleBySlug(slug);

    if (!article) {
        throw new Response("Not Found", { status: 404 });
    }

    // Keep suffix lookup available to internal code, but do not serve public
    // category-less or case variants as duplicate 200 pages.
    const requestedSlug = slug.replace(/^\/+|\/+$/g, "");
    const canonicalPath = `/articles/${resolveArticleRouteSlug(article.slug)}`;
    if (
        normalizeSlug(requestedSlug) !== article.slug ||
        requestedSlug !== article.slug ||
        new URL(request.url).pathname !== canonicalPath
    ) {
        throw redirect(canonicalPath, 301);
    }

    // Load metadata from the content module if it exists
    // This runs on the server (and client during navigation), ensuring metadata
    // is available before render to avoid side-effects during hydration.
    const globKey = `../articles/content/${article.slug}.tsx`;
    const importer = articleModules[globKey];
    let faqItems = undefined;
    let useCustomHeader = false;

    // Under-review bodies and FAQs may contain the exact claims being
    // corrected. Do not import or serialize module metadata until the article
    // returns to a published state.
    if (importer && article.publicationStatus !== "under-review") {
        try {
            // Await the module to extract exports
            // Note: This relies on the exports being serializable (e.g. basic objects/strings)
            const module = await importer();
            faqItems = module.faqItems;
            useCustomHeader = module.useCustomHeader ?? false;
        } catch (e) {
            console.error(`Failed to load article metadata for ${slug}`, e);
            // Non-fatal: we can still render the article body wrapper
        }
    }

    // Fetch upcoming events for the CTA
    let upcomingEvents: Event[] = [];
    try {
        const env = getEnv(context) as unknown as Record<string, any>;
        upcomingEvents = await fetchEvents({
            lumaApiKey: env.LUMA_API_KEY,
        });
    } catch (e) {
        console.error('Failed to fetch events for article CTA', e);
    }

    return {
        article,
        faqItems,
        upcomingEvents,
        useCustomHeader,
    };
}

/**
 * Dynamically load and render the article content component if available.
 */
function ArticleContent({ article }: { article: ArticleWithSlug }) {
    const ContentComponent = useMemo(() => {
        // Construct the expected file path key for the glob map
        // article.slug is like 'featured/my-article'
        // glob key is like '../articles/content/featured/my-article.tsx'
        const globKey = `../articles/content/${article.slug}.tsx`;

        const loader = articleModules[globKey];
        if (!loader) return null;

        // Purely return the lazy component without side-effects
        return lazy(loader as any);
    }, [article.slug]);

    if (article.publicationStatus === "under-review") {
        const isIssueNine = article.slug.endsWith(
            "weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9",
        );
        const isCodingBenchmark = article.slug.endsWith(
            "how-to-choose-the-best-ai-for-coding-in-2025",
        );

        return (
            <section
                aria-labelledby="editorial-review-heading"
                className="not-prose rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-950 sm:p-8"
            >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">
                    {isIssueNine
                        ? "Correction — 28 July 2026"
                        : isCodingBenchmark
                          ? "Benchmark rebuild — 29 July 2026"
                          : "Editorial review in progress"}
                </p>
                <h1 id="editorial-review-heading" className="mt-3 text-3xl font-black tracking-tight">
                    {isIssueNine
                        ? "AI Bits Issue 9 is being corrected and rebuilt."
                        : isCodingBenchmark
                          ? "The stale coding-tools list has been withdrawn."
                        : "This article is temporarily unavailable."}
                </h1>
                {isIssueNine ? (
                    <>
                        <p className="mt-4 max-w-3xl text-base leading-7">
                            An earlier version incorrectly attributed the work to Anthropic
                            and described quantitative experiments that are not reported in
                            the cited source. We removed those claims and the unreviewed body
                            while we rebuild the issue against the source.
                        </p>
                        <p className="mt-4 max-w-3xl text-base leading-7">
                            The source is Nghi D. Q. Bui’s technical report about the
                            open-source OPENDEV system. The report describes work in progress
                            and does not provide the systematic quantitative evaluation the
                            previous article claimed.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-4 text-sm font-black">
                            <a
                                href="https://arxiv.org/html/2603.05344v3"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline decoration-2 underline-offset-4"
                            >
                                Read arXiv version 3
                            </a>
                            <a
                                href="https://github.com/opendev-to/opendev"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline decoration-2 underline-offset-4"
                            >
                                Inspect OPENDEV
                            </a>
                        </div>
                    </>
                ) : isCodingBenchmark ? (
                    <>
                        <p className="mt-4 max-w-3xl text-base leading-7">
                            The previous article used a 2025 title despite being
                            published in 2026 and did not contain the hands-on,
                            versioned comparison its headline promised. MLAI has
                            removed that body from search and discovery surfaces.
                        </p>
                        <p className="mt-4 max-w-3xl text-base leading-7">
                            Its replacement will be a date-neutral benchmark using
                            licence-safe fixtures, frozen tool and model settings,
                            hidden acceptance tests, failures, costs, interventions
                            and raw results. The protocol is being registered before
                            any comparison results are examined. No winner is being
                            claimed while that work remains incomplete.
                        </p>
                    </>
                ) : (
                    <p className="mt-4 max-w-2xl text-base leading-7">
                        MLAI is re-checking the evidence, claims, and attribution on this page.
                        We have kept the URL available for transparency, but removed the
                        unreviewed article body until the replacement passes editorial review.
                    </p>
                )}
                <p className="mt-4 text-sm font-semibold">
                    Last status update: {isCodingBenchmark ? "29 July 2026" : "28 July 2026"}.
                </p>
            </section>
        );
    }

    if (!ContentComponent) {
        // Fallback for articles without content components
        return (
            <div className="prose prose-lg prose-zinc dark:prose-invert mx-auto">
                <p>{article.description}</p>
                <p className="text-sm text-gray-500">
                    By {article.author} on {article.date}
                </p>
            </div>
        );
    }

    return (
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-lg" />}>
            <ContentComponent />
        </Suspense>
    );
}

export default function ArticleSlugPage({ loaderData }: Route.ComponentProps) {
    const { article, faqItems, upcomingEvents, useCustomHeader } = loaderData;

    const breadcrumbs = [
        { label: 'Articles', href: '/articles' },
        { label: article.title, href: `/articles/${article.slug}`, current: true }
    ];

    return (
        <ArticleLayout
            article={article}
            breadcrumbItems={useCustomHeader ? undefined : breadcrumbs}
            containerClassName={useCustomHeader ? '!bg-transparent !pt-4 sm:!pt-6' : undefined}
            contentPaddingClassName={useCustomHeader ? '!pt-0' : undefined}
            faqItems={faqItems}
            upcomingEvents={upcomingEvents}
        >
            {/* Anonymous Content Factory analytics: the runtime only activates
                inside this data-cf-article-detail boundary, on the production
                domain, for registry entries carrying an analyticsArticleId. */}
            <div className="relative" data-cf-article-detail="true">
                <ContentFactoryArticleAnalytics
                    analyticsArticleId={article.analyticsArticleId ?? ""}
                    articlePath={`/articles/${article.slug}`}
                />
                <div data-cf-article-body="true">
                    <ArticleContent key={article.slug} article={article} />
                </div>
            </div>
        </ArticleLayout>
    );
}

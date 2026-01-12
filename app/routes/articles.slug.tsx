import React, { Suspense, lazy, useMemo } from "react";
import {
    getArticleBySlug,
    type ArticleWithSlug,
} from "~/articles/registry";
import { ArticleLayout } from "~/components/articles/ArticleLayout";
import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
import { fetchEvents, type Event } from "~/lib/events";
import { getEnv } from "~/lib/env.server";
import type { Route } from "./+types/articles.slug";

/**
 * Automatically discover all article content modules using Vite's glob import.
 * This eliminates the need for the PublisherAgent to manually register imports.
 */
const articleModules = import.meta.glob<{
    default: React.ComponentType;
    summaryHighlights?: any;
    faqItems?: any;
    useCustomHeader?: boolean;
    useInlineToc?: boolean;
}>('../articles/content/**/*.tsx');

export function meta({ data }: Route.MetaArgs) {
    if (!data?.article) {
        return [{ title: "Article Not Found | MLAI" }];
    }
    return [
        { title: `${data.article.title} | MLAI Articles` },
        { name: "description", content: data.article.description },
    ];
}

export async function loader({ params, context }: Route.LoaderArgs) {
    const slug = params["*"]; // Catch-all param
    if (!slug) {
        throw new Response("Not Found", { status: 404 });
    }

    const article = getArticleBySlug(slug);

    if (!article) {
        throw new Response("Not Found", { status: 404 });
    }

    // Load metadata from the content module if it exists
    // This runs on the server (and client during navigation), ensuring metadata
    // is available before render to avoid side-effects during hydration.
    const globKey = `../articles/content/${article.slug}.tsx`;
    const importer = articleModules[globKey];
    let summaryHighlights = undefined;
    let faqItems = undefined;
    let useCustomHeader = false;
    let useInlineToc = false;

    if (importer) {
        try {
            // Await the module to extract exports
            // Note: This relies on the exports being serializable (e.g. basic objects/strings)
            const module = await importer();
            summaryHighlights = module.summaryHighlights;
            faqItems = module.faqItems;
            useCustomHeader = module.useCustomHeader ?? false;
            useInlineToc = module.useInlineToc ?? false;
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
            humanitixApiKey: env.PRIVATE_HUMANITIX_API_KEY,
            lumaApiKey: env.LUMA_API_KEY,
        });
    } catch (e) {
        console.error('Failed to fetch events for article CTA', e);
    }

    return {
        article,
        summaryHighlights,
        faqItems,
        upcomingEvents,
        useCustomHeader,
        useInlineToc,
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
    const { article, summaryHighlights, faqItems, upcomingEvents, useCustomHeader, useInlineToc } = loaderData;

    const breadcrumbs = [
        { label: 'Articles', href: '/articles' },
        { label: article.title, href: `/articles/${article.slug}`, current: true }
    ];

    return (
        <ArticleLayout
            article={article}
            breadcrumbItems={useCustomHeader ? undefined : breadcrumbs}
            showHero={!useCustomHeader}
            showHeader={!useCustomHeader}
            containerClassName={useCustomHeader ? '!bg-transparent !pt-4 sm:!pt-6' : undefined}
            contentPaddingClassName={useCustomHeader ? '!pt-0' : undefined}
            summaryHighlights={useCustomHeader ? undefined : summaryHighlights}
            faqItems={faqItems}
            upcomingEvents={upcomingEvents}
        >
            <div className="relative">
                {useInlineToc ? null : <ArticleTocPlaceholder noMargin={useCustomHeader} />}
                <ArticleContent article={article} />
            </div>
        </ArticleLayout>
    );
}

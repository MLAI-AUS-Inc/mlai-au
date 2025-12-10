import { Suspense, lazy, useMemo } from "react";
import {
    getArticleBySlug,
    resolveArticleRouteSlug,
    type ArticleWithSlug,
} from "~/articles/registry";
import { ArticleLayout } from "~/components/articles/ArticleLayout";
import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
import type { Route } from "./+types/articles.slug";

export function meta({ data }: Route.MetaArgs) {
    if (!data?.article) {
        return [{ title: "Article Not Found | MLAI" }];
    }
    return [
        { title: `${data.article.title} | MLAI Articles` },
        { name: "description", content: data.article.description },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const slug = params["*"]; // Catch-all param
    if (!slug) {
        throw new Response("Not Found", { status: 404 });
    }

    const article = getArticleBySlug(slug);

    if (!article) {
        throw new Response("Not Found", { status: 404 });
    }

    return { article };
}

/**
 * Automatically discover all article content modules using Vite's glob import.
 * This eliminates the need for the PublisherAgent to manually register imports.
 */
const articleModules = import.meta.glob<{ default: React.ComponentType }>('../articles/content/**/*.tsx');

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
        return lazy(loader);
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
    const { article } = loaderData;

    const breadcrumbs = [
        { label: 'Articles', href: '/articles' },
        { label: article.title, href: `/articles/${article.slug}`, current: true }
    ];

    return (
        <ArticleLayout
            article={article}
            breadcrumbItems={breadcrumbs}
            showHero={true}
        >
            <div className="relative">
                <ArticleTocPlaceholder />
                <ArticleContent article={article} />
            </div>
        </ArticleLayout>
    );
}

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
 * Map of article slugs to their dynamically imported content components.
 * The content factory will add entries here when publishing new articles.
 * 
 * Format: 'category/article-slug': () => import('~/articles/content/category/article-slug')
 */
const articleContentModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
    // Content factory will add entries like:
    // 'featured/hackathon-melbourne': () => import('~/articles/content/featured/hackathon-melbourne'),
    // 'technology/intro-to-ai': () => import('~/articles/content/technology/intro-to-ai'),
    'featured/how-to-find-a-cofounder': () => import('~/articles/content/featured/how-to-find-a-cofounder'),
};

/**
 * Dynamically load and render the article content component if available.
 */
function ArticleContent({ article }: { article: ArticleWithSlug }) {
    const ContentComponent = useMemo(() => {
        const loader = articleContentModules[article.slug];
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

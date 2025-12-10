
import {
    getArticleBySlug,
    resolveArticleRouteSlug,
} from "~/articles/registry";
import { ArticleLayout } from "~/components/articles/ArticleLayout";
import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
// import ArticleContent from "~/components/articles/ArticleContent"; // You would implement this to render MDX or HTML
import type { Route } from "./+types/articles.slug";
import { redirect } from "react-router";

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

    // Optional: Redirect to canonical slug if it differs
    //   const canonicalSlug = resolveArticleRouteSlug(article.slug);
    //   if (slug !== canonicalSlug) {
    //       // return redirect(`/articles/${canonicalSlug}`, 301);
    //   }

    return { article };
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
                <div className="prose prose-lg prose-indigo mx-auto text-gray-500">
                    {/* This is where your actual article content would go.
                   For now, we just display the description again as a placeholder.
                   In a real app, you might use MDX or dangerouslySetInnerHTML.
                */}
                    <p>
                        {article.description}
                    </p>
                    <p>
                        [Content for <strong>{article.title}</strong> would appear here...]
                    </p>
                    <hr />
                    <p className="text-sm">
                        By {article.author} on {article.date}
                    </p>
                </div>
            </div>
        </ArticleLayout>
    );
}

import { Link } from "react-router";
import { ARTICLE_CONTEXTUAL_READING_PATHS } from "~/articles/contextual-reading-paths";
import { ARTICLE_REGISTRY, isArticleIndexable } from "~/articles/registry";

export function ArticleReadingLinks({ articlePath }: { articlePath: string }) {
  const current = ARTICLE_REGISTRY[articlePath.slice("/articles/".length)];
  if (!current || articlePath !== "/articles/" + current.slug || !isArticleIndexable(current)) return null;
  const seen = new Set([articlePath]);
  const choices = (ARTICLE_CONTEXTUAL_READING_PATHS[articlePath] ?? []).flatMap(choice => {
    const article = ARTICLE_REGISTRY[choice.href.slice("/articles/".length)];
    if (!article || choice.href !== "/articles/" + article.slug || !isArticleIndexable(article) || seen.has(choice.href)) return [];
    seen.add(choice.href);
    return [{ ...choice, article }];
  });
  if (!choices.length) return null;
  return <nav aria-label="Continue reading" data-article-reading-links className="not-prose my-12 rounded-2xl border border-gray-300 bg-[#f8f3e8] p-6 sm:p-8">
    <h2 className="text-2xl font-black text-zinc-900">Continue reading</h2>
    <ul className="mt-5 space-y-5">
      {choices.map(choice => <li key={choice.href}>
        <Link to={choice.href} className="font-bold text-purple-800 underline underline-offset-4">{choice.article.title}</Link>
        <p className="mt-1 text-sm leading-6 text-zinc-700">{choice.reason}</p>
      </li>)}
    </ul>
  </nav>;
}

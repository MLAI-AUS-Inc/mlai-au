import { ARTICLE_REGISTRY, isArticleIndexable, type ArticleWithSlug } from '../articles/registry';
import type { ArticleReadingPath } from '../articles/reading-paths';

export type ResolvedArticleReadingPath = { href: string; reason: string; article: ArticleWithSlug };

/** Resolve exact public identities; never guess a suffix, revive a notice or
 * choose a different destination merely to keep a recommendation card visible.
 */
export function resolveArticleReadingPaths(currentPath: string, candidates: readonly ArticleReadingPath[] = []): ResolvedArticleReadingPath[] {
  if (typeof currentPath !== 'string' || !/^\/articles\/[a-z0-9-]+\/[a-z0-9-]+$/.test(currentPath)) return [];
  const current = ARTICLE_REGISTRY[currentPath.slice('/articles/'.length)];
  if (!current || `/articles/${current.slug}` !== currentPath || !isArticleIndexable(current) || current.publicationStatus === 'under-review' || !Array.isArray(candidates)) return [];
  const seen = new Set([`/articles/${current.slug}`]);
  return candidates.flatMap(candidate => {
    if (!candidate || typeof candidate.href !== 'string' || !/^\/articles\/[a-z0-9-]+\/[a-z0-9-]+$/.test(candidate.href) || seen.has(candidate.href)) return [];
    const article = ARTICLE_REGISTRY[candidate.href.slice('/articles/'.length)];
    if (!article || `/articles/${article.slug}` !== candidate.href || !isArticleIndexable(article) || article.publicationStatus === 'under-review') return [];
    if (typeof candidate.reason !== 'string' || !candidate.reason.trim()) return [];
    seen.add(candidate.href);
    return [{ href: candidate.href, reason: candidate.reason.trim(), article }];
  });
}

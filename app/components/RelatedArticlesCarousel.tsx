import { useId } from 'react';
import { Link } from 'react-router';
import type { ResolvedArticleReadingPath } from '~/lib/article-reading-paths';

/** The legacy filename is retained, but reading choices are a plain list: no
 * hidden slides, autoplay, dependency or script-only navigation. */
export default function RelatedArticlesCarousel({ title = 'Related reads', items }: {
    title?: string;
    items: readonly ResolvedArticleReadingPath[];
}) {
    const id = useId();
    if (!items.length) return null;
    return <nav aria-labelledby={`${id}-heading`} data-cf-component-id="related-articles" data-cf-component-type="related-articles" data-cf-component-label="Related reading paths">
        <h2 id={`${id}-heading`} className="mb-5 text-2xl font-bold text-[#111827]">{title}</h2>
        <ul role="list" className={`grid min-w-0 gap-4 ${items.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {items.map((item, index) => <li key={item.href} className="min-w-0">
                <Link to={item.href} aria-labelledby={`${id}-${index}-title`} aria-describedby={`${id}-${index}-reason`}
                    className="block h-full min-w-0 rounded-2xl border border-[#9ca3af] bg-[#f8f3e8] p-6 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4c1d95]">
                    <h3 id={`${id}-${index}-title`} className="break-words text-xl font-bold leading-snug text-[#4c1d95]">{item.article.title}</h3>
                    <p id={`${id}-${index}-reason`} className="mt-3 text-base leading-relaxed text-[#1f2937]">{item.reason}</p>
                    <span aria-hidden="true" className="mt-4 block font-semibold text-[#4c1d95]">Read guide →</span>
                </Link>
            </li>)}
        </ul>
    </nav>;
}

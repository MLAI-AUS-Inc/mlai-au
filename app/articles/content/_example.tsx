/**
 * EXAMPLE ARTICLE CONTENT COMPONENT
 * 
 * This file demonstrates the format that the content factory should generate
 * for article content. The content factory should create files like this at:
 * 
 *   app/articles/content/{category}/{slug}.tsx
 * 
 * Then register them in:
 *   1. app/articles/registry.ts (ARTICLE_REGISTRY)
 *   2. app/routes/articles.slug.tsx (articleContentModules)
 */

import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'

// Optional: Export structured data for the article layout to use
export const summaryHighlights: ArticleSummaryConfig = {
    heading: 'Key takeaways',
    intro: 'A quick summary of what you will learn in this article.',
    items: [
        {
            label: 'First point',
            description: 'Description of the first key point.',
        },
        {
            label: 'Second point',
            description: 'Description of the second key point.',
        },
    ],
}

// Optional: Export FAQs for structured data
export const faqs: ArticleFAQItem[] = [
    {
        q: 'What is MLAI?',
        a: 'MLAI (Machine Learning AI) is a community organization in Australia...',
    },
    {
        q: 'How can I get involved?',
        a: 'You can join our events, contribute to projects, or become a member.',
    },
]

/**
 * The main article body component.
 * This is what gets rendered inside ArticleLayout.
 */
export default function ArticleBody() {
    return (
        <>
            <p>
                This is the introduction paragraph. It sets up the context for the article
                and hooks the reader's attention.
            </p>

            <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    What you'll learn
                </h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>First learning objective</li>
                    <li>Second learning objective</li>
                    <li>Third learning objective</li>
                </ul>
            </div>

            <h2>Section Heading</h2>
            <p>
                This is a regular paragraph with content. You can use standard JSX/TSX
                elements and React Router's <Link to="/articles">Link component</Link> for
                internal navigation.
            </p>

            <h3>Subsection</h3>
            <ul>
                <li>Bullet point one</li>
                <li>Bullet point two</li>
                <li>Bullet point three</li>
            </ul>

            <h2>Another Section</h2>
            <p>
                More content goes here. The article follows standard markdown-like
                structure but uses JSX.
            </p>

            {/* Example callout boxes */}
            <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                    <h3 className="m-0 text-base font-semibold">Pro tip</h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                        A helpful tip for the reader.
                    </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                    <h3 className="m-0 text-base font-semibold">Common mistake</h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                        Something to watch out for.
                    </p>
                </div>
            </div>

            <h2>Next steps</h2>
            <ul>
                <li>
                    Browse more guides: <Link to="/articles">Articles</Link>
                </li>
                <li>
                    Questions? <Link to="/contact">Contact us</Link>
                </li>
            </ul>
        </>
    )
}

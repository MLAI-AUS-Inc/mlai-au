import { Home } from 'lucide-react'
import { Link } from 'react-router'

import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'

const TOPIC = 'Featured articles'

const summaryHighlights = {
  heading: 'Curated picks for 2026',
  intro: 'Quick landing page to showcase highlighted guides with current Australian context.',
  items: [
    { label: 'Latest guides', description: 'Fresh advice on startup, AI and product topics.' },
    { label: 'Local context', description: 'Victoria- and Australia-focused references.' },
    { label: 'Actionable', description: 'Checklists, templates and next steps.' },
  ],
}

export default function FeaturedArticlesPage() {
  return (
    <div className="bg-white">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleTocPlaceholder />

        <ArticleCallout variant="info" title="Jump to the library">
          <p className="text-sm text-gray-800">
            Browse the full articles library to find the topic you need.{' '}
            <Link to="/articles" className="font-semibold text-[--brand] underline-offset-4 hover:underline">
              View all articles →
            </Link>
          </p>
        </ArticleCallout>

        <p className="prose prose-lg max-w-none text-gray-700 mt-6">
          This page highlights selected long-form guides. Use the Articles library for category filters or search.
        </p>
      </div>

      <ArticleFooterNav backHref="/articles" topHref="#" />
    </div>
  )
}

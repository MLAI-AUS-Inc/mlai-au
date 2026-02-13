import React from 'react'

import { Container } from "~/components/Container"
import { Prose } from '../Prose'
import { type ArticleWithSlug } from "~/articles/registry"
import {
  getArticleBySlug,
  getNextArticleSlug, // implemented
  ORDERED_ARTICLE_ROUTE_SLUGS,
  resolveArticleRouteSlug,
} from "~/articles/registry"
import SearchSessionInitializer from '../SearchSessionInitializer'
import Breadcrumbs, { type BreadcrumbItem } from '../Breadcrumbs'
import { ArticleEnhancer } from './ArticleEnhancer'
import { BASE_ARTICLE_SEO_CONFIG as ARTICLE_SEO_CONFIG, type ArticleSeoConfig, type ArticleStructuredDataHowToConfig } from '~/articles/seo-config'
import FindProfessionalsCTA from '../FindProfessionalsCTA'
import NextArticleCTA from '../NextArticleCTA'
import AuthorBio from '../AuthorBio'
import RelatedArticlesCarousel from '../RelatedArticlesCarousel'
import ProfessionalsCarousel from '../ProfessionalsCarousel'
import { ArticleDisclaimer } from './ArticleDisclaimer'
import UpcomingEventsCTA from './UpcomingEventsCTA'
import { type Event } from '~/lib/events'
// import { loadArticleFeaturedProfessionals } from '@/lib/professionals/articleFeaturedProfessionals'
import type { ClinicianProfile } from '~/data/types'
import type { ArticleFAQItem } from './ArticleFAQ'

const DEFAULT_SITE_URL = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL)
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'https://mlai.au'


type ArticleHowToStep = {
  title: string
  detail?: string
  details?: string
  text?: string
  points?: string[]
  url?: string
  anchorId?: string
}

type ArticleHowToConfig = {
  name?: string
  description?: string
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string | number
  }
  supplies?: string[]
  tools?: string[]
  steps: ArticleHowToStep[]
}

type ArticleStructuredDataInput = {
  canonicalUrl: string
  article: ArticleWithSlug
  registryArticle?: ArticleWithSlug
  faqItems?: ArticleFAQItem[]
  howTo?: ArticleHowToConfig
}

function mergeStringLists(primary?: string[], secondary?: string[]): string[] | undefined {
  const merged = [...(primary ?? []), ...(secondary ?? [])]
    .map((value) => (value ?? '').toString().trim())
    .filter((value) => value.length > 0)

  if (merged.length === 0) {
    return undefined
  }

  const unique = Array.from(new Set(merged))
  return unique.length > 0 ? unique : undefined
}

function cloneHowToSteps(steps: ArticleHowToStep[] = []): ArticleHowToStep[] {
  return steps.map((step) => ({ ...step }))
}

function mergeHowToConfig(
  base?: ArticleHowToConfig,
  override?: ArticleStructuredDataHowToConfig,
): ArticleHowToConfig | undefined {
  if (!base && !override) {
    return undefined
  }

  const baseSteps = base?.steps ?? []
  if (baseSteps.length === 0) {
    return undefined
  }

  const merged: ArticleHowToConfig = {
    ...base,
    steps: cloneHowToSteps(baseSteps),
  }

  if (override?.name) {
    merged.name = override.name
  }

  if (override?.description) {
    merged.description = override.description
  }

  if (override?.totalTime) {
    merged.totalTime = override.totalTime
  }

  if (override?.estimatedCost) {
    merged.estimatedCost = {
      currency: override.estimatedCost.currency,
      value: override.estimatedCost.value,
    }
  }

  const mergedTools = mergeStringLists(override?.tools, base?.tools)
  merged.tools = mergedTools

  const mergedSupplies = mergeStringLists(override?.supplies, base?.supplies)
  merged.supplies = mergedSupplies

  return merged
}

function richTextToPlainText(node: React.ReactNode): string | undefined {
  const extract = (value: React.ReactNode): string => {
    if (value == null || typeof value === 'boolean') return ''
    if (typeof value === 'string' || typeof value === 'number') return String(value)
    if (Array.isArray(value)) {
      return value.map((child) => extract(child)).filter(Boolean).join(' ')
    }
    if (React.isValidElement(value)) {
      return extract((value as any).props?.children)
    }
    if (typeof value === 'object') {
      const maybeChildren = (value as any)?.children
      return maybeChildren ? extract(maybeChildren) : ''
    }
    return ''
  }

  const text = extract(node).replace(/\s+/g, ' ').trim()
  return text || undefined
}

function buildArticleStructuredData({
  canonicalUrl,
  article,
  registryArticle,
  faqItems,
  howTo,
}: ArticleStructuredDataInput) {
  const graph: any[] = []
  const articleSection = article.slug?.split('/').filter(Boolean).slice(0, 2).join(' / ') || undefined

  const dateModified =
    article.dateModified ??
    article.lastUpdated ??
    registryArticle?.dateModified ??
    registryArticle?.lastUpdated ??
    article.date

  const articleNode: any = {
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    mainEntityOfPage: canonicalUrl,
    headline: article.title,
    description: article.description ?? registryArticle?.description ?? '',
    datePublished: article.date,
    dateModified,
    articleSection,
    inLanguage: 'en-AU',
  }

  if (article.image) {
    articleNode.image = Array.isArray(article.image) ? article.image : [article.image]
  }

  if (article.author) {
    articleNode.author = {
      '@type': 'Person',
      name: article.author,
    }
  }

  articleNode.publisher = {
    '@type': 'Organization',
    name: 'Support Sorted',
    url: DEFAULT_SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${DEFAULT_SITE_URL}/favicon_128px.png`,
    },
  }

  graph.push(articleNode)

  const downloadSources = article.downloads ?? registryArticle?.downloads
  if (downloadSources && downloadSources.length > 0) {
    const downloadNodes = (downloadSources as any[])
      .map((download, idx) => {
        if (!download?.name || !download?.url) return null
        const absoluteUrl = new URL(download.url, DEFAULT_SITE_URL).toString()
        const nodeId = `${canonicalUrl}#download-${idx + 1}`
        const node: any = {
          '@type': 'DigitalDocument',
          '@id': nodeId,
          name: download.name,
          url: absoluteUrl,
          isPartOf: canonicalUrl,
        }
        if (download.format) {
          node.encodingFormat = download.format
        }
        return node
      })
      .filter(Boolean)

    if (downloadNodes.length > 0) {
      articleNode.hasPart = downloadNodes.map((node: any) => node['@id'])
      graph.push(...downloadNodes)
    }
  }

  if (faqItems && faqItems.length > 0) {
    const mainEntity = faqItems
      .map((item) => {
        const question = richTextToPlainText(item.question ?? item.q)
        const answer = richTextToPlainText(item.answer ?? item.a)
        if (!question || !answer) return null
        return {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        }
      })
      .filter(Boolean)

    if (mainEntity.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faqs`,
        mainEntity,
      })
    }
  }

  if (howTo && howTo.steps && howTo.steps.length > 0) {
    const steps = howTo.steps
      .map((step, idx) => {
        if (!step?.title) return null
        const text =
          step.detail ??
          step.details ??
          step.text ??
          (step.points && step.points.length > 0 ? step.points.join(' ') : undefined)
        const item: any = {
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.title,
        }
        if (text) item.text = text
        if (step.points && step.points.length > 0) {
          item.itemListElement = step.points.map((point) => ({
            '@type': 'HowToDirection',
            text: point,
          }))
        }
        if (step.url || step.anchorId) {
          item.url = step.url ?? `${canonicalUrl}${step.anchorId ? `#${step.anchorId}` : ''}`
        }
        return item
      })
      .filter(Boolean)

    if (steps.length > 0) {
      const howToNode: any = {
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#how-to`,
        name: howTo.name ?? article.title,
        description: howTo.description ?? article.description ?? registryArticle?.description ?? '',
        step: steps,
      }

      if (howTo.totalTime) {
        howToNode.totalTime = howTo.totalTime
      }

      if (howTo.estimatedCost) {
        const { currency, value } = howTo.estimatedCost
        if (currency && value !== undefined && value !== null) {
          howToNode.estimatedCost = {
            '@type': 'MonetaryAmount',
            currency,
            value: value.toString(),
          }
        }
      }

      if (howTo.tools && howTo.tools.length > 0) {
        howToNode.tool = howTo.tools.map((name) => ({
          '@type': 'HowToTool',
          name,
        }))
      }

      if (howTo.supplies && howTo.supplies.length > 0) {
        howToNode.supply = howTo.supplies.map((name) => ({
          '@type': 'HowToSupply',
          name,
        }))
      }

      graph.push(howToNode)
    }
  }

  if (graph.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function buildRelatedArticleSlugs(
  articlePath: string,
  currentSlug: string,
): string[] {
  const config = ARTICLE_SEO_CONFIG[articlePath]
  const fromConfig = (config?.internalLinks || [])
    .filter((href: any) => typeof href === 'string' && href.startsWith('/articles/'))
    .map((href: string) => href.replace(/^\/articles\//, '').replace(/\/$/, ''))
    .filter((slug: string) => slug && slug !== currentSlug)

  if (fromConfig.length > 0) {
    return Array.from(new Set(fromConfig))
  }

  if (ORDERED_ARTICLE_ROUTE_SLUGS.length === 0) return []

  const idx = ORDERED_ARTICLE_ROUTE_SLUGS.indexOf(currentSlug)
  const results: string[] = []
  for (let offset = 1; results.length < 3 && offset < ORDERED_ARTICLE_ROUTE_SLUGS.length; offset++) {
    const candidate = ORDERED_ARTICLE_ROUTE_SLUGS[(idx >= 0 ? idx + offset : offset - 1) % ORDERED_ARTICLE_ROUTE_SLUGS.length]
    if (candidate !== currentSlug) {
      results.push(candidate)
    }
  }
  return results
}

const DEFAULT_CITATIONS = [
  {
    title: "Australia's AI Ethics Principles",
    href: 'https://www.industry.gov.au/publications/australias-artificial-intelligence-ethics-framework/australias-ai-ethics-principles',
    description: 'Eight voluntary principles designed to ensure AI is safe, secure and reliable.',
  },
  {
    title: 'Policy for the Responsible Use of AI in Government',
    href: 'https://www.digital.gov.au/policy/policy-responsible-use-ai-government',
    description: 'Framework for accelerated and sustainable AI adoption by government agencies.',
  },
  {
    title: 'National AI Centre (DISR)',
    href: 'https://www.industry.gov.au/science-technology-and-innovation/technology/national-artificial-intelligence-centre',
    description: 'Coordinating Australia’s AI expertise and capabilities to build a responsible AI ecosystem.',
  },
]

function buildArticlePath(slug?: string): string {
  if (!slug) return '/articles'
  if (slug.startsWith('/')) return slug
  if (slug.startsWith('articles/')) return `/${slug}`
  return `/articles/${slug}`
}

function createBreadcrumbJson(items: BreadcrumbItem[], currentPath: string) {
  const currentUrl = new URL(currentPath, DEFAULT_SITE_URL).toString()
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: DEFAULT_SITE_URL,
    },
    ...items.map((item, index) => {
      const isLast = index === items.length - 1
      const href = item.href ? new URL(item.href, DEFAULT_SITE_URL).toString() : currentUrl
      return {
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: isLast ? currentUrl : href,
      }
    }),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

function simplifyArticleBreadcrumbItems(
  items?: BreadcrumbItem[],
): BreadcrumbItem[] | undefined {
  if (!items || items.length === 0) return items

  const articlesIndex = items.findIndex((item) => {
    const label = item.label.trim().toLowerCase()
    return item.href === '/articles' || label === 'articles'
  })

  const rootBase = articlesIndex >= 0 ? items[articlesIndex] : undefined
  const lastItem = items[items.length - 1]

  if (!lastItem) return rootBase ? [{ ...rootBase, current: true }] : undefined

  const normalizedRoot: BreadcrumbItem = {
    ...(rootBase ?? { label: 'Articles', href: '/articles' }),
    label: 'Articles',
    href: '/articles',
    current: false,
  }

  const normalizedLast: BreadcrumbItem = {
    ...lastItem,
    current: true,
  }

  const rootLabel = normalizedRoot.label.trim().toLowerCase()
  const lastLabel = normalizedLast.label.trim().toLowerCase()
  const rootHref = normalizedRoot.href ?? ''
  const lastHref = normalizedLast.href ?? ''

  const isSameItem = rootLabel === lastLabel && rootHref === lastHref

  if (isSameItem) {
    return [{ ...normalizedRoot, current: true }]
  }

  return [normalizedRoot, normalizedLast]
}

export function ArticleLayout({
  article,
  children,
  showDisclaimer = true,
  breadcrumb,
  breadcrumbItems,
  featuredProfessionals,
  featuredProfessionalsTitle,
  featuredProfessionalsPersona,
  faqItems,
  howTo,
  containerMaxWidthClassName,
  contentMaxWidthClassName,
  containerClassName,
  containerInnerClassName,
  contentPaddingClassName,
  upcomingEvents,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
  showDisclaimer?: boolean
  breadcrumb?: React.ReactNode
  breadcrumbItems?: BreadcrumbItem[]
  featuredProfessionals?: ClinicianProfile[]
  featuredProfessionalsTitle?: string
  featuredProfessionalsPersona?: string
  faqItems?: ArticleFAQItem[]
  howTo?: ArticleHowToConfig
  containerMaxWidthClassName?: string
  contentMaxWidthClassName?: string
  containerClassName?: string
  containerInnerClassName?: string
  contentPaddingClassName?: string
  upcomingEvents?: Event[]
}) {
  const registry = getArticleBySlug(article.slug)
  const resolvedRouteSlug = resolveArticleRouteSlug(article.slug)
  const normalisedSlug = (resolvedRouteSlug || article.slug || 'article')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const contentId = `${normalisedSlug || 'article'}-content`
  const articlePath = buildArticlePath(resolvedRouteSlug || article.slug)
  const seoConfig = ARTICLE_SEO_CONFIG[articlePath] ?? {}
  const breadcrumbFromNode =
    React.isValidElement(breadcrumb) && breadcrumb.props && typeof breadcrumb.props === 'object' && 'items' in breadcrumb.props
      ? ((breadcrumb.props as any).items as BreadcrumbItem[])
      : undefined
  const resolvedBreadcrumbItems = simplifyArticleBreadcrumbItems(
    breadcrumbItems ?? breadcrumbFromNode,
  )
  const breadcrumbJson = resolvedBreadcrumbItems
    ? createBreadcrumbJson(resolvedBreadcrumbItems, articlePath)
    : null
  const showCitations = Boolean(seoConfig.citations)
  const routeSlug = resolvedRouteSlug.replace(/^\/+/, "")

  const resolvedPersona = featuredProfessionalsPersona ?? article.professionalsPersona
  const professionalsLimit = 9
  // const professionals = featuredProfessionals ?? (await loadArticleFeaturedProfessionals({
  //   article,
  //   persona: resolvedPersona,
  //   limit: professionalsLimit,
  // }))
  const professionals: ClinicianProfile[] = []
  const professionalsTitle = featuredProfessionalsTitle ?? "Professionals ready to help with your NDIS goals"
  const hasProfessionals = professionals.length > 0

  const nextArticleSlug = getNextArticleSlug(routeSlug)
  const hasMultipleArticles = ORDERED_ARTICLE_ROUTE_SLUGS.length > 1
  const shouldShowNextArticle = Boolean(
    nextArticleSlug && (hasMultipleArticles || nextArticleSlug !== routeSlug),
  )
  const nextArticleMeta = shouldShowNextArticle && nextArticleSlug
    ? getArticleBySlug(nextArticleSlug)
    : undefined
  const nextArticleHref = shouldShowNextArticle && nextArticleSlug
    ? `/articles/${nextArticleSlug}`
    : undefined

  const relatedArticleSlugs = buildRelatedArticleSlugs(articlePath, routeSlug)
  const canonicalUrl = new URL(articlePath, DEFAULT_SITE_URL).toString()
  const structuredDataConfig = seoConfig.structuredData
  const structuredFaqItems =
    structuredDataConfig?.faq?.enabled === false ? undefined : faqItems
  const mergedHowTo = mergeHowToConfig(howTo, structuredDataConfig?.howTo)
  const structuredDataObject = buildArticleStructuredData({
    canonicalUrl,
    article,
    registryArticle: registry,
    faqItems: structuredFaqItems,
    howTo: mergedHowTo,
  })
  const structuredDataJson = structuredDataObject ? JSON.stringify(structuredDataObject) : null
  const hasManualHowTo = Boolean(mergedHowTo?.steps && mergedHowTo.steps.length > 0)

  const professionalsStructuredData = hasProfessionals
    ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${article.title} – Featured professionals`,
      itemListElement: professionals.slice(0, professionalsLimit).map((pro: any, idx: number) => {
        const url = new URL(`/professionals/${pro.slug}`, DEFAULT_SITE_URL).toString()
        const areaServed = (pro as any)?.inPerson || (pro as any)?.state_region || undefined
        return {
          '@type': 'Person',
          name: pro.name,
          jobTitle: pro.discipline,
          url,
          position: idx + 1,
          ...(areaServed ? { areaServed } : {}),
        }
      }),
    })
    : null

  const resolvedContainerMaxWidth = containerMaxWidthClassName ?? 'max-w-5xl'
  const resolvedContentMaxWidth =
    contentMaxWidthClassName ?? resolvedContainerMaxWidth ?? 'max-w-4xl'
  const resolvedContentPaddingClassName = [
    'pt-12 pb-12',
    contentPaddingClassName,
  ]
    .filter(Boolean)
    .join(' ')
  const resolvedContainerClassName = [
    'py-16 lg:pt-20 lg:pb-32 bg-transparent',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Container
      className={resolvedContainerClassName}
      maxWidthClassName={resolvedContainerMaxWidth}
      innerMaxWidthClassName={resolvedContentMaxWidth}
      innerClassName={containerInnerClassName}
    >
      <SearchSessionInitializer
        context="article"
        metadata={{ slug: article.slug, title: article.title }}
      />
      {structuredDataJson ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      ) : null}
      {professionalsStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: professionalsStructuredData }}
        />
      ) : null}
      {breadcrumbJson ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
        />
      ) : null}
      <div className="xl:relative">
        <div className={`mx-auto ${resolvedContentMaxWidth}`}>
          <article aria-label={article.title}>
            <Prose id={contentId} className={resolvedContentPaddingClassName}>
              <ArticleEnhancer
                articleTitle={article.title}
                articleDescription={article.description ?? registry?.description}
                contentSelector={`#${contentId}`}
                enableToc={Boolean(seoConfig.toc)}
                enableHowTo={Boolean(seoConfig.howTo) && !hasManualHowTo}
                enableMediaObject={Boolean(seoConfig.mediaObject)}
              />
              {hasProfessionals ? (
                <div className="not-prose my-12">
                  {/* <ProfessionalsCarousel
                    title={professionalsTitle}
                    profiles={professionals}
                  /> */}
                </div>
              ) : null}
              <div data-article-content>{children}</div>
              {showDisclaimer ? <ArticleDisclaimer /> : null}
              <div className="not-prose my-12">
                {/* <FindProfessionalsCTA
                  id="find-professionals"
                  title="Need help finding NDIS providers who actually fit?"
                  subtitle="Share your goals and preferences — we’ll shortlist plan managers, support coordinators and therapists within 1–2 business days."
                  buttonText="Get matched now →"
                  description="Free matching, tailored to your suburb, budget and availability."
                /> */}
              </div>
              {shouldShowNextArticle && nextArticleHref ? (
                <div className="not-prose my-12">
                  <NextArticleCTA
                    label="Next up"
                    title={nextArticleMeta?.title ?? 'Explore the next article'}
                    description={nextArticleMeta?.description}
                    to={nextArticleHref}
                    slug={nextArticleSlug}
                    image={nextArticleMeta?.image}
                    imageAlt={nextArticleMeta?.imageAlt}
                  />
                </div>
              ) : null}
              <div className="not-prose my-12">
                {/* <AuthorBio
                  pageTitle={article.title}
                  pageUrl={canonicalUrl}
                  datePublishedISO={article.date}
                /> */}
              </div>
              {relatedArticleSlugs.length > 0 ? (
                <div className="not-prose my-12">
                  <RelatedArticlesCarousel
                    title="Related reads"
                    itemsSlugs={relatedArticleSlugs}
                    variant="compact"
                  />
                </div>
              ) : null}
              {showCitations ? (
                <section className="not-prose mt-10 rounded-[24px] border border-gray-400 bg-transparent p-6 sm:p-8">
                  <h2 className="text-base font-bold uppercase tracking-wide text-gray-700">Authoritative references</h2>
                  <ul className="mt-4 space-y-4 text-sm text-gray-800">
                    {DEFAULT_CITATIONS.map((citation) => (
                      <li key={citation.href}>
                        <a
                          href={citation.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-semibold text-[#4b1bd1] underline underline-offset-4 hover:text-[#3a0fa8]"
                        >
                          {citation.title}
                        </a>
                        <p className="mt-1 text-gray-800">{citation.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </Prose>

            {/* -------- Browse services by need (chips) --------- */}
            {/* <div className={`mx-auto ${resolvedContentMaxWidth} mt-12`}>
              <hr className="border-gray-200 my-6" />
              <h3 className="text-xl font-semibold text-zinc-800 mb-4">Browse services by need</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'adolescent-physiotherapy',
                  'early-intervention',
                  'paediatric-ndis',
                  'adult-psychology',
                  'mobile-physio',
                  'assessment-specialist',
                  'feeding-disorders',
                  'functional-capacity-assessment',
                  'language-literacy',
                  'trauma',
                  'adult-disability',
                  'workplace-wellbeing',
                  'spanish-speaking',
                  'culturally-diverse',
                  'bilingual-mandarin',
                ].map((slug) => {
                  const hubHref = slug === 'speech-pathologist' ? '/speech-pathology' : slug === 'occupational-therapist' ? '/occupational-therapy' : slug === 'psychologist' ? '/psychology' : slug === 'physiotherapist' ? '/physiotherapy' : `/persona/${slug}`;
                  return (
                    <Link
                      key={slug}
                      to={hubHref}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 whitespace-nowrap capitalize"
                    >
                      {slug.replace(/-/g, ' ')}
                    </Link>
                  );
                })}
              </div>
            </div> */}

            {/* -------- Bottom CTA: Upcoming Events -------- */}
            <UpcomingEventsCTA
              events={upcomingEvents ?? []}
              maxEvents={3}
              className={`mx-auto ${resolvedContentMaxWidth} mt-16`}
            />
          </article>
        </div>
      </div>
    </Container>
  )
}

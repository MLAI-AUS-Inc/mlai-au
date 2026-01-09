import React from 'react'
import { Link } from 'react-router'
import { ImageWithFallback } from '../ImageWithFallback'

import { Container } from "~/components/Container"
import { Prose } from '../Prose'
import { type ArticleWithSlug } from "~/articles/registry"
import { formatDate } from "~/lib/formatDate"
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
// import { loadArticleFeaturedProfessionals } from '@/lib/professionals/articleFeaturedProfessionals'
import type { ClinicianProfile } from '~/data/types'
import { ArticleSummaryCard, type ArticleSummaryConfig } from './ArticleSummaryCard'
import type { ArticleFAQItem } from './ArticleFAQ'

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.supportsorted.com'


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
    title: 'NDIS Official Guidance',
    href: 'https://www.ndis.gov.au/',
    description: 'Policy updates, eligibility and participant resources direct from the NDIA.',
  },
  {
    title: 'NDIS Quality and Safeguards Commission',
    href: 'https://www.ndiscommission.gov.au/',
    description: 'Provider registration rules, audit guidance and practice standards.',
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

export async function ArticleLayout({
  article,
  children,
  showHero = true,
  showDate = true,
  showDisclaimer = true,
  breadcrumb,
  breadcrumbItems,
  titleTag = 'h1',
  featuredProfessionals,
  featuredProfessionalsTitle,
  featuredProfessionalsPersona,
  faqItems,
  howTo,
  summaryHighlights,
  renderFallbackHeading = true,
  containerMaxWidthClassName,
  contentMaxWidthClassName,
  containerClassName,
  containerInnerClassName,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
  showHero?: boolean
  showDate?: boolean
  showDisclaimer?: boolean
  breadcrumb?: React.ReactNode
  breadcrumbItems?: BreadcrumbItem[]
  titleTag?: React.ElementType | string
  featuredProfessionals?: ClinicianProfile[]
  featuredProfessionalsTitle?: string
  featuredProfessionalsPersona?: string
  faqItems?: ArticleFAQItem[]
  howTo?: ArticleHowToConfig
  summaryHighlights?: ArticleSummaryConfig
  renderFallbackHeading?: boolean
  containerMaxWidthClassName?: string
  contentMaxWidthClassName?: string
  containerClassName?: string
  containerInnerClassName?: string
}) {
  const registry = getArticleBySlug(article.slug)
  const headerImage = registry?.image ?? article.image
  const headerAlt = registry?.imageAlt ?? article.imageAlt ?? article.title
  const resolvedTag = titleTag ?? 'h1'
  const TitleTag = resolvedTag as React.ElementType;
  const isSemanticHeading = typeof resolvedTag === 'string' && /^h[1-6]$/i.test(resolvedTag)
  const resolvedRouteSlug = resolveArticleRouteSlug(article.slug)
  const normalisedSlug = (resolvedRouteSlug || article.slug || 'article')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const headingId = `${normalisedSlug || 'article'}-title`
  const headingProps = isSemanticHeading
    ? ({ id: headingId, itemProp: 'headline' } as const)
    : ({ id: headingId, role: 'heading', 'aria-level': 1, itemProp: 'headline' } as const)
  const contentId = `${headingId}-content`
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
  const resolvedContainerClassName = [
    'py-16 lg:pt-20 lg:pb-32 bg-white',
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
          <article aria-labelledby={headingId}>
            <header className="flex flex-col gap-6">
              {/* Breadcrumb or Date */}
              <div>
                {resolvedBreadcrumbItems ? (
                  <Breadcrumbs items={resolvedBreadcrumbItems} />
                ) : breadcrumb ? (
                  <div>{breadcrumb}</div>
                ) : (
                  showDate && (
                    <time
                      dateTime={article.date}
                      className="flex items-center text-base text-zinc-400"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
                      <span className="ml-3">{formatDate(article.date)}</span>
                    </time>
                  )
                )}
              </div>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 space-y-4">
                  {/* Page title first for faster contentful paint */}
                  <TitleTag
                    className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl"
                    {...headingProps}
                  >
                    {article.title}
                  </TitleTag>
                  {!isSemanticHeading && renderFallbackHeading ? (
                    <h1 className="sr-only">{article.title}</h1>
                  ) : null}
                  {article.description ? (
                    <p className="text-base text-zinc-600 sm:text-lg">
                      {article.description}
                    </p>
                  ) : null}
                </div>

                {/* Hero / OpenGraph image */}
                {showHero && headerImage ? (
                  <div className="w-full lg:w-auto lg:max-w-sm lg:flex-shrink-0 lg:self-center">
                    <ImageWithFallback
                      src={headerImage}
                      alt={headerAlt}
                      width={800}
                      height={600}
                      className="h-full w-full rounded-2xl object-cover"
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 360px"
                    />
                  </div>
                ) : null}
              </div>
            </header>
            {summaryHighlights ? (
              <div className="mt-8">
                <ArticleSummaryCard summary={summaryHighlights} />
              </div>
            ) : null}
            <Prose id={contentId} className="pt-12 pb-12">
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
                <section className="not-prose mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Authoritative references</h2>
                  <ul className="mt-3 space-y-3 text-sm text-slate-700">
                    {DEFAULT_CITATIONS.map((citation) => (
                      <li key={citation.href}>
                        <a
                          href={citation.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-semibold text-indigo-700 hover:underline"
                        >
                          {citation.title}
                        </a>
                        <p className="mt-1 text-slate-600">{citation.description}</p>
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

            {/* -------- Bottom CTA: Provider Matchmaker & Call -------- */}
            <div className={`mx-auto ${resolvedContentMaxWidth} mt-16 bg-indigo-50 rounded-2xl p-8 flex flex-col items-center gap-6 shadow`}>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Need personalised help?</h3>
                <p className="text-gray-700">We'll match you with the right professionals for your specific needs.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/?mode=recommend"
                  className="inline-flex items-center justify-center rounded-full bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#0d1bbd] whitespace-nowrap"
                >
                  Use Provider Matchmaker&nbsp;→
                </Link>
                {/* <a
                  to="tel:0370370344"
                  className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 whitespace-nowrap"
                >
                  📞 Call us on 03 7037 0344
                </a> */}
              </div>
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}

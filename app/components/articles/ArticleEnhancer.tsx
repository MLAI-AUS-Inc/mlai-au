'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { TableOfContents } from './TableOfContents'

type TocItem = {
  id: string
  title: string
  level: number
}

type ArticleEnhancerProps = {
  articleTitle: string
  articleDescription?: string
  contentSelector: string
  enableToc?: boolean
  enableHowTo?: boolean
  enableMediaObject?: boolean
}

function slugify(text: string, fallback: string, seen: Set<string>) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/["'’`]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  let candidate = base || fallback
  let index = 1
  while (seen.has(candidate)) {
    candidate = `${base || fallback}-${index++}`
  }
  seen.add(candidate)
  return candidate
}

const DEFAULT_MAX_STEPS = 6

export function ArticleEnhancer({
  articleTitle,
  articleDescription,
  contentSelector,
  enableToc = false,
  enableHowTo = false,
  enableMediaObject = false,
}: ArticleEnhancerProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [howToJson, setHowToJson] = useState<string | null>(null)
  const [mediaJson, setMediaJson] = useState<string | null>(null)
  const [tocTarget, setTocTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const container = document.querySelector(contentSelector)
    if (!container) {
      return
    }

    const contentRoot = container.querySelector('[data-article-content]') ?? container
    const headingNodes = Array.from(
      contentRoot.querySelectorAll<HTMLHeadingElement>('h2, h3'),
    )
    const seenIds = new Set<string>()
    const items: TocItem[] = []

    headingNodes.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent ?? `section-${index + 1}`, `section-${index + 1}`, seenIds)
      } else if (seenIds.has(heading.id)) {
        heading.id = slugify(heading.textContent ?? heading.id, heading.id, seenIds)
      } else {
        seenIds.add(heading.id)
      }

      items.push({
        id: heading.id,
        title: heading.textContent ?? heading.id,
        level: heading.tagName === 'H3' ? 3 : 2,
      })
    })

    if (enableToc) {
      setTocItems(items)

      const explicitSlot = contentRoot.querySelector<HTMLElement>(
        '[data-article-toc-placeholder]',
      )

      if (explicitSlot) {
        setTocTarget(explicitSlot)
      } else {
        setTocTarget(null)
      }
    }

    const origin = window.location.origin
    const pathname = window.location.pathname
    const pageUrl = `${origin}${pathname}`

    if (enableHowTo && items.length) {
      const limited = items.slice(0, DEFAULT_MAX_STEPS)
      const steps = limited.map((item, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: item.title,
        url: `${pageUrl}#${item.id}`,
      }))

      const howTo = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: articleTitle,
        description: articleDescription ?? `Step-by-step guide for ${articleTitle}`,
        totalTime: 'PT0M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'AUD',
          value: '0',
        },
        step: steps,
      }

      setHowToJson(JSON.stringify(howTo))
    }

    if (enableMediaObject) {
      const pdfLinks = Array.from(
        container.querySelectorAll<HTMLAnchorElement>('a[href$=".pdf" i]'),
      )

      if (pdfLinks.length) {
        const mediaObjects = pdfLinks.map((link, idx) => {
          const url = new URL(link.getAttribute('href') ?? '', pageUrl)
          return {
            '@type': 'MediaObject',
            '@id': `${pageUrl}#download-${idx + 1}`,
            name: link.textContent?.trim() || `Download ${idx + 1}`,
            contentUrl: url.toString(),
            encodingFormat: 'application/pdf',
          }
        })

        const graph = {
          '@context': 'https://schema.org',
          '@graph': mediaObjects,
        }

        setMediaJson(JSON.stringify(graph))
      }
    }
  }, [articleDescription, articleTitle, contentSelector, enableHowTo, enableMediaObject, enableToc])

  const hasToc = enableToc && tocItems.length > 1

  return (
    <>
      {hasToc
        ? tocTarget
          ? createPortal(
              <TableOfContents
                items={tocItems.map((item) => ({
                  href: `#${item.id}`,
                  label: item.title,
                  level: item.level,
                }))}
                title="In this guide:"
                ariaLabel="Table of contents"
                data-managed-by="article-enhancer"
              />,
              tocTarget,
            )
          : (
              <TableOfContents
                items={tocItems.map((item) => ({
                  href: `#${item.id}`,
                  label: item.title,
                  level: item.level,
                }))}
                title="In this guide:"
                ariaLabel="Table of contents"
                data-managed-by="article-enhancer"
              />
            )
        : null}

      {enableHowTo && howToJson ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToJson }} />
      ) : null}

      {enableMediaObject && mediaJson ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: mediaJson }} />
      ) : null}
    </>
  )
}

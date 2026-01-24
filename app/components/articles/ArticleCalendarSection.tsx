import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'
import { ArrowLongLeftIcon, ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { formatDate } from "~/lib/formatDate"

type ArticleSummary = {
    slug: string
    title: string
    description: string
    date: string
}

type PageItem = number | 'ellipsis'

interface ArticleCalendarSectionProps {
    id?: string
    title: string
    articles: ArticleSummary[]
    paginatedArticles: ArticleSummary[]
    currentPage: number
    totalPages: number
    pageSize: number
    paginationBasePath: string
    paginationHash?: string
}

interface CalendarDay {
    iso: string
    label: string
    isCurrentMonth: boolean
    isToday: boolean
    hasArticles: boolean
}

function parseISODate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(Date.UTC(year, month - 1, day))
}

function formatISODate(date: Date): string {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function startOfMonth(date: Date): Date {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

function addMonths(date: Date, amount: number): Date {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1))
}

function addDays(date: Date, amount: number): Date {
    const result = new Date(date)
    result.setUTCDate(result.getUTCDate() + amount)
    return result
}

function getCalendarStart(date: Date): Date {
    const firstOfMonth = startOfMonth(date)
    const dayOfWeek = firstOfMonth.getUTCDay() // 0 = Sunday
    const offset = (dayOfWeek + 6) % 7 // convert so Monday = 0
    return addDays(firstOfMonth, -offset)
}

function buildArticlesHref(basePath: string, hash: string | undefined, page: number) {
    const anchor = hash ?? ""
    return page <= 1 ? `${basePath}${anchor}` : `${basePath}?page=${page}${anchor}`
}

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
    if (totalPages <= 1) return []

    const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
    const sortedPages = Array.from(pages)
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b)

    const items: PageItem[] = []
    let previous: number | undefined

    for (const page of sortedPages) {
        if (previous !== undefined && page - previous > 1) {
            items.push("ellipsis")
        }
        items.push(page)
        previous = page
    }

    return items
}

function getListRange(page: number, pageSize: number, totalItems: number) {
    if (totalItems === 0) return null
    const start = (page - 1) * pageSize + 1
    const end = Math.min(page * pageSize, totalItems)
    return { start, end }
}

function Pagination({
    currentPage,
    totalPages,
    basePath,
    hash,
}: {
    currentPage: number
    totalPages: number
    basePath: string
    hash?: string
}) {
    if (totalPages <= 1) {
        return null
    }

    const prevPage = Math.max(currentPage - 1, 1)
    const nextPage = Math.min(currentPage + 1, totalPages)
    const pageItems = getPageItems(currentPage, totalPages)

    return (
        <nav
            className="flex items-center justify-between border-t border-zinc-200 pt-6"
            aria-label="Pagination"
        >
            <div className="flex w-0 flex-1">
                {currentPage === 1 ? (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300">
                        <ArrowLongLeftIcon aria-hidden="true" className="h-5 w-5" />
                        Previous
                    </span>
                ) : (
                    <Link
                        to={buildArticlesHref(basePath, hash, prevPage)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        <ArrowLongLeftIcon aria-hidden="true" className="h-5 w-5 text-zinc-400" />
                        Previous
                    </Link>
                )}
            </div>
            <div className="hidden md:flex md:items-center md:gap-2">
                {pageItems.map((item, index) =>
                    item === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-sm text-zinc-400">
                            …
                        </span>
                    ) : (
                        <Link
                            key={`page-${item}`}
                            to={buildArticlesHref(basePath, hash, item)}
                            aria-current={item === currentPage ? 'page' : undefined}
                            className={clsx(
                                'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition',
                                item === currentPage
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-zinc-500 hover:text-zinc-900'
                            )}
                        >
                            {item}
                        </Link>
                    )
                )}
            </div>
            <div className="flex w-0 flex-1 justify-end">
                {currentPage === totalPages ? (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300">
                        Next
                        <ArrowLongRightIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                ) : (
                    <Link
                        to={buildArticlesHref(basePath, hash, nextPage)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        Next
                        <ArrowLongRightIcon aria-hidden="true" className="h-5 w-5 text-zinc-400" />
                    </Link>
                )}
            </div>
        </nav>
    )
}

const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function ArticleCalendarSection({
    id,
    title,
    articles,
    paginatedArticles,
    currentPage,
    totalPages,
    pageSize,
    paginationBasePath,
    paginationHash,
}: ArticleCalendarSectionProps) {
    const todayIso = useMemo(() => formatISODate(new Date()), [])

    const articlesByDate = useMemo(() => {
        const map = new Map<string, ArticleSummary[]>()
        for (const article of articles) {
            if (!article.date) continue
            const key = article.date
            if (!map.has(key)) {
                map.set(key, [])
            }
            map.get(key)!.push(article)
        }
        return map
    }, [articles])

    const { earliestMonth, latestMonth } = useMemo(() => {
        if (articles.length === 0) {
            const now = startOfMonth(new Date())
            return { earliestMonth: now, latestMonth: now }
        }

        const sortedDates = [...articles]
            .map((article) => parseISODate(article.date))
            .sort((a, b) => a.getTime() - b.getTime())

        const first = startOfMonth(sortedDates[0])
        const last = startOfMonth(sortedDates[sortedDates.length - 1])

        return { earliestMonth: first, latestMonth: last }
    }, [articles])

    const initialVisibleMonth = useMemo(() => {
        const anchorDate = paginatedArticles[0]?.date ?? articles[0]?.date
        if (anchorDate) {
            return startOfMonth(parseISODate(anchorDate))
        }
        return startOfMonth(new Date())
    }, [paginatedArticles, articles])

    const [visibleMonth, setVisibleMonth] = useState<Date>(initialVisibleMonth)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)

    useEffect(() => {
        setVisibleMonth(initialVisibleMonth)
    }, [initialVisibleMonth])

    useEffect(() => {
        if (selectedDate && !articlesByDate.has(selectedDate)) {
            setSelectedDate(null)
        }
    }, [selectedDate, articlesByDate])

    const calendarDays: CalendarDay[] = useMemo(() => {
        const start = getCalendarStart(visibleMonth)
        return Array.from({ length: 42 }).map((_, index) => {
            const date = addDays(start, index)
            const iso = formatISODate(date)
            const isCurrentMonth = date.getUTCMonth() === visibleMonth.getUTCMonth() && date.getUTCFullYear() === visibleMonth.getUTCFullYear()
            return {
                iso,
                label: String(date.getUTCDate()),
                isCurrentMonth,
                isToday: iso === todayIso,
                hasArticles: articlesByDate.has(iso),
            }
        })
    }, [visibleMonth, articlesByDate, todayIso])

    const canGoPrev = useMemo(() => {
        if (!earliestMonth) return true
        const previous = addMonths(visibleMonth, -1)
        return previous.getTime() >= earliestMonth.getTime()
    }, [visibleMonth, earliestMonth])

    const canGoNext = useMemo(() => {
        if (!latestMonth) return true
        const next = addMonths(visibleMonth, 1)
        return next.getTime() <= latestMonth.getTime()
    }, [visibleMonth, latestMonth])

    const visibleMonthLabel = useMemo(() => {
        return visibleMonth.toLocaleDateString('en-AU', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        })
    }, [visibleMonth])

    const listArticles = selectedDate ? articlesByDate.get(selectedDate) ?? [] : paginatedArticles

    const listHeading = selectedDate
        ? `Articles from ${formatDate(selectedDate)}`
        : title

    const listRange = useMemo(() => (!selectedDate ? getListRange(currentPage, pageSize, articles.length) : null), [selectedDate, currentPage, pageSize, articles.length])

    const handleSelectDay = (day: CalendarDay) => {
        if (!day.hasArticles) return
        const targetDate = parseISODate(day.iso)
        const targetMonth = startOfMonth(targetDate)
        if (targetMonth.getTime() !== visibleMonth.getTime()) {
            setVisibleMonth(targetMonth)
        }
        setSelectedDate((prev) => (prev === day.iso ? null : day.iso))
    }

    const clearSelectedDate = () => {
        setSelectedDate(null)
        setVisibleMonth(startOfMonth(initialVisibleMonth))
    }

    const showEmptyState = listArticles.length === 0

    return (
        <section id={id} className="scroll-mt-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">{listHeading}</h2>
                    {!selectedDate && listRange ? (
                        <p className="mt-1 text-sm text-zinc-500">
                            Showing {listRange.start.toLocaleString('en-AU')} – {listRange.end.toLocaleString('en-AU')} of {articles.length.toLocaleString('en-AU')} articles
                        </p>
                    ) : null}
                    {selectedDate ? (
                        <p className="mt-1 text-sm text-zinc-500">{articlesByDate.get(selectedDate)?.length ?? 0} article(s) on this date</p>
                    ) : null}
                </div>
                {selectedDate ? (
                    <button
                        type="button"
                        onClick={clearSelectedDate}
                        className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
                    >
                        Clear date filter
                    </button>
                ) : null}
            </div>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm sm:p-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-zinc-900">{visibleMonthLabel}</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => canGoPrev && setVisibleMonth(addMonths(visibleMonth, -1))}
                                    disabled={!canGoPrev}
                                    className="inline-flex items-center rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <span className="sr-only">Previous month</span>
                                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => canGoNext && setVisibleMonth(addMonths(visibleMonth, 1))}
                                    disabled={!canGoNext}
                                    className="inline-flex items-center rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <span className="sr-only">Next month</span>
                                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-7 text-center text-xs uppercase tracking-wide text-zinc-400">
                            {weekdayLabels.map((label) => (
                                <div key={label}>{label}</div>
                            ))}
                        </div>

                        <div className="mt-2 grid grid-cols-7 text-sm">
                            {calendarDays.map((day) => {
                                const isSelected = selectedDate === day.iso
                                const articleCount = articlesByDate.get(day.iso)?.length ?? 0
                                return (
                                    <div
                                        key={day.iso}
                                        className="py-1.5"
                                    >
                                        <button
                                            type="button"
                                            aria-pressed={isSelected}
                                            aria-label={day.hasArticles ? `${formatDate(day.iso)} (${articleCount} article${articleCount === 1 ? '' : 's'})` : formatDate(day.iso)}
                                            onClick={() => handleSelectDay(day)}
                                            disabled={!day.hasArticles}
                                            className={clsx(
                                                'mx-auto flex size-9 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
                                                day.hasArticles
                                                    ? 'cursor-pointer hover:bg-zinc-100'
                                                    : 'cursor-default text-zinc-400',
                                                !day.isCurrentMonth && !isSelected && 'text-zinc-300',
                                                !isSelected && day.hasArticles && 'text-zinc-900',
                                                day.isToday && !isSelected && 'font-semibold text-indigo-600',
                                                isSelected && 'bg-[#1028E0] font-semibold text-white hover:bg-[#1028E0]'
                                            )}
                                        >
                                            <span>{day.label}</span>
                                            {day.hasArticles ? (
                                                <span className="sr-only">{` ${articleCount} article${articleCount === 1 ? '' : 's'}`}</span>
                                            ) : null}
                                        </button>
                                        {day.hasArticles ? (
                                            <div className={clsx('mx-auto mt-1 h-1 w-1 rounded-full', isSelected ? 'bg-[#1028E0]' : 'bg-indigo-300')} />
                                        ) : null}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {showEmptyState ? (
                            <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/70 p-6 text-center text-zinc-500">
                                <p className="font-medium">
                                    {selectedDate ? `No articles published on ${formatDate(selectedDate)}.` : 'No articles available yet.'}
                                </p>
                                {!selectedDate ? <p className="mt-2 text-sm">Check back soon for new writing.</p> : null}
                            </div>
                        ) : (
                            <ul role="list" className="list-none space-y-4">
                                {listArticles.map((article) => (
                                    <li key={article.slug}>
                                        <Link
                                            to={`/articles/${article.slug}`}
                                            className="group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            <time
                                                dateTime={article.date}
                                                className="text-xs font-medium uppercase tracking-wide text-zinc-400"
                                            >
                                                {formatDate(article.date)}
                                            </time>
                                            <div className="mt-2 flex items-start justify-between gap-4">
                                                <h3 className="text-lg font-semibold text-zinc-900 transition group-hover:text-[#1028E0]">
                                                    {article.title}
                                                </h3>
                                                <span className="hidden size-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#1028E0] transition group-hover:bg-[#1028E0] group-hover:text-white sm:flex">
                                                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-zinc-600">
                                                {article.description}
                                            </p>
                                            <span className="mt-4 inline-flex items-center text-sm font-medium text-[#1028E0]">
                                                Read article
                                                <ChevronRightIcon aria-hidden="true" className="ml-1.5 h-4 w-4" />
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!selectedDate && totalPages > 1 ? (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                basePath={paginationBasePath}
                                hash={paginationHash}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

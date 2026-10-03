import { Link, useSearchParams } from 'react-router'
import { eventCalendarHref, parseEventPreference, type EventPreference } from '~/lib/event-preference'
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline'
import { getEventUrl, type Event } from '~/lib/events'
import { EVENT_AVAILABILITY_NOTE, EVENT_DETAILS_LABEL, compareEventStarts, formatEventStart } from '~/lib/event-display'

interface UpcomingEventsCTAProps {
    events: Event[]
    maxEvents?: number
    className?: string
    onCtaClick?: (destination: string) => void
    copy?: { title: string; body: string; button: string }
    defaultEventPreference?: EventPreference
    calendarOnly?: boolean
}

export default function UpcomingEventsCTA({
    events,
    maxEvents = 3,
    className = '',
    onCtaClick,
    copy,
    defaultEventPreference = 'all',
    calendarOnly = false,
}: UpcomingEventsCTAProps) {
    const [searchParams] = useSearchParams()
    const calendarHref = eventCalendarHref(parseEventPreference(searchParams, defaultEventPreference))
    const cardStyles = [
        {
            bg: 'bg-[#ff3d00]', // sidebar "Hello" orange
            text: 'text-black',
            meta: 'text-black/85',
            border: 'border-transparent',
            icon: 'text-black',
        },
        {
            bg: 'bg-[#4b1bd1]', // sidebar deep purple
            text: 'text-white',
            meta: 'text-white/85',
            border: 'border-white/10',
            icon: 'text-white',
        },
        {
            bg: 'bg-[#ffe900]', // sidebar yellow
            text: 'text-black',
            meta: 'text-black/75',
            border: 'border-black/5',
            icon: 'text-black',
        },
    ]

    // Events are already filtered to upcoming on the server to avoid hydration mismatch
    // Just sort and slice here
    const upcomingEvents = (calendarOnly ? [] : events)
        .slice()
        .sort((a, b) => compareEventStarts(a.startDate, b.startDate))
        .slice(0, maxEvents)

    if (upcomingEvents.length === 0) {
        return (
            <div
                data-cf-component-id="events-cta"
                data-cf-component-type="events-cta"
                data-cf-component-label="Upcoming events CTA"
                className={`not-prose relative overflow-hidden rounded-[32px] bg-[#4b1bd1] p-8 sm:p-10 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.45)] ${className}`}
            >
                <div className="text-center text-white">
                    <h3 className="text-3xl font-semibold mb-2">{copy?.title ?? 'Join our community events'}</h3>
                    <p className="text-white/85 mb-6">{copy?.body ?? 'Stay tuned for upcoming AI and ML events in Australia.'}</p>
                    <Link
                        to={calendarHref}
                        onClick={() => onCtaClick?.(calendarHref)}
                        className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#ff3d00] px-7 py-3 text-center text-base font-semibold text-black shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all whitespace-normal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        <span className="min-w-0 break-words">{copy?.button ?? 'View Event Calendar'}</span>
                        <span aria-hidden="true" className="shrink-0">→</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div
            data-cf-component-id="events-cta"
            data-cf-component-type="events-cta"
            data-cf-component-label="Upcoming events CTA"
            className={`not-prose relative overflow-hidden rounded-[32px] bg-[#4b1bd1] p-6 sm:p-10 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.45)] ${className}`}
        >
            <div className="text-center mb-8 sm:mb-10 text-white">
                <h3 className="text-3xl sm:text-4xl font-bold mb-3">{copy?.title ?? 'Join our upcoming events'}</h3>
                <p className="text-white/85 text-base sm:text-lg">{copy?.body ?? 'Connect with the AI & ML community at our next gatherings.'}</p>
                <p className="mt-3 text-sm text-white/85">{EVENT_AVAILABILITY_NOTE}</p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
                {upcomingEvents.map((event, idx) => {
                    const style = cardStyles[idx % cardStyles.length]
                    const start = formatEventStart(event.startDate, event.timezone)

                    return (
                    <a
                        key={event._id}
                        href={getEventUrl(event)}
                        onClick={() => onCtaClick?.(getEventUrl(event))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex flex-col rounded-[28px] overflow-hidden shadow-[0_25px_70px_-30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1.5 border ${style.border} ${style.bg}`}
                    >
                        {/* Event Details */}
                        <div className="flex flex-col flex-grow p-5 sm:p-6">
                            <h4 className={`font-semibold text-lg sm:text-xl mb-3 line-clamp-2 transition-colors ${style.text}`}>
                                {event.name}
                            </h4>

                            <div className={`space-y-2 text-sm mt-auto ${style.meta}`}>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className={`w-4 h-4 flex-shrink-0 ${style.icon}`} />
                                    <span>{start.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className={`w-4 h-4 flex-shrink-0 ${style.icon}`} />
                                    <time dateTime={start.valid ? event.startDate : undefined} title={start.timeZone}>{start.time}</time>
                                </div>
                                {event.eventLocation?.address && (
                                    <div className="flex items-start gap-2">
                                        <MapPinIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${style.icon}`} />
                                        <span className="line-clamp-2">{event.eventLocation.address}</span>
                                    </div>
                                )}
                            </div>
                            <p className={`mt-4 text-sm font-semibold ${style.text}`}>{EVENT_DETAILS_LABEL} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></p>
                        </div>
                    </a>
                )})}
            </div>

            <div className="text-center mt-8">
                <Link
                    to={calendarHref}
                    onClick={() => onCtaClick?.(calendarHref)}
                    className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#ff3d00] px-8 py-3 text-center text-base font-semibold text-black shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all whitespace-normal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    <span className="min-w-0 break-words">{copy?.button ?? 'View All Events'}</span>
                    <span aria-hidden="true" className="shrink-0">→</span>
                </Link>
            </div>
        </div>
    )
}

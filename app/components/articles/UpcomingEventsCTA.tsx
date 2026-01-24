import { Link } from 'react-router'
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline'
import { getEventUrl, type Event } from '~/lib/events'

interface UpcomingEventsCTAProps {
    events: Event[]
    maxEvents?: number
    className?: string
}

export default function UpcomingEventsCTA({
    events,
    maxEvents = 3,
    className = '',
}: UpcomingEventsCTAProps) {
    const cardStyles = [
        {
            bg: 'bg-[#ff3d00]', // sidebar "Hello" orange
            text: 'text-white',
            meta: 'text-white/90',
            border: 'border-transparent',
            icon: 'text-white',
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
    const upcomingEvents = events
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, maxEvents)

    if (upcomingEvents.length === 0) {
        return (
            <div className={`relative overflow-hidden rounded-[32px] bg-[#4b1bd1] p-8 sm:p-10 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.45)] ${className}`}>
                <div className="text-center text-white">
                    <h3 className="text-3xl font-semibold mb-2">Join our community events</h3>
                    <p className="text-white/85 mb-6">Stay tuned for upcoming AI and ML events in Australia.</p>
                    <Link
                        to="/events"
                        className="inline-flex items-center justify-center rounded-full bg-[#ff3d00] px-7 py-3 text-base font-semibold text-white shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all whitespace-nowrap"
                    >
                        View Event Calendar&nbsp;→
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative overflow-hidden rounded-[32px] bg-[#4b1bd1] p-6 sm:p-10 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.45)] ${className}`}>
            <div className="text-center mb-8 sm:mb-10 text-white">
                <h3 className="text-3xl sm:text-4xl font-bold mb-3">Join our upcoming events</h3>
                <p className="text-white/85 text-base sm:text-lg">Connect with the AI & ML community at our next gatherings.</p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
                {upcomingEvents.map((event, idx) => {
                    const style = cardStyles[idx % cardStyles.length]
                    const date = new Date(event.startDate)
                    const dateStr = date.toLocaleDateString('en-AU', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                    })
                    const timeStr = date.toLocaleTimeString('en-AU', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    })

                    return (
                    <a
                        key={event._id}
                        href={getEventUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex flex-col rounded-[28px] overflow-hidden shadow-[0_25px_70px_-30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1.5 border ${style.border} ${style.bg}`}
                    >
                        {/* Event Image */}
                        {event.bannerImage?.url && (
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={event.bannerImage.url}
                                    alt={event.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}

                        {/* Event Details */}
                        <div className="flex flex-col flex-grow p-5 sm:p-6">
                            <h4 className={`font-semibold text-lg sm:text-xl mb-3 line-clamp-2 transition-colors ${style.text}`}>
                                {event.name}
                            </h4>

                            <div className={`space-y-2 text-sm mt-auto ${style.meta}`}>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className={`w-4 h-4 flex-shrink-0 ${style.icon}`} />
                                    <span suppressHydrationWarning>{dateStr}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className={`w-4 h-4 flex-shrink-0 ${style.icon}`} />
                                    <span suppressHydrationWarning>{timeStr}</span>
                                </div>
                                {event.eventLocation?.address && (
                                    <div className="flex items-start gap-2">
                                        <MapPinIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${style.icon}`} />
                                        <span className="line-clamp-2">{event.eventLocation.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                )})}
            </div>

            <div className="text-center mt-8">
                <Link
                    to="/events"
                    className="inline-flex items-center justify-center rounded-full bg-[#ff3d00] px-8 py-3 text-base font-semibold text-white shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all whitespace-nowrap"
                >
                    View All Events&nbsp;→
                </Link>
            </div>
        </div>
    )
}

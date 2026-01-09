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
    // Filter to only include upcoming events and sort by ascending date
    const upcomingEvents = events
        .filter((event) => new Date(event.startDate) >= new Date())
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, maxEvents)

    if (upcomingEvents.length === 0) {
        return (
            <div className={`rounded-2xl bg-gradient-to-br from-teal-50 to-white p-8 border border-teal-100 ${className}`}>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Join our community events</h3>
                    <p className="text-gray-700 mb-6">Stay tuned for upcoming AI and ML events in Australia.</p>
                    <Link
                        to="/events"
                        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-teal-700 transition-colors whitespace-nowrap"
                    >
                        View Event Calendar&nbsp;→
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`rounded-2xl bg-gradient-to-br from-teal-50 to-white p-8 border border-teal-100 ${className}`}>
            <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Join our upcoming events</h3>
                <p className="text-gray-700">Connect with the AI & ML community at our next gatherings.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {upcomingEvents.map((event) => (
                    <a
                        key={event._id}
                        href={getEventUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Event Image */}
                        {event.bannerImage?.url && (
                            <div className="relative h-32 overflow-hidden">
                                <img
                                    src={event.bannerImage.url}
                                    alt={event.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}

                        {/* Event Details */}
                        <div className="flex flex-col flex-grow p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
                                {event.name}
                            </h4>

                            <div className="space-y-1 text-sm text-gray-600 mt-auto">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                    <span>
                                        {new Date(event.startDate).toLocaleDateString('en-AU', {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                    <span>
                                        {new Date(event.startDate).toLocaleTimeString('en-AU', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                                {event.eventLocation?.address && (
                                    <div className="flex items-start gap-2">
                                        <MapPinIcon className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-1">{event.eventLocation.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link
                    to="/events"
                    className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                    View All Events&nbsp;→
                </Link>
            </div>
        </div>
    )
}

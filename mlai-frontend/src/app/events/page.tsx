'use client'
import React, { useEffect, useState } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../components/ui/Spinner';

interface Event {
    _id: string;
    name: string;
    startDate: string;
    bannerImage?: { url: string };
    eventLocation: {
        address: string;
    };
    slug: string;
}

export default function EventsCalendarPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/getEvents');
                if (response.ok) {
                    const data = await response.json();
                    const sortedEvents = (data.events || []).sort((a: Event, b: Event) => {
                        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                    });
                    setEvents(sortedEvents);
                } else {
                    console.error('Failed to fetch events:', await response.json());
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getEventsForDate = (date: Date) => {
        return events.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate.getDate() === date.getDate() &&
                   eventDate.getMonth() === date.getMonth() &&
                   eventDate.getFullYear() === date.getFullYear();
        });
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const navigateMonth = (direction: number) => {
        setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + direction, 1));
    };

    const renderCalendarView = () => {
        const daysInMonth = getDaysInMonth(selectedMonth);
        const firstDay = getFirstDayOfMonth(selectedMonth);
        const days = [];
        
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
            const dayEvents = getEventsForDate(date);
            const isToday = new Date().toDateString() === date.toDateString();
            
            days.push(
                <div
                    key={day}
                    className={`min-h-[120px] p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                        isToday ? 'bg-teal-50 border-teal-500' : ''
                    }`}
                >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-teal-600' : 'text-gray-900'}`}>
                        {day}
                    </div>
                    <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                            <a
                                key={event._id}
                                href={`https://events.humanitix.com/${event.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-xs p-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors truncate"
                                title={event.name}
                            >
                                {event.name}
                            </a>
                        ))}
                        {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                                +{dayEvents.length - 2} more
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigateMonth(-1)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSelectedMonth(new Date())}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => navigateMonth(1)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-px mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days}
                </div>
            </div>
        );
    };

    const renderListView = () => {
        const upcomingEvents = events.filter(event => new Date(event.startDate) >= new Date());
        
        return (
            <div className="space-y-4">
                {upcomingEvents.map((event) => (
                    <a
                        key={event._id}
                        href={`https://events.humanitix.com/${event.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            {event.bannerImage?.url && (
                                <img
                                    src={event.bannerImage.url}
                                    alt={event.name}
                                    className="w-full sm:w-48 h-32 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>
                                            {new Date(event.startDate).toLocaleDateString('en-GB', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>
                                            {new Date(event.startDate).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span>{event.eventLocation.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
                {upcomingEvents.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No upcoming events scheduled.
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Calendar</h1>
                    <p className="text-lg text-gray-600">
                        Discover and join our upcoming AI and machine learning events
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg shadow-sm" role="group">
                        <button
                            onClick={() => setView('calendar')}
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                                view === 'calendar'
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            Calendar View
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                                view === 'list'
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            List View
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-96">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <div>
                        {view === 'calendar' ? renderCalendarView() : renderListView()}
                    </div>
                )}
            </div>
        </div>
    );
}
'use client'
import React, { useEffect, useState } from 'react';

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

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/getEvents');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched Events:', data);
                    setEvents(data.events || []); // Set the events array directly as returned by the API
                } else {
                    console.error('Failed to fetch events:', await response.json());
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleNext = () => {
        if (currentPage < Math.ceil(events.length / 4) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div id='events' className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Join us for upcoming events</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        
                    </p>
                </div>
                <div className="carousel bg-white relative container mx-auto overflow-visible" style={{ maxWidth: '1600px' }}>
                    <div className="carousel-inner relative w-full" style={{ minHeight: '480px' }}>
                        {events.length === 0 ? (
                            <p className="text-center text-gray-900">No events available</p>
                        ) : (
                            Array.from({ length: Math.ceil(events.length / 4) }).map((_, pageIndex) => (
                                <div
                                    key={pageIndex}
                                    className={`carousel-item w-full ${pageIndex === currentPage ? 'block' : 'hidden'} transition-transform duration-500 ease-in-out transform ${pageIndex > currentPage ? 'translate-x-full' : pageIndex < currentPage ? '-translate-x-full' : 'translate-x-0'}`}
                                >
                                    <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                                        {events.slice(pageIndex * 4, (pageIndex + 1) * 4).map((event) => (
                                            <a key={event._id} href={`https://events.humanitix.com/${event.slug}`} target='_blank' rel='noopener noreferrer' className="block">
                                                <article className="relative isolate flex flex-col justify-end overflow-visible rounded-3xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-60 hover:opacity-90 transition duration-150 shadow-lg">
                                                    <img src={event.bannerImage?.url || ''} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover rounded-3xl" />
                                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-3xl" />
                                                    <div className="absolute inset-0 -z-10 rounded-3xl ring-1 ring-inset ring-gray-900/10" />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-0 rounded-3xl"></div>
                                                    <div className="flex flex-col justify-end h-full relative z-10 p-4">
                                                        <time className="text-sm text-gray-300 block mb-2">
                                                            {new Date(event.startDate).toLocaleDateString('en-GB', {
                                                                day: 'numeric', month: 'short', year: 'numeric'
                                                            })}, {new Date(event.startDate).toLocaleTimeString('en-US', {
                                                                hour: 'numeric', minute: '2-digit', hour12: true
                                                            })}
                                                        </time>
                                                        <h3 className="text-lg font-semibold leading-6 text-white mb-2 truncate-multiline">
                                                            {event.name}
                                                        </h3>
                                                        <div className="flex items-center text-sm leading-6 text-gray-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                            </svg>
                                                            <span className="truncate w-3/4">
                                                                {event.eventLocation.address}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                        <button onClick={handlePrev} className="prev control w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-teal-500 bg-opacity-60 hover:bg-teal-400 leading-tight text-center z-10 inset-y-0 left-0 my-auto hidden lg:block">‹</button>
                        <button onClick={handleNext} className="next control w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-teal-500 bg-opacity-60 hover:bg-teal-400 leading-tight text-center z-10 inset-y-0 right-0 my-auto hidden lg:block">›</button>
                        <ol className="carousel-indicators flex justify-center hidden lg:flex">
                            {Array.from({ length: Math.ceil(events.length / 4) }).map((_, index) => (
                                <li className="inline-block mr-3" key={index}>
                                    <button onClick={() => setCurrentPage(index)} className={`carousel-bullet cursor-pointer block text-4xl ${currentPage === index ? 'text-gray-900' : 'text-gray-400'} hover:text-gray-900`}>•</button>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
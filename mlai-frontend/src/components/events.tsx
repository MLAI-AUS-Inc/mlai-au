'use client'
import React from 'react';
import { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getEvents');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Events:', data);
          setEvents(data.events || []);
        } else {
          console.error('Failed to fetch events:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div id='events' className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Can&apos;t wait to see you for the next one!
          </p>
        </div>
        <div className="carousel bg-white relative container mx-auto overflow-visible" style={{ maxWidth: '1600px' }}>
          <div className="carousel-inner relative w-full min-h-96">
            {events.length === 0 ? (
              <p className="text-center text-gray-900">No events available</p>
            ) : (
              events.map((event: any, index: number) => (
                <div key={index} className={`carousel-item absolute w-full ${index < 4 ? '' : 'hidden'}`}>
                  <input className="carousel-open sr-only" type="radio" id={`carousel-${Math.floor(index / 4) + 1}`} name="carousel" aria-hidden="true" defaultChecked={index < 4 && index === 0} />
                  <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {events.slice(index, index + 4).map((event: any) => (
                      <article
                        key={event._id}
                        className="relative isolate flex flex-col justify-end overflow-visible rounded-3xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-60 hover:opacity-90 transition duration-150 shadow-lg"
                      >
                        <img src={event.bannerImage?.url || ''} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover rounded-3xl" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-3xl" />
                        <div className="absolute inset-0 -z-10 rounded-3xl ring-1 ring-inset ring-gray-900/10" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 z-0 rounded-3xl"></div>
  
                        <div className="flex flex-col justify-end h-full relative z-10">
                          <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                            <time className="mr-8">
                              {new Date(event.startDate).toLocaleString()}
                            </time>
                            <div className="-ml-4 flex items-center gap-x-4">
                              <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                <circle cx={1} cy={1} r={1} />
                              </svg>
                              <div className="flex gap-x-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <div className="truncate w-full">
                                  {event.eventLocation.address}
                                </div>
                              </div>
                            </div>
                          </div>
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                            <a href={event.slug} target='_blank' rel='noopener noreferrer'>
                              <span className="absolute inset-0" />
                              {event.name}
                            </a>
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))
            )}
            {Array.from({ length: Math.ceil(events.length / 4) }).map((_, index: number) => (
              <React.Fragment key={index}>
                <label htmlFor={`carousel-${index}`} className={`prev control-${index + 1} w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-opacity-20 bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto`}>‹</label>
                <label htmlFor={`carousel-${index + 2}`} className={`next control-${index + 1} w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-opacity-20 bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto`}>›</label>
              </React.Fragment>
            ))}
          </div>
          <ol className="carousel-indicators flex justify-center mt-8">
            {Array.from({ length: Math.ceil(events.length / 4) }).map((_, index: number) => (
              <li className="inline-block mr-3" key={index}>
                <label htmlFor={`carousel-${index + 1}`} className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
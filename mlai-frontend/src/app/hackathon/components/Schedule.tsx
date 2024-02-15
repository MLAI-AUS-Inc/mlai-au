'use client'

import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Container } from './Container'
import  GetTickets  from './GetTickets'

// import { BackgroundImage } from '@/components/BackgroundImage'


interface Day {
  date: React.ReactNode
  dateTime: string
  summary: string
  timeSlots: Array<{
    name: string
    description: string | null
    start: string
    end: string
  }>
}

const schedule: Array<Day> = [
  {
    date: 'April 6',
    dateTime: '2022-04-04',
    summary:
      'Team formation day (Melb & Syd)',
    timeSlots: [
      {
        name: 'Intro talk',
        description: 'TBA',
        start: '9:00AM',
        end: '10:00AM',
      },
      {
        name: 'Hacking',
        description: 'TBA',
        start: '10:00AM',
        end: '11:00AM',
      },
      {
        name: 'Lunch',
        description: 'TBA',
        start: '11:00AM',
        end: '12:00PM',
      },
      {
        name: 'Talk 2',
        description: 'TBA',
        start: '12:00PM',
        end: '1:00PM',
      },

    ],
  },
  {
    date: 'April 15',
    dateTime: '2022-04-05',
    summary:
      'Teams submit projects',
    timeSlots: [
      {
        name: 'Submission deadline',
        description: 'TBA',
        start: 'submit by',
        end: '9:00AM',
      },
      {
        name: 'Semi final judging',
        description: 'Stealing fingerprints',
        start: 'finalised by',
        end: '11:00AM',
      },
    ],
  },
  {
    date: 'April 30',
    dateTime: '2022-04-06',
    summary:
      'Final Pitch Night (Melb & Syd)',
    timeSlots: [
      {
        name: 'Opening Speech',
        description: 'TBA',
        start: '9:00AM',
        end: '10:00AM',
      },
      {
        name: 'Pitches',
        description: 'TBA',
        start: '10:00AM',
        end: '11:00AM',
      },
      {
        name: 'Keynote',
        description: 'TBA',
        start: '11:00AM',
        end: '12:00PM',
      },

    ],
  },
]

import { useRef } from 'react';

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')
  const tabListRef = useRef(null); // Add this line

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  // const handleTabClick = (dayIndex: any) => {
  //   // Calculate center position for the clicked tab
  //   const tabListElement = tabListRef.current;
  //   if (tabListElement) {
  //     const clickedTabElement = tabListElement.children[dayIndex];
  //     if (clickedTabElement) {
  //       const scrollLeft = clickedTabElement.offsetLeft - (tabListElement.offsetWidth / 2) + (clickedTabElement.offsetWidth / 2);
  //       tabListElement.scroll({
  //         left: scrollLeft,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }
  // };

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden overflow-hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List ref={tabListRef} className="-mx-4 flex gap-x-2 gap-y-10 overflow-x-auto pb-4 pl-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) => (
          <>
            {schedule.map((day, dayIndex) => (
              <div
                key={day.dateTime}
                
                className={clsx(
                  'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0 cursor-pointer',
                  dayIndex !== selectedIndex && 'opacity-70',
                )}
              >
                <DaySummary
                  day={{
                    ...day,
                    date: (
                      <Tab className="ui-not-focus-visible:outline-none">
                        <span className="absolute inset-0" />
                        {day.date}
                      </Tab>
                    ),
                  }}
                />
              </div>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="ui-not-focus-visible:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}


function DaySummary({ day }: { day: Day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight text-teal-200">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight text-teal-200">
        {day.summary}
      </p>
    </>
  )
}

function TimeSlots({ day, className }: { day: Day; className?: string }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-8 bg-black px-10 py-14 text-center shadow-xl shadow-teal-900/5 backdrop-blur',
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} `}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-teal-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-teal-200">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-teal-200">
              {timeSlot.description}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-200">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{' '}
            -{' '}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{' '}
            
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8 overflow-hidden">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32 bg-gray-900">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffea] to-[#89bdfc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-teal-300 sm:text-5xl">
            What's happening when and where?
          </h2>
          <p className="mt-4 font-display text-2xl tracking-tight text-gray-200"> 
           The two main events of the hackathon are the "Team Formation Event (Hack Day)" and the "Final Pitch Night".
          </p>
          <p className="mt-4 font-display text-2xl tracking-tight text-gray-200">
          You can either join the event as a hacker and build a solution, or just join the pitch night to see our awesome teams present.
          </p>
          <div className="pt-6 sm:pt-0">
            <GetTickets />
          </div>
        </div>
      </Container>
      
      <div className="relative mt-14 sm:mt-24">
        {/* <BackgroundImage position="right" className="-bottom-32 -top-40" /> */}
        <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container>
      </div>
    </section>
  )
}

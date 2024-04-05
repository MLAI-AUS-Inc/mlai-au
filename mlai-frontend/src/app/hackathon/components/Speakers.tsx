'use client'
import { useEffect, useId, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'



import placeholder from '/src/app/hackathon/images/avatars/placeholder.png'
import aleksis from '/src/app/hackathon/images/avatars/aleksis.png'
import haowang from '/src/app/hackathon/images/avatars/haowang.png'
import yien from '/src/app/hackathon/images/avatars/yien.jpg'
import ruchika from '/src/app/hackathon/images/avatars/ruchika.jpg'
import nickholmesacourt from '/src/app/hackathon/images/avatars/nickholmesacourt.jpeg'
import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'

const days = [
  {
    name: 'Team Formation Day',
    date: 'April 6',
    dateTime: '2024-04-06',
    speakers: [
      {
        name: 'Dr. Aleksis Xenophon',
        role: 'Optimisation and Machine Learning Engineer at Amber Electric',
        image: aleksis,
      },
      {
        name: 'Ruchika Deora',
        role: 'Head of Product, SEC Victoria',
        image: ruchika,
      },
      {
        name: 'Dr. Hao Wang',
        role: 'Senior Research Fellow, Dept. of Data Science & AI, Monash Futures Institute',
        image: haowang,
      },
    ],
  },

  {
    name: 'Submission Mentoring Day',
    date: 'April 13',
    dateTime: '2022-04-04',
    speakers: [
      {
        name: 'Yien Fuang Tiong',
        role: 'AGL Australia - VPP Data Science Manager',
        image: yien,
      },
    ],
  },


  
  {
    name: 'Final Pitch Night',
    date: 'May 8',
    dateTime: '2024-05-08',
    speakers: [
      {
        name: 'To be announced soon',
        role: '-',
        image: placeholder,
      },
    ],
  },

]

function ImageClipPaths({
  id,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { id: string }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Speakers() {
  let id = useId()
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="bg-gray-900"
    >
      <ImageClipPaths id={id} />
      <Container>
        <div className="mt-32 mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl"
          >
            Speakers
          </h2>
          <p className="mt-4 font-display text-2xl tracking-tight text-gray-200">
            We&apos;re incredibly excited to have some of Australia&apos;s smartest minds in AI and Energy as speakers and mentors for the event.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4"
          vertical={tabOrientation === 'vertical'}
        >
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block" />
            <Tab.List className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
              {({ selectedIndex }) => (
                <>
                  {days.map((day, dayIndex) => (
                    <div key={day.dateTime} className="relative lg:pl-8">
                      <DiamondIcon
                        className={clsx(
                          'absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block',
                          dayIndex === selectedIndex
                            ? 'fill-teal-500 stroke-teal-500'
                            : 'fill-transparent stroke-teal-400',
                        )}
                      />
                      <div className="relative">
                        <div
                          className={clsx(
                            'font-mono text-sm',
                            dayIndex === selectedIndex
                              ? 'text-teal-500'
                              : 'text-slate-500',
                          )}
                        >
                          <Tab className="ui-not-focus-visible:outline-none">
                            <span className="absolute inset-0 " />
                            {day.name}
                          </Tab>
                        </div>
                        <time
                          dateTime={day.dateTime}
                          className="mt-1.5 block text-2xl font-semibold tracking-tight text-teal-500"
                        >
                          {day.date}
                        </time>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Tab.List>
          </div>
          <Tab.Panels className="lg:col-span-3">
            {days.map((day) => (
              <Tab.Panel
                key={day.dateTime}
                className="grid grid-cols-1 gap-x-8 gap-y-10 ui-not-focus-visible:outline-none sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3"
                unmount={false}
              >
                {day.speakers.map((speaker, speakerIndex) => (
                  <div key={speakerIndex}>
                    <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
                      <div
                        className={clsx(
                          'absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6',
                          [
                            'border-teal-300',
                            'border-teal-500',
                            'border-teal-100',
                          ][speakerIndex % 3],
                        )}
                      />
                      <div
                        className="absolute inset-0 bg-indigo-50"
                        style={{ clipPath: `url(#${id}-${speakerIndex % 3})` }}
                      >
                        <Image
                          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                          src={speaker.image}
                          alt=""
                          priority
                          sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-gray-200">
                      {speaker.name}
                    </h3>
                    <p className="mt-1 text-base tracking-tight text-slate-500">
                      {speaker.role}
                    </p>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </section>
  )
}

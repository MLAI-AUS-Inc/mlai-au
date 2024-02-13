import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Container } from './Container'
import { Button } from './Button'

export function ExtendedInfo() {
  return (
    <section id="extendedinfo" aria-label="Schedule" className="py-20 sm:py-16 bg-gray-900">
        <div
          className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
          <h2 className="font-display text-4xl font-medium tracking-tighter text-teal-500 sm:text-5xl">
            Why an AI Hackathon on Energy in Australia?
          </h2>
          <p className="mt-4 pb-6 pt-6 font-display text-2xl tracking-tight text-teal-500">
          Renewables are key to Australias journey to carbon net-zero, but do not produce electricity in a predictable, reliable fashion. This is known to make maintaining a reliable flow of electricity more difficult. 
          </p>
          <p className="mt-4 pb-6 font-display text-2xl tracking-tight text-teal-500">
          Energy storage is increasingly seen as a solution to this issue. However there is some research indicating that energy storage entities potentially disrupt the electricity market, especially if their charging and discharging tactics are driven by profit rather than social welfare.
          </p>
          <p className="mt-4 pb-0  font-display text-2xl tracking-tight text-teal-500">
          The hackathon presents a beginner-friendly challenge in artificial intelligence, inviting participants to manage a virtual battery within the spot market to maximize earnings. This simulation aims to shed light on the potential for individual battery systems to influence or manipulate the Australian electricity market. </p>
        </div>
      
      </Container>
    </section>
  )
}

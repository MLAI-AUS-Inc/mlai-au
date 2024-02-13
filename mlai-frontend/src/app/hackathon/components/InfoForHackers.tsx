import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Container } from './Container'
import { Button } from './Button'

export function InfoForHackers() {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32 bg-gray-900">
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
            Want to join the hack? All info here.
          </h2>
          <p className="mt-4 pb-10 font-display text-2xl tracking-tight text-teal-500">
           We've jam packed the Green Battery Hack with everything you need to unleash your AI solution onto the Australian energy sector.
          </p>
        </div>
        
        <div className="flex justify-center lg:justify-start">
          <Button href="#" className="whitespace-nowrap">Go to Green Battery Hack Wiki</Button>
        </div>
      </Container>
    </section>
  )
}

'use client'
import Image from 'next/image'
import haizea from '/src/app/hackathon/images/logos/haizea.png'
import solcast from '/src/app/hackathon/images/logos/solcast.png'
import awsstartups from '/src/app/hackathon/images/logos/aws_padd.png'
import melbconnect from '/src/app/hackathon/images/logos/melbourneconnect.png'
import aie from '/src/app/hackathon/images/logos/aie.png'
import v2 from '/src/app/hackathon/images/logos/v2_logo.png'
import dscubed from '/src/app/hackathon/images/logos/dscubed.png'
import buildclub from '/src/app/hackathon/images/logos/buildclub.png'
import hal from '/src/app/hackathon/images/logos/Hal.png'
import acs from '/src/app/hackathon/images/logos/acs.png'
import amber from '/src/app/hackathon/images/logos/amber.png'
import optima from '/src/app/hackathon/images/logos/optima.png'
import mcn from '/src/app/hackathon/images/logos/mcn.png'
import CoM from '/src/app/hackathon/images/logos/CoM_pad.png'
import exciton from '/src/app/hackathon/images/logos/exciton.png'
import mcds from '/src/app/hackathon/images/logos/mcds.png'
import onem from '/src/app/hackathon/images/logos/onem.png'

import { Container } from './Container'
import { useEffect, useRef, useState } from 'react'

const sponsors = [
  { name: 'unimelb', logo: melbconnect },
  { name: 'CoM', logo: CoM },
  { name: 'v2', logo: v2 },
  { name: 'aws', logo: awsstartups },
  { name: 'amber', logo: amber },
]

const sponsorssilver = [
  { name: 'haizea', logo: haizea },
  { name: 'solcast', logo: solcast },
  { name: 'dscubed', logo: dscubed },
  { name: 'hal', logo: hal },
  { name: 'acs', logo: acs },
]

const communitypartner = [
  { name: 'aie', logo: aie },
  { name: 'optima', logo: optima },
  { name: 'mcn', logo: mcn },
  { name: 'exciton', logo: exciton },
  { name: 'mcds', logo: mcds },
  // { name: 'buildclub', logo: buildclub },
  { name: 'opennem', logo: onem },
]


export function Sponsors() {

  return (
    <section id="sponsors" aria-label="Sponsors" className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900">
      <Container>
        <h2 className="mx-auto justify-center max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-5xl">
         Gold Sponsors
        </h2>

        <div className="flex justify-center items-center max-w-full mt-8">
          <div
            className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/2 sm:w-1/3 px-4"  
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized style={{ width: '100%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        <h2 className="mx-auto pt-16 justify-center max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-3xl">
          Silver Sponsors
        </h2>

        <div className="flex justify-center items-center max-w-full mt-4">
          <div
            className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {sponsorssilver.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/5 px-4"  
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized style={{ width: '90%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>


        <h3 className="mx-auto mt-10 max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-2xl">
          Community Partners
        </h3>

        <div className="flex justify-center items-center max-w-full mt-4">
          <div
            className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {communitypartner.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/6 px-4"  
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized style={{ width: '90%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  )
}

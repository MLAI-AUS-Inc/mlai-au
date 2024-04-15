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

const sponsors = [
  { name: 'unimelb', logo: melbconnect },
  { name: 'CoM', logo: CoM },
  { name: 'v2', logo: v2 },
  { name: 'aws', logo: awsstartups },
  { name: 'amber', logo: amber },
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

      </Container>
    </section>
  )
}

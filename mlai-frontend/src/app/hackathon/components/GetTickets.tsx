import { Button } from './Button'
import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'

export default function GetTickets() {
  return (
    <section className="relative z-50 flex-none lg:pt-11 bg-gray-900">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className='absolute inset-x-0 transform-gpu z-10 blur-3xl sm:full'
            aria-hidden="true"
          >
            <div
              className="h-full -top-1/2 sm:h-auto relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem rotate-[30deg] bg-gradient-to-tr from-[#80ffdd] to-[#89b9fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/4 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx="512" cy="512" r="512" fill="url(#lightTealGradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="lightTealGradient">
                <stop stopColor="#AFEEEE" offset="0%" />
                <stop stopColor="#7FFFD4" offset="100%" />
              </radialGradient>
            </defs>
          </svg>

          <div className="mx-auto max-w-md text-center mb-12 lg:mb-0 lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join us in Sydney
            </h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-300">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
            </p> */}
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join the Hackathon
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Attend the Pitch Night <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-md text-center mb-12 lg:mb-0 lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-teal-300 sm:text-4xl">
              Join us in Melbourne
            </h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-300">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
              </p> */}
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-teal-300 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal300"
              >
                Join the Hackathon
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-teal-300">
                Attend the Pitch Night <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* <Container className="flex flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="mt-4 w-full lg:grow lg:basis-0 flex justify-center flex-wrap">
          <div className="grid grid-cols-2 gap-4 lg:flex lg:gap-x-4">
            <Button color="teal" href="#" className="whitespace-nowrap">Join as a Hacker - Melb</Button>
            <Button color="teal" href="#" className="whitespace-nowrap">Join as a Hacker - Syd</Button>
            <div className="hidden lg:block lg:flex-1"></div> 
            <Button color="complementary" href="#" className="whitespace-nowrap">Tickets Pitch Night - Melb</Button>
            <Button color="complementary" href="#" className="whitespace-nowrap">Tickets Pitch Night - Syd</Button>
          </div>
        </div>
      </Container> */}
    </section>
  )
}

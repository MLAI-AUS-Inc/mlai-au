import { Button } from './Button'
import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'

export default function GetTickets() {
  return (
    <section className="relative z-50 flex-none lg:pt-11 bg-gray-900">
      <Container className="flex flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="mt-4 w-full lg:grow lg:basis-0 flex justify-center flex-wrap">
          {/* Adjusted mt-10 to mt-4 to reduce the top margin */}
          <div className="grid grid-cols-2 gap-4 lg:flex lg:gap-x-4">
            {/* Each button is now an individual item, allowing for responsive reflow */}
            <Button color="teal" href="#" className="whitespace-nowrap">Join as a Hacker - Melb</Button>
            <Button color="teal"  href="#" className="whitespace-nowrap">Join as a Hacker - Syd</Button>
            <div className="hidden lg:block lg:flex-1"></div> {/* This empty div acts as a spacer on larger screens and won't affect layout on smaller screens */}
            <Button color="complementary" href="#" className="whitespace-nowrap">Tickets Pitch Night - Melb</Button>
            <Button color="complementary" href="#" className="whitespace-nowrap">Tickets Pitch Night - Syd</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

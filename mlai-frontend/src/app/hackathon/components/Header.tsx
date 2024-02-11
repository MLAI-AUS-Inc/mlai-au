import { Button } from './Button'
import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'


export default function Header() {
  return (
    <header className="relative z-50 flex-none lg:pt-11 transparent">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <img className="h-12 w-auto" src="/MLAI-Logo.png" alt="" />
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-teal-600/10 py-4 font-mono text-sm text-teal-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center gap-4 px-4">
            <p>
              <time dateTime="2022-04-04">04</time>-
              <time dateTime="2022-04-06">06 of April, 2022</time>
            </p>
            <DiamondIcon className="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="hidden sm:mt-10 sm:flex sm:gap-x-4 lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button href="#" className="whitespace-nowrap">Tickets Melbourne</Button>
          <Button href="#" className="whitespace-nowrap">Tickets Sydney</Button>
        </div>
      </Container>
    </header>
  )
}

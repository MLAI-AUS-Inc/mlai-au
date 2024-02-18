import { Button } from './Button'
import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'


export default function Header({ className }: { className?: string }) {
  return (
    <header className={`relative z-50 flex-none lg:pt-2 lg:pb-2 bg-black ${className}`}>
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <a href="/">
          <img className="h-12 w-auto hidden md:block sm:block" src="/MLAI-Logo-Teal.png" alt="" />
          </a>
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-teal-500/10 py-4 font-mono text-sm text-teal-500 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center gap-4 px-4">
            <p>
              <time dateTime="2022-04-04">06</time>-
              <time dateTime="2022-04-06">30 April 2024</time>
            </p>
            <DiamondIcon className="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Melbourne & Sydney</p>
          </div>
        </div>
        <div className="hidden sm:mt-10 sm:flex sm:gap-x-4 lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button color="teal" href="#schedule" className="whitespace-nowrap">Get Tickets</Button>
        </div>
      </Container>
    </header>
  )
}

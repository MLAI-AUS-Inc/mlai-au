import Image from 'next/image'
import clsx from 'clsx'

import backgroundImage from '/src/app/hackathon/images/teal-background.png'

export function BackgroundImage({
  className,
  position = 'left',
}: {
  className?: string
  position?: 'left' | 'right'
}) {
  return (
    <div
      className={clsx(
        'absolute inset-0 overflow-hidden transparent',
        className,
      )}
    >
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
      {/* <Image
        className={clsx(
          'absolute top-0',
          position === 'left' &&
            'left-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]',
          position === 'right' &&
            'left-full -translate-x-1/2 sm:left-1/2 sm:translate-x-[-20%] sm:translate-y-[-15%] md:translate-x-0 lg:translate-x-[5%] lg:translate-y-[4%] xl:translate-x-[27%] xl:translate-y-[-8%]',
        )}
        src=""
        alt=""
        width={918}
        height={1495}
        priority
        unoptimized
      /> */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-teal/50 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-teal/50 to-transparent"/>
    </div>
  )
}

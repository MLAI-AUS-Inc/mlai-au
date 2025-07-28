
import AnimatedBackground from './AnimatedBackground';
import { Button } from './Button'
import { Container } from './Container'
import styles from '../AnimatedBackground.module.css';
import { H1, Lead } from '@/components/ui/Typography';

export function Hero() {
    return (
        <div className="relative sm:pt-24 bg-gray-900" style={{ height: '60vh' }}>
            <Container className="relative">
                <div className="relative isolate pt-14">
                    <div className={`${styles.animatedBackground} absolute inset-x-0 top-0 sm:top-auto sm:-top-80 z-10 transform-gpu blur-3xl sm:h-auto`}
                        style={{ height: '66.67vh' }}
                        aria-hidden="true"
                    >
                        <div
                            className="h-full sm:h-auto relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffdd] to-[#89b9fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
                <div className='relative flex justify-center items-center max-w-full'>
                    <div className="top-0 absolute flex justify-center items-center max-w-full -mt-40 mb-10 z-0 overflow-hidden">
                        <AnimatedBackground />
                    </div>
                </div>
                <div className='relative flex justify-center items-center'>
                    <div className='top-0 absolute flex justify-center items-center max-w-3xl flex-wrap'>
                        <div className="mx-auto max-w-3xl pb-32 sm:pb-48 lg:pb-56">

                            <div className="text-center">
                                <H1 className="text-black text-6xl sm:text-9xl md:text-7xl">
                                    MLAI Green Battery Hack
                                </H1>
                            </div>
                            <div className="mt-16 space-y-6 text-center">
                                <Lead className="text-black font-display tracking-tight">
                                    The MLAI Green Battery Hack is a beginner friendly AI hackathon to support Australia&apos;s journey to carbon net zero. Your AI model will control a simulated battery trading in the electricity spot market.
                                </Lead>

                                {/* <p>
                        This simulation will give insight into the propensity of private batteries to disrupt or “game” the electricity market. Your solution could inform Australian policy to achieve net zero!
                        </p> */}

                            </div>
                            <Button color='teal' href="#schedule" className="mt-10 w-full sm:hidden">   
                                Get your tickets
                            </Button>
                            <dl className="lg:grid mt-10 lg:grid-cols-3 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:justify-start lg:text-left z-10">
                                {[
                                    ['Speakers', '8'],
                                    ['Participants', '170'],
                                    ['Location', 'Melbourne & Sydney'],
                                ].map(([name, value]) => (
                                    <div key={name}>
                                        <dt className="font-mono text-sm text-teal-200 sm:text-black lg:text-black">{name}</dt>
                                        <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-white sm:text-black lg:text-black">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>


                        </div>
                    </div>
                </div>
            </Container >
        </div >

    )
}

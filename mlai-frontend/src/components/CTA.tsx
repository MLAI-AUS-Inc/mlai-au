import React from 'react';

export default function CTA() {
    return (
        <div className="bg-gray-900 relative isolate px-6 py-24  sm:py-32 lg:px-8">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="1d4240dd-898f-445f-932d-e2872fd12de3"
                        width={200}
                        height={200}
                        x="50%"
                        y={0}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={0} className="overflow-visible fill-gray-800/20">
                    <path
                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)" />
            </svg>
            <div
                className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Kenn to jump aboard the pirate ship?

                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    Wait no longer, click the button sailor.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="#"
                        className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    >
                        I want to volunteer
                    </a>
                    <a
                        href="#"
                        className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        I want to build
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-white">
                        I want to sponsor <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
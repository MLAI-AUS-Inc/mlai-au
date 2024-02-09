import React from 'react';

export default function CTA() {
    return (
        <div id='join' className="bg-black relative isolate px-6 py-24 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Keen to jump aboard the pirate ship?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    Wait no longer, click the button sailor.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="/volunteer"
                        className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    >
                        I want to volunteer
                    </a>
                    <a
                        href="/#events"
                        className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        I want to build
                    </a>
                    <a href="/contact" className="text-sm font-semibold leading-6 text-white hover:text-teal-400 transition duration-150">
                        I want to sponsor <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

import CTA from "@/components/CTA";

const stats = [];

export default function ThanksForOrdering() {
    return (
        <div className="bg-white pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-center">
                    <div className="max-w-2xl">
                        <div className="text-base leading-7 text-gray-700">
                            <p className="text-base font-semibold leading-7 text-teal-500">You're set!</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-16">
                                Thanks for getting your ticket, see you at the event :)
                            </h1>
                         
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA section */}
            <CTA></CTA>
        </div>
    )
}

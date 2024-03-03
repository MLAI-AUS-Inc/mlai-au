import CTA from "@/components/CTA";
import Events from "@/components/events";
import Feature from "@/components/feature";
import Newsletter from "@/components/newsletter";

const stats = [
    { label: 'Founded', value: '2021' },
    { label: 'Employees', value: '37' },
    { label: 'Countries', value: '12' },
    { label: 'Raised', value: '$25M' },
]

export default function About() {
    return (

        <div className="bg-white pt-24 sm:pt-32">
            {/* You want to build, we want to build */}
            <div className="mx-auto mb-20 max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-4">
                        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                            <img
                                className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                                src="https://images.unsplash.com/photo-1630569267625-157f8f9d1a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
                            <div
                                className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                                aria-hidden="true"
                            >
                                <div
                                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                />
                            </div>
                            <figure className="relative isolate">
                                <svg
                                    viewBox="0 0 162 128"
                                    fill="none"
                                    aria-hidden="true"
                                    className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/20"
                                >
                                    <path
                                        id="0ef284b8-28c2-426e-9442-8655d393522e"
                                        d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                                    />
                                    <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86} />
                                </svg>
                                <blockquote className="mt-6 text-xl font-semibold leading-8 text-white">
                                    <p>
                                        “You want to build, we want to build”
                                    </p>
                                </blockquote>

                            </figure>
                        </div>
                    </div>
                    <div>
                        <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-teal-500">You want to build, we want to build</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                On a mission to empower remote teams
                            </h1>
                            <div className="max-w-xl">
                                <p className="mt-6">
                                    Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                                    vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                                    erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                    semper sed amet vitae sed turpis id.
                                </p>
                                <p className="mt-8">
                                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie
                                    auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices
                                    hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                                </p>
                                <p className="mt-8">
                                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie
                                    auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices
                                    hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            < div className="relative" >
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-2/3 m-auto border-t border-gray-300" />
                </div>
            </div >

            {/* Mentoring/ Code/ Friend */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Learn how to grow your business with our expert advice.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Replace the content below with your actual content */}
                        <article className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src="photos/Mentoring.png" // Replace with your image path
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="group relative">
                                    <h3 className="mt-3 text-3xl font-semibold leading-6 text-gray-900">
                                        Mentoring
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                        is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make
                                        a type specimen book. It has survived not only five centuries, but also the leap
                                    </p>
                                </div>

                            </div>
                        </article>
                        {/* Repeat the article block for as many posts as you need */}
                        <article className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src="photos/code.png" // Replace with your image path
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="group relative">
                                    <h3 className="mt-3 text-3xl font-semibold leading-6 text-gray-900">
                                        Code
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                        is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make
                                        a type specimen book. It has survived not only five centuries, but also the leap
                                    </p>
                                </div>

                            </div>
                        </article>
                        <article className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src="path-to-your-image.jpg" // Replace with your image path
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="group relative">
                                    <h3 className="mt-3 text-3xl font-semibold leading-6 text-gray-900">
                                        Friend
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                        is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make
                                        a type specimen book. It has survived not only five centuries, but also the leap
                                    </p>
                                </div>

                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* Divider */}
            < div className="relative" >
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-2/3 m-auto border-t border-gray-300" />
                </div>
            </div >

            <Newsletter></Newsletter>
            {/* Launching an AI startup in Australia? */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
                <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:gap-x-8">
                        {/* Removed the overlay text boxes */}

                        {/* Vision Section */}
                        <div className="lg:col-start-2 xl:col-start-auto">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Vision
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                                fugiat veniam occaecat fugiat aliqua.
                            </p>
                        </div>

                        {/* Values Section */}
                        <div className="lg:col-start-2 xl:col-start-auto">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Values
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                                fugiat veniam occaecat fugiat aliqua.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-300  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </a>
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                    Learn more →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            < div className="relative" >
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-2/3 m-auto border-t border-gray-300" />
                </div>
            </div >


            {/* CTA section */}
            <Events></Events>

             {/* Divider */}
             < div className="relative" >
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-2/3 m-auto border-t border-gray-300" />
                </div>
            </div >

            <Feature></Feature>
            <CTA></CTA>
        </div>

    )
}
import CTA from "@/components/CTA";
import Events from "@/components/events";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import Team from "@/components/team";

const stats = [
  { label: 'Founded', value: '2021' },
  { label: 'Employees', value: '37' },
  { label: 'Countries', value: '12' },
  { label: 'Raised', value: '$25M' },
]

export default function About() {
  return (

    <div className="relative bg-white">
      <div id='hero' className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-screen ">
        <img
          src="photos/bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        {/*Ensuring all content is above the background image*/}
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Hi! We are MLAI Aus
                </h1>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 xl:col-span-6">
              {/*Overlay Text Box 1*/}
              <div className="m-12 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-white">Text 1</h2>
                <p className="mt-2 text-sm text-white">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                  but also the leap
                </p>
              </div>
              {/*Overlay Text Box 2*/}
              <div className="m-12 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-white">Text 2</h2>
                <p className="mt-2 text-sm text-white">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                  but also the leap
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>




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

      <Team></Team>


      {/* Divider */}
      < div className="relative" >
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div >


      <div className="relative isolate overflow-hidden pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg]   sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">

            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <h1 className="max-w-2xl mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                Interested in sponsoring our events?
              </h1>
              <p className="text-lg leading-8 top-10 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-teal-500  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-300  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="relative w-full">
              <img
                src="photos/Mentoring.png" // Replace with your image path
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Divider */}
      < div className="relative" >
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div >

      <Events></Events>


      {/* Divider */}
      < div className="relative" >
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div >

      <Newsletter></Newsletter>


      <CTA></CTA>


    </div>

  )
}
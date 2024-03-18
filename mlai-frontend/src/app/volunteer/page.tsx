import CTA from "@/components/CTA";
import Events from "@/components/events";
import Feature from "@/components/feature";
import Newsletter from "@/components/newsletter";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Employees", value: "37" },
  { label: "Countries", value: "12" },
  { label: "Raised", value: "$25M" },
];

export default function About() {
  return (
    <div className="bg-white pt-24 sm:pt-32">
      {/* You want to build, we want to build */}
      <div className="mx-auto mb-20 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            {/* <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10"> */}
            <div className="relative w-full">
              {/* Image Container */}
              <img
                className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                src="photos/test5.png"
                alt=""
              />
              <div className="relative rounded-2xl overflow-hidden">
                {/* Image */}
                {/* <img
                  src="photos/bg.jpg" // Replace with your image path
                  alt=""
                  className="w-full h-auto bg-gray-100 object-cover"
                /> */}
                {/* Border Overlay */}
                {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" /> */}
              </div>
              {/* </div> */}

              {/* <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" /> */}
              {/* <div
                className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                aria-hidden="true"
              > */}
              {/* <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#46fff3] to-[#776fff] opacity-40"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }} */}
              {/* /> */}
              {/* </div> */}
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-teal-500">
                You want to build, we want to build
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                On a mission to empower remote teams
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                  risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                  Id dolor praesent donec est. Odio penatibus risus viverra
                  tellus varius sit neque erat velit. Faucibus commodo massa
                  rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                  mauris semper sed amet vitae sed turpis id.
                </p>
                <p className="mt-8">
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                  duis odio id et. Id blandit molestie auctor fermentum
                  dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                  varius vulputate et ultrices hac adipiscing egestas. Iaculis
                  convallis ac tempor et ut. Ac lorem vel integer orci.
                </p>
                <p className="mt-8">
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                  duis odio id et. Id blandit molestie auctor fermentum
                  dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                  varius vulputate et ultrices hac adipiscing egestas. Iaculis
                  convallis ac tempor et ut. Ac lorem vel integer orci.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>

      {/* Mentoring/ Code/ Friend */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the blog
            </h2>
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
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-gray-900 sm:text-4xl">
                    Mentoring
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industrys standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap
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
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-gray-900 sm:text-4xl">
                    Code
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industrys standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap
                  </p>
                </div>
              </div>
            </article>
            <article className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src="photos/friends2.png" // Replace with your image path
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-gray-900 sm:text-4xl">
                    Friend
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industrys standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>

      <Newsletter></Newsletter>
      {/* Launching an AI startup in Australia? */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:gap-x-8">
            {/* Heading Section */}
            <div className="col-span-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left ">
                Launching an AI startup in Australia?
              </h1>
            </div>

            {/* Left Column Text */}
            <div>
              <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt
                sunt. <br />
                Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                veniam occaecat fugiat aliqua.
              </p>
            </div>

            {/* Right Column Text */}
            <div>
              <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt
                sunt. <br />
                Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                veniam occaecat fugiat aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>

      {/* CTA section */}
      <Events></Events>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>

      <Feature></Feature>
      <CTA></CTA>
    </div >
  );
}

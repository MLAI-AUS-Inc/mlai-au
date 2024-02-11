import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon, UsersIcon, CodeBracketIcon, WrenchIcon } from "@heroicons/react/20/solid";
import SubstackSignup from '../components/SubstackSignup';
import CTA from "@/components/CTA";

const features = [
  {
    name: 'Meetups',
    description:
      'Community is everything, and most online events are simply not that great. We\'re organising monthly in-person events with talks about tech, research and startups. And then we have some drinks and make friends, wan\'t to join us? We will never monetise our community.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Hackathons',
    description:
      'Getting together with other smart people and building a prototype is an awesome adventure and a great way to meet co-founders for your next unicorn. That\'s why we\'re hosting several larger hackathons per year. Check out aihackmelb23 - 99 hackers and over 300 pitch night attendees.',
    href: '#',
    icon: WrenchIcon,
  },
  {
    name: 'Codecamp',
    description:
      'We\'re all still learning, AI just moves too fast! If you\'re keen to get hands-on with coding and build you own AI systems, say no more and head straight to our codecamp. Run in collaboration with the Melbourne Hackerspace we\'re delivering ongoing build sessions.',
    href: '#',
    icon: CodeBracketIcon,
  },
]
const posts = [
  {
    id: 1,
    title: 'MLAI Green Battery Hack 2024 (Melbourne)',
    href: 'https://events.humanitix.com/the-ml-ai-green-battery-hack-kickoff-team-formation-day',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'photos/gbh_melbourne.webp',
    date: 'April 6th - April 30th, 2024',
    datetime: '2024-04-06',
    author: {
      name: 'Melbourne',
      imageUrl:
        ''
      ,
    },
  },

  {
    id: 2,
    title: 'MLAI Green Battery Hack 2024 (Sydney)',
    href: 'https://events.humanitix.com/copy-of-the-ml-ai-green-battery-hack-team-formation-day-sydney',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'photos/gbh_sydney.webp',
    date: 'April 6th - April 30th, 2024',
    datetime: '2024-04-06',
    author: {
      name: 'Sydney',
      imageUrl:
        ''
      ,
    },
  },

  {
    id: 3,
    title: 'ML and AI Meetups',
    href: 'https://www.meetup.com/machine-learning-ai-meetup/',
    description:
      'regular ai and machine learning meetups in Sydney and Melbourne',
    imageUrl:
      'photos/lightning_talks.png',
    date: 'Fortnightly Events, afterhours',
    datetime: '2024-04-06',
    author: {
      name: 'Melbourne',
      imageUrl:
        ''
      ,
    },
  },

  {
    id: 4,
    title: 'AI Hack Melb 23',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7136124006742560769',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'photos/aihackmelb23.png',
    date: '30th November, 2023',
    datetime: '2024-04-06',
    author: {
      name: 'NAB Arena, Melbourne',
      imageUrl:
        ''
      ,
    },
  },

  


  // More posts...
]
const featuredTestimonial = {
  body: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch and get involved!",
  author: {
    name: 'Kendra Vant',
    handle: 'Director Europalabs',
    imageUrl:
      'photos/kendra.png',
    logoUrl: '',
  },
}
const testimonials: any = [
/*  [
    [
      {
        body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
        author: {
          name: 'Andy Gelme',
          handle: 'Founder Hackerspace',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],

  ],
*/  
]
const people = [
  {
    name: 'Louka Ewington-Pitsos',
    role: 'Co-Founder',
    imageUrl:
      'photos/louka.jpeg',
  },
  {
    name: 'Jamie Blackwell',
    role: 'Co-Founder',
    imageUrl:
      'photos/jaime.png',
  },
  {
    name: 'Lukas Wesemann',
    role: 'Co-Founder',
    imageUrl:
      'photos/lukas.png',
  },
  {
    name: 'Andrew Atta',
    role: 'Marketing Wizz',
    imageUrl:
      'photos/andrew.png',
  },
  {
    name: 'Doc Sam Donegan',
    role: 'Master of the Web',
    imageUrl:
      'photos/sam.png',
  },
  // More people...
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  return (
      <main className="bg-white">
        {/* Hero section */}
        <div id='hero' className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-screen ">
          <img
            src="photos/bg.jpg"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                  Announcing the &quot;MLAI Green Battery Hack&quot;{' '}
                  <a href="#events" className="font-semibold text-white">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Empowering the Australian AI Community
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  MLAI Aus is a non-profit org dedicated to making Australia an awesome home for AI builders. Join us for one of our next meetups and hackathons!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/contact"
                    className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  >
                    I want to volunteer
                  </a>
                  <a
                    href="#events"
                    className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  >
                    I want to build
                  </a>
                  <a href="/contact" className="text-sm font-semibold leading-6 text-white hover:text-teal-400 transition duration-150">
                    I want to sponsor <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Cloud */}
        <div id="logoCloud" className="bg-white py-12 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5 lg:max-w-none">
              {/* NAB Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/nab.png"
                alt="NAB"
              />

              {/* V2 */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/v2digital.png"
                alt="V2 Digital"
              />
              {/* AWS Startups Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/aws.png"
                alt="AWS Startups"
              />
              {/* Mantel Group Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/mantel.png"
                alt="Mantel Group"
              />
              {/* wilsonai Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/wilsonai.png"
                alt="wilsonai"
              />
              {/* Humyn.ai Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/humyn.png"
                alt="Humyn.ai"
              />
              {/* Cake Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/cake.png"
                alt="Cake"
              />
              {/* Dropshipzone Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/dropshipzone.png"
                alt="Dropshipzone"
              />
              {/* Microsoft Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/microsoft.png"
                alt="Microsoft"
              />
              {/* Sirius Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/sirius.png"
                alt="Sirius"
              />
              {/* Uom Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/uom.jpeg"
                alt="Uom"
              />
              {/* Squarepeg Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/squarepeg.png"
                alt="Squarepeg"
              />
              {/* AirTree Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/airtree.jpeg"
                alt="AirTree"
              />
              {/* Blackbird Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/blackbird.png"
                alt="Blackbird"
              />
              {/* Rampersand Logo */}
              <img
                className="h-8 w-auto object-contain mx-auto"
                src="sponsor_logos/rampersand.png"
                alt="Rampersand"
              />
            </div>
            <div className="mt-16 flex justify-center">
              <p className="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
                <span className=" md:inline">Our events have been sponsored and supported by over 50 awesome organisations across Australia. </span>
                <a href="/contact" className="font-semibold text-teal-600">
                  <span className="absolute inset-0" aria-hidden="true" /> Become a sponsor{' '}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div >


        {/* Divider */}
        < div className="relative" >
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-2/3 m-auto border-t border-gray-300" />
          </div>
        </div >


        {/* Feature section */}
        < div id='about' className="mx-auto my-24 max-w-7xl px-6 sm:my-32 lg:px-8" >
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="flex justify-center lg:flex-1 ">
              <img
                className="h-48 w-auto hover:scale-105  transition duration-150 ease-in-out"
                src="/MLAI-Logo.png"
                alt=""
              />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We are MLAI Aus
            </p>


            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our vision is to make Australia an amazing home for AI and machine learning entrepreneurs. Let&apos;s get on it. <a href="#" className="font-semibold text-teal-600 hover:text-teal-500 transition duration-200 ease-in-out">Love letters: hello@aihackmelb.com</a>
            
            </p>

          <div className="flex justify-center items-center space-x-3 pt-6">
          <div className="flex items-center space-x-4 p-1 border border-gray-300 rounded-md">
            <a href="https://www.linkedin.com/company/mlai-aus-inc" target='_blank' className="text-gray-600 hover:text-teal-600 transform hover:scale-105  transition duration-100 pb-1 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/mlai-aus-inc" target='_blank' className="text-gray-600 hover:text-teal-600 transform hover:scale-105  transition duration-100 ease-in-out">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v .08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="https://join.slack.com/t/aihackmelb/shared_invite/zt-2br01q4n9-PiiT9mgEOPMEG__8SOWQ8g" target='_blank' className="text-gray-600 hover:text-teal-600 transform hover:scale-105  transition duration-100 ease-in-out"> 
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
            </a>
            </div>
          </div>


          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-teal-500" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div >


        {/* Divider */}
        < div className="relative" >
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-2/3 m-auto border-t border-gray-300" />
          </div>
        </div >

        {/* Blog section */}
        < div id='events' className="bg-white py-24 sm:py-32" >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Events</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Can&apos;t wait to see you for the next one!
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-60 hover:opacity-90 transition duration:150"
                >
                  <img src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.datetime} className="mr-8">
                      {post.date}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        {post.author.name}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <a href={post.href} target='_blank'>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div >

 
        {/* Testimonials section */}
        < div className="relative isolate bg-white pb-32 pt-12 sm:pt-32" >
          <div
            className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            aria-hidden="true"
          >
            <div
              className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#81E6D9] to-[#E5E7EB]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div
            className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            aria-hidden="true"
          >
            <div
              className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#81E6D9] to-[#E5E7EB] xl:ml-0 xl:mr-[calc(50%-12rem)]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-teal-600">&quot;Honestly, meeting cool people was the best part of it all&quot;</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                We are proud to have worked with amazing people
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
              <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
                <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
                  <p>{`“${featuredTestimonial.body}”`}</p>
                </blockquote>
                <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                  <img
                    className="h-10 w-10 flex-none rounded-full bg-gray-50"
                    src={featuredTestimonial.author.imageUrl}
                    alt=""
                  />
                  <div className="flex-auto">
                    <div className="font-semibold">{featuredTestimonial.author.name}</div>
                    <div className="text-gray-600">{`${featuredTestimonial.author.handle}`}</div>
                  </div>
                  <img className="h-10 w-auto flex-none" src={featuredTestimonial.author.logoUrl} alt="" />
                </figcaption>
              </figure>
              {testimonials.map((columnGroup: any, columnGroupIdx: any) => (
                <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                  {columnGroup.map((column: any, columnIdx: any) => (
                    <div
                      key={columnIdx}
                      className={classNames(
                        (columnGroupIdx === 0 && columnIdx === 0) ||
                          (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                          ? 'xl:row-span-2'
                          : 'xl:row-start-1',
                        'space-y-8'
                      )}
                    >
                      {column.map((testimonial: any) => (
                        <figure
                          key={testimonial.author.handle}
                          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                        >
                          <blockquote className="text-gray-900">
                            <p>{`“${testimonial.body}”`}</p>
                          </blockquote>
                          <figcaption className="mt-6 flex items-center gap-x-4">
                            <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" />
                            <div>
                              <div className="font-semibold">{testimonial.author.name}</div>
                              <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                            </div>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div >

        {/* Divider */}
        < div className="relative" >
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-2/3 m-auto border-t border-gray-300" />
          </div>
        </div >

        {/* Newsletter section */}
        < div className="bg-white py-16 sm:py-24 lg:py-32" >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-4 lg:px-8">
            <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-5 lg:mt-6">
              <h2 className="inline sm:block lg:inline xl:block">Want to stay in the loop?</h2>{' '}
              <p className="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
            </div>

            {/* Substack Signup Component */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:col-span-7 lg:pt-2">
              <SubstackSignup />
            </div>
          </div>
        </div >


        {/* Divider */}
        < div className="relative" >
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-2/3 m-auto border-t border-gray-300" />
          </div>
        </div >

        {/* Team section */}
        < div className="bg-white py-24 sm:py-32" >
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">That&apos;s us looking all professional.</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                MLAI Aus is run entirely by volunteers. Interested in jumping aboard the pirate ship?
              </p>
            </div>
            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:col-span-2 xl:grid-cols-3">
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img className="h-20 w-20 rounded-full" src={person.imageUrl} alt="" />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                      <p className="text-sm font-semibold leading-6 text-teal-600">{person.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div >


        {/* CTA section */}
        <CTA></CTA >

      </main >
  );
}

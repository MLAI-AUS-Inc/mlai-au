import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon, UsersIcon, CodeBracketIcon, WrenchIcon } from "@heroicons/react/20/solid";
import SubstackSignup from '../components/SubstackSignup';
import CTA from "@/components/CTA";

const features = [
  {
    name: 'Meetups',
    description:
      'Community is everything, and most online events are simply not that great. We\'re organising monthly in-person events with talks about tech, research and startups. And then we have some drinks and make friends, wan\'t to join us? We will never commercialise our community.',
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
    href: '#',
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
    href: '#',
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
    title: 'AI Lightning Talks',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'photos/lightning_talks.png',
    date: 'April 6th - April 20th, 2024',
    datetime: '2024-04-06',
    author: {
      name: 'Kathleen Syme Library, Melbourne',
      imageUrl:
        ''
      ,
    },
  }


  // More posts...
]
const featuredTestimonial = {
  body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
  author: {
    name: 'Kendra Vant',
    handle: 'Director Europalabs',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: '',
  },
}
const testimonials = [
  [
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
    [
      {
        body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
        author: {
          name: 'Josh Fourier',
          handle: 'Founder Decoded AI',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
  [
    [
      {
        body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
        author: {
          name: 'Nick Holmes a Court',
          handle: 'AWS Startups',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
        author: {
          name: 'Eike Zeller',
          handle: 'Hub lead Stone & Chalk',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
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
    <div className="bg-white">


      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-screen">
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
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                  Announcing the "MLAI Green Battery Hack"{' '}
                  <a href="#" className="font-semibold text-white">
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
                    href="#"
                    className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  >
                    I want to volunteer
                  </a>
                  <a
                    href="#"
                    className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  >
                    I want to build
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-white">
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
                src="sponsor_logos/wilson.jpeg"
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
                src="sponsor_logos/dropshipzone.jpeg"
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
            <span className="hidden md:inline">Our events have been sponsored and supported by over 50 awesome organisations across Australia. </span>
            <a href="#" className="font-semibold text-teal-600">
              <span className="absolute inset-0" aria-hidden="true" /> Become a sponsor{' '}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
    </div>
        </div >


    {/* Divider */ }
    < div className = "relative" >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-2/3 m-auto border-t border-gray-300" />
      </div>
        </div >


    {/* Feature section */ }
    < div className = "mx-auto my-24 max-w-7xl px-6 sm:my-32 lg:px-8" >
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="flex justify-center lg:flex-1">
              <img
                className="h-48 w-auto"
                src="/MLAI-Logo.png"
                alt=""
              />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We are MLAI Aus
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Our vision is to make Australia an amazing home for AI and machine learning entrepreneurs. Let's get on it.
            </p>
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

    {/* Divider */ }
    < div className = "relative" >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-2/3 m-auto border-t border-gray-300" />
      </div>
        </div >

    {/* Blog section */ }
    < div className = "bg-white py-24 sm:py-32" >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Can't wait to see you for the next one!
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
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
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
        </div >

    {/* Divider */ }
    < div className = "relative" >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-2/3 m-auto border-t border-gray-300" />
      </div>
        </div >

    {/* Testimonials section */ }
    < div className = "relative isolate bg-white pb-32 pt-24 sm:pt-32" >
          <div
            className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            aria-hidden="true"
          >
            <div
              className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
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
              className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-teal-600">"Honestly, meeting cool people was the best part of it all"</h2>
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
              {testimonials.map((columnGroup, columnGroupIdx) => (
                <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                  {columnGroup.map((column, columnIdx) => (
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
                      {column.map((testimonial) => (
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

    {/* Divider */ }
    < div className = "relative" >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-2/3 m-auto border-t border-gray-300" />
      </div>
        </div >

    {/* Newsletter section */ }
    < div className = "bg-white py-16 sm:py-24 lg:py-32" >
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


    {/* Divider */ }
    < div className = "relative" >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-2/3 m-auto border-t border-gray-300" />
      </div>
        </div >

    {/* Team section */ }
    < div className = "bg-white py-24 sm:py-32" >
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">That's us looking all professional.</h2>
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


    {/* CTA section */ }
    <CTA></CTA >

      </main >
    </div >
  );
}

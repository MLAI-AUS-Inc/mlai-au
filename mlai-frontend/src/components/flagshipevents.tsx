const posts = [
    {
        id: 1,
        title: 'MLAI Green Battery Hack 2024 (Melbourne)',
        href: '/hackathon',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'photos/gbh_melbourne.webp',
        date: 'April 6 - May 8, 2024',
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
        href: '/hackathon',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'photos/gbh_sydney.webp',
        date: 'April 6 - May 8, 2024',
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
        date: 'November 30, 2023',
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

export default function FlagshipEvents() {
    return (
        < div id='events' className="bg-white py-24 sm:py-32" >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Event Highlights</h2>
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
    )
}
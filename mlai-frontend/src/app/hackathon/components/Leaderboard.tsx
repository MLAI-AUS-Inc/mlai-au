'use client'
import { useEffect, useState } from 'react';
import { Container } from './Container';
import { formatDistanceToNow } from 'date-fns';

const statuses: any = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }
const activityItems: any[] = []
interface ActivityItem {
    user: {
        name: string;
        imageUrl: string;
    };
    commit: string;
    branch: string;
    status: string;
    score: string;
    date: string;
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export function Leaderboard() {
    const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);

    const fetchData = async () => {

        try {
            // console.log('Making a request to /api/getTopScores');
            const response = await fetch('/api/getTopScores');
            // console.log(`Response Status: ${response.status}`);

            if (!response.ok) {
                console.error('Response not OK:', response.statusText);
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const result = await response.json();
            const updatedActivityItems = result.data.map((item: any) => ({
                user: {
                    name: `${item.team_name}`,
                    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // Placeholder or fetch from another source
                },
                commit: `${item.git_commit_hash}`, // Placeholder or fetch from another source
                branch: 'main', // Assuming default or fetch from another source
                status: item.error_traceback != null ? 'Error' : 'Completed', // Example conditional status
                score: `${item.score}`, // Placeholder or fetch from another source
                date: formatDistanceToNow(new Date(item.submitted_at), { addSuffix: true })
            }));
            setActivityItems(updatedActivityItems);
            console.log('Data received:', result.data);
        } catch (error) {
            console.error('Error caught during fetch operation:', error);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchData();
        }
    }, []);


    return (
        <section id="sponsors" aria-label="Sponsors" className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900">
            <Container>
                <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
                    Leaderboard
                </h2>

                <div className="bg-gray-900 py-10">
                    <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Best performing commit</h2>
                    <table className="mt-6 w-full whitespace-nowrap text-left">
                        <colgroup>
                            <col className="w-full sm:w-4/12" />
                            <col className="lg:w-4/12" />
                            <col className="lg:w-2/12" />
                            <col className="lg:w-1/12" />
                            <col className="lg:w-1/12" />
                        </colgroup>
                        <thead className="border-b border-white/10 text-sm leading-6 text-white">
                            <tr>
                                <th scope="col" className="py-2 pl-2 pr-2 font-semibold sm:pl-4 lg:pl-4">
                                    
                                </th>
                                <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                                    Team
                                </th>
                                <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                                    Commit
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                                    Status
                                </th>
                                <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                                    Score
                                </th>
                                <th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                                    Deployed
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activityItems.map((item, index) => (
                                <tr key={item.user.name}>
                                    <td className="py-4 pl-2 pr-2 sm:pl-6 lg:pl-8">
                                        {/* Conditionally render medal based on index */}
                                        {index === 0 && (
                                            <img src="/first.png" alt="Gold medal" className="inline-block h-6 min-w-6" />
                                        )}
                                        {index === 1 && (
                                            <img src="/second.png" alt="Silver medal" className="inline-block h-6 min-w-6" />
                                        )}
                                        {index === 2 && (
                                            <img src="/third.png" alt="Silver medal" className="inline-block h-6 min-w-6" />
                                        )}
                                    </td>
                                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                        <div className="flex items-center gap-x-4">
                                            <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                                            <div className="truncate text-sm font-medium leading-6 text-white">{item.user.name}</div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                        <div className="flex gap-x-3">
                                            <div className="font-mono text-sm leading-6 text-gray-400">{item.commit}</div>
                                            <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                                                {item.branch}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                            <time className="text-gray-400 sm:hidden">
                                                {item.date}
                                            </time>
                                            <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                                                <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                            </div>
                                            <div className="hidden text-white sm:block">{item.status}</div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-8 text-md font-bold leading-6 text-teal-400 md:table-cell lg:pr-20">
                                        {item.score}
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                        <time>{item.date}</time>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </Container>
        </section>
    )
}
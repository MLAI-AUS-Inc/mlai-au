'use client'
import { useEffect, useState } from 'react';
import { Container } from './Container';
import { Button } from './Button';
import { formatDistanceToNow } from 'date-fns';
import { ArrowDownOnSquareIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface LeaderboardProps {
    topScores?: ActivityItem[];
}
interface ActivityItem {
    user: {
        name: string;
        imageUrl: string;
    };
    commit: string;
    branch: string;
    city: string;
    score: number;
    submitted: string;
}
interface Cities {
    mel: {
        name: string;
        teams: number;
        score: number;
        commits: number;
        total_profits: number;
        imageUrl: string;
    },
    syd: {
        name: string;
        teams: number;
        score: number;
        commits: number;
        total_profits: number;
        imageUrl: string;
    },
}

const city: any = { SYD: 'text-teal-400 bg-teal-400/10', MEL: 'text-purple-400 bg-purple-400/10' }

function updateCities(data: ActivityItem[]) {

    let totalTeamsMel = 0;
    let totalScoreMel = 0;
    let totalTeamsSyd = 0;
    let totalScoreSyd = 0;

    data.forEach(team => {
        if (team.city === "MEL") {
            totalTeamsMel++;
            totalScoreMel += Number(team.score);
        }
        if (team.city === "SYD") {
            totalTeamsSyd++;
            totalScoreSyd += Number(team.score);
        }
    });

    let cities = {
        mel: {
            name: 'Melbourne',
            teams: totalTeamsMel,
            score: Math.round((totalScoreMel / totalTeamsMel) * 100) / 100,
            commits: 225,
            total_profits: Math.round(totalScoreMel * 100) / 100,
            imageUrl: 'photos/gbh_melbourne.webp'
        },
        syd: {
            name: 'Sydney',
            teams: totalTeamsSyd,
            score: Math.round((totalScoreSyd / totalTeamsSyd) * 100) / 100,
            commits: 225,
            total_profits: Math.round(totalScoreSyd * 100) / 100,
            imageUrl: 'photos/gbh_sydney.webp'
        },
    }

    return cities
}



function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ topScores = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
    const currentItems = activityItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(activityItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    const [cities, setCities] = useState<Cities>({
        mel: {
            name: 'Melbourne',
            teams: 0,
            score: 0,
            commits: 0,
            total_profits: 0,
            imageUrl: 'photos/gbh_melbourne.webp'
        },
        syd: {
            name: 'Sydney',
            teams: 0,
            score: 0,
            commits: 0,
            total_profits: 0,
            imageUrl: 'photos/gbh_sydney.webp'
        }
    });

    const fetchData = async () => {
        try {
            // console.log('Making a request to /api/getTopScores');
            const response = await fetch(`/api/getTopScores?timestamp=${new Date().getTime()}`, { cache: "no-store" });
            // console.log(`Response Status: ${response.status}`);

            if (!response.ok) {
                console.error('Response not OK:', response.statusText);
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const result = await response.json();
            const updatedActivityItems = result.data.map((item: any) => ({
                user: {
                    name: `${item.team_name}`,
                    imageUrl: item && item.imageUrl
                        ? item.team.imageUrl
                        : '/MLAI-Logo-Teal.png'
                },
                team_id: `${item.team_id}`,
                commit: `${item.git_commit_hash}`, // Placeholder or fetch from another source
                branch: 'main', // Assuming default or fetch from another source
                city: item.city,
                score: parseFloat(item.score.toFixed(2)), // Placeholder or fetch from another source
                submitted: formatDistanceToNow(new Date(item.submitted_at), { addSuffix: true })
            }));
            // Sorting the items by score in descending order
            updatedActivityItems.sort((a: any, b: any) => b.score - a.score);
            setActivityItems(updatedActivityItems);
            const updatedCities = updateCities(updatedActivityItems)
            setCities(updatedCities);
            console.log('Data received:', result.data);
        } catch (error) {
            console.error('Error caught during fetch operation:', error);
        }

    };

    useEffect(() => {
        // Update the city leaderboards
        topScores.sort((a: any, b: any) => b.score - a.score);
        setActivityItems(topScores)

        // Update the city leaderboards
        const updatedCities = updateCities(topScores)
        setCities(updatedCities);
    }, []);


    return (
        <section id="sponsors" aria-label="Sponsors" className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900">
            <Container>
                {/* Main Leaderboard */}
                <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
                    Leaderboard
                </h2>

                <div className="bg-gray-900 py-10">
                    <div className='flex justify-between items-center'>
                        <h2 className="px-4 text-xl font-semibold leading-7 text-white sm:px-6 lg:px-8">Most recent commit</h2>
                        <Button color="teal" onClick={fetchData} className="whitespace-nowrap my-2">
                            <ArrowPathIcon className="h-5 w-5 text-gray-900 mr-2" aria-hidden="true" />
                            Refresh
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="mt-6 w-full whitespace-nowrap text-left">
                            <colgroup>
                                <col className="lg:w-1/12" />
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
                                    <th scope="col" className="py-2 pl-0 pr-8 font-semibold">
                                        Commit
                                    </th>
                                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                                        City
                                    </th>
                                    <th scope="col" className="py-2 pl-0 pr-8 font-semibold lg:pr-20">
                                        Score
                                    </th>
                                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-6 lg:pr-8">
                                        Last Updated
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {currentItems.map((item, index) => (
                                    <tr key={item.user.name}>
                                        <td className="py-4 pl-2 pr-2 sm:pl-6 lg:pl-8">
                                            {/* Adjust condition to also check if currentPage is 1 */}
                                            {currentPage === 1 && index === 0 && (
                                                <img src="/first.png" alt="Gold medal" className="inline-block h-6 w-6" />
                                            )}
                                            {currentPage === 1 && index === 1 && (
                                                <img src="/second.png" alt="Silver medal" className="inline-block h-6 w-6" />
                                            )}
                                            {currentPage === 1 && index === 2 && (
                                                <img src="/third.png" alt="Silver medal" className="inline-block h-6 w-6" />
                                            )}
                                        </td>
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4">
                                                <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                                                <div className="truncate text-sm font-medium leading-6 text-white">{item.user.name}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 pl-0 pr-4 sm:pr-8">
                                            <div className="flex gap-x-3">
                                                <div className="font-mono text-sm leading-6 text-gray-400">
                                                    {item.commit.length > 10 ? `${item.commit.substring(0, 10)}...` : item.commit}
                                                </div>
                                                <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                                                    {item.branch}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                                <time className="text-gray-400">
                                                    {item.submitted}
                                                </time>
                                                <div className={classNames(city[item.city], 'flex-none rounded-full p-1')}>
                                                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                                </div>
                                                <div className=" text-white sm:block">{item.city}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 pl-0 pr-8 text-md font-bold leading-6 text-teal-400 lg:pr-20">
                                            {item.score}
                                        </td>
                                        <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:pr-6 lg:pr-8">
                                            <time>{item.submitted}</time>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between border-t border-gray-400 bg-gray-900 px-4 py-3 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-200">
                                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{indexOfLastItem > activityItems.length ? activityItems.length : indexOfLastItem}</span> of{' '}
                                        <span className="font-medium">{activityItems.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <a
                                            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-600 focus:z-20 focus:outline-offset-0"
                                            href="#!"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        {pageNumbers.map(number => (
                                            <a
                                                key={number}
                                                onClick={() => paginate(number)}
                                                href="#!"
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-600 focus:z-20 focus:outline-offset-0 ${currentPage === number ? "bg-gray-700" : ""
                                                    }`}
                                            >
                                                {number}
                                            </a>
                                        ))}
                                        <a
                                            onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-600 focus:z-20 focus:outline-offset-0"
                                            href="#!"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* City Leaderboard */}
                <div className="flex justify-center items-center mx-auto max-w-2xl mt-20">
                    <div className="overflow-hidden rounded-xl border border-gray-300 w-full">
                        <div
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                        >
                            <img src={cities.mel.imageUrl} alt="Melbourne green battey picture" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                            <h2 className="text-4xl font-bold leading-6 text-gray-100">{cities.mel.name}</h2>

                            <div className="mt-5 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm font-bold leading-6 text-gray-300">
                                <div className="mr-8">
                                    Teams: <span className="text-teal-400">{cities.mel.teams}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm font-bold leading-6 text-gray-300">
                                <div className="mr-8">
                                    Total profits: <span className="text-teal-400">${cities.mel.total_profits}</span>
                                </div>
                            </div>
                            <div className="-mt-10 flex justify-end items-end gap-x-4 text-3xl font-bold leading-6 text-gray-300">
                                <div className="mr-0"> Avg. Score:
                                    <span className="text-3xl font-bold leading-6 text-teal-400 ml-2">{cities.mel.score}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-900" />
                    </div>
                    <div className="relative flex justify-center -mt-20 z-10">
                        <img
                            src='/vs.png'
                            alt='versus icon'
                            className="h-48 w-48 overflow-visible flex-noneobject-cover ring-1 ring-gray-900/10"
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center mx-auto max-w-2xl -mt-20">
                    <div className="overflow-hidden rounded-xl border border-gray-300 w-full">
                        <div
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                        >
                            <img src={cities.syd.imageUrl} alt="Melbourne green battey picture" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                            <h2 className="text-4xl font-bold leading-6 text-gray-100">{cities.syd.name}</h2>

                            <div className="mt-5 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm font-bold leading-6 text-gray-300">
                                <div className="mr-8">
                                    Teams: <span className="text-teal-400">{cities.syd.teams}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm font-bold leading-6 text-gray-300">
                                <div className="mr-8">
                                    Total profits: <span className="text-teal-400">${cities.syd.total_profits}</span>
                                </div>
                            </div>
                            <div className="-mt-10 flex justify-end items-end text-3xl gap-x-4 font-bold leading-6 text-gray-300">
                                <div className="mr-0"> Avg. Score:
                                    <span className="text-3xl font-bold leading-6 text-teal-400 ml-2">{cities.syd.score}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </section >
    )
}
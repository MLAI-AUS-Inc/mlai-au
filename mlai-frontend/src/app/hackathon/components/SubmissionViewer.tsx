'use client'
import React, { Fragment, useEffect, useState } from 'react';
import { Container } from './Container';
import ReactApexChart from 'react-apexcharts';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { formatDistanceToNow } from 'date-fns';

function averageDataPoints(data: number[], targetPoints: number): number[] {
    const chunkSize = Math.ceil(data.length / targetPoints);
    const averagedData: number[] = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const avg = chunk.reduce((acc, val) => acc + val, 0) / chunk.length;
        averagedData.push(avg);
    }

    return averagedData;
}


const teams = {
    team_1: {
        name: '_uwu_',
        team_id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    team_2: {
        name: 'no name here biatch get your own',
        team_id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
}

export function SubmissionViewer() {
    const [profitData, setProfitData] = useState<number[]>([]);
    const [marketData, setMarketData] = useState<number[]>([]);
    const [meanProfit, setMeanProfit] = useState([]);
    const [totalTrades, setTotalTrades] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [team_name, setTeamName] = useState('');
    const [commit_hash, setCommitHash] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [open, setOpen] = useState(true)
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchData = async (team_id: string) => {
        if (typeof window !== "undefined") {
            try {
                console.log('Making a request to /api/getTeamScores: ', team_id);
                const queryParams = new URLSearchParams({ team_id });
                const response = await fetch(`/api/getTeamScores?${queryParams}`);
                console.log(`Response Status: ${response.status}`);

                if (!response.ok) {
                    console.error('Response not OK:', response.statusText);
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Data received:', result.data);
                // Averaging and rounding market prices
                const marketPrices: number[] = result.data[0].main_trial.market_prices;
                const averagedMarketPrices = averageDataPoints(marketPrices, 100).map((price) => Number(price.toFixed(2)));
                setMarketData(averagedMarketPrices);

                // Averaging and rounding profits
                const profits: number[] = result.data[0].main_trial.profits;
                const averagedProfits = averageDataPoints(profits, 100).map((profit) => Number(profit.toFixed(2)));
                setProfitData(averagedProfits);

                // Set totalTrades with the episode_length from the response
                const episodeLength: number = result.data[0].main_trial.episode_length;
                setTotalTrades(episodeLength);

                // Set score with the score from the response
                const score: number = result.data[0].score.toFixed(2);
                setScore(score);

                // Set team name with the data from the response
                const team_name: string = result.data[0].team_name;
                setTeamName(team_name);

                // Set commit hash with the data from the response
                const commit_hash: string = result.data[0].git_commit_hash;
                setCommitHash(commit_hash);

                // Set submitted at with the data from the response
                const submitted = formatDistanceToNow(new Date(result.data[0].submitted_at), { addSuffix: true })
                setSubmitted(submitted);

                setIsDataLoaded(true);
            } catch (error) {
                console.error('Error caught during fetch operation:', error);
            }
        }
    };

    const handleMenuItemClick = (team_id: Number) => () => {
        const stringTeamID = team_id.toString()
        fetchData(stringTeamID);
    };


    const trades = Array.from({ length: totalTrades }, (_, index) => index + 1);

    const options = {
        series: [
            {
                name: "Profit",
                data: profitData,
                color: "#7E3AF2",
                yAxisIndex: 0,
            },
            {
                name: "Market Price",
                data: marketData,
                color: "#03fcb1",
                yAxisIndex: 1,
            },
        ],
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: true,
            },
            y: {
                formatter: function (_value: any, { seriesIndex, dataPointIndex, w }: { seriesIndex: any, dataPointIndex: any, w: any }) {
                    // Use seriesIndex to determine which series the tooltip is for
                    // Return the original data value for the tooltip
                    // You may need to adjust the logic here to fetch the original data
                    // For demonstration, assuming original data can be accessed directly
                    if (seriesIndex === 0) { // Profits
                        return `${profitData[dataPointIndex].toFixed(2)}`;
                    } else if (seriesIndex === 1) { // Market Prices
                        return `${marketData[dataPointIndex].toFixed(2)}`;
                    }
                }
            },
        },
        legend: {
            show: true
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: 0
            },
        },
        xaxis: {
            categories: trades,
            labels: {
                show: false,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: [
            {
                // First Y-axis for the Profits
                show: true,
                title: {
                    text: "Profit",
                    style: {
                        color: "#7E3AF2", 
                    }
                },
                labels: {
                    style: {
                        colors: "#7E3AF2", 
                    }
                },
            },
            {
                // Second Y-axis for the Market Prices
                opposite: true, // This positions the Y-axis on the right side
                show: true,
                title: {
                    text: "Market Price",
                    style: {
                        color: "#03fcb1", 
                    }
                },
                labels: {
                    style: {
                        colors: "#03fcb1", 
                    }
                },
            },
        ],
    } as any;


    return (

        <section id="submissions" aria-label="Submissions" className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Payment successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-400">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={() => setOpen(false)}
                                        >
                                            Go back to dashboard
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Container>
                <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
                    Team Submissions
                </h2>
                <Menu as="div" className="relative inline-block text-left mt-10">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Choose your team..
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {Object.values(teams).map((team) => (
                                    <Menu.Item key={team.team_id}>
                                        {({ active }) => (
                                            <button
                                                onClick={handleMenuItemClick(team.team_id)}
                                                className={`
                                                ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                                                block px-4 py-2 text-sm w-full text-left`
                                                }
                                            >
                                                {team.name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}

                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <div className="w-full mt-12 bg-gray-800 rounded-lg shadow p-4 md:p-6">
                    {isDataLoaded ? (
                        <div>
                            <h4 className="max-w-2xl font-display text-4xl font-medium tracking-tighter text-teal-300 sm:text-5xl">
                                {team_name}
                            </h4>
                            <h5 className="px-4 mt-4 text-base font-semibold leading-7 text-white">Best performing commit: {commit_hash}</h5>
                            <div className="mt-10 flex justify-between mb-5">
                                <div className="grid gap-4 grid-cols-6">
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Trades
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={() => setOpen(true)}>
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{trades.length}</p>
                                    </div>
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Score
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{score}</p>
                                    </div>
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Submitted
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{submitted}</p>
                                    </div>
                                </div>

                            </div>
                            <div id="line-chart"></div>
                            <ReactApexChart
                                options={options}
                                series={options.series}
                                type="area"
                                height={500}
                            />
                            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                                <div className="pt-5">
                                    {/* <button
                                className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z"></path>
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
                                </svg>
                                View full report
                            </button> */}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Empty state
                        <div className="text-center bg-contain bg-center h-96 w-full flex justify-center items-center rounded-lg" style={{ backgroundImage: "url('/Chart_Blur.jpg')" }}>
                            <div>
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-semibold text-gray-300">No team selected</h3>
                                <p className="mt-1 text-sm text-gray-300">Get started viewing submissions by selecting a team from the dropdown above</p>
                            </div>
                        </div>
                    )}
                </div>

            </Container>
        </section>
    )
}
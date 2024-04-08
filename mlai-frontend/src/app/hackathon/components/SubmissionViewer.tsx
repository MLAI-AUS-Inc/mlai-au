'use client'
import React, { Fragment, useEffect, useState } from 'react';
import { Container } from './Container';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false, // This line disables server-side rendering
});
import { Dialog, Menu, Transition } from '@headlessui/react';
import { ArrowDownOnSquareIcon, CheckIcon, ChevronDownIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { formatDistanceToNow } from 'date-fns';
import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { Button } from './Button';

interface SubmissionViewerProps {
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
    team_id: number;
    policy: string;
}

interface Task {
    commit_hash: string;
    created_at: number;
    diagnostic: string;
    state_: string;
    task_type: string;
}

interface MarketData {
    profitData: number[];
    marketData: number[];
    timestamps: number[];
    symLogMarketData: number[];
    totalTrades: number;
    score: number;
    socs: number[];
    actions: number[];
    policy: string;
}

const actions = [
    {
        title: 'Trades',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
        description: 'Trades are the number of actions your model performed throughout the entire period in which it has been active. To represent the data on the graph, this number has been scaled down to 100 (otherwise the data wouldnt fit!)'
    },
    {
        title: 'Score',
        icon: CheckBadgeIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
        description: 'This is the total profit your model has been able to attain whilst performing trades. Whatever charge is left in your battery at the end of the arbitrage period has been sold and added to your score'
    },
    {
        title: 'Last Processed',
        icon: UsersIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
        description: 'We get packets of new live data every so often. As soon as we get a new packet of data, it is automatically imported and your model is ran against this new data to see how well it performs. Last processed represents the last time your model was run against new data'
    },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

// Helper function for averaging data points
function averageDataPoints(data: number[], targetPoints: number): number[] {
    const n = data.length;
    const chunkSize = Math.floor(n / targetPoints);
    const remainder = n % targetPoints;
    let result: number[] = [];
    let start = 0;

    for (let i = 0; i < targetPoints; i++) {
        // Increase the chunk size for the first 'remainder' chunks by 1
        const adjustedChunkSize = chunkSize + (i < remainder ? 1 : 0);
        const end = start + adjustedChunkSize;
        const chunk = data.slice(start, end);
        // Calculate the average, ensuring no division by zero
        const average = chunk.length > 0 ? chunk.reduce((acc, val) => acc + val, 0) / chunk.length : 0;
        result.push(average);
        // Move the start pointer
        start = end;
    }

    return result;
}


function selectEvenlySpacedItems(n: number, array: any[]) {
    const result: any[] = [];
    const totalItems = array.length;

    // If n is 1, return the last item; if array is empty or n is 0, return empty array
    if (n === 1) return [array[totalItems - 1]];
    if (n <= 0 || totalItems === 0) return result;

    // Compute the interval between selected items, ensuring the last item is included
    const step = (totalItems - 1) / (n - 1);

    for (let i = 0; i < n; i++) {
        const idx = Math.round(i * step);  // Calculate index, rounding to nearest integer
        result.push(array[idx]);           // Add item at index to the result array
    }

    return result;
}

export const SubmissionViewer: React.FC<SubmissionViewerProps> = ({ topScores = [] }) => {
    const [marketData, setMarketData] = useState<MarketData>({ profitData: [], marketData: [], symLogMarketData: [], timestamps: [], totalTrades: 0, score: 0, socs: [], actions: [], policy: '' });
    const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
    const [team, setTeam] = useState<ActivityItem | null>(null);
    const [open, setOpen] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [rawData, setRawData] = useState(null);

    useEffect(() => {
        // This effect sets the activityItems state whenever topScores changes
        setActivityItems(topScores);
    }, [topScores]);

    const fetchData = async (team_id: string, endpoint: string) => {
        try {
            const queryParams = new URLSearchParams({ team_id });
            const response = await fetch(`/api/${endpoint}?${queryParams}`, { cache: 'no-store', next: { revalidate: 0 }});
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error caught during fetch operation:', error);
        }
    };

    const handleMenuItemClick = (team_id: number) => async () => {
        const stringTeamID = team_id.toString();
        const bestData = await fetchData(stringTeamID, 'getTeamScores');
        if (bestData) {
            const { data } = bestData;
            if (data && data.length > 0) {
                let trialData = data[0].main_trial;
                setRawData(trialData);
                // Averaging and rounding market prices
                const marketPrices: number[] = trialData.market_prices;
                // log scale market prices, in symmetric log
                const averagedMarketPrices = averageDataPoints(marketPrices, 100).map((price) => Number(price.toFixed(2)));

                const symLogMarketPrices = marketPrices.map((price) => Math.sign(price) * Math.log10(Math.abs(price) + 1));
                const symLogAveragedMarketPrices = averageDataPoints(symLogMarketPrices, 100).map((price) => Number(price.toFixed(2)));

                // Averaging and rounding profits
                const profits: number[] = trialData.profits;
                const averagedProfits = averageDataPoints(profits, 100).map((profit) => Number(profit.toFixed(2)));
                const evenlySpacedTimestamps = selectEvenlySpacedItems(100, trialData.timestamps);

                // SOCs
                const maxSOCValue = 13.5; // Maximum SOC value representing 100%
                const socs: number[] = trialData.socs;
                const averagedSOCs = averageDataPoints(socs, 100);
                const transformedSOCs = averagedSOCs.map((soc) => {
                    const normalizedSOC = (soc / maxSOCValue) * 100; // Transform SOC to percentage
                    return Number(normalizedSOC.toFixed(2)); // Round to 2 decimal places and ensure it's a number
                });

                // Actions
                const actions: number[] = trialData.actions;
                const averagedActions = averageDataPoints(actions, 100).map((action) => Number(action.toFixed(2)));

                // Set totalTrades with the episode_length from the response
                const episodeLength: number = trialData.actions.length;

                // Set policy
                const policy: string = trialData.class_name;

                // Assuming formatDistanceToNow returns a formatted string indicating the distance to now
                const submitted = formatDistanceToNow(new Date(data[0].submitted_at), { addSuffix: true });

                // Update your state with the newly processed data
                setMarketData({ profitData: averagedProfits, timestamps: evenlySpacedTimestamps, marketData: averagedMarketPrices, symLogMarketData: symLogAveragedMarketPrices, totalTrades: episodeLength, score: Number(data[0].score.toFixed(2)), socs: transformedSOCs, actions: averagedActions, policy: policy });

                const selectedTeam = topScores.find(team => team.team_id === team_id);
                if (selectedTeam) {
                    setTeam(selectedTeam);
                } else {
                    console.error('Selected team not found in the list');
                }

                setIsDataLoaded(true);
            } else {
                console.log("No data available");
                setIsDataLoaded(false);
            }
        }

        const submissionsData = await fetchData(stringTeamID, 'getTeamSubmissions');
        if (submissionsData && Array.isArray(submissionsData.data)) {
            // Use the Task interface to type each task in the map function
            const updatedTasks: Task[] = submissionsData.data.map((task: Task) => ({
                ...task, // spread the rest of the task properties
                // Convert Unix timestamp to JS Date object and format
                created_at: formatDistanceToNow(new Date(task.created_at * 1000), { addSuffix: true }),
            }));

            setTasks(updatedTasks);
        }
    };

    const downloadTrialData = (trialData: any) => {
        const jsonString = JSON.stringify(trialData);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "trialData.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const trades = Array.from({ length: marketData.totalTrades }, (_, index) => index + 1);

    const options = {
        series: [
            {
                name: "Profit",
                data: marketData.profitData.map((profit, idx) => [marketData.timestamps[idx] * 1000, profit]),
                color: "#7E3AF2",
                yAxisIndex: 0,
            },
            {
                name: "Market Price",
                data: marketData.symLogMarketData.map((price, idx) => [marketData.timestamps[idx] * 1000, price]),
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
                format: 'dd MMM HH:ss',
            },
            y: {
                formatter: function (_value: any, { seriesIndex, dataPointIndex }: { seriesIndex: any, dataPointIndex: any }) {
                    if (seriesIndex === 0) { // Profits
                        return `\$${marketData.profitData[dataPointIndex].toFixed(2)}`;
                    } else if (seriesIndex === 1) { // Market Prices
                        return `\$${marketData.marketData[dataPointIndex].toFixed(2)}`;
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
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                format: 'dd MMM HH:ss',

            },
            type: "datetime",
        },
        yaxis: [
            {
                // First Y-axis for the Profits
                show: true,
                title: {
                    text: "Profit (Smoothed)",
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
                tickAmount: 2,
                max: 2.5,
                min: -1.7,
                opposite: true, // This positions the Y-axis on the right side
                show: true,
                title: {
                    text: "Market Price (smoothed)",
                    style: {
                        color: "#03fcb1",
                    }
                },
                labels: {
                    formatter: function (value: any) {
                        if (value === -1.7) {
                            return `\$${Math.min(...marketData.marketData).toFixed(2)}`;
                        }
                        if (value === 2.5) {
                            return `\$${Math.max(...marketData.marketData).toFixed(2)}`;
                        }

                        return ""
                    },
                    style: {
                        colors: "#03fcb1",
                    }
                },
            },
        ],
    } as any;

    const socOptions = {
        ...options, // Spread the original options to reuse configurations like chart, fill, etc.
        series: [
            {
                name: "State of Charge",
                data: marketData.socs.map((soc, idx) => [marketData.timestamps[idx] * 1000, soc]),
                color: "#FFE333",
                yAxisIndex: 0,
            },
            {
                name: "Actions",
                data: marketData.actions.map((action, idx) => [marketData.timestamps[idx] * 1000, action]),
                color: "#33B2FF",
                yAxisIndex: 1,
            },
        ],
        yaxis: [
            {
                // Y-axis for SOC
                show: true,
                title: {
                    text: "State of Charge (Smoothed)",
                    style: {
                        color: "#FFE333",
                    }
                },
                labels: {
                    formatter: (value: any) => `${value.toFixed(2)}%`, // Format as percentage
                    style: {
                        colors: "#FFE333",
                    }
                },
            },
            {
                // New Y-axis for Actions, positioned on the opposite side
                opposite: true,
                show: true,
                title: {
                    text: "Actions (Smoothed)",
                    style: {
                        color: "#33B2FF", // Example color for Actions Y-axis title
                    }
                },
                labels: {
                    style: {
                        colors: "#33B2FF", // Example color for Actions Y-axis labels
                    }
                },
                min: -10, // Set the minimum value of the Y-axis to -10
                max: 10, // Set the maximum value of the Y-axis to 10
                tickAmount: 4,
            }
        ],
        legend: {
            show: true
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'dd MMM HH:ss',
            },
            y: {
                formatter: function (_value: any, { seriesIndex, dataPointIndex }: { seriesIndex: any, dataPointIndex: any }) {
                    if (seriesIndex === 0) { // SOC
                        return `${marketData.socs[dataPointIndex].toFixed(2)}% SOC`;
                    } else if (seriesIndex === 1) { // Actions
                        // Adjust this tooltip formatter as needed for Actions data
                        return `${marketData.actions[dataPointIndex].toFixed(2)}`;
                    }
                }
            },
        },
    };

    const downloadSubmissions = () => {
        // Convert tasks array to JSON string
        const jsonString = JSON.stringify(tasks);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "tasks.json"; // Filename to download
        document.body.appendChild(a); // Append to the document
        a.click(); // Trigger click to download

        // Cleanup by removing the anchor element and revoking the blob URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadSubmission = (task: Task) => {
        // Convert single task object to JSON string
        const jsonString = JSON.stringify(task);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `task-${task.created_at}.json`; // Filename to download, using the task's created_at timestamp for uniqueness
        document.body.appendChild(a); // Append to the document
        a.click(); // Trigger click to download

        // Cleanup by removing the anchor element and revoking the blob URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (

        <section id="submissions" aria-label="Submissions" className="pt-20 pb-20 sm:pb-32 sm:pt-32 bg-gray-900">
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
                                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0">
                                        {actions.map((action, actionIdx) => (
                                            <div
                                                key={action.title}
                                                className={classNames(
                                                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                                                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                                )}
                                            >
                                                <div>
                                                    <span
                                                        className={classNames(
                                                            action.iconBackground,
                                                            action.iconForeground,
                                                            'inline-flex rounded-lg p-3 ring-4 ring-white'
                                                        )}
                                                    >
                                                        <action.icon className="h-6 w-6" aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <div className="mt-8">
                                                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                                                        {action.title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {action.description}
                                                    </p>
                                                </div>
                                                <span
                                                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                                                    aria-hidden="true"
                                                >
                                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={() => setOpen(false)}
                                        >
                                            Close popup
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
                                {Object.values(activityItems).map((team) => (
                                    <Menu.Item key={team.team_id}>
                                        {({ active }) => (
                                            <button
                                                onClick={handleMenuItemClick(team.team_id)}
                                                className={`
                                                ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                                                block px-4 py-2 text-sm w-full text-left`
                                                }
                                            >
                                                {team.user.name}
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
                                {team?.user.name}
                            </h4>
                            <h5 className="mt-4 text-base font-semibold leading-7 text-white">Showing results for commit: <span className="text-teal-400">{team?.commit}</span></h5>
                            <Button color="teal" onClick={() => downloadTrialData(rawData)} className="whitespace-nowrap my-2">
                                Download Raw Data JSON
                            </Button>
                            <div className="mt-10 flex justify-between mb-5">
                                <div className="grid gap-4 grid-cols-6">
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Trades:
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={() => setOpen(true)}>
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{trades.length}</p>
                                    </div>
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Score:
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={() => setOpen(true)}>
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{team?.score}</p>
                                    </div>
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Last processed:
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={() => setOpen(true)}>
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{team?.submitted}</p>
                                    </div>
                                    <div>
                                        <h5 className="inline-flex items-center text-gray-400 leading-none font-normal mb-2">Policy
                                            <svg className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={() => setOpen(true)}>
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </h5>
                                        <p className="text-teal-300 text-2xl leading-none font-bold">{team?.policy}</p>
                                    </div>
                                </div>

                            </div>
                            <div id="line-chart"></div>
                            <ReactApexChart
                                key="profit-market-chart"
                                options={options}
                                series={options.series}
                                type="area"
                                height={500}
                            />

                            <ReactApexChart
                                key="soc-chart"
                                options={socOptions}
                                series={socOptions.series}
                                type="area"
                                height={500}
                            />
                            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                                <div className="pt-5">
                                </div>
                            </div>

                            {/* Tasks Submitted list */}
                            <h4 className="max-w-2xl font-display text-2xl font-medium tracking-tighter text-teal-300 mb-2">
                                Recent runs:
                            </h4>
                            <Button color="teal" onClick={downloadSubmissions} className="whitespace-nowrap my-2">
                                Download all submissions JSON
                            </Button>
                            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {tasks.map((task, idx) => (
                                    <li key={idx} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-sm font-medium text-gray-900">{task.commit_hash}</h3>
                                                    {task.diagnostic !== '' ? (
                                                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                            Error
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            Success
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1 truncate text-sm text-gray-500">{task.created_at}</p>
                                            </div>
                                            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src='/MLAI-Logo-Teal.png' alt="" />
                                        </div>
                                        <div className="flex items-center space-x-3 overflow-hidden">
                                            {task.diagnostic !== '' ? (
                                                <span className="flex-shrink items-center px-2 py-2 text-xs font-medium text-red-700  break-words max-w-full min-h-24 max-h-24 overflow-auto">
                                                    {task.diagnostic}
                                                </span>
                                            ) :
                                                <span className="flex-shrink items-center px-2 py-2 text-xs font-medium text-green-700 break-words max-w-full min-h-24 max-h-24 overflow-auto">
                                                    Updated score with no errors
                                                </span>
                                            }
                                        </div>
                                        <div>
                                            <div className="-mt-px flex divide-x divide-gray-200">
                                                <div className="flex w-0 flex-1">
                                                    <a
                                                        onClick={() => downloadSubmission(task)}
                                                        className="relative cursor-pointer -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                    >
                                                        <ArrowDownOnSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        Download
                                                    </a>
                                                </div>
                                                {/* <div className="-ml-px flex w-0 flex-1">
                                                    <a
                                                        href='/'
                                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                    >
                                                        <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        Call
                                                    </a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
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
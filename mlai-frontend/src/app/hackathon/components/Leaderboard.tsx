'use client'
import { useEffect } from 'react';
import { Container } from './Container';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';


export function Leaderboard() {
    const [profitData, setProfitData] = useState([]);
    const [marketData, setMarketData] = useState<number[]>([]);
    const [meanProfit, setMeanProfit] = useState([]);

    const totalEpisodes = 288; // or however many episodes there are
    const episodes = Array.from({ length: totalEpisodes }, (_, index) => index + 1);

    const options = {
        series: [
            {
                name: "Profit",
                data: profitData,
                color: "#1A56DB",
            },
            {
                name: "Market Price",
                data: marketData,
                color: "#7E3AF2",
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
                show: false,
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
            categories: episodes,
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
                show: true,
            },
        },
        yaxis: {
            show: false,
        },
    } as ApexCharts.ApexOptions;

    useEffect(() => {
        if (typeof window !== "undefined") {
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
                    // console.log('Data received:', result.data);
                    setProfitData(result.data[0].main_trial.profits);
                    setMarketData(result.data[0].main_trial.market_prices.map((price: number) =>
                        Number(price.toFixed(2))
                    )); // set veriable and restrict to 2 decimal places
                    setMeanProfit(result.data[0].mean_profit.toFixed(2));
                    // console.log('Data received:', marketData);
                } catch (error) {
                    console.error('Error caught during fetch operation:', error);
                }
            };

            fetchData();
        }
    }, []);

    useEffect(() => {
        console.log('Updated marketData:', marketData);
    }, [marketData]);


    return (
        <section id="sponsors" aria-label="Sponsors" className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900">
            <Container>
                <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
                    Scream Team
                </h2>

                <div className="w-full mt-12 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                    <div className="flex justify-between mb-5">
                        <div className="grid gap-4 grid-cols-2">
                            <div>
                                <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Episodes
                                    <svg data-popover-target="clicks-info" data-popover-placement="bottom" className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <div data-popover id="clicks-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Episodes</h3>
                                            <p>INSERT AN EXPLAINER ABOUT EPISIDES HERE</p>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Average Profit</h3>
                                            <p>INSERT AN EXPLAINER ABOUT AV PROFIT HERE</p>
                                            <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 9 4-4-4-4" />
                                            </svg></a>
                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
                                </h5>
                                <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">{episodes.length}</p>
                            </div>
                            <div>
                                <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Mean Profit
                                    <svg data-popover-target="cpc-info" data-popover-placement="bottom" className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <div data-popover id="cpc-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Episodes</h3>
                                            <p>INSERT AN EXPLAINER ABOUT EPISIDES HERE</p>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                                            <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                                            <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 9 4-4-4-4" />
                                            </svg></a>
                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
                                </h5>
                                <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">${meanProfit}</p>
                            </div>
                        </div>
                        <div>
                            <button id="dropdownDefaultButton"
                                data-dropdown-toggle="lastDaysdropdown"
                                data-dropdown-placement="bottom" type="button" className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Last week <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg></button>
                            <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                                    </li>
                                </ul>
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
                            <button
                                className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z"></path>
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
                                </svg>
                                View full report
                            </button>
                        </div>
                    </div>
                </div>


            </Container>
        </section>
    )
}
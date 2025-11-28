import React from 'react';

const schedule = [
    { time: '10:30 am', event: 'Opening Ceremony', speaker: '', title: '' },
    { time: '11:30 am', event: 'Hacking begins!', speaker: '', title: '' },
    { time: '12:00 pm', event: '', speaker: 'Macken Murphy', title: 'The Manosphere & Incel Ideology' },
    { time: '1:00 pm', event: 'Lunch', speaker: '', title: '' },
    { time: '2:00 pm', event: '', speaker: 'David Gilmore', title: 'Incel Radicalisation (Lived Experiences)' },
    { time: '4:00 pm', event: '', speaker: 'Campbell Wilson', title: 'Countering online child exploitation' },
    { time: '5:00 pm', event: 'Afternoon Snack', speaker: '', title: '' },
    { time: '6:00 pm', event: '', speaker: 'Sarah Davis-Gilmore', title: 'Lived Experience, Safety, and Connection Online' },
    { time: '7:30 pm', event: 'Dinner', speaker: '', title: '' },
    { time: '8:30 pm', event: 'Wrap up', speaker: '', title: '' },
];

export default function Agenda() {
    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Agenda</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {schedule.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-6 w-32">
                                    {item.time}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {item.event ? (
                                        <span>{item.event}</span>
                                    ) : (
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-medium">{item.speaker}</span>
                                            <span className="font-bold text-gray-900">{item.title}</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

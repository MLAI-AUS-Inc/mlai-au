import React from 'react';

const schedule = [
    { time: '10:00 am', event: 'Doors open', speaker: '', title: '' },
    { time: '10:00 am', event: 'Morning Tea', speaker: '', title: '' },
    { time: '12:00 pm', event: '', speaker: 'Maria & Ellen (eSafety)', title: 'All About eSafety' },
    { time: '1:00 pm', event: 'Lunch', speaker: '', title: '' },
    { time: '2:00 pm', event: '', speaker: 'Alan Agon (PaxMod)', title: 'Gaming Lounge Moderation' },
    { time: '4:00 pm', event: '', speaker: 'Scotty (The Product Bus)', title: 'How to choose a product people will actually use' },
    { time: '5:00 pm', event: 'Afternoon Snacks', speaker: '', title: '' },
    { time: '7:30 pm', event: 'Dinner', speaker: '', title: '' },
    { time: '8:30 pm', event: 'Wrap up', speaker: '', title: '' },
    { time: '9:00 pm', event: '', speaker: 'Day 2 ends', title: '[Optional] Teams can continue hacking through the week' },
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

import { useState } from 'react';
import type { PublicRow } from '~/types/submission';

type Filter = 'all' | 'correct' | 'incorrect' | 'crises';

interface First100RowsTableProps {
    rows: PublicRow[] | undefined;
}

const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'correct', label: 'Correct' },
    { key: 'incorrect', label: 'Incorrect' },
    { key: 'crises', label: 'Crises' },
];

export default function First100RowsTable({ rows }: First100RowsTableProps) {
    const [filter, setFilter] = useState<Filter>('all');

    if (!rows || rows.length === 0) return null;

    const filtered = rows.filter((r) => {
        switch (filter) {
            case 'correct':
                return r.correct;
            case 'incorrect':
                return !r.correct;
            case 'crises':
                return r.actual === 2;
            default:
                return true;
        }
    });

    return (
        <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                    First 100 Rows Breakdown
                </h3>
                <div className="flex gap-2 mt-3">
                    {FILTERS.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                filter === f.key
                                    ? 'bg-[#783f8e] text-white'
                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="px-4 pb-5 sm:px-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-[#e2a9f1]/10">
                            <thead>
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                        Row
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Actual
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Predicted
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Result
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2a9f1]/10">
                                {filtered.map((row) => (
                                    <tr key={row.row}>
                                        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm text-white/80 sm:pl-0">
                                            {row.row}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm text-white/80">
                                            {row.actual_name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm text-white/80">
                                            {row.predicted_name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-sm">
                                            {row.correct ? (
                                                <span className="text-green-400">&#10003;</span>
                                            ) : (
                                                <span className="text-red-400">&#10007;</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <p className="text-center text-sm text-white/40 py-4">
                                No rows match this filter.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

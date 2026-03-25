import { timeAgo } from '~/lib/timeAgo';
import type { SubmissionSummary } from '~/types/submission';

interface SubmissionHistoryProps {
    submissions: SubmissionSummary[];
    selectedId: number | null;
    bestScore: number | null;
    onSelect: (id: number) => void;
}

export default function SubmissionHistory({ submissions, selectedId, bestScore, onSelect }: SubmissionHistoryProps) {
    if (submissions.length === 0) {
        return (
            <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white">Submission History</h2>
                <p className="text-white/50 mt-2 text-sm">No submissions yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-semibold text-white">Submission History</h2>
                <p className="mt-1 text-sm text-white/50">All your submissions. Click a row to view details.</p>
            </div>
            <div className="px-4 pb-5 sm:px-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-[#e2a9f1]/10">
                            <thead>
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                        Score
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Accuracy
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Submitted
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2a9f1]/10">
                                {submissions.map((sub) => {
                                    const isBest = bestScore != null && sub.score === bestScore;
                                    const isSelected = sub.submission_id === selectedId;

                                    return (
                                        <tr
                                            key={sub.submission_id}
                                            onClick={() => onSelect(sub.submission_id)}
                                            className={`cursor-pointer transition-colors hover:bg-white/5 ${
                                                isBest ? 'bg-[#e2a9f1]/10 border-l-2 border-[#e2a9f1]' : ''
                                            } ${isSelected ? 'bg-white/5' : ''}`}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-white sm:pl-0">
                                                {typeof sub.score === 'number' ? sub.score.toFixed(2) : 'N/A'}
                                                {isBest && (
                                                    <span className="ml-2 text-xs text-[#e2a9f1]">Best</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-white/50">
                                                {typeof sub.accuracy === 'number'
                                                    ? `${(sub.accuracy * 100).toFixed(2)}%`
                                                    : 'N/A'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-white/50">
                                                {timeAgo(sub.submitted_at)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

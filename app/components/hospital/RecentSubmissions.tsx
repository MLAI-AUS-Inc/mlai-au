import { timeAgo } from '~/lib/timeAgo';

interface SubmissionEntry {
    id?: string;
    user_name?: string;
    score: number;
    accuracy?: number;
    submitted_at: string;
}

interface RecentSubmissionsProps {
    submissions: SubmissionEntry[];
}

export default function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
    if (submissions.length === 0) {
        return (
            <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
                <p className="text-gray-500 mt-2 text-sm">No submissions yet. Upload your first predictions above!</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
                <p className="mt-1 text-sm text-gray-500">Your team's submission history.</p>
            </div>
            <div className="px-4 pb-5 sm:px-6">
                <div className="flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Submitter
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Score
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Accuracy
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Submitted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {submissions.map((sub, index) => (
                                        <tr key={sub.id || index}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                                                {sub.user_name || 'Team member'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">
                                                {typeof sub.score === 'number' ? sub.score.toFixed(2) : 'N/A'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {typeof sub.accuracy === 'number' ? `${(sub.accuracy * 100).toFixed(2)}%` : 'N/A'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {timeAgo(sub.submitted_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

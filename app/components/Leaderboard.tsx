import React from 'react'
import { timeAgo } from '~/lib/timeAgo'
import type { Submission } from '~/types/submission'

function getInitials(fullName = '') {
    if (!fullName) return 'NA'
    const words = fullName.split(' ')
    return words.slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || 'NA'
}

function generateAvatarUrl(fullName = '') {
    const initials = getInitials(fullName)
    const seed = encodeURIComponent(initials)
    return `https://api.dicebear.com/6.x/initials/svg?seed=${seed}`
}

interface LeaderboardProps {
    data?: Submission[]
}

export default function Leaderboard({ data = [] }: LeaderboardProps) {
    if (data.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>
                <p className="text-gray-600 mt-2">No submissions found yet.</p>
            </div>
        )
    }

    return (
        <div className="p-6 bg-white rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>
            <p className="text-gray-600 mt-2">
                Showing the top-scoring submission from each team.
            </p>

            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    {/* Rank Column */}
                                    <th className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Rank
                                    </th>
                                    {/* Team Name */}
                                    <th className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Team
                                    </th>
                                    {/* Members Column */}
                                    <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-900">
                                        Members
                                    </th>
                                    {/* Score */}
                                    <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-900">
                                        Score
                                    </th>
                                    {/* Accuracy */}
                                    <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-900">
                                        Accuracy
                                    </th>
                                    {/* Submitted Time */}
                                    <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-900">
                                        Submitted
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((submission, index) => {
                                    if (!submission.team) return null

                                    const memberList = submission.team.members || []
                                    const accuracyDisplay =
                                        typeof submission.accuracy === 'number'
                                            ? `${(submission.accuracy * 100).toFixed(2)}%`
                                            : 'N/A'

                                    return (
                                        <tr key={submission.team.team_id} className="hover:bg-gray-50">
                                            {/* Rank */}
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0 font-semibold">
                                                {index + 1}
                                            </td>
                                            {/* Team Name */}
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0 font-semibold">
                                                {submission.team.team_name}
                                            </td>
                                            {/* Avatar group styled with DL */}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                                                    <div className="flex -space-x-0.5">
                                                        <dt className="sr-only">Members</dt>
                                                        {memberList.map((member, i) => {
                                                            const fullName = member.full_name
                                                            return (
                                                                <dd key={i}>
                                                                    <img
                                                                        alt={fullName}
                                                                        src={generateAvatarUrl(fullName)}
                                                                        className="size-6 rounded-full bg-gray-50 ring-2 ring-white"
                                                                    />
                                                                </dd>
                                                            )
                                                        })}
                                                    </div>
                                                </dl>
                                            </td>
                                            {/* Score */}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {submission.score}
                                            </td>
                                            {/* Accuracy */}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {accuracyDisplay}
                                            </td>
                                            {/* Time Submitted */}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {timeAgo(submission.submitted_at)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

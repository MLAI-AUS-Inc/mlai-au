"use client";

import React, { useEffect, useState } from 'react'
import { timeAgo } from '~/lib/timeAgo'
import type { Submission } from '~/types/submission'
import type { User } from '~/types/user'
import { getLeaderboardSubmissions } from '~/lib/auth'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

// ... (helper functions unchanged) ...

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

export default function TeamSubmissions({ user }: { user: User }) {
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                // Use leaderboard endpoint as it contains all submissions
                const data = await getLeaderboardSubmissions()

                // Filter for user's team
                const userTeamId = user.esafety_team?.team_id || user.team?.team_id

                const teamData = data.filter((sub: Submission) => {
                    // Handle potential type mismatch between string/number IDs
                    return String(sub.team?.team_id) === String(userTeamId)
                })

                // Sort by submitted_at descending (most recent first)
                const sortedData = teamData.sort((a: Submission, b: Submission) => {
                    return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
                })
                setSubmissions(sortedData)
            } catch (error) {
                console.error('Error fetching team submissions', error)
            } finally {
                setLoading(false)
            }
        }
        if (user) {
            fetchData()
        }
    }, [user])

    if (loading) {
        return (
            <div className="p-6 bg-white rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900">Your Team's Submissions</h2>
                <p className="text-gray-600 mt-2">Loading submissions...</p>
            </div>
        )
    }

    if (submissions.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900">Your Team's Submissions</h2>
                <p className="text-gray-600 mt-2">No submissions found yet.</p>
            </div>
        )
    }

    return (
        <div className="p-6 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900">Your Team's Submissions</h2>
            <p className="text-gray-600 mt-2">
                History of all submissions made by your team.
            </p>

            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    {/* Team Name */}
                                    <th className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Team
                                    </th>
                                    {/* Members Column */}
                                    <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-900">
                                        Submitted By
                                    </th>
                                    {/* Score */}
                                    <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-900">
                                        <div className="group relative flex items-center gap-1 cursor-help">
                                            Score
                                            <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden w-64 rounded-md bg-gray-900 p-2 text-xs text-white shadow-lg group-hover:block z-50">
                                                The Hybrid Score combines the Risk Tier F1 and Persona F1 scores.
                                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                                            </div>
                                        </div>
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
                                {submissions.map((submission, index) => {
                                    if (!submission.team) return null

                                    // For team submissions, we might want to show who specifically submitted it if available,
                                    // but currently we iterate over team members.
                                    // Let's just show the team members as usual for now.
                                    const memberList = submission.team.members || []
                                    const accuracyDisplay =
                                        typeof submission.accuracy === 'number'
                                            ? submission.accuracy.toFixed(4)
                                            : 'N/A'

                                    return (
                                        <tr key={submission.id || index} className="hover:bg-gray-50">
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
                                                                        src={member.avatar_url || generateAvatarUrl(fullName)}
                                                                        className="size-6 rounded-full bg-gray-50 ring-2 ring-white"
                                                                    />
                                                                </dd>
                                                            )
                                                        })}
                                                    </div>
                                                </dl>
                                            </td>
                                            {/* Score */}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-semibold">
                                                {typeof submission.score === 'number' ? submission.score.toFixed(4) : 'N/A'}
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

import { timeAgo } from '~/lib/timeAgo';
import type { HospitalSubmission } from '~/types/submission';
import { normalizeClassStats } from '~/types/submission';

interface NewestSubmissionCardProps {
    submission: HospitalSubmission | null;
}

export default function NewestSubmissionCard({ submission }: NewestSubmissionCardProps) {
    if (!submission) {
        return (
            <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white">Latest Submission</h2>
                <p className="text-white/50 mt-2 text-sm">No submissions yet.</p>
            </div>
        );
    }

    const feedback = submission.feedback;
    const missedCrises = feedback != null ? feedback.missed_crises_total : null;
    const accuracy = submission.accuracy != null
        ? `${(submission.accuracy * 100).toFixed(1)}%`
        : 'N/A';
    const classStats = feedback != null ? normalizeClassStats(feedback.class_stats) : undefined;
    const totalRows = classStats
        ? classStats.reduce((sum, s) => sum + s.total, 0)
        : null;
    const submittedBy = submission.user_name || submission.participant_name || 'Team member';

    return (
        <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
                {/* Left: Score display */}
                <div className="bg-gradient-to-br from-[#783f8e] to-[#5a2d6a] p-6 flex flex-col items-center justify-center sm:w-2/5">
                    <p className="text-white/70 text-xs uppercase tracking-wider mb-2">Score</p>
                    <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                            {typeof submission.score === 'number' ? submission.score.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                    <p className="text-white/80 text-sm mt-3 font-medium">
                        {submission.team?.team_name || 'Your Team'}
                    </p>
                    <p className="text-white/50 text-xs mt-1">{timeAgo(submission.submitted_at)}</p>
                </div>

                {/* Right: Stats */}
                <div className="flex-1 p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Submission Details
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-red-500/10 px-3 py-2">
                            <span className="text-sm text-red-300">Missed Crises</span>
                            <span className="text-sm font-semibold text-red-400">
                                {missedCrises != null ? missedCrises : 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-yellow-500/10 px-3 py-2">
                            <span className="text-sm text-yellow-300">Accuracy</span>
                            <span className="text-sm font-semibold text-yellow-400">{accuracy}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-green-500/10 px-3 py-2">
                            <span className="text-sm text-green-300">Total Rows</span>
                            <span className="text-sm font-semibold text-green-400">
                                {totalRows != null ? totalRows : 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-blue-500/10 px-3 py-2">
                            <span className="text-sm text-blue-300">Submitted By</span>
                            <span className="text-sm font-semibold text-blue-400">{submittedBy}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

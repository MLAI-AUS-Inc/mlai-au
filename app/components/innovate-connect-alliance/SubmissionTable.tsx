import { timeAgo } from "~/lib/timeAgo";
import type { InnovateConnectAllianceSubmission } from "~/lib/innovate-connect-alliance";

interface SubmissionTableProps {
    title: string;
    description: string;
    submissions: InnovateConnectAllianceSubmission[];
    onRowClick?: (submissionId: number) => void;
}

export default function SubmissionTable({
    title,
    description,
    submissions,
    onRowClick,
}: SubmissionTableProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80">
            <div className="px-5 py-5">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <p className="mt-1 text-sm text-white/45">{description}</p>
            </div>

            <div className="border-t border-white/10 px-5 py-5">
                {submissions.length === 0 ? (
                    <p className="text-sm text-white/45">No submissions yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/10">
                            <thead>
                                <tr>
                                    <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                                        Submitter
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                                        Submitted
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {submissions.map((submission) => (
                                    <tr
                                        key={submission.submission_id}
                                        className={onRowClick ? "cursor-pointer hover:bg-white/[0.03]" : undefined}
                                        onClick={() => onRowClick?.(submission.submission_id)}
                                    >
                                        <td className="py-4 pr-4 text-sm font-medium text-white">
                                            {submission.title}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-white/65">
                                            {submission.participant_name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-white/45">
                                            {timeAgo(submission.submitted_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

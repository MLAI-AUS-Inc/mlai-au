import { timeAgo } from "~/lib/timeAgo";
import type { InnovateConnectAllianceSubmission } from "~/lib/innovate-connect-alliance";

interface LatestSubmissionCardProps {
    submission: InnovateConnectAllianceSubmission | null;
}

export default function LatestSubmissionCard({
    submission,
}: LatestSubmissionCardProps) {
    if (!submission) {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                <h2 className="text-lg font-semibold text-white">Latest Submission</h2>
                <p className="mt-2 text-sm text-white/45">
                    No video uploaded yet. Submit your first team walkthrough to populate this panel.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">{submission.title}</h2>
                    <p className="mt-1 text-sm text-white/45">
                        Uploaded {timeAgo(submission.submitted_at)} by {submission.participant_name}
                    </p>
                </div>
                <span className="rounded-full border border-[#8ef4d4]/20 bg-[#8ef4d4]/10 px-3 py-1 text-xs font-semibold text-[#8ef4d4]">
                    {submission.team.team_name}
                </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
                <video
                    src={submission.video_url}
                    controls
                    className="h-full max-h-[360px] w-full bg-black"
                />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">File</p>
                    <p className="mt-1 text-sm text-white/80">{submission.original_filename}</p>
                </div>
                <div className="rounded-lg bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">Size</p>
                    <p className="mt-1 text-sm text-white/80">
                        {(submission.file_size_bytes / (1024 * 1024)).toFixed(1)} MB
                    </p>
                </div>
            </div>

            {submission.notes && (
                <div className="mt-4 rounded-lg bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">Notes</p>
                    <p className="mt-1 text-sm leading-6 text-white/75">{submission.notes}</p>
                </div>
            )}
        </div>
    );
}

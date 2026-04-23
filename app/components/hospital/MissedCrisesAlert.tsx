import type { MissedCrisis } from '~/types/submission';

interface MissedCrisesAlertProps {
    missedCrisesTotal: number;
    missedCrises: MissedCrisis[];
}

const MAX_SHOWN = 10;

export default function MissedCrisesAlert({ missedCrisesTotal, missedCrises }: MissedCrisesAlertProps) {
    if (missedCrisesTotal === 0) {
        return (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-start gap-3">
                <svg className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <div>
                    <p className="text-sm font-semibold text-green-300">No missed crises</p>
                    <p className="text-xs text-green-200/70 mt-1">Your model correctly identified all crisis states.</p>
                </div>
            </div>
        );
    }

    const shown = missedCrises.slice(0, MAX_SHOWN);
    const remaining = missedCrisesTotal - shown.length;

    return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                    <p className="text-sm font-semibold text-red-300">
                        {missedCrisesTotal} missed crisis{missedCrisesTotal !== 1 ? 'es' : ''}
                    </p>
                    <p className="text-xs text-red-200/70 mt-1">
                        Each missed crisis incurs a -10 point penalty. These are patients in a crisis state that your model failed to identify.
                    </p>
                </div>
            </div>
            <div className="space-y-1 pl-8">
                {shown.map((mc) => (
                    <p key={mc.row} className="text-xs text-red-200/80">
                        Row {mc.row}: predicted <span className="font-medium text-red-300">{mc.predicted_name}</span>
                    </p>
                ))}
                {remaining > 0 && (
                    <p className="text-xs text-red-200/50 italic">and {remaining} more...</p>
                )}
            </div>
        </div>
    );
}

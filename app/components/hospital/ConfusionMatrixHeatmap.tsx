import type { Feedback } from '~/types/submission';

const CLASS_ORDER = ['0', '1', '2', '3'];
const CLASS_NAMES: Record<string, string> = {
    '0': 'Normal',
    '1': 'Warning',
    '2': 'Crisis',
    '3': 'Other',
};

interface ConfusionMatrixHeatmapProps {
    confusionMatrix: Feedback['confusion_matrix'] | undefined;
}

export default function ConfusionMatrixHeatmap({ confusionMatrix }: ConfusionMatrixHeatmapProps) {
    if (!confusionMatrix) return null;

    // Compute row max for opacity scaling
    const rowMaxes: Record<string, number> = {};
    for (const actual of CLASS_ORDER) {
        const row = confusionMatrix[actual];
        if (!row) {
            rowMaxes[actual] = 1;
            continue;
        }
        let max = 0;
        for (const pred of CLASS_ORDER) {
            const val = row[pred] ?? 0;
            if (val > max) max = val;
        }
        rowMaxes[actual] = max || 1;
    }

    return (
        <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Confusion Matrix
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 text-xs text-white/40" />
                            {CLASS_ORDER.map((pred) => (
                                <th key={pred} className="p-2 text-xs text-white/60 text-center">
                                    Pred: {CLASS_NAMES[pred]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {CLASS_ORDER.map((actual) => (
                            <tr key={actual}>
                                <td className="p-2 text-xs text-white/60 whitespace-nowrap">
                                    Actual: {CLASS_NAMES[actual]}
                                </td>
                                {CLASS_ORDER.map((pred) => {
                                    const value = confusionMatrix[actual]?.[pred] ?? 0;
                                    const isDiagonal = actual === pred;
                                    const opacity = value / rowMaxes[actual];
                                    const bgColor = isDiagonal
                                        ? `rgba(34, 197, 94, ${0.15 + opacity * 0.6})`
                                        : `rgba(239, 68, 68, ${opacity * 0.5})`;

                                    return (
                                        <td
                                            key={pred}
                                            className="p-2 text-center text-sm font-semibold text-white border border-white/5"
                                            style={{ backgroundColor: bgColor }}
                                        >
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

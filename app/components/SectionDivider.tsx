interface SectionDividerProps {
    color: string;
    label?: string;
}

/**
 * A thin colored divider that appears at the right edge of the screen
 * to mark the beginning of a section.
 */
export default function SectionDivider({ color, label }: SectionDividerProps) {
    return (
        <div className="w-full flex justify-end pr-3 lg:pr-6 py-2">
            <div className="flex items-center gap-2">
                {label && (
                    <span
                        className="text-xs font-medium uppercase tracking-wider opacity-60"
                        style={{ color }}
                    >
                        {label}
                    </span>
                )}
                <div
                    className="w-12 lg:w-20 h-1 rounded-full"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
}

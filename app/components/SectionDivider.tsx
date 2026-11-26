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
        <div className="mp-divider" style={{ "--mp-item": color } as React.CSSProperties}>
            {label && <span className="mp-divider-label">{label}</span>}
            <span className="mp-divider-line" aria-hidden="true" />
        </div>
    );
}

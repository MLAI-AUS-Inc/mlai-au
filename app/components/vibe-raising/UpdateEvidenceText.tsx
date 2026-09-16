import { Fragment } from "react";

/** Render source references as links while leaving all other report text literal. */
export default function UpdateEvidenceText({ text }: { text: string }) {
    const parts = text.split(/(\[[^\]\n]+\]\(https?:\/\/[^\s)]+\))/g);
    return <>{parts.map((part, index) => {
        const link = /^\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)$/.exec(part);
        return link ? (
            <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="break-words font-semibold text-[var(--vr-color-primary)] underline underline-offset-2">
                {link[1]}
            </a>
        ) : <Fragment key={index}>{part}</Fragment>;
    })}</>;
}

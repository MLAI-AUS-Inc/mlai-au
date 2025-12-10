
import { clsx } from "clsx";

interface ProseProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Prose({ children, className, id }: ProseProps) {
    return (
        <div id={id} className={clsx("prose prose-zinc max-w-none dark:prose-invert", className)}>
            {children}
        </div>
    );
}

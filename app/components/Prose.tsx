
import { clsx } from "clsx";

interface ProseProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Prose({ children, className, id }: ProseProps) {
    return (
        <div id={id} className={clsx(
            "prose prose-zinc max-w-none dark:prose-invert",
            // Headings
            "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100",
            // Body text
            "prose-p:text-zinc-600 prose-p:leading-7 dark:prose-p:text-zinc-400",
            "prose-li:text-zinc-600 dark:prose-li:text-zinc-400",
            // Links
            "prose-a:font-medium prose-a:text-zinc-900 prose-a:decoration-zinc-800/20 prose-a:underline-offset-2 hover:prose-a:text-zinc-600",
            className
        )}>
            {children}
        </div>
    );
}

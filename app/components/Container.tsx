
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface ContainerProps {
    className?: string;
    children: ReactNode;
    maxWidthClassName?: string;
    innerMaxWidthClassName?: string;
    innerClassName?: string;
}

export function Container({
    className,
    children,
    maxWidthClassName = 'max-w-7xl',
    innerMaxWidthClassName,
    innerClassName,
}: ContainerProps) {
    return (
        <div className={clsx('mx-auto px-4 sm:px-6 lg:px-8', maxWidthClassName, className)}>
            <div className={clsx('mx-auto', innerMaxWidthClassName, innerClassName)}>
                {children}
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';

// Extend standard img attributes but allow Next.js-like props to be passed (and ignored)
interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    fill?: boolean;
    priority?: boolean;
    fetchPriority?: "high" | "low" | "auto";
}

export function ImageWithFallback({
    src,
    fallbackSrc = '/placeholder-avatar.png',
    alt,
    fill,
    priority,
    fetchPriority,
    ...props
}: ImageWithFallbackProps) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [src]);

    return (
        <img
            {...props}
            src={hasError ? fallbackSrc : src}
            alt={alt}
            onError={() => {
                setHasError(true);
            }}
        />
    );
}

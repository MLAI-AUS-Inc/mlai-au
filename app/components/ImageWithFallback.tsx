import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export function ImageWithFallback({
    src,
    fallbackSrc = '/placeholder-avatar.png',
    alt,
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

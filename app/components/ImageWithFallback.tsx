import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc, alt, ...props }: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = () => {
        if (fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <img
            {...props}
            src={imgSrc}
            alt={alt}
            onError={handleError}
        />
    );
}

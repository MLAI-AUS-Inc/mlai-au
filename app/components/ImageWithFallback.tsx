import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export function ImageWithFallback({
    src,
    fallbackSrc = '/placeholder-avatar.png',
    alt,
    ...props
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <img
            {...props}
            src={imgSrc}
            alt={alt}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}

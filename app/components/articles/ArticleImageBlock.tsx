import { ImageWithFallback } from '../ImageWithFallback'

type ArticleImageBlockProps = {
    src: string
    alt: string
    width?: number
    height?: number
    containerClassName?: string
    imageClassName?: string
}

export function ArticleImageBlock({
    src,
    alt,
    width = 1200,
    height = 800,
    containerClassName = '',
    imageClassName = '',
}: ArticleImageBlockProps) {
    return (
        <div className={`my-12 max-w-3xl mx-auto ${containerClassName}`}>
            <ImageWithFallback
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10 ${imageClassName}`}
            />
        </div>
    )
}

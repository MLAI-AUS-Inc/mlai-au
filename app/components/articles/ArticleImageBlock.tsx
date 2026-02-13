import { ImageWithFallback } from '../ImageWithFallback'
import { ARTICLE_FALLBACK_IMAGE } from '~/articles/registry'

type ArticleImageBlockProps = {
    src: string
    alt: string
    width?: number
    height?: number
    containerClassName?: string
    imageClassName?: string
    caption?: string
}

export function ArticleImageBlock({
    src,
    alt,
    width = 1200,
    height = 800,
    containerClassName = '',
    imageClassName = '',
    caption,
}: ArticleImageBlockProps) {
    return (
        <figure className={`my-12 max-w-3xl mx-auto ${containerClassName}`}>
            <ImageWithFallback
                src={src}
                fallbackSrc={ARTICLE_FALLBACK_IMAGE}
                alt={alt}
                width={width}
                height={height}
                className={`w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10 ${imageClassName}`}
            />
            {caption ? (
                <figcaption className="mt-3 text-sm text-gray-500">{caption}</figcaption>
            ) : null}
        </figure>
    )
}

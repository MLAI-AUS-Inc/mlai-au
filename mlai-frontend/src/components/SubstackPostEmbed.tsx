'use client'
import { useEffect } from 'react'

interface SubstackPostEmbedProps {
  url: string
  className?: string
}

export default function SubstackPostEmbed({ url, className }: SubstackPostEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://substack.com/embedjs/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])

  return (
    <div className={className ? className : ''}>
      <div className="substack-post-embed">
        <a data-post-link href={url}></a>
      </div>
    </div>
  )
} 
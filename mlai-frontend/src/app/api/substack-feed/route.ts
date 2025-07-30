import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'

interface SubstackPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  image?: string
}

const parser = new Parser({
  customFields: { item: ['content:encoded'] }
})

function extractImageFromContent(content: string): string | undefined {
  // Try multiple approaches to extract images from Substack content
  
  // First try to find images in the content HTML
  const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)
  if (imgMatches && imgMatches.length > 0) {
    // Extract the src from the first image
    const srcMatch = imgMatches[0].match(/src=["']([^"']+)["']/)
    if (srcMatch) {
      let imageUrl = srcMatch[1]
      // Normalize protocol-relative URLs
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl
      }
      return imageUrl
    }
  }
  
  // Try to find Substack CDN images specifically
  const substackImgMatch = content.match(/https:\/\/substackcdn\.com\/image\/[^"'\s]+/i)
  if (substackImgMatch) {
    return substackImgMatch[0]
  }
  
  // Try to find any https image URL
  const httpsImgMatch = content.match(/https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/i)
  if (httpsImgMatch) {
    return httpsImgMatch[0]
  }
  
  return undefined
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '3', 10)
    
    const feed = await parser.parseURL('https://mlaiaus.substack.com/feed')
    
    const posts: SubstackPost[] = feed.items
      .slice(0, count)
      .map(item => {
        // Try the full HTML content first, preferring content:encoded if provided
        const html = (item['content:encoded'] as string | undefined) || item.content || ''
        
        return {
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          contentSnippet: item.contentSnippet || '',
          // Try to extract image from enclosure or content
          image: item.enclosure?.url || extractImageFromContent(html)
        }
      })
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    
    return NextResponse.json({ posts }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    console.error('Error fetching Substack feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Substack feed', posts: [] },
      { status: 500 }
    )
  }
} 
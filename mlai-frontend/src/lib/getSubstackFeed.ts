export interface SubstackPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  image?: string
}

export async function getSubstackPosts(count: number = 3): Promise<SubstackPost[]> {
  try {
    // Use relative URL for API calls to avoid port issues
    const response = await fetch(`/api/substack-feed?count=${count}`, {
      cache: 'no-store' // Ensure fresh data on each request
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch Substack posts')
    }
    
    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error('Error fetching Substack feed:', error)
    return []
  }
} 
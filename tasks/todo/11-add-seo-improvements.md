---
name: Task
about: Create a new task
title: "[TASK] Add SEO improvements and meta tags"
labels: task, seo, marketing
assignees: ''
---

## Description
While the site has basic meta tags, there are opportunities to improve SEO with structured data, sitemap, robots.txt, and better meta tag management for individual pages.

## Acceptance Criteria
- [ ] Add dynamic meta tags for each page
- [ ] Implement JSON-LD structured data
- [ ] Create XML sitemap
- [ ] Add robots.txt file
- [ ] Implement Open Graph tags for all pages
- [ ] Add canonical URLs
- [ ] Optimize page titles and descriptions

## Technical Details
1. **Dynamic meta tags for pages**:
```typescript
// In each page.tsx
export const metadata: Metadata = {
  title: 'Events - MLAI',
  description: 'Join upcoming AI and machine learning events in Australia',
  openGraph: {
    title: 'Events - MLAI',
    description: 'Join upcoming AI and machine learning events in Australia',
    images: ['/events-og-image.jpg'],
  },
};
```

2. **Add structured data** (`src/components/StructuredData.tsx`):
```typescript
export function EventStructuredData({ event }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "startDate": event.startDate,
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": event.eventLocation.address
    },
    "organizer": {
      "@type": "Organization",
      "name": "MLAI",
      "url": "https://mlai.au"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

3. **Create sitemap** (`public/sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mlai.au/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mlai.au/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mlai.au/hackathon</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

4. **Update robots.txt** (`public/robots.txt`):
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://mlai.au/sitemap.xml
```

## Related Issues
- Improves search engine visibility
- Better social media sharing
- Increased organic traffic
- Better indexing of content

## Additional Notes
- Consider implementing dynamic sitemap generation
- Add breadcrumb structured data for better navigation
- Monitor Core Web Vitals for SEO impact
- Set up Google Search Console
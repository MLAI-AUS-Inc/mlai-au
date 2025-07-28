---
name: Task
about: Create a new task
title: "[TASK] Add search functionality for events and content"
labels: task, ui/ux, feature, search
assignees: ''
---

## Description
Users cannot search for specific events, topics, or content on the site. Implement search functionality with filters and instant results to improve content discovery.

## Acceptance Criteria
- [ ] Add global search bar in header
- [ ] Implement event search with filters (date, location, type)
- [ ] Add instant search suggestions as user types
- [ ] Create dedicated search results page
- [ ] Index all searchable content
- [ ] Add keyboard shortcuts (Cmd/Ctrl + K)
- [ ] Track search analytics

## Technical Details
1. **Create Search Component** (`src/components/Search.tsx`):
```typescript
import { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-auto text-xs bg-white rounded px-1.5 py-0.5">⌘K</kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search events, speakers, topics..."
            className="w-full px-4 py-3 border-b"
          />

          <Command.List className="max-h-96 overflow-auto p-4">
            {results.length === 0 && query && (
              <Command.Empty>No results found.</Command.Empty>
            )}

            <Command.Group heading="Events">
              {results.filter(r => r.type === 'event').map((result) => (
                <Command.Item
                  key={result.id}
                  onSelect={() => {
                    window.location.href = result.url;
                    setOpen(false);
                  }}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-gray-600">{result.date}</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
```

2. **Create Search API** (`src/app/api/search/route.ts`):
```typescript
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const filters = {
    type: searchParams.get('type'),
    location: searchParams.get('location'),
    dateFrom: searchParams.get('from'),
    dateTo: searchParams.get('to'),
  };

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Search implementation
  const results = await searchContent(query, filters);

  return NextResponse.json({ 
    results,
    total: results.length,
    query,
    filters 
  });
}

async function searchContent(query: string, filters: any) {
  // Search events
  const events = await searchEvents(query, filters);
  
  // Search static content
  const pages = searchStaticPages(query);
  
  // Combine and rank results
  return [...events, ...pages].sort((a, b) => b.score - a.score);
}
```

3. **Add Search Results Page** (`src/app/search/page.tsx`):
```typescript
export default function SearchPage({ searchParams }) {
  const { q, type, location } = searchParams;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search results for "{q}"
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchFilters />
        </aside>
        
        <main className="lg:col-span-3">
          <SearchResults query={q} filters={{ type, location }} />
        </main>
      </div>
    </div>
  );
}
```

## Related Issues
- Users can't find specific events
- No way to discover past content
- Poor information architecture
- Reduced engagement due to navigation friction

## Additional Notes
- Consider using Algolia or ElasticSearch for advanced search
- Implement search analytics to understand user needs
- Add search suggestions based on popular queries
- Consider fuzzy matching for typos
- Cache search results for performance
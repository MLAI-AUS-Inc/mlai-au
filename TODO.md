- [x] Populate this list
- [x] Keep TODO.md updated when multi-step changes, and update as steps are completed

## Upstream Migration Tasks (from upstream-diff.txt)

### New Features to Migrate
- [x] Add Notion integration for events management
  - [x] Add @notionhq/client dependency to package.json
  - [x] Create Notion events API route (migrate from /api/notion-events/route.ts)
  - [x] Create Luma events API route (migrate from /api/luma-events/route.ts)

### New Pages to Migrate
- [x] Create Luma Events page (migrate from /luma-events/page.tsx)
  - [x] Convert Next.js page to React Router v7 route
  - [x] Update data loading from getServerSideProps to loader function
  - [x] Add route to routes.ts

### Component Updates
- [x] Update floating-socials.tsx with new social links (LinkedIn URL updated)
- [x] Update footer.tsx with latest changes (already up to date)
- [x] Update header.tsx navigation items (already up to date)
- [-] Update newsletter-banner.tsx styling (component doesn't exist in current project)
- [x] Update sticky-slack-button.tsx (Slack URL updated)
- [x] Update feature.tsx component (Slack URL updated)

### Contact Page Updates
- [x] Update contact page with latest changes from upstream (Slack URL updated)

### Database Scripts (Optional - for reference)
- [ ] Review create-events-database.js for Notion setup patterns
- [ ] Review delete-invalid-events.js for cleanup patterns
- [ ] Review remove-duplicate-events.js for deduplication patterns

### Priority Order (Easiest First)
1. [x] Component updates (floating-socials, footer, header, etc.)
2. [x] Contact page updates
3. [x] Package.json dependency updates
4. [x] New Luma Events page creation
5. [x] API routes creation with proper React Router v7 loaders

### Completed Tasks Summary
- Updated all Slack invite URLs from mlai-au to mlai-aus workspace
- Updated LinkedIn company URL to mlai-aus-inc
- Added @notionhq/client dependency
- All component updates completed except newsletter-banner (doesn't exist)
- Contact page Slack URL updated

### Recently Completed
- Created Luma Events page with React Router v7 loader pattern at /luma-events
- Converted Next.js client component to React Router v7 route with loader function
- Added route configuration to routes.ts
- Created API resource routes for Notion and Luma events integration
- Migrated Next.js API routes to React Router v7 resource routes
- Updated Luma Events page loader to fetch from Notion API route

### Migration Complete! 🎉
All upstream changes have been successfully migrated to React Router v7:
- ✅ All component updates (Slack URLs, LinkedIn URL)
- ✅ Package.json dependencies added
- ✅ Contact page updates
- ✅ New Luma Events page with loader pattern
- ✅ API routes for Notion and Luma integration
- ✅ Proper React Router v7 architecture patterns
- ✅ All TypeScript errors resolved
- ✅ Cloudflare Workers global scope issue fixed

### Technical Details
**Migration Transformations Applied:**
- Converted Next.js API routes to React Router v7 resource routes
- Used `Response.json()` instead of Next.js `NextResponse.json()`
- Replaced `useEffect` data fetching with loader functions
- Updated import paths to use `~` instead of `@` as root alias
- Maintained all original functionality while adapting to new architecture

**Files Created/Modified:**
- `/app/routes/luma-events.tsx` - New Luma events page with loader
- `/app/routes/api.luma-events.tsx` - Luma API resource route
- `/app/routes/api.notion-events.tsx` - Notion API resource route  
- `/app/routes.ts` - Added new routes
- `/package.json` - Added @notionhq/client dependency
- Multiple components - Updated Slack URLs and LinkedIn URLs

The migration is complete and ready for deployment! 🚀

### Cloudflare Workers Global Scope Fix 🔧

**Issue Fixed:** "Disallowed operation called within global scope" error in production
- **Root Cause:** Three.js imports in `AnimatedBackground.tsx` were creating objects (like `AbortController`) at module load time
- **Solution:** Made Three.js imports lazy and client-side only using dynamic imports within useEffect
- **Files Modified:** 
  - `/app/components/hackathon/AnimatedBackground.tsx` - Converted to lazy imports with client-side checks
- **Technical Details:**
  - Replaced static imports with `import()` calls inside useEffect
  - Added client-side rendering check with useState to prevent SSR issues
  - Added proper cleanup for Three.js objects
  - All Three.js code now only runs in browser context, not during server-side rendering or Worker initialization

This ensures the Hackathon page (and all pages) will work correctly in Cloudflare Workers production environment.

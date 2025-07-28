---
name: Task
about: Create a new task
title: "[TASK] Implement proper loading states with skeleton screens"
labels: task, ui/ux, performance, user-experience
assignees: ''
---

## Description
The application shows minimal loading feedback ("Loading scores..." text), leading to poor perceived performance. Implement skeleton screens and loading states for better UX.

## Acceptance Criteria
- [ ] Create reusable skeleton components
- [ ] Replace text loading indicators with skeleton screens
- [ ] Add loading states for all async operations
- [ ] Implement progressive loading (show content as it arrives)
- [ ] Add shimmer effects to loading skeletons
- [ ] Ensure smooth transitions from loading to loaded states

## Technical Details
1. **Create Skeleton Component** (`src/components/ui/Skeleton.tsx`):
```typescript
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden">
      <Skeleton className="h-60 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
```

2. **Update Events Component**:
```typescript
if (loading) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
```

3. **Add Leaderboard Skeleton**:
```typescript
export function LeaderboardSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      ))}
    </div>
  )
}
```

4. **Add Shimmer Effect**:
```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

## Related Issues
- Poor perceived performance
- Users unsure if content is loading
- Jarring content shifts when data loads
- No feedback during slow connections

## Additional Notes
- Consider implementing React Suspense for data fetching
- Add error boundaries with retry options
- Monitor loading times to optimize skeleton duration
- Document loading state patterns for consistency
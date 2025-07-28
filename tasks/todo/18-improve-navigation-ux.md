---
name: Task
about: Create a new task
title: "[TASK] Improve navigation UX with active states and better organization"
labels: task, ui/ux, navigation, accessibility
assignees: ''
---

## Description
Navigation lacks active state indicators, has duplicate links, uses broken hash navigation, and doesn't provide clear user paths. Improve the navigation system for better user orientation and experience.

## Acceptance Criteria
- [ ] Add active state indicators to show current page
- [ ] Fix hash navigation for single-page sections
- [ ] Remove duplicate navigation links
- [ ] Add breadcrumbs for deep pages
- [ ] Implement smooth scroll for anchor links
- [ ] Add "back to top" button
- [ ] Organize navigation hierarchy clearly

## Technical Details
1. **Update Header with Active States** (`src/components/header.tsx`):
```typescript
'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/#events' },
  { name: 'Hackathon', href: '/hackathon' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-x-6">
      {navigation.map((item) => {
        const isActive = item.href === '/' 
          ? pathname === '/' 
          : pathname.startsWith(item.href.replace('/#', ''));
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'text-sm font-semibold transition-colors relative',
              isActive 
                ? 'text-teal-600' 
                : 'text-gray-900 hover:text-teal-600'
            )}
            onClick={(e) => handleSmoothScroll(e, item.href)}
          >
            {item.name}
            {isActive && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600"
                layoutId="navbar-indicator"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
```

2. **Add Smooth Scroll Handler**:
```typescript
function handleSmoothScroll(e: React.MouseEvent, href: string) {
  if (href.includes('#')) {
    e.preventDefault();
    const [path, hash] = href.split('#');
    
    if (path === '' || path === window.location.pathname) {
      // Same page anchor
      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Different page with anchor
      window.location.href = href;
    }
  }
}
```

3. **Create Breadcrumbs Component** (`src/components/Breadcrumbs.tsx`):
```typescript
export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const title = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={segment} className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
              {isLast ? (
                <span className="text-gray-900 font-medium">{title}</span>
              ) : (
                <Link href={href} className="text-gray-500 hover:text-gray-700">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

4. **Add Back to Top Button** (`src/components/BackToTop.tsx`):
```typescript
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

## Related Issues
- Users get lost without navigation context
- Broken anchor links frustrate users
- Poor accessibility for keyboard navigation
- Duplicate links confuse users

## Additional Notes
- Consider implementing a sitemap component
- Add keyboard navigation shortcuts
- Test with screen readers
- Consider sticky navigation on scroll
- Add navigation animations for better UX
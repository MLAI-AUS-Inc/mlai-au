---
name: Task
about: Create a new task
title: "[TASK] Create a design system for consistent UI"
labels: task, ui/ux, design-system, frontend
assignees: ''
---

## Description
The application has inconsistent button styles, spacing, colors, and typography. Create a design system with reusable components to ensure visual consistency across the application.

## Acceptance Criteria
- [x] Create a component library with all UI primitives
- [x] Define consistent color palette with semantic naming
- [x] Establish typography scale and usage guidelines
- [x] Create spacing system (4px/8px grid)
- [x] Build reusable button, card, and form components
- [ ] Document all components with examples
- [x] Migrate existing components to use design system

## Technical Details
1. **Create Theme Configuration** (`src/lib/theme.ts`):
```typescript
export const theme = {
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // Main teal
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    gray: {
      // Define consistent gray scale
    },
    semantic: {
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
      info: '#3b82f6',
    }
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
  },
  typography: {
    h1: 'text-4xl sm:text-5xl font-bold',
    h2: 'text-3xl sm:text-4xl font-bold',
    h3: 'text-2xl sm:text-3xl font-semibold',
    body: 'text-base sm:text-lg',
    small: 'text-sm',
  }
}
```

2. **Create Button Component** (`src/components/ui/Button.tsx`):
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(
        'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50',
        variants[variant],
        sizes[size]
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}
```

3. **Create Card Component** (`src/components/ui/Card.tsx`):
```typescript
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  )
}
```

4. **Update Tailwind Config**:
```javascript
// Use CSS variables for dynamic theming
extend: {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
  }
}
```

## Related Issues
- Inconsistent UI reduces professionalism
- Harder to maintain without standards
- Longer development time recreating components
- Poor accessibility without consistent patterns

## Additional Notes
- Consider using Storybook for component documentation
- Add visual regression testing
- Create Figma design tokens for designer handoff
- Ensure all components are accessible by default

## Status Update

### Completed Implementation:
✅ **All 6 threads have been successfully implemented!**

1. **Core Design System Setup** - Theme configuration, utilities, and CSS variables are in place
2. **Button Component System** - Button and ButtonLink components created and integrated
3. **Card and Container Components** - Full suite of layout components implemented
4. **Typography System** - Complete typography component set with consistent spacing
5. **Form Components** - All form inputs created with error states and accessibility
6. **Loading and Feedback** - Spinner, Alert, and Toast components implemented

### Components Created:
- `/src/lib/theme.ts` - Comprehensive theme configuration
- `/src/lib/utils.ts` - Utility functions including `cn()`
- `/src/components/ui/Button.tsx` - Button and ButtonLink components
- `/src/components/ui/Card.tsx` - Card system with variants
- `/src/components/ui/Container.tsx` - Layout containers
- `/src/components/ui/Typography.tsx` - H1-H6, Body, Lead, Small, Caption
- `/src/components/ui/Input.tsx` - Text input with error states
- `/src/components/ui/Label.tsx` - Form labels
- `/src/components/ui/Select.tsx` - Dropdown select
- `/src/components/ui/Textarea.tsx` - Multi-line text input
- `/src/components/ui/Spinner.tsx` - Loading spinners
- `/src/components/ui/Alert.tsx` - Alert notifications
- `/src/components/ui/Toast.tsx` - Toast notifications

### Components Already Migrated:
- `hero.tsx` - Using ButtonLink and Typography
- `CTA.tsx` - Using ButtonLink and Typography
- `events.tsx` - Using Card, Container, Button, and Spinner
- `newsletter.tsx` - Using Typography
- `Leaderboard.tsx` - Using Spinner

### Remaining Work:
- Component documentation with Storybook or similar tool
- Additional component migrations as needed

## Threads for Parallel Development

### Thread 1: Core Design System Setup ✅ COMPLETED
**Files to edit:**
- `/src/lib/theme.ts` (create new)
- `/src/lib/utils.ts` (create new)
- `/tailwind.config.ts` (modify)
- `/src/app/globals.css` (modify)

**Prompt for new Claude instance:**
```
This is part of a larger design system implementation. Please read the full context at @tasks/todo/15-create-design-system.md

I need you to set up the core design system for our Next.js + Tailwind CSS application. The app already uses Tailwind and Flowbite.

Please:
1. Create `/src/lib/theme.ts` with a theme configuration object containing:
   - Consistent color palette (primary using teal shades, semantic colors)
   - Spacing system based on 8px grid
   - Typography scale
2. Create `/src/lib/utils.ts` with a `cn()` utility function for merging classNames (using clsx + tailwind-merge)
3. Update `tailwind.config.ts` to use CSS custom properties for dynamic theming
4. Update `/src/app/globals.css` to define CSS custom properties for the theme

The app currently has inconsistent teal colors (teal-200, teal-300, teal-400, teal-500) that need standardization.
```

### Thread 2: Button Component System
**Files to edit:**
- `/src/components/ui/Button.tsx` (create new)
- `/src/components/CTA.tsx` (refactor)
- `/src/components/hero.tsx` (refactor)
- Any other files using button-like elements

**Prompt for new Claude instance:**
```
This is part of a larger design system implementation. Please read the full context at @tasks/todo/15-create-design-system.md

I need you to create a reusable Button component system and refactor existing buttons to use it.

Current state: The app has inconsistent button styles across components. For example:
- Some use "hover:bg-teal-300" while others use "hover:bg-teal-600"
- Different padding values (px-3.5 py-2.5 vs px-4 py-2)
- Mix of <a> tags and potential <button> elements for CTAs

Please:
1. Create `/src/components/ui/Button.tsx` with:
   - Variants: primary, secondary, ghost, danger
   - Sizes: sm, md, lg
   - Support for loading states
   - Proper TypeScript types
   - Works as both button and link (polymorphic)
2. Refactor `/src/components/CTA.tsx` to use the new Button component
3. Refactor `/src/components/hero.tsx` to use the new Button component
4. Search for other button-like elements and refactor them

Use Tailwind classes and ensure consistency with the design system.
```

### Thread 3: Card and Container Components
**Files to edit:**
- `/src/components/ui/Card.tsx` (create new)
- `/src/components/ui/Container.tsx` (create new)
- `/src/components/events.tsx` (refactor)
- `/src/components/testimonials.tsx` (refactor)
- `/src/components/flagshipevents.tsx` (refactor)

**Prompt for new Claude instance:**
```
This is part of a larger design system implementation. Please read the full context at @tasks/todo/15-create-design-system.md

I need you to create reusable Card and Container components and refactor existing card-like elements.

The app has many card-like components with inconsistent styling:
- Event cards in events.tsx
- Testimonial cards in testimonials.tsx
- Feature cards in flagshipevents.tsx

Please:
1. Create `/src/components/ui/Card.tsx` with variants for different card types
2. Create `/src/components/ui/Container.tsx` for consistent max-width containers
3. Refactor the event cards in `/src/components/events.tsx`
4. Refactor testimonial cards in `/src/components/testimonials.tsx`
5. Refactor flagship event cards in `/src/components/flagshipevents.tsx`

Ensure all cards have consistent shadows, borders, hover states, and spacing using Tailwind.
```

### Thread 4: Typography and Spacing System
**Files to edit:**
- `/src/components/ui/Typography.tsx` (create new)
- `/src/app/page.tsx` (refactor headings)
- `/src/app/about/page.tsx` (refactor)
- `/src/app/hackathon/page.tsx` (refactor)
- All other pages with headings

**Prompt for new Claude instance:**
```
This is part of a larger design system implementation. Please read the full context at @tasks/todo/15-create-design-system.md

I need you to create a Typography component system and standardize headings/text across the app.

Current issues:
- Inconsistent heading sizes (text-3xl vs text-4xl for similar headings)
- Different spacing between sections (py-24 vs py-32 vs py-16)
- No consistent text color system

Please:
1. Create `/src/components/ui/Typography.tsx` with components for:
   - H1, H2, H3, H4 headings
   - Body, Lead, Small text variants
   - Consistent responsive sizing
2. Refactor all headings in `/src/app/page.tsx`
3. Refactor headings in `/src/app/about/page.tsx`
4. Refactor headings in `/src/app/hackathon/page.tsx`
5. Standardize section spacing (recommend py-16 sm:py-24 pattern)

Use Tailwind's typography utilities and ensure mobile responsiveness.
```

### Thread 5: Form Components
**Files to edit:**
- `/src/components/ui/Input.tsx` (create new)
- `/src/components/ui/Label.tsx` (create new)
- `/src/components/ui/Select.tsx` (create new)
- `/src/components/ui/Textarea.tsx` (create new)
- `/src/components/newsletter.tsx` (refactor if it has forms)

**Prompt for new Claude instance:**
```
This is part of a larger design system implementation. Please read the full context at @tasks/todo/15-create-design-system.md

I need you to create a form component system for consistent form styling.

The app currently uses external forms (Google Forms, Substack) but needs native form components for future use.

Please create:
1. `/src/components/ui/Input.tsx` - Text input component with error states
2. `/src/components/ui/Label.tsx` - Form label component
3. `/src/components/ui/Select.tsx` - Dropdown select component
4. `/src/components/ui/Textarea.tsx` - Multi-line text input
5. Update any existing form elements to use these components

Each component should:
- Use Tailwind form plugin styles
- Support error states with red borders/text
- Include focus states with teal-500 ring
- Be fully accessible with proper labels
- Support disabled states
```

### Thread 6: Loading and Feedback Components
**Files to edit:**
- `/src/components/ui/Spinner.tsx` (create new)
- `/src/components/ui/Alert.tsx` (create new)
- `/src/components/ui/Toast.tsx` (create new)
- `/src/components/events.tsx` (add loading states)
- `/src/app/hackathon/components/Leaderboard.tsx` (add loading states)

**Prompt for new Claude instance:**
```
This is part of a larger design system implementation. Please read the full context at @tasks/todo/15-create-design-system.md

I need you to create loading and feedback components and implement them where needed.

Current state: The app shows "Loading scores..." text instead of proper loading indicators.

Please:
1. Create `/src/components/ui/Spinner.tsx` - Loading spinner component
2. Create `/src/components/ui/Alert.tsx` - Alert/notification component (success, error, warning, info variants)
3. Create `/src/components/ui/Toast.tsx` - Toast notification system
4. Update `/src/components/events.tsx` to use Spinner while loading
5. Update the Leaderboard component to use proper loading states

Use Tailwind's animation utilities for smooth transitions and ensure consistent styling with the teal color palette.
```
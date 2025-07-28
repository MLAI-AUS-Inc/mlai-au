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
- [ ] Create a component library with all UI primitives
- [ ] Define consistent color palette with semantic naming
- [ ] Establish typography scale and usage guidelines
- [ ] Create spacing system (4px/8px grid)
- [ ] Build reusable button, card, and form components
- [ ] Document all components with examples
- [ ] Migrate existing components to use design system

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
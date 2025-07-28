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
      950: '#042f2e',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    semantic: {
      error: {
        light: '#fee2e2',
        DEFAULT: '#ef4444',
        dark: '#dc2626',
      },
      warning: {
        light: '#fef3c7',
        DEFAULT: '#f59e0b',
        dark: '#d97706',
      },
      success: {
        light: '#d1fae5',
        DEFAULT: '#10b981',
        dark: '#059669',
      },
      info: {
        light: '#dbeafe',
        DEFAULT: '#3b82f6',
        dark: '#2563eb',
      },
    },
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '5rem',  // 80px
    '4xl': '6rem',  // 96px
  },
  typography: {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
    h3: 'text-2xl sm:text-3xl lg:text-4xl font-semibold',
    h4: 'text-xl sm:text-2xl lg:text-3xl font-semibold',
    h5: 'text-lg sm:text-xl lg:text-2xl font-medium',
    h6: 'text-base sm:text-lg lg:text-xl font-medium',
    body: 'text-base sm:text-lg leading-relaxed',
    bodySmall: 'text-sm sm:text-base leading-relaxed',
    caption: 'text-xs sm:text-sm text-gray-600',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
} as const

export type Theme = typeof theme
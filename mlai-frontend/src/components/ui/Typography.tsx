import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  as?: React.ElementType
}

export function H1({ children, className, as: Component = 'h1', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H2({ children, className, as: Component = 'h2', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H3({ children, className, as: Component = 'h3', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H4({ children, className, as: Component = 'h4', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H5({ children, className, as: Component = 'h5', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-lg sm:text-xl lg:text-2xl font-medium text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H6({ children, className, as: Component = 'h6', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-base sm:text-lg lg:text-xl font-medium text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Body({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-base sm:text-lg leading-relaxed text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Lead({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Small({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-sm sm:text-base leading-relaxed text-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Caption({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-xs sm:text-sm text-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
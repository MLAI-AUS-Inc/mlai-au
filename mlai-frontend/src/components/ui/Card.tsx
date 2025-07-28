import React from 'react';

type CardVariant = 'default' | 'event' | 'testimonial' | 'feature' | 'elevated';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  children: React.ReactNode;
  as?: 'div' | 'article' | 'figure';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white rounded-lg border border-gray-200 shadow-sm',
  event: 'bg-gray-900 rounded-3xl shadow-lg overflow-hidden relative isolate',
  testimonial: 'bg-white rounded-2xl shadow-lg ring-1 ring-gray-900/5',
  feature: 'bg-gray-900 rounded-2xl overflow-hidden relative isolate',
  elevated: 'bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5',
};

const hoverStyles: Record<CardVariant, string> = {
  default: 'hover:shadow-md transition-shadow duration-150',
  event: 'hover:opacity-90 transition-opacity duration-150',
  testimonial: 'hover:shadow-xl transition-shadow duration-200',
  feature: 'hover:opacity-90 transition-opacity duration-150',
  elevated: 'hover:shadow-2xl transition-shadow duration-200',
};

export function Card({ 
  variant = 'default', 
  hover = true,
  children, 
  className = '',
  as: Component = 'div',
  ...props 
}: CardProps) {
  const baseStyles = variantStyles[variant];
  const hoverStyle = hover ? hoverStyles[variant] : '';
  
  return (
    <Component 
      className={`${baseStyles} ${hoverStyle} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  overlay?: boolean;
  gradient?: boolean;
}

export function CardImage({ 
  overlay = false, 
  gradient = false,
  className = '', 
  ...props 
}: CardImageProps) {
  return (
    <>
      <img 
        className={`absolute inset-0 -z-10 h-full w-full object-cover ${className}`.trim()} 
        {...props} 
      />
      {gradient && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      )}
      <div className="absolute inset-0 -z-10 ring-1 ring-inset ring-gray-900/10" />
    </>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export function CardContent({ 
  padded = true, 
  className = '', 
  children,
  ...props 
}: CardContentProps) {
  const padding = padded ? 'p-6 sm:p-8' : '';
  
  return (
    <div className={`${padding} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ 
  className = '', 
  children,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  className = '', 
  children,
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-lg font-semibold leading-6 ${className}`.trim()} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  className = '', 
  children,
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-gray-600 ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}

export function CardFooter({ 
  className = '', 
  children,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-6 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
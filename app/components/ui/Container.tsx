import React from "react";

type ContainerVariant = "default" | "narrow" | "wide" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ContainerVariant;
  padded?: boolean;
  children: React.ReactNode;
  as?: "div" | "section" | "main" | "article";
}

const variantStyles: Record<ContainerVariant, string> = {
  default: "max-w-7xl",
  narrow: "max-w-2xl",
  wide: "max-w-screen-2xl",
  full: "max-w-none",
};

export function Container({
  variant = "default",
  padded = true,
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  const maxWidth = variantStyles[variant];
  const padding = padded ? "px-6 lg:px-8" : "";

  return (
    <Component
      className={`mx-auto ${maxWidth} ${padding} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ContainerVariant;
  padded?: boolean;
  children: React.ReactNode;
}

export function Section({
  variant = "default",
  padded = true,
  children,
  className = "",
  ...props
}: SectionProps) {
  const verticalPadding = padded ? "py-24 sm:py-32" : "";

  return (
    <section className={`${verticalPadding} ${className}`.trim()} {...props}>
      <Container variant={variant} padded={padded}>
        {children}
      </Container>
    </section>
  );
}

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({
  children,
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <div className={`bg-white ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const gridColsStyles: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
};

const gapStyles: Record<string, string> = {
  sm: "gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
};

export function GridContainer({
  cols = 3,
  gap = "md",
  children,
  className = "",
  ...props
}: GridContainerProps) {
  const gridCols = gridColsStyles[cols];
  const gapSize = gapStyles[gap];

  return (
    <div
      className={`grid ${gridCols} ${gapSize} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

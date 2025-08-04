import React from "react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "default" | "light" | "dark";

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const variantStyles: Record<SpinnerVariant, string> = {
  default: "text-teal-500",
  light: "text-white",
  dark: "text-gray-900",
};

export function Spinner({
  size = "md",
  variant = "default",
  className = "",
  label = "Loading...",
}: SpinnerProps) {
  const sizeClass = sizeStyles[size];
  const variantClass = variantStyles[variant];

  return (
    <div className={`inline-flex items-center ${className}`.trim()}>
      <svg
        className={`animate-spin ${sizeClass} ${variantClass}`.trim()}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface LoadingOverlayProps {
  children?: React.ReactNode;
  loading?: boolean;
  fullScreen?: boolean;
  blur?: boolean;
  spinnerSize?: SpinnerSize;
  message?: string;
}

export function LoadingOverlay({
  children,
  loading = true,
  fullScreen = false,
  blur = true,
  spinnerSize = "lg",
  message,
}: LoadingOverlayProps) {
  if (!loading && children) return <>{children}</>;

  const positionClass = fullScreen ? "fixed inset-0" : "absolute inset-0";

  const blurClass = blur ? "backdrop-blur-sm" : "";

  return (
    <div className="relative">
      {children}
      {loading && (
        <div
          className={`${positionClass} z-50 flex items-center justify-center bg-white/60 ${blurClass}`.trim()}
        >
          <div className="flex flex-col items-center space-y-4">
            <Spinner size={spinnerSize} />
            {message && (
              <p className="text-sm font-medium text-gray-700">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface SpinnerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  spinnerSize?: SpinnerSize;
  children: React.ReactNode;
}

export function SpinnerButton({
  loading = false,
  spinnerSize = "sm",
  children,
  disabled,
  className = "",
  ...props
}: SpinnerButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={`relative ${className}`.trim()}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={spinnerSize} variant="light" />
        </span>
      )}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
}

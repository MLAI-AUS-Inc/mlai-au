import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorMessage, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
            "placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-teal-500 focus:ring-teal-500",
            disabled && "bg-gray-100",
            className,
          )}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${props.id}-error` : undefined}
          {...props}
        />
        {errorMessage && (
          <p
            id={`${props.id}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

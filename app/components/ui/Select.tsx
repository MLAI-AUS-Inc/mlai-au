import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      children,
      error,
      errorMessage,
      placeholder,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            'appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E")] bg-[length:1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10',
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
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

Select.displayName = "Select";

export { Select };

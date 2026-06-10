import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatKw(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = value.toFixed(fractionDigits);
  return `${rounded} MW`;
}

export function formatPercent(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatCurrency(value: number, fractionDigits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return `$${value.toFixed(fractionDigits)}`;
}

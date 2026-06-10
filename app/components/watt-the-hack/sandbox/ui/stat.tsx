"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "~/lib/watt-the-hack-sandbox/utils";

interface StatProps {
  label: string;
  value: string;
  hint?: string;
  className?: string;
  positive?: boolean;
}

export function Stat({ label, value, hint, className, positive }: StatProps) {
  const [previous, setPrevious] = useState(value);
  useEffect(() => {
    if (previous !== value) {
      setPrevious(value);
    }
  }, [previous, value]);

  return (
    <div className={cn("flex items-baseline justify-between gap-3", className)}>
      <span className="label">{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0.3, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={cn(
          "value",
          positive === true && "text-positive",
          positive === false && "text-danger",
        )}
      >
        {value}
        {hint ? (
          <span className="ml-1 text-[10px] text-muted">{hint}</span>
        ) : null}
      </motion.span>
    </div>
  );
}

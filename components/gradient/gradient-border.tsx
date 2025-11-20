"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  animated?: boolean;
}

/**
 * GradientBorder - Wraps content with a gradient border
 * 
 * Usage:
 * ```tsx
 * <GradientBorder rounded="lg">
 *   <div className="p-4">Your content here</div>
 * </GradientBorder>
 * ```
 */
export function GradientBorder({
  children,
  className,
  borderWidth = 1,
  rounded = "lg",
  animated = false,
}: GradientBorderProps) {
  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "relative",
        roundedClasses[rounded],
        className
      )}
      style={{ padding: `${borderWidth}px` }}
    >
      {/* Gradient border background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20",
          roundedClasses[rounded],
          animated && "animate-gradient-rotate"
        )}
      />
      
      {/* Content container */}
      <div
        className={cn(
          "relative bg-background",
          roundedClasses[rounded]
        )}
      >
        {children}
      </div>
    </div>
  );
}


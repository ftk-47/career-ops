"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientType = 
  | "subtle" 
  | "radial" 
  | "accent" 
  | "hero" 
  | "card" 
  | "glow"
  | "primary"
  | "secondary";

interface GradientBackgroundProps {
  children: ReactNode;
  type?: GradientType;
  className?: string;
  intensity?: "low" | "medium" | "high";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

/**
 * GradientBackground - Configurable gradient backgrounds
 * 
 * Usage:
 * ```tsx
 * <GradientBackground type="hero" intensity="medium" position="top-left">
 *   <div className="p-8">Your content here</div>
 * </GradientBackground>
 * ```
 */
export function GradientBackground({
  children,
  type = "subtle",
  className,
  intensity = "medium",
  position = "top-left",
}: GradientBackgroundProps) {
  const intensityOpacity = {
    low: "opacity-30",
    medium: "opacity-60",
    high: "opacity-90",
  };

  const positionClasses = {
    "top-left": "bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))]",
    "top-right": "bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))]",
    "bottom-left": "bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))]",
    "bottom-right": "bg-[radial-gradient(circle_at_bottom_right,var(--tw-gradient-stops))]",
    center: "bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]",
  };

  const gradientClasses = {
    subtle: "bg-gradient-subtle",
    radial: "bg-gradient-radial",
    accent: "bg-gradient-accent",
    hero: "bg-gradient-hero",
    card: "bg-gradient-card",
    glow: "bg-gradient-glow",
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient layer */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          type === "radial" || type === "glow" || type === "hero"
            ? positionClasses[position]
            : gradientClasses[type],
          intensityOpacity[intensity]
        )}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}


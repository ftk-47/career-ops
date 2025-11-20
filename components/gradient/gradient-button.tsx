"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  size?: "sm" | "default" | "lg";
  className?: string;
  disabled?: boolean;
  shine?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * GradientButton - Pre-built gradient CTA button with optional shine effect
 * 
 * Usage:
 * ```tsx
 * <GradientButton 
 *   icon={Plus} 
 *   iconPosition="left" 
 *   shine={true}
 *   onClick={() => console.log('clicked')}
 * >
 *   Get Started
 * </GradientButton>
 * ```
 */
export function GradientButton({
  children,
  onClick,
  icon: Icon,
  iconPosition = "left",
  size = "default",
  className,
  disabled = false,
  shine = false,
  type = "button",
}: GradientButtonProps) {
  return (
    <Button
      type={type}
      variant="gradient"
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        shine && "before:opacity-100",
        className
      )}
    >
      {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
    </Button>
  );
}


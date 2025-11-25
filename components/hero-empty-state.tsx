"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/gradient/gradient-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface HeroEmptyStateProps {
  headline: string;
  subtext: string;
  primaryAction: {
    label: string;
    icon?: React.ReactNode; // For emoji or icon
    tooltip?: string;
    onClick: () => void;
  };
  secondaryAction: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function HeroEmptyState({
  headline,
  subtext,
  primaryAction,
  secondaryAction,
  className,
}: HeroEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background opacity-80" />
      
      {/* Soft gradient circles in background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial-center opacity-20 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-radial-center opacity-15 blur-3xl" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 px-6">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6"
        >
          <div className="relative inline-flex">
            {/* Gradient glow behind icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl scale-150 opacity-60" />
            {/* Icon container with gradient background */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 ring-2 ring-primary/20 shadow-lg backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
              <FileText className="relative h-10 w-10 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl font-bold tracking-tight mb-2"
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6"
        >
          {subtext}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          {/* Primary Button with optional tooltip */}
          {primaryAction.tooltip ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <GradientButton
                      size="default"
                      shine={true}
                      onClick={primaryAction.onClick}
                      className="text-sm font-semibold w-full sm:w-auto"
                    >
                      {primaryAction.icon && (
                        <span className="mr-2">{primaryAction.icon}</span>
                      )}
                      {primaryAction.label}
                    </GradientButton>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{primaryAction.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <GradientButton
              size="default"
              shine={true}
              onClick={primaryAction.onClick}
              className="text-sm font-semibold w-full sm:w-auto"
            >
              {primaryAction.icon && (
                <span className="mr-2">{primaryAction.icon}</span>
              )}
              {primaryAction.label}
            </GradientButton>
          )}

          {/* Secondary Button */}
          <Button
            size="default"
            variant="outline"
            onClick={secondaryAction.onClick}
            className="text-sm font-medium w-full sm:w-auto"
          >
            {secondaryAction.label}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

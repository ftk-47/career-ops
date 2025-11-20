"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  onClick?: () => void;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  onClick,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "rounded-lg border border-border shadow-sm transition-all duration-200 hover:shadow-md relative overflow-hidden group py-0",
        onClick && "cursor-pointer hover:border-primary/30",
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient background layer */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <CardContent className="p-3">
          {/* Horizontal Single Row Layout */}
          <div className="flex items-center gap-3">
            {/* Icon - Tallest Element */}
            {Icon && (
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-glow rounded-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-all duration-200">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            )}

            {/* Value and Description Stacked */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-lg font-bold tracking-tight tabular-nums leading-none mb-0.5">
                  {value}
                </div>
                <button
                  type="button"
                  tabIndex={-1}
                  className="ml-1 flex items-center gap-0.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto"
                  aria-label={`View details for ${title}`}
                >
                  View details
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4"/>
                  </svg>
                </button>
              </div>
              <h3 className="text-xs font-medium text-muted-foreground leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}


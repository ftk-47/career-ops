"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  description,
  icon: Icon,
  trend,
  onClick,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-border shadow-sm transition-all duration-200 hover:shadow-md relative overflow-hidden group",
        onClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient background layer */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Radial glow that intensifies on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && (
            <div className="relative">
              {/* Glow behind icon */}
              <div className="absolute inset-0 bg-gradient-glow rounded-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          {(description || trend) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.value > 0 ? "text-success" : "text-error"
                  )}
                >
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}% {trend.label}
                </span>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}


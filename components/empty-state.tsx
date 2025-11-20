"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-12 text-center relative overflow-hidden",
        className
      )}
    >
      {/* Gradient background behind card */}
      <div className="absolute inset-0 bg-gradient-empty-state opacity-80" />
      
      {/* Soft gradient circles in background */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial-center opacity-40 blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-radial-center opacity-30 blur-3xl" />
      
      <div className="relative z-10">
        {Icon && (
          <div className="mb-4 relative inline-flex">
            {/* Gradient glow behind icon */}
            <div className="absolute inset-0 bg-gradient-glow scale-150 opacity-60" />
            {/* Gradient outline on icon container */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/50 ring-1 ring-primary/20">
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick} size="lg" variant="gradient">
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
}


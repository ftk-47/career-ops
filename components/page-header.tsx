"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 overflow-hidden",
        className
      )}
    >
      {/* Radial gradient fade behind header */}
      <div className="absolute inset-0 bg-gradient-radial opacity-60 pointer-events-none" />
      
      {/* Subtle gradient divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="relative z-10 flex items-center gap-4 flex-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle sidebar</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex flex-1 items-center justify-between">
          <div className="relative">
            {/* Glow behind title */}
            <div className="absolute -inset-2 bg-gradient-glow opacity-30 blur-xl pointer-events-none" />
            <div className="relative">
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  );
}


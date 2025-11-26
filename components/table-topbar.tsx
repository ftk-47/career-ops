"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search, Filter, LucideIcon } from "lucide-react";

// Generic tab configuration
export interface TopbarTab {
  id: string;
  label: string;
  icon?: LucideIcon;
  count: number;
}

// Status tab with color configuration
export interface StatusTab {
  id: string;
  label: string;
  icon?: LucideIcon;
  count: number;
}

interface TableTopbarProps {
  // Primary tabs (Row 1) - optional
  tabs?: TopbarTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;

  // Status tabs (Row 2)
  statusTabs: StatusTab[];
  activeStatus: string;
  onStatusChange: (id: string) => void;

  // Search
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  // Filters popover content
  filtersContent?: ReactNode;
  showFilters?: boolean;
  activeFiltersCount?: number;

  // Show/hide counts
  showCounts?: boolean;
}


export function TableTopbar({
  tabs,
  activeTab,
  onTabChange,
  statusTabs,
  activeStatus,
  onStatusChange,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  filtersContent,
  showFilters = true,
  activeFiltersCount = 0,
  showCounts = true,
}: TableTopbarProps) {
  return (
    <div className="space-y-5">
      {/* Row 1: Primary Tabs (optional) */}
      {tabs && tabs.length > 0 && activeTab && onTabChange && (
        <div className="flex items-center gap-6 border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "group relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                )}
                <span>{tab.label}</span>
                {showCounts && (
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-xs tabular-nums transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {tab.count}
                  </span>
                )}

                {/* Active underline indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full transition-all duration-200",
                    isActive
                      ? "bg-primary"
                      : "bg-transparent group-hover:bg-muted-foreground/20"
                  )}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Row 2: Status Tabs + Search + More Filters */}
      <div className="flex items-center gap-4">
        {/* Status Tabs */}
        <Tabs value={activeStatus} onValueChange={onStatusChange}>
          <TabsList className="h-9 p-1">
            {statusTabs.map((status) => {
              const Icon = status.icon;

              return (
                <TabsTrigger
                  key={status.id}
                  value={status.id}
                  className="gap-1.5 px-3 text-xs"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {status.label}
                  {showCounts && (
                    <span className="ml-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground">
                      {status.count}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>

        {/* Filters Popover */}
        {showFilters && filtersContent && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 text-sm"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72">
              {filtersContent}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}


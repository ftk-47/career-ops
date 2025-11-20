"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  label: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-sm max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              onClick={action.onClick}
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 w-full">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    {/* Icon gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-glow scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <span className="font-medium">{action.label}</span>
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {action.description}
                </span>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="rounded-xl shadow-sm py-0">
      <CardContent className="p-4">
        <div className="flex flex-row gap-3 w-full">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="flex-1 h-auto flex-col items-center justify-center gap-2 p-4 text-center transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                onClick={action.onClick}
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10 w-full flex flex-col items-center gap-2">
                  <div className="relative">
                    {/* Icon gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-glow scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-medium text-sm">{action.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {action.description}
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}


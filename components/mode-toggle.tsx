"use client";

import { useMode } from "@/contexts/mode-context";
import { Button } from "@/components/ui/button";
import { UserRound, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
      <Button
        variant={mode === "director" ? "default" : "ghost"}
        size="sm"
        onClick={() => setMode("director")}
        className={`h-8 gap-2 relative ${
          mode === "director"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-transparent"
        }`}
      >
        {mode === "director" && (
          <motion.div
            layoutId="mode-indicator"
            className="absolute inset-0 bg-primary rounded-md"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Shield className="h-4 w-4 relative z-10" />
        <span className="text-sm font-medium relative z-10">Director</span>
      </Button>
      <Button
        variant={mode === "reviewer" ? "default" : "ghost"}
        size="sm"
        onClick={() => setMode("reviewer")}
        className={`h-8 gap-2 relative ${
          mode === "reviewer"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-transparent"
        }`}
      >
        {mode === "reviewer" && (
          <motion.div
            layoutId="mode-indicator"
            className="absolute inset-0 bg-primary rounded-md"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <UserRound className="h-4 w-4 relative z-10" />
        <span className="text-sm font-medium relative z-10">Reviewer</span>
      </Button>
    </div>
  );
}


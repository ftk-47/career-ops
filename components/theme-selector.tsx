"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark";

const themes = [
  {
    value: "light" as Theme,
    label: "Light Mode",
    icon: Sun,
    description: "Bright & clear",
  },
  {
    value: "dark" as Theme,
    label: "Dark Mode",
    icon: Moon,
    description: "Comfortable dark",
  },
];

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  
  // Lazy initialization - only runs once on mount
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      return savedTheme;
    }
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark");
    
    // Add the new theme class
    root.classList.add(newTheme);
  };

  useEffect(() => {
    // Apply initial theme and mark as mounted
    applyTheme(theme);
    // eslint-disable-next-line -- Legitimate use case for client-side hydration
    setMounted(true);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const currentTheme = themes.find((t) => t.value === theme);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 transition-colors hover:bg-accent"
        >
          {currentTheme && <currentTheme.icon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;
          
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => changeTheme(themeOption.value)}
              className={`cursor-pointer ${
                isActive ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center gap-3 w-full">
                <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isActive ? "text-primary" : ""}`}>
                    {themeOption.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {themeOption.description}
                  </div>
                </div>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Sparkles, Trees, Twitter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Style = "mercel" | "chirp" | "linear";

const styles = [
  {
    value: "mercel" as Style,
    label: "Mercel",
    icon: Sparkles,
    description: "Minimalist design",
    primaryColor: "oklch(0 0 0)", // Black in light mode
  },
  {
    value: "chirp" as Style,
    label: "Chirp",
    icon: Twitter,
    description: "Friendly & social",
    primaryColor: "oklch(0.60 0.20 240)", // Twitter blue
  },
  {
    value: "linear" as Style,
    label: "Linear",
    icon: Zap,
    description: "Sharp & precise",
    primaryColor: "oklch(0.57 0.18 270)", // Linear purple
  },
];

export function StyleSelector() {
  const [mounted, setMounted] = useState(false);

  // Lazy initialization - only runs once on mount
  const [style, setStyle] = useState<Style>(() => {
    if (typeof window === "undefined") return "mercel";

    const savedStyle = localStorage.getItem("style") as Style | null;
    if (savedStyle === "mercel" || savedStyle === "chirp" || savedStyle === "linear") {
      return savedStyle;
    }

    return "mercel";
  });

  const applyStyle = (newStyle: Style) => {
    const root = document.documentElement;

    // Remove all style classes
    root.classList.remove("style-mercel", "style-chirp", "style-linear");

    // Add the new style class
    root.classList.add(`style-${newStyle}`);
  };

  useEffect(() => {
    // Apply initial style and mark as mounted
    applyStyle(style);
    // eslint-disable-next-line -- Legitimate use case for client-side hydration
    setMounted(true);
  }, [style]);

  const changeStyle = (newStyle: Style) => {
    setStyle(newStyle);
    localStorage.setItem("style", newStyle);
    applyStyle(newStyle);
  };

  const currentStyle = styles.find((s) => s.value === style);

  if (!mounted) {
    return (
      <Button variant="ghost" className="h-9 gap-2">
        <Trees className="h-4 w-4" />
        <span className="text-sm font-medium">Style</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-2 transition-colors hover:bg-accent"
        >
          {currentStyle && (
            <>
              <currentStyle.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{currentStyle.label}</span>
            </>
          )}
          <span className="sr-only">Toggle style</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 ">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Style
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {styles.map((styleOption) => {
          const Icon = styleOption.icon;
          const isActive = style === styleOption.value;

          return (
            <DropdownMenuItem
              key={styleOption.value}
              onClick={() => changeStyle(styleOption.value)}
              className={`cursor-pointer mt-0.5 ${isActive ? "bg-accent" : ""
                }`}
            >
              <div className="flex items-center gap-3 w-full">
                <div 
                  className="h-5 w-5 rounded-md border border-border shrink-0"
                  style={{ backgroundColor: styleOption.primaryColor }}
                  title={`Primary color: ${styleOption.primaryColor}`}
                />
                <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isActive ? "text-primary" : ""}`}>
                    {styleOption.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {styleOption.description}
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


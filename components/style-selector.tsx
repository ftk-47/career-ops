"use client";

import { useState, useEffect } from "react";
import { FileText, Flame, Gem, Globe, Layers, Sparkles, Snowflake, Trees, Twitter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Style = "mercel" | "chirp" | "linear" | "winter" | "ggm" | "nexus" | "horizon" | "notion" | "slate" | "azure" | "onyx";

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
  {
    value: "winter" as Style,
    label: "Winter",
    icon: Snowflake,
    description: "Cool & crisp",
    primaryColor: "hsl(211, 100%, 50%)", // Winter blue
  },
  {
    value: "ggm" as Style,
    label: "GGM",
    icon: Gem,
    description: "Modern & elegant",
    primaryColor: "oklch(0.488 0.243 264.376)", // Purple
  },
  {
    value: "nexus" as Style,
    label: "Nexus",
    icon: Flame,
    description: "Bold & vibrant",
    primaryColor: "hsl(0, 85%, 55%)", // Vibrant red
  },
  {
    value: "horizon" as Style,
    label: "Horizon",
    icon: Globe,
    description: "Modern & sleek",
    primaryColor: "#0099ff", // Bright blue
  },
  {
    value: "notion" as Style,
    label: "Noted",
    icon: FileText,
    description: "Clean & minimal",
    primaryColor: "oklch(0.23 0.01 60)", // Notion's neutral gray
  },
  {
    value: "slate" as Style,
    label: "Slate",
    icon: Layers,
    description: "Sleek & modern",
    primaryColor: "oklch(0.55 0.14 195)", // Teal
  },
  {
    value: "azure" as Style,
    label: "Azure",
    icon: Layers,
    description: "Sleek & modern",
    primaryColor: "oklch(0.55 0.18 250)", // Blue
  },
  {
    value: "onyx" as Style,
    label: "Onyx",
    icon: Sparkles,
    description: "Charcoal & violet",
    primaryColor: "oklch(0.68 0.18 285)", // Violet accent
  },
];

export function StyleSelector() {
  const [mounted, setMounted] = useState(false);

  // Lazy initialization - only runs once on mount
  const [style, setStyle] = useState<Style>(() => {
    if (typeof window === "undefined") return "slate";

    const savedStyle = localStorage.getItem("style") as Style | null;
    if (savedStyle === "mercel" || savedStyle === "chirp" || savedStyle === "linear" || savedStyle === "winter" || savedStyle === "ggm" || savedStyle === "nexus" || savedStyle === "horizon" || savedStyle === "notion" || savedStyle === "slate" || savedStyle === "azure" || savedStyle === "onyx") {
      return savedStyle;
    }

    return "horizon";
  });

  const applyStyle = (newStyle: Style) => {
    const root = document.documentElement;

    // Remove all style classes
    root.classList.remove("style-mercel", "style-chirp", "style-linear", "style-winter", "style-ggm", "style-nexus", "style-horizon", "style-notion", "style-slate", "style-azure", "style-onyx");

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
              <div 
                className="h-4 w-4 rounded-md border border-border shrink-0"
                style={{ backgroundColor: currentStyle.primaryColor }}
                title={`Primary color: ${currentStyle.primaryColor}`}
              />
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


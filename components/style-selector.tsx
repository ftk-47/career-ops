"use client";

import { useState, useEffect } from "react";
import { Leaf, Sparkles, Trees, Zap, Waves, TreePine, Flame, Sun, Moon, Flower2, Cpu, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Style = "autumn" | "pastel" | "meadow" | "stripy" | "ocean" | "forest" | "crimson" | "sunset" | "midnight" | "rose" | "cyberpunk" | "noir";

const styles = [
  {
    value: "autumn" as Style,
    label: "Autumn",
    icon: Leaf,
    description: "Warm & earthy",
  },
  {
    value: "pastel" as Style,
    label: "Pastel",
    icon: Sparkles,
    description: "Cool & elegant",
  },
  {
    value: "meadow" as Style,
    label: "Meadow",
    icon: Trees,
    description: "Fresh & vibrant",
  },
  {
    value: "stripy" as Style,
    label: "Stripy",
    icon: Zap,
    description: "Bold & modern",
  },
  {
    value: "ocean" as Style,
    label: "Ocean",
    icon: Waves,
    description: "Deep sea blues",
  },
  {
    value: "forest" as Style,
    label: "Forest",
    icon: TreePine,
    description: "Natural greens",
  },
  {
    value: "crimson" as Style,
    label: "Crimson",
    icon: Flame,
    description: "Bold reds",
  },
  {
    value: "sunset" as Style,
    label: "Sunset",
    icon: Sun,
    description: "Warm oranges",
  },
  {
    value: "midnight" as Style,
    label: "Midnight",
    icon: Moon,
    description: "Deep navy",
  },
  {
    value: "rose" as Style,
    label: "Rose",
    icon: Flower2,
    description: "Elegant pinks",
  },
  {
    value: "cyberpunk" as Style,
    label: "Cyberpunk",
    icon: Cpu,
    description: "Neon future",
  },
  {
    value: "noir" as Style,
    label: "Noir",
    icon: Film,
    description: "Black & white",
  },
];

export function StyleSelector() {
  const [mounted, setMounted] = useState(false);
  
  // Lazy initialization - only runs once on mount
  const [style, setStyle] = useState<Style>(() => {
    if (typeof window === "undefined") return "meadow";
    
    const savedStyle = localStorage.getItem("style") as Style | null;
    const validStyles: Style[] = ["autumn", "pastel", "meadow", "stripy", "ocean", "forest", "crimson", "sunset", "midnight", "rose", "cyberpunk", "noir"];
    if (savedStyle && validStyles.includes(savedStyle)) {
      return savedStyle;
    }
    
    return "meadow";
  });

  const applyStyle = (newStyle: Style) => {
    const root = document.documentElement;
    
    // Remove all style classes
    root.classList.remove(
      "style-autumn", "style-pastel", "style-meadow", "style-stripy",
      "style-ocean", "style-forest", "style-crimson", "style-sunset",
      "style-midnight", "style-rose", "style-cyberpunk", "style-noir"
    );
    
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
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Trees className="h-4 w-4" />
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
          {currentStyle && <currentStyle.icon className="h-4 w-4" />}
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
              className={`cursor-pointer mt-0.5 ${
                isActive ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center gap-3 w-full">
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


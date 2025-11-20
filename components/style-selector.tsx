"use client";

import { useState, useEffect } from "react";
import { Leaf, Sparkles, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Style = "autumn" | "lavender" | "meadow";

const styles = [
  {
    value: "autumn" as Style,
    label: "Autumn",
    icon: Leaf,
    description: "Warm & earthy",
  },
  {
    value: "lavender" as Style,
    label: "Lavender",
    icon: Sparkles,
    description: "Cool & elegant",
  },
  {
    value: "meadow" as Style,
    label: "Meadow",
    icon: Trees,
    description: "Fresh & vibrant",
  },
];

export function StyleSelector() {
  const [mounted, setMounted] = useState(false);
  
  // Lazy initialization - only runs once on mount
  const [style, setStyle] = useState<Style>(() => {
    if (typeof window === "undefined") return "autumn";
    
    const savedStyle = localStorage.getItem("style") as Style | null;
    if (savedStyle && (savedStyle === "autumn" || savedStyle === "lavender" || savedStyle === "meadow")) {
      return savedStyle;
    }
    
    return "autumn";
  });

  const applyStyle = (newStyle: Style) => {
    const root = document.documentElement;
    
    // Remove all style classes
    root.classList.remove("style-autumn", "style-lavender", "style-meadow");
    
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
        <Leaf className="h-4 w-4" />
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
      <DropdownMenuContent align="end" className="w-48">
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
              className={`cursor-pointer ${
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


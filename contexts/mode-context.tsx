"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Mode = "director" | "reviewer";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === "undefined") return "director";
    
    const savedMode = localStorage.getItem("dashboard-mode") as Mode | null;
    if (savedMode === "director" || savedMode === "reviewer") {
      return savedMode;
    }
    
    return "director";
  });

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem("dashboard-mode", newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}


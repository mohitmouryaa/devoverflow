"use client";

import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

interface IThemeContext {
  mode: "light" | "dark";
  setMode: (value: "light" | "dark") => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const themeChangeHandler = useCallback(() => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.add("light");
    }
  }, [mode]);

  useEffect(() => {
    themeChangeHandler();
  }, [mode, themeChangeHandler]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

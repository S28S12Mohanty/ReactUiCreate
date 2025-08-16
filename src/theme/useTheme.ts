import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "ui.theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme) || "system"
  );

  const apply = useCallback((t: Theme) => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = t === "dark" || (t === "system" && prefersDark);

    root.classList.toggle("dark", isDark);
    // helps native controls (scrollbar, form controls) match
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  useEffect(() => apply(theme), [theme, apply]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => theme === "system" && apply("system");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme, apply]);

  const set = (t: Theme) => {
    setTheme(t);
    localStorage.setItem(STORAGE_KEY, t);
    apply(t);
  };

  return { theme, setTheme: set };
}

import { Laptop2, Moon, Sun } from "lucide-react";

import { useThemeContext } from "../../theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  const cycle = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Laptop2;

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${theme}`}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2
                 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm capitalize"
    >
      <Icon className="h-4 w-4" />
      {theme}
    </button>
  );
}

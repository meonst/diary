"use client";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button
      suppressHydrationWarning
      onClick={() =>
        currentTheme == "dark" ? setTheme("light") : setTheme("dark")
      }
    >
      {currentTheme == "light" ? "☀️" : "🌙"}
    </button>
  );
}

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
          const storedTheme = localStorage.getItem("theme");
          if (storedTheme) return storedTheme === "dark";
          return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
      });

useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        setIsDark(true);
    }
}, []);

useEffect(() => {
    if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
}, [isDark]);

const toggleTheme = () => setIsDark((prev) => !prev);

return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
);
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};

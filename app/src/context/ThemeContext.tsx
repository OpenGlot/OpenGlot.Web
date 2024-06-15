import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ThemePreference = "light" | "dark" | "system";
type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themePreference: ThemePreference;
  setThemePreference: (themePreference: ThemePreference) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themePreference, setThemePreference] = useState<ThemePreference>(
    () => {
      const savedTheme = localStorage.getItem("theme") as ThemePreference;
      return savedTheme || "system";
    }
  );

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as ThemePreference;
    if (
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (themePreference: ThemePreference) => {
      if (
        themePreference === "dark" ||
        (themePreference === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        root.classList.add("dark");
        setTheme("dark");
      } else {
        root.classList.remove("dark");
        setTheme("light");
      }
    };

    applyTheme(themePreference);
  }, [themePreference]);

  useEffect(() => {
    localStorage.setItem("theme", themePreference);
  }, [themePreference]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themePreference, setThemePreference }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

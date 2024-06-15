import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { themePreference, setThemePreference } = useTheme();

  return (
    <div className="relative">
      <div>Appearance</div>
      <select
        value={themePreference}
        onChange={(e) =>
          setThemePreference(e.target.value as "light" | "dark" | "system")
        }
        className="p-2 border rounded dark:bg-customBlack"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;

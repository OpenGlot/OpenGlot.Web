import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "context";

const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { themePreference, setThemePreference } = useTheme();

  return (
    <div className="relative">
      <div>{t("Appearance")}</div>
      <select
        value={themePreference}
        onChange={(e) =>
          setThemePreference(e.target.value as "light" | "dark" | "system")
        }
        className="p-2 border rounded dark:bg-customBlack"
      >
        <option value="system">{t("System")}</option>
        <option value="light">{t("Light")}</option>
        <option value="dark">{t("Dark")}</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;

import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { authState } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-grow flex-col gap-10 items-center justify-center w-full">
        <h1 className="text-2xl font-semibold">
          {authState.user
            ? `${t("Welcome")}, ${authState.user.username || ""}!`
            : t("Welcome")}
        </h1>
        <div
          className={`font-sansLogo text-8xl ${
            theme === "light" ? "gradient-text" : "glow"
          }`}
        >
          OpenGlot
        </div>
      </div>
    </div>
  );
};

export default HomePage;

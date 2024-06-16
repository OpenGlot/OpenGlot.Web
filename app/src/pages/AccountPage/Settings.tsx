import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

const Settings: React.FC = () => {
  return (
    <>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </>
  );
};

export default Settings;

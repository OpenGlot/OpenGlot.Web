import React from "react";
import { ThemeSwitcher } from "components";
import { useTranslation } from "react-i18next";


const Settings: React.FC = () => {

  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-2xl font-semibold">{ t("Settings") }</h2>
      <ThemeSwitcher />
    </>
  );
};

export default Settings;

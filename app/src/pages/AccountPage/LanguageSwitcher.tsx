import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <div>
      <div>{i18n.t("Language")}</div>
      <select
        className="p-2 border rounded dark:bg-customBlack"
        value={selectedLanguage}
        onChange={changeLanguage}
      >
        <option value="en">{i18n.t("English")}</option>
        <option value="zh">{i18n.t("Chinese")}</option>
        <option value="ko">{i18n.t("Korean")}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

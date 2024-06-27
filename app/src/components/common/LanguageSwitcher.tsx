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
      <select
        className="cursor-pointer dark:bg-customBlack focus:outline-none"
        value={selectedLanguage}
        onChange={changeLanguage}
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="ko">한국어</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

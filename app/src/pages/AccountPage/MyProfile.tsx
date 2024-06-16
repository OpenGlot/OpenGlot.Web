import React from "react";
import { useTranslation } from "react-i18next";

const MyProfile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t("My Profile")}</h2>
      <p className="mb-2">{t("Email")}: example@example.com</p>
      <p>{t("Password")}: ••••••••</p>
    </div>
  );
};

export default MyProfile;

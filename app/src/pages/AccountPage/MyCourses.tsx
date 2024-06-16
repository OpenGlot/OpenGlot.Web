import React from "react";
import { useTranslation } from "react-i18next";

const MyCourses: React.FC = () => {
  const { t } = useTranslation();

  return <div>{t("My Courses")}</div>;
};

export default MyCourses;

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DropdownProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  setShowDropdown,
  handleLogout,
}) => {
  const { t } = useTranslation();

  const links = [
    { to: "/account/my-profile", label: t("My Profile") },
    { to: "/account/my-courses", label: t("My Courses") },
    { to: "/account/settings", label: t("Settings") },
  ];

  return (
    <div className="absolute flex flex-col right-0 mt-6 w-44 border shadow z-10 rounded-lg cursor-pointer">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={`w-full hover:bg-gray-100 px-3 py-2 dark:hover:bg-primary-dark ${
            index === 0 && "rounded-t-lg"
          }`}
          onClick={() => setShowDropdown(false)}
        >
          {link.label}
        </Link>
      ))}
      <div
        className="w-full hover:bg-gray-100 px-3 py-2 dark:hover:bg-primary-dark rounded-b-lg"
        onClick={handleLogout}
      >
        {t("Log out")}
      </div>
    </div>
  );
};

export default Dropdown;

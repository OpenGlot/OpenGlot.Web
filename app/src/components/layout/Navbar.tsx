import React, { useState, useEffect, useRef } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Button, Dropdown, LanguageSwitcher } from "components";
import { useAuth, useTheme } from "context";
import { useAuthService } from "hooks";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { authState } = useAuth();
  const { handleSignOut } = useAuthService();
  const { theme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    handleSignOut();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="container bg-white dark:bg-customBlack px-4 py-4 grid grid-cols-3 justify-between items-center relative">
      <a href="/" className="cursor-pointer">
        <div className="flex items-center justify-start">
          <div className="font-sansLogo gradient-text">OpenGlot</div>
        </div>
      </a>
      <div className="flex justify-center gap-x-10">
        <a href="/courses" className="link-hover-effect">
          {t("Courses")}
        </a>
        <a href="/modules" className="link-hover-effect">
          {t("Modules")}
        </a>
        <a href="/" className="link-hover-effect">
          {t("Review")}
        </a>
        <a href="/game" className="link-hover-effect">
          {t("Game")}
        </a>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <LanguageSwitcher />
        {authState.user ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={handleProfileClick}
            >
              <div className="underline decoration-primary">
                {authState.user ? authState.user.username : t("User")}
              </div>
              {showDropdown ? <GoTriangleUp /> : <GoTriangleDown />}
            </div>

            {showDropdown && (
              <Dropdown
                setShowDropdown={setShowDropdown}
                handleLogout={handleLogout}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <a href="/login">
              <Button variant="contrast" width="w-28">
                {t("Login")}
              </Button>
            </a>
            <a href="/signup">
              <Button
                variant={theme === "light" ? "outlined" : "filled"}
                width="w-28"
              >
                {t("SignUp")}
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

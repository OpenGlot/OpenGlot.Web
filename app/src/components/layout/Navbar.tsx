import React, { useState, useEffect, useRef } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import Popup from "../common/Popup";
import LanguageSwitcher from "../common/LanguageSwitcher";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { authState, handleSignOut } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setShowPopup((prev) => !prev);
  };

  const handleLogout = () => {
    setShowPopup(false);
    handleSignOut();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  return (
    <nav className="container bg-white dark:bg-customBlack px-4 py-4 grid grid-cols-3 justify-between items-center relative">
      <a href="/" className="cursor-pointer">
        <div className="flex items-center justify-start space-x-2">
          <div className="font-sansLogo gradient-text">OpenGlot</div>
        </div>
      </a>
      <div className="flex justify-center gap-x-10">
        <a href="/questions" className="link-hover-effect">
          {t("Questions")}
        </a>
        <a href="/courses" className="link-hover-effect">
          {t("Courses")}
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
          <div className="relative" ref={popupRef}>
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={handleProfileClick}
            >
              <div className="underline decoration-primary">
                {authState.user ? authState.user.name : t("User")}
              </div>
              {showPopup ? <GoTriangleUp /> : <GoTriangleDown />}
            </div>

            {showPopup && (
              <Popup setShowPopup={setShowPopup} handleLogout={handleLogout} />
            )}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <a href="/login">
              <Button variant="no-fill" width="w-28">
                {t("Login")}
              </Button>
            </a>
            <a href="/signup">
              <Button variant="outlined" width="w-28">
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

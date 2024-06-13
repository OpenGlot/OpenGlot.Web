import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.svg";
import brand from "../../assets/images/brand.svg";
import Button from "./Button";
import { useAuth } from "../../auth/useAuth";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const Navbar: React.FC = () => {
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
    <nav className="container bg-white px-4 py-2 grid grid-cols-3 justify-between items-center relative">
      <a href="/" className="cursor-pointer">
        <div className="flex items-center justify-start space-x-2">
          <img src={logo} alt="OpenGlot icon" className="w-10 h-10" />
          <img src={brand} alt="OpenGlot brand" className="w-28 h-16" />
        </div>
      </a>
      <div className="flex justify-center gap-x-10">
        <a href="/questions" className="link-hover-effect">
          Questions
        </a>
        /
        <a href="/" className="link-hover-effect">
          SomeLink
        </a>
        /
        <a href="/" className="link-hover-effect">
          AnotherLink
        </a>
      </div>
      <div className="flex justify-end">
        {authState.user ? (
          <div className="relative" ref={popupRef}>
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={handleProfileClick}
            >
              {authState.user ? authState.user.name : "User"}
              {showPopup ? <GoTriangleUp /> : <GoTriangleDown />}
            </div>

            {showPopup && (
              <div className="absolute flex flex-col right-0 mt-2 w-44 rounded-lg shadow z-10 cursor-pointer">
                <div className="w-full hover:bg-gray-100 px-3 py-2 rounded-t-lg">
                  My profile
                </div>
                <div className="w-full hover:bg-gray-100 px-3 py-2">
                  Settings
                </div>
                <div className="w-full hover:bg-gray-100 px-3 py-2">
                  Language & region
                </div>
                <div
                  className="w-full hover:bg-gray-100 px-3 py-2 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <a href="/login">
              <Button variant="no-fill" width="w-28">
                Login
              </Button>
            </a>
            <a href="/signup">
              <Button variant="emphasized" width="w-28">
                Sign Up
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

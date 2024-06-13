import React from "react";
import { Link } from "react-router-dom";

interface PopupProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const Popup: React.FC<PopupProps> = ({ setShowPopup, handleLogout }) => {
  const links = [
    { to: "/account/my-profile", label: "My Profile" },
    { to: "/account/my-courses", label: "My Courses" },
    { to: "/account/settings", label: "Settings" },
  ];

  return (
    <div className="absolute flex flex-col right-0 mt-6 w-44 border shadow z-10 rounded-lg cursor-pointer">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="w-full hover:bg-gray-100 px-3 py-2 dark:hover:bg-primary-dark"
          onClick={() => setShowPopup(false)}
        >
          {link.label}
        </Link>
      ))}
      <div
        className="w-full hover:bg-gray-100 px-3 py-2 dark:hover:bg-primary-dark"
        onClick={handleLogout}
      >
        Log out
      </div>
    </div>
  );
};

export default Popup;

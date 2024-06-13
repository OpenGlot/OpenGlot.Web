import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const AccountPage: React.FC = () => {
  const navLinks = [
    { to: "my-profile", label: "My Profile" },
    { to: "my-courses", label: "My Courses" },
    { to: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full border-b"></div>
      <div className="flex flex-grow">
        {/* Left Column */}
        <div className="w-1/6 p-4 border-r flex flex-col flex-grow">
          <ul className="space-y-4 flex flex-col flex-grow">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 rounded bg-primary text-white border-l-4 border-primary-dark"
                      : "block p-2 rounded hover:bg-gray-100 dark:hover:bg-primary-dark"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="w-5/6 p-4 flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

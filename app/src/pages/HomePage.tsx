import React from "react";
import brand from "../assets/images/brand.svg";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../auth/useAuth";
import { useTheme } from "../context/ThemeContext";

const HomePage: React.FC = () => {
  const { authState } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Navbar />
      {/* <div className="w-full border-b"></div> */}
      <div className="flex flex-grow flex-col gap-10 items-center justify-center w-full">
        <h1 className="text-2xl font-semibold">
          {authState.user
            ? `Welcome, ${authState.user.name || ""}!`
            : "Welcome!"}
        </h1>
        <div
          className={`font-sansLogo text-8xl ${
            theme === "light" ? "gradient-text" : "glow"
          }`}
        >
          OpenGlot
        </div>
      </div>
    </div>
  );
};

export default HomePage;

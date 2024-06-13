import React from "react";

interface SocialIconProps {
  onClick?: () => void;
  icon: React.ReactNode;
}

const SocialLogin: React.FC<SocialIconProps> = ({ onClick, icon }) => {
  return (
    <button
      className="bg-white dark:bg-customBlack border p-3 rounded-lg text-gray-700 hover:bg-gray-700 hover:border-gray-700 hover:text-white active:bg-gray-900 dark:text-white dark:border-primary transition-all ease-linear duration-200 glowing-outline"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default SocialLogin;

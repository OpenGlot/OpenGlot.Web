import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import HealthCheck from "../components/common/HealthCheck";

const ProviderWrapper: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {process.env.NODE_ENV === "development" && <HealthCheck />}
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ProviderWrapper;

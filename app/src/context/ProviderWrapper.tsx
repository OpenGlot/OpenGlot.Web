import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import HealthCheck from "../components/common/HealthCheck";
import Layout from "components/layout/Layout";

const ProviderWrapper: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {(process.env.NODE_ENV === "development" ||
          process.env.REACT_APP_ENV === "docker") && <HealthCheck />}
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ProviderWrapper;

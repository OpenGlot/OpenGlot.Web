import React from "react";
import { ThemeProvider, AuthProvider } from "context";
import { HealthCheck, Layout } from "components";

export const ProviderWrapper: React.FC = () => {
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

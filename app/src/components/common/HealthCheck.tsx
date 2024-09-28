import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkHealth } from "services";
// import { useTheme } from "context";

const HealthCheck: React.FC = () => {
  // const { theme } = useTheme();
  const [isHealthy, setIsHealthy] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const healthStatus = await checkHealth();

        setIsHealthy(healthStatus);
        if (healthStatus.status !== 200) {
          // toast.error("API is not healthy!", {
          //   theme: theme === "dark" ? "dark" : "light",
          // });
        }
      } catch (error) {
        // toast.error("Failed to check API health!");
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isHealthy]);

  return <ToastContainer position="bottom-right" />;
};

export default HealthCheck;

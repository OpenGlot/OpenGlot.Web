import React, { useEffect, useRef } from "react";
import { useAuthService } from "../hooks";

const OAuthCallbackPage: React.FC = () => {
  const { handleGoogleSignInCallback } = useAuthService();
  const hasRun = useRef(false);

  console.log("OAuthCallbackPage rendered");

  useEffect(() => {
    if (hasRun.current) {
      console.log("handleSignIn already run, skipping");
      return;
    }
    hasRun.current = true;

    const handleSignIn = async () => {
      console.log("handleSignIn called");
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");

      if (authorizationCode) {
        try {
          await handleGoogleSignInCallback(authorizationCode);
        } catch (error) {
          console.error("Failed to sign in:", error);
        }
      } else {
        console.error("Authorization code not found in URL");
      }
    };

    handleSignIn();
  }, [handleGoogleSignInCallback]);

  return <div>Authenticating...</div>;
};

export default OAuthCallbackPage;

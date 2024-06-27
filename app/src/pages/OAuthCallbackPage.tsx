import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "hooks";

const OAuthCallbackPage: React.FC = () => {
  const { handleGoogleSignInCallback } = useAuthService();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      handleGoogleSignInCallback(authorizationCode).catch((error) => {
        console.error("Error handling Google sign-in callback", error);
      });
    } else {
      console.error("Authorization code not found in URL");
      navigate("/");
    }
  }, []);

  return <div>Authenticating...</div>;
};

export default OAuthCallbackPage;

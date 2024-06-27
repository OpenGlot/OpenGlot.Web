import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context";
import { VerificationCodeForm } from "components";

const VerifyPasswordResetPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  const handleVerificationSubmit = (code: string) => {
    navigate("/reset-password", { state: { code } });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Reset your password</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter the verification code in your mailbox
        </p>
      </div>

      <VerificationCodeForm
        onCodeSubmit={handleVerificationSubmit}
        isLoading={authState.loading}
        buttonText="Next"
      />
    </div>
  );
};

export default VerifyPasswordResetPage;

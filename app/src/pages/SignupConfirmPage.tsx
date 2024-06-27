import React from "react";
import { useAuth } from "context/AuthContext";
import { resendConfirmationCode } from "services/authService";
import VerificationCodeForm from "components/common/VerificationCodeForm";
import { useAuthService } from "hooks/useAuthService";

const SignupConfirmPage: React.FC = () => {
  const { authState } = useAuth();
  const { handleConfirmSignUp } = useAuthService();

  const handleVerificationSubmit = (code: string) => {
    handleConfirmSignUp(code);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">You are almost there!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter the verification code in your mailbox
        </p>
      </div>

      <VerificationCodeForm
        onCodeSubmit={handleVerificationSubmit}
        isLoading={authState.loading}
        buttonText="Confirm"
      />

      <div>
        Didn't receive it?{" "}
        <button className="link" onClick={resendConfirmationCode}>
          Send a new code
        </button>
      </div>
    </div>
  );
};

export default SignupConfirmPage;

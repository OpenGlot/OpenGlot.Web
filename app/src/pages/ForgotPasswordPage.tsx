import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, Button } from "components";
import { forgotPassword } from "services";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgotPassword(email);
    navigate("/verify-password-reset");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Forgot your password?</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter your email address to reset password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          key="email"
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <div className="flex flex-col items-center justify-between">
          <Button width="w-96" type="submit" variant="filled">
            Send email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

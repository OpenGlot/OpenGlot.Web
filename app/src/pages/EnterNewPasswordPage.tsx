import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "components/common/InputField";
import Button from "components/common/Button";
import { resetPassword } from "services/authService";

const EnterNewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { code } = state || {};
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(code, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Reset your password</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter your new password
        </p>
      </div>

      <form className="flex flex-col gap-8" onSubmit={handlePasswordSubmit}>
        <InputField
          key="password"
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button width="w-96" type="submit" variant="filled">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EnterNewPasswordPage;

import React, { useState } from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { useAuth } from "../context/AuthContext";
import { useAuthService } from "hooks/useAuthService";

const SignupPage: React.FC = () => {
  const { authState, changeAuthState } = useAuth();
  const { handleSignUp } = useAuthService();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp(email, password, confirmPassword, username);
  };

  const fields = [
    {
      label: "Username",
      type: "username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        changeAuthState({ error: null });
      },
    },
    {
      label: "Email",
      type: "email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        changeAuthState({ error: null });
      },
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        changeAuthState({ error: null });
      },
    },
    {
      label: "Confirm Password",
      type: "password",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        changeAuthState({ error: null });
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-6xl font-bold">Welcome!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter your details to create a new account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field) => (
          <InputField
            key={field.label.toLowerCase().replace(" ", "-")}
            id={field.label.toLowerCase().replace(" ", "-")}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
          />
        ))}
        <div className="flex flex-col items-center justify-between relative">
          <Button width="w-96" type="submit" variant="filled">
            {authState.loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-solid border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          {authState.error && (
            <p className="absolute top-14 text-red-500">
              Error: {authState.error.message}
            </p>
          )}
        </div>
      </form>

      <div className="mt-3">
        <a href="/login">
          Already a member? <span className="link">Login</span>
        </a>
      </div>
    </div>
  );
};

export default SignupPage;

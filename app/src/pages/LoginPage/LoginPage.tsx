import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { Button, InputField } from "components";
import SocialLogin from "./SocialLogin";
import { useAuth } from "context";
import { useAuthService } from "hooks";

const LoginPage: React.FC = () => {
  const { authState, changeAuthState } = useAuth();
  const {
    handleSignIn,
    handleGoogleSignIn,
    handleFBSignIn,
    handleAppleSignIn,
  } = useAuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(email, password);
  };

  const fields = [
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
  ];

  const buttons = [
    { onClick: handleGoogleSignIn, icon: <FaGoogle className="w-6 h-6" /> },
    { onclick: handleFBSignIn, icon: <FaFacebookF className="w-6 h-6" /> },
    { onclick: handleAppleSignIn, icon: <FaApple className="w-6 h-6" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter your details to sign in
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <InputField
              key={field.label.toLowerCase()}
              id={field.label.toLowerCase()}
              label={field.label}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
          <Link to="/forgot-password" className="link text-sm -mt-3 text-right">
            Forgot password?
          </Link>
          <div className="flex flex-col items-center justify-between relative">
            <Button width="w-96" type="submit" variant="filled">
              {authState.loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-solid border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {authState.error && (
              <p className="absolute top-14 text-red-500">
                Error: {authState.error.message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="relative flex items-center w-96">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-700 dark:text-gray-300">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex space-x-4">
          {buttons.map((button, index) => (
            <SocialLogin
              key={index}
              onClick={button.onClick}
              icon={button.icon}
            />
          ))}
        </div>
      </div>

      <div className="mt-3">
        <a href="/signup">
          Not a member? <span className="link">Sign up</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;

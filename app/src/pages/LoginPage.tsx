import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import logo from '../assets/images/logo.svg';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import { useAuth } from '../auth/useAuth';

const LoginPage: React.FC = () => {
  const { authState, handleSignIn, handleGoogleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(email, password);
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div>
        <img src={logo} alt="OpenGlot logo" className="w-28 h-16" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="text-sm text-gray-600">
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
          <div className="text-sm text-gray-800 underline -mt-3 text-right cursor-pointer">
            Forgot password?
          </div>
          <div className="flex flex-col items-center justify-between">
            <Button width="w-96" type="submit" variant="filled">
              {authState.loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-solid border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            {authState.error && (
              <p className="text-red-500">Error: {authState.error.message}</p>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="relative flex items-center w-96">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-700">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-white border p-3 rounded-lg text-gray-700 hover:bg-gray-700 hover:border-gray-700 hover:text-white active:bg-gray-900 transition-all ease-linear duration-200"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="w-6 h-6 " />
          </button>
          <button className="bg-white border p-3 rounded-lg text-gray-700 hover:bg-gray-700 hover:border-gray-700 hover:text-white active:bg-gray-900 transition-all ease-linear duration-200">
            <FaFacebookF className="w-6 h-6" />
          </button>
          <button className="bg-white border p-3 rounded-lg text-gray-700 hover:bg-gray-700 hover:border-gray-700 hover:text-white active:bg-gray-900 transition-all ease-linear duration-200">
            <FaApple className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <a href="/signup">
          Not a member? <span className="underline">Sign up</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;

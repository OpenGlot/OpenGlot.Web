import React, { useState, useRef, useEffect } from "react";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { resendConfirmationCode } from "services/authService";

const SignupConfirmPage: React.FC = () => {
  const { authState, handleConfirmSignUp } = useAuth();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const pasteTimeouts = useRef<NodeJS.Timeout[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value !== "" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6 - index);
    const pasteArray = paste.split("");

    pasteArray.forEach((char, i) => {
      pasteTimeouts.current.push(
        setTimeout(() => {
          setCode((prevCode) => {
            const newCode = [...prevCode];
            if (index + i < 6) {
              newCode[index + i] = char;
              if (index + i < 5) {
                inputsRef.current[index + i + 1].focus();
              }
            }
            return newCode;
          });
        }, i * 50)
      );
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleConfirmSignUp(code.join(""));
  };

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 6);
    return () => {
      // Clear any remaining timeouts when the component unmounts
      pasteTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">You are almost there!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter the verification code in your mailbox
        </p>
      </div>

      <form
        className="flex flex-col gap-8 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              ref={(el) => (inputsRef.current[index] = el!)}
              className="w-12 h-12 text-center text-xl border p-3 text-gray-700 focus:outline-none rounded-lg focus:border-primary dark:border-primary-light dark:bg-customBlack dark:text-white  dark:focus:border-primary-dark"
              required
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button width="w-96" type="submit" variant="filled">
            {authState.loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-solid border-t-transparent rounded-full animate-spin mr-2"></div>
                Confirming...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
          {authState.error && (
            <p className="text-red-500">Error: {authState.error.message}</p>
          )}
        </div>
      </form>

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

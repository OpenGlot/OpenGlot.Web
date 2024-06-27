import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

interface VerificationCodeFormProps {
  onCodeSubmit: (code: string) => void;
  isLoading: boolean;
  buttonText: string;
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  onCodeSubmit,
  isLoading,
  buttonText,
}) => {
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
    onCodeSubmit(code.join(""));
  };

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 6);
    return () => {
      // Clear any remaining timeouts when the component unmounts
      pasteTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <form className="flex flex-col gap-8 items-center" onSubmit={handleSubmit}>
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
            className="w-12 h-12 text-center text-xl border p-3 text-gray-700 focus:outline-none rounded-lg focus:border-primary dark:border-primary-light dark:bg-customBlack dark:text-white dark:focus:border-primary-dark"
            required
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-between">
        <Button width="w-96" type="submit" variant="filled">
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-solid border-t-transparent rounded-full animate-spin mr-2"></div>
              Confirming...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </form>
  );
};

export default VerificationCodeForm;

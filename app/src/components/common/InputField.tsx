import React, { useState } from "react";

interface InputFieldProps {
  id?: string;
  label?: string;
  type: string;
  value: string;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  width,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${width ? width : "w-96"}`}>
      {label && (
        <label
          className={`absolute bg-white dark:bg-customBlack px-1.5 left-3 top-1/2 transition-transform duration-200 ease-in ${
            focused
              ? "transform -translate-y-9 text-primary-dark dark:text-white"
              : value
              ? "transform -translate-y-9 text-gray-500 dark:text-gray-300"
              : "transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
          }`}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={`border dark:border-primary-light dark:bg-customBlack rounded-lg p-3 text-gray-700 dark:text-white focus:outline-none focus:border-primary-dark dark:focus:border-primary-dark w-full`}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
      />
    </div>
  );
};

export default InputField;

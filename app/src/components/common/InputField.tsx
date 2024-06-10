import React, { useState } from 'react';

interface InputFieldProps {
  id?: string;
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-96">
      {label && (
        <label
          className={`absolute bg-white px-1.5 left-3 top-1/2 text-sm transition-all duration-200 ease-in ${
            focused
              ? 'transform -translate-y-9 text-blue-500'
              : value
              ? 'transform -translate-y-9 text-gray-500'
              : 'transform -translate-y-1/2 text-gray-500'
          }`}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={`appearance-none border rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500 w-full`}
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

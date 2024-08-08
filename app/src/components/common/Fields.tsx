import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface TextFieldProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  type?: string;
}
interface AudioFieldProps {
  name: string;
  control: any;
  englishTranslation: string;
  languageCode: string;
  transcript: string;
  sentenceId: string;
  urlKey: string;
}

interface PictureFieldProps {
  name: string;
  control: any;
  context?: string;
  description?: string;
  enhancedDescription?: string;
  id?: string;
  uploadedAt?: Date;
  urlKey?: string;
}

interface SelectFieldProps {
  name: string;
  control: any;
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            {type === "textarea" ? (
              <textarea
                {...field}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              />
            ) : (
              <input
                {...field}
                type={type}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              />
            )}
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        );
      }}
    />
  </div>
);

const AudioField: React.FC<AudioFieldProps> = ({
  name,
  control,
  englishTranslation,
  languageCode,
  transcript,
  sentenceId,
  urlKey,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (urlKey) {
      const initialFileName = urlKey.split("/").pop();
      setFileName(initialFileName);
    }
  }, [urlKey]);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Audio</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFileName(e.target.files[0].name);
                  field.onChange({
                    file: e.target.files[0],
                    englishTranslation,
                    languageCode,
                    sentenceId,
                    transcript,
                    urlKey,
                  });
                } else {
                  setFileName(undefined);
                  field.onChange(null);
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {fileName && (
              <p className="text-gray-600 mt-2">Selected file: {fileName}</p>
            )}
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

const PictureField: React.FC<PictureFieldProps> = ({
  name,
  control,
  context,
  description,
  enhancedDescription,
  id,
  uploadedAt,
  urlKey,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (urlKey) {
      const initialFileName = urlKey.split("/").pop();
      setFileName(initialFileName);
    }
  }, [urlKey]);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Picture</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFileName(e.target.files[0].name);
                  field.onChange({
                    file: e.target.files[0],
                    context,
                    description,
                    enhancedDescription,
                    id,
                    uploadedAt,
                    urlKey,
                  });
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {fileName && (
              <p className="text-gray-700 mt-2">Selected file: {fileName}</p>
            )}
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  control,
  label,
  options,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <select
              {...field}
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                field.onChange(e);
              }}
            >
              {options.map((option, index) => (
                <option
                  key={option.value}
                  value={option.value}
                  data-index={index}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { TextField, AudioField, PictureField, SelectField };

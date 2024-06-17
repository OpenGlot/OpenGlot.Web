import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import DateInput from "./DateInput";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

interface CardProps {
  step: number;
  total: number;
  question: string;
  inputType: string;
  handleSubmit: (e: React.FormEvent) => void;
  handlePrevious: () => void;
  maxSelections?: number;
  options?: string[];
  handleChange?: (value: string | string[]) => void;
  value: string | string[];
  disabledOptions?: string[];
}

const Card: React.FC<CardProps> = ({
  step,
  total,
  question,
  inputType,
  handleSubmit,
  handlePrevious,
  maxSelections,
  options,
  handleChange,
  value,
  disabledOptions,
}) => {
  const [error, setError] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    if (
      inputType === "select" &&
      (!value || (value as string[]).length === 0)
    ) {
      setError("Please select at least one option before proceeding");
      return;
    }
    setError("");
    handleSubmit(e);
  };

  return (
    <form
      className="w-full h-fit mx-auto flex justify-between flex-col gap-6"
      onSubmit={handleNext}
    >
      <h2 className="text-2xl font-semibold">{question}</h2>
      <div className="mt-4 mb-6">
        {inputType === "select" && options && maxSelections && handleChange && (
          <MultiSelect
            maxSelection={maxSelections}
            options={options}
            handleChange={handleChange}
            value={value as string[]}
            error={error}
            handleError={setError}
            disabledOptions={disabledOptions} // Pass disabledOptions to MultiSelect
          />
        )}
        {inputType === "date" && handleChange && (
          <DateInput
            handleChange={handleChange}
            value={value as string}
            error={error}
            handleError={setError}
          />
        )}
      </div>

      <div className="flex justify-between w-full">
        {step > 0 && (
          <Button
            variant="filled"
            width="w-28"
            padding="p-2.5"
            onClick={handlePrevious}
          >
            <span className="mr-2">
              <FaArrowLeftLong />
            </span>
            Previous
          </Button>
        )}
        <Button type="submit" variant="filled" width="w-28" padding="p-2.5">
          {step < total - 1 ? "Next" : "Submit"}
          <span className="ml-2">
            <FaArrowRightLong />
          </span>
        </Button>
      </div>
    </form>
  );
};

export default Card;

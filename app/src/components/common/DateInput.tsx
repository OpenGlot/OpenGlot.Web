import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { isValid, parse, format, isAfter } from "date-fns";

interface DateInputProps {
  handleChange: (date: string) => void;
  value: string;
  error: string;
  handleError: Dispatch<SetStateAction<string>>;
}

const DateInput: React.FC<DateInputProps> = ({
  handleChange,
  value,
  error,
  handleError,
}) => {
  const initialValues =
    typeof value === "string" && value.includes("-")
      ? value.split("-")
      : ["", "", ""];
  const [day, setDay] = useState<string>(initialValues[2] || "");
  const [month, setMonth] = useState<string>(initialValues[1] || "");
  const [year, setYear] = useState<string>(initialValues[0] || "");

  const currentYear = new Date().getFullYear();

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const validateDate = (day: string, month: string, year: string) => {
    const dateString = `${year}-${month}-${day}`;
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    const currentDate = new Date();
    return (
      isValid(date) &&
      format(date, "yyyy-MM-dd") === dateString &&
      !isAfter(date, currentDate)
    );
  };

  useEffect(() => {
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      if (validateDate(day, month, year)) {
        handleError("");
        handleChange(`${year}-${month}-${day}`);
      } else {
        handleError("Invalid date");
      }
    }
  }, [day, month, year]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number,
    refToFocus: React.RefObject<HTMLInputElement> | null = null,
    minValue: number,
    maxValue: number
  ) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length === maxLength) {
        const numericValue = parseInt(value, 10);
        if (numericValue < minValue) {
          value = minValue.toString().padStart(maxLength, "0");
        } else if (numericValue > maxValue) {
          value = maxValue.toString().padStart(maxLength, "0");
        }
        setValue(value);
        refToFocus?.current?.focus();
      } else {
        setValue(value);
      }
    }
    handleError("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.key === "Backspace") {
      if (field === "month" && month === "") {
        dayRef.current?.focus();
      } else if (field === "year" && year === "") {
        monthRef.current?.focus();
      }
    }
  };

  const inputFields = [
    {
      label: "Day",
      value: day,
      setValue: setDay,
      maxLength: 2,
      ref: dayRef,
      minValue: 1,
      maxValue: 31,
    },
    {
      label: "Month",
      value: month,
      setValue: setMonth,
      maxLength: 2,
      ref: monthRef,
      minValue: 1,
      maxValue: 12,
    },
    {
      label: "Year",
      value: year,
      setValue: setYear,
      maxLength: 4,
      ref: yearRef,
      minValue: 1900,
      maxValue: currentYear,
    },
  ];

  return (
    <div className="flex flex-col relative">
      <div className="flex justify-between">
        {inputFields.map((field, index) => (
          <div key={index} className="relative">
            <label
              className={`absolute bg-white dark:bg-customBlack px-1.5 left-2.5 top-1/2 transition-transform duration-200 ease-in ${
                focusedField === field.label.toLowerCase()
                  ? "transform -translate-y-9 text-primary-dark dark:text-white"
                  : field.value
                  ? "transform -translate-y-9 text-gray-500 dark:text-gray-300"
                  : "transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              }`}
              htmlFor={field.label.toLowerCase()}
            >
              {field.label}
            </label>
            <input
              id={field.label.toLowerCase()}
              className={`border dark:border-primary-light dark:bg-customBlack rounded-lg p-3 focus:outline-none focus:border-primary-dark dark:focus:border-primary-dark flex-1 ${
                field.label === "Year" ? "max-w-full" : "max-w-24"
              }`}
              type="text"
              maxLength={field.maxLength}
              value={field.value}
              onChange={(e) =>
                handleInputChange(
                  e,
                  field.setValue,
                  field.maxLength,
                  index < inputFields.length - 1
                    ? inputFields[index + 1].ref
                    : null,
                  field.minValue,
                  field.maxValue
                )
              }
              onKeyDown={(e) => handleKeyDown(e, field.label.toLowerCase())}
              ref={field.ref}
              onFocus={() => setFocusedField(field.label.toLowerCase())}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>
        ))}
      </div>
      {error && <div className="absolute text-red-500 top-14">{error}</div>}
    </div>
  );
};

export default DateInput;

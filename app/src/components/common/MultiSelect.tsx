import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { GoChevronDown, GoChevronUp, GoSearch } from "react-icons/go";

interface MultiSelectProps {
  options: string[];
  maxSelection: number;
  handleChange: (selections: string[]) => void;
  value: string[];
  disabledOptions?: string[];
  error: string;
  handleError: Dispatch<SetStateAction<string>>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  maxSelection,
  handleChange,
  value,
  disabledOptions = [],
  error,
  handleError,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedOptions(value); // Reset selected options when value changes
  }, [value]);

  // Dynamically updated as the user types input
  // With input change, react re-renders and filteredOptions array is recalculated
  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()) &&
      !disabledOptions.includes(option)
  );

  useEffect(() => {
    if (inputValue) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(null);
    }
  }, [inputValue, filteredOptions.length]);

  const handleSelect = (option: string) => {
    let newSelectedOptions;
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter(
        (selected) => selected !== option
      );
    } else if (selectedOptions.length < maxSelection) {
      newSelectedOptions = [...selectedOptions, option];
    } else {
      return; // Reach maxSelection
    }
    setSelectedOptions(newSelectedOptions);
    handleChange(newSelectedOptions);
    setInputValue("");
    handleError("");
    setHighlightedIndex(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemove = (option: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected !== option
    );
    setSelectedOptions(newSelectedOptions);
    handleChange(newSelectedOptions);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setInputValue(""); // Clear input value when dropdown is closed
    }
  }, [isDropdownOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      highlightedIndex !== null &&
      filteredOptions.length > 0
    ) {
      event.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    }
  };

  const isMaxSelected = selectedOptions.length >= maxSelection;

  return (
    <div ref={dropdownRef} className="relative w-full h-full">
      <div
        className="flex flex-col relative gap-4"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {selectedOptions.length === 0
          ? `You can select up to ${maxSelection} options`
          : selectedOptions.length < maxSelection
          ? `You can select ${maxSelection - selectedOptions.length} more`
          : "You've reached the max options"}
        <div
          className={`flex flex-row justify-between items-center border rounded-lg px-2 w-full h-14 ${
            isDropdownOpen
              ? "border-primary dark:border-primary-dark"
              : "dark:border-primary-light"
          }`}
        >
          <div className="flex flex-row gap-2">
            {selectedOptions.map((option) => (
              <div
                key={option}
                className="flex items-center bg-primary-light dark:bg-primary-dark rounded py-1 px-2"
              >
                {option}
                <span
                  className="ml-2 cursor-pointer text-xl text-gray-600 dark:text-primary-light"
                  onClick={() => {
                    handleRemove(option);
                  }}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
          <div className="text-xl">
            {isDropdownOpen ? <GoChevronUp /> : <GoChevronDown />}
          </div>
        </div>
        {error && (
          <span className="text-red-500 absolute top-[106px]">{error}</span>
        )}
      </div>
      {isDropdownOpen && (
        <div className="flex flex-col absolute top-full left-0 right-0 border rounded-lg shadow bg-white dark:bg-customBlack dark:border-primary-light max-h- overflow-y-auto mt-1">
          <div className="flex flex-row border-b dark:border-primary-light items-center px-3.5 py-3">
            <div className="mr-2 text-lg">
              <GoSearch />
            </div>
            <input
              ref={inputRef}
              className="w-full border:none focus:outline-none dark:bg-customBlack"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span
              className="ml-2 cursor-pointer text-xl"
              onClick={(e) => {
                setInputValue("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              &times;
            </span>
          </div>
          <ul>
            {filteredOptions.map((option, index) => (
              <li
                key={option}
                className={`flex items-center px-3.5 py-3 ${
                  isMaxSelected
                    ? "text-gray-400"
                    : "hover:bg-gray-200 dark:hover:bg-primary-dark cursor-pointer"
                } ${
                  highlightedIndex === index
                    ? "bg-primary-light dark:bg-primary-dark"
                    : ""
                }`}
                onClick={() => {
                  if (!isMaxSelected) handleSelect(option);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelect(option)}
                  className="mr-2 custom-checkbox"
                  disabled={isMaxSelected}
                />
                {option}
              </li>
            ))}
            {options
              .filter((option) => disabledOptions.includes(option))
              .map((option) => (
                <li
                  key={option}
                  className="flex items-center px-3.5 py-3 text-gray-400"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    disabled
                    className="mr-2"
                  />
                  {option}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

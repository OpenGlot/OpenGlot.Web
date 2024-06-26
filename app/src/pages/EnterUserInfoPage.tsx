import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";

interface UserInfo {
  dateOfBirth: string;
  nativeLanguages: string[];
  targetLanguages: string[];
  timeZone: string;
}

type UserInfoKey = keyof UserInfo;

const EnterUserInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    dateOfBirth: "",
    nativeLanguages: [],
    targetLanguages: [],
    timeZone: "",
  });

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserInfo((prev) => ({ ...prev, timeZone }));
  }, []);

  const questions = [
    {
      question: "Enter your date of birth",
      inputType: "date",
      key: "dateOfBirth" as UserInfoKey,
    },
    {
      question: "Select your native languages",
      inputType: "select",
      key: "nativeLanguages" as UserInfoKey,
      options: ["English", "Chinese", "Korean"],
      maxSelections: 2,
    },
    {
      question: "Select your target languages",
      inputType: "select",
      key: "targetLanguages" as UserInfoKey,
      options: ["English", "Chinese", "Korean"],
      maxSelections: 3,
    },
  ];

  const handleChange = (value: string | string[]) => {
    const currentQuestion = questions[step];
    if (currentQuestion.key === "nativeLanguages") {
      setUserInfo((prev) => ({
        ...prev,
        targetLanguages: prev.targetLanguages.filter(
          (lang) => !value.includes(lang)
        ),
        [currentQuestion.key]: value,
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        [currentQuestion.key]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      alert("Form submitted!");
      console.log(userInfo);
      // Handle form submission logic here
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const getCurrentValue = (key: UserInfoKey) => {
    return userInfo[key];
  };

  const getDisabledOptions = () => {
    if (step === 2) {
      return userInfo.nativeLanguages;
    }
    return [];
  };

  const dividerWidth = isSubmitted
    ? "100%"
    : `${(step / questions.length) * 100}%`;

  return (
    <div className="flex flex-col gap-10 items-center max-w-md mx-auto">
      <h1 className="text-4xl font-bold self-start">Before we get started</h1>
      <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-600 relative">
        <div
          className="absolute top-0 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{ width: dividerWidth }}
        ></div>
      </div>
      <Card
        handleSubmit={handleSubmit}
        handlePrevious={handlePrevious}
        step={step}
        total={questions.length}
        question={questions[step].question}
        inputType={questions[step].inputType}
        maxSelections={questions[step].maxSelections}
        options={questions[step].options}
        handleChange={handleChange}
        value={getCurrentValue(questions[step].key)} // Values entered by users are passed down and persisted
        disabledOptions={getDisabledOptions()}
      />
      <p className="link" onClick={() => navigate("/")}>
        Skip for now
      </p>
    </div>
  );
};

export default EnterUserInfoPage;

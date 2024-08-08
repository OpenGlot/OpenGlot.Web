import React, { useCallback, useState } from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { QuestionType } from "types/question";
import { TextField, AudioField, PictureField } from "components/common/Fields";
import { getRandomNumberAsString } from "./LessonQuestions";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

interface OptionsFieldProps {
  questionIndex: number;
  control: Control<any>;
  formState: any;
}

export const OptionsField: React.FC<OptionsFieldProps> = ({
  questionIndex,
  control,
  formState,
}) => {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const [visibleOptions, setVisibleOptions] = useState<{
    [key: number]: boolean;
  }>({});

  const watchedQuestion = useWatch({
    control,
    name: `questions.${questionIndex}`,
  });

  const toggleOptionVisibility = (optionIndex: number) => {
    setVisibleOptions((prev) => ({
      ...prev,
      [optionIndex]: !prev[optionIndex],
    }));
  };

  const renderInputFields = useCallback(
    (optionIndex: number) => {
      const questionType = watchedQuestion.questionType;
      switch (questionType) {
        case QuestionType.Reply:
        case QuestionType.Describe:
        case QuestionType.FillBlank:
          return (
            <>
              <TextField
                name={`questions.${questionIndex}.options.${optionIndex}.text`}
                control={control}
                label={`Option ${optionIndex + 1} Text`}
              />
              <AudioField
                name={`questions.${questionIndex}.audio`}
                control={control}
                urlKey="some-url-key"
                englishTranslation="Translation 1"
                languageCode="zh"
                transcript="some-transcript"
                sentenceId="1"
                // uploadedAt={new Date()}
              />
            </>
          );
        case QuestionType.Listen:
          return (
            <>
              <TextField
                name={`questions.${questionIndex}.options.${optionIndex}.text`}
                control={control}
                label={`Option ${optionIndex + 1} Text`}
              />
            </>
          );
        case QuestionType.Choose:
          return (
            <>
              <PictureField
                name={`questions.${questionIndex}.options.${optionIndex}.image`}
                control={control}
                context="Some context"
                description="A brief description"
                enhancedDescription="An enhanced description with more details"
                id={getRandomNumberAsString(1000, 999999)}
                uploadedAt={new Date()}
                urlKey="some-url-key"
              />
            </>
          );
        case QuestionType.Recognize:
          return (
            <>
              <AudioField
                name={`questions.${questionIndex}.audio`}
                control={control}
                urlKey="some-url-key"
                englishTranslation="Translation 1"
                languageCode="zh"
                transcript="some-transcript"
                sentenceId="1"
                // uploadedAt={new Date()}
              />
            </>
          );
        case QuestionType.All:
          return (
            <>
              <TextField
                name={`questions.${questionIndex}.options.${optionIndex}.text`}
                control={control}
                label={`Option ${optionIndex + 1} Text`}
              />
              <PictureField
                name={`questions.${questionIndex}.options.${optionIndex}.image`}
                control={control}
                context="Some context"
                description="A brief description"
                enhancedDescription="An enhanced description with more details"
                id={getRandomNumberAsString(1000, 999999)}
                uploadedAt={new Date()}
                urlKey="some-url-key"
              />
              <AudioField
                name={`questions.${questionIndex}.options.${optionIndex}.audio`}
                control={control}
                urlKey="some-url-key"
                englishTranslation="Translation 1"
                languageCode="zh"
                transcript="some-transcript"
                sentenceId="1"
                // uploadedAt={new Date()}
              />
            </>
          );
        default:
          return null;
      }
    },
    [control, watchedQuestion, questionIndex]
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
      <label className="block text-gray-800 font-semibold mb-2">Options</label>
      {formState?.errors?.questions?.[questionIndex]?.options && (
        <p className="text-red-500 text-sm p-2">
          {formState?.errors?.questions?.[questionIndex]?.options?.message}
        </p>
      )}
      <div className="space-y-4">
        {optionFields.length > 0 &&
          optionFields.map((option, optionIndex) => (
            <div
              key={option.id}
              className="flex flex-col p-4 bg-white border rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={() => toggleOptionVisibility(optionIndex)}
                  className="flex items-center text-blue-500"
                >
                  {visibleOptions[optionIndex] ? (
                    <ChevronDown className="mr-2" />
                  ) : (
                    <ChevronRight className="mr-2" />
                  )}
                  {visibleOptions[optionIndex]
                    ? `Hide Option ${optionIndex + 1}`
                    : `Show Option ${optionIndex + 1}`}
                </button>
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              </div>
              {visibleOptions[optionIndex] && renderInputFields(optionIndex)}
            </div>
          ))}
      </div>
      <button
        type="button"
        onClick={() =>
          appendOption({
            text: "",
            audio: null,
            image: null,
            question: null,
            questionId: `${questionIndex + 1}`,
          })
        }
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        disabled={optionFields.length >= 4}
      >
        Add Option
      </button>
    </div>
  );
};

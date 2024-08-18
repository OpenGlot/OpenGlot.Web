// src/utils/questionUtils.ts
import React from "react";
import { QuestionType } from "types";
import { AudioField, PictureField, TextField } from "components/common/Fields";
import { OptionsField } from "./LessonOptions";

interface RenderInputsProps {
  questionType: QuestionType;
  questionIndex: number;
  control: any;
  formState: any;
}
const reverseQuestionTypeMap: Record<QuestionType, number> = {
  [QuestionType.NotSelected]: 0,
  [QuestionType.Reply]: 1,
  [QuestionType.Listen]: 2,
  [QuestionType.Describe]: 3,
  [QuestionType.Choose]: 4,
  [QuestionType.Recognize]: 5,
  [QuestionType.FillBlank]: 6,
  [QuestionType.All]: 7,
};

export const getQuestionTypeFromValue = (value: number): QuestionType => {
  const questionTypes = Object.values(QuestionType);
  return questionTypes[value] || QuestionType.NotSelected;
};

export const getValueFromQuestionType = (type: QuestionType): number => {
  return reverseQuestionTypeMap[type] || 0;
};
export const getRandomNumberAsString = (min: number, max: number): string => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
};

export const renderInputsForQuestionType = ({
  questionType,
  questionIndex,
  control,
  formState,
}: RenderInputsProps) => {
  const commonProps = { control, questionIndex, formState };
  switch (questionType) {
    case QuestionType.Reply:
    case QuestionType.Describe:
    case QuestionType.FillBlank:
      return (
        <>
          <TextField
            name={`questions.${questionIndex}.text`}
            control={control}
            label="Text"
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

          <OptionsField {...commonProps} />
        </>
      );
    case QuestionType.Listen:
      return (
        <>
          <TextField
            name={`questions.${questionIndex}.text`}
            control={control}
            label="Text"
          />
          <OptionsField {...commonProps} />
        </>
      );
    case QuestionType.Choose:
      return (
        <>
          <PictureField
            name={`questions.${questionIndex}.image`}
            control={control}
            context="Some context"
            description="A brief description"
            enhancedDescription="An enhanced description with more details"
            id={getRandomNumberAsString(1000, 999999)}
            uploadedAt={new Date()}
            urlKey="some-url-key"
          />
          <OptionsField {...commonProps} />
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
          <OptionsField {...commonProps} />
        </>
      );
    case QuestionType.All:
      return (
        <>
          <TextField
            name={`questions.${questionIndex}.text`}
            control={control}
            label="Text"
          />
          <PictureField
            name={`questions.${questionIndex}.image`}
            control={control}
            context="Some context"
            description="A brief description"
            enhancedDescription="An enhanced description with more details"
            id={getRandomNumberAsString(1000, 999999)}
            uploadedAt={new Date()}
            urlKey="some-url-key"
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
          <OptionsField {...commonProps} />
        </>
      );

    default:
      return null;
  }
};

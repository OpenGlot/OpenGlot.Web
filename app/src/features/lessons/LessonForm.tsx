import React, { useCallback, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createLesson, updateLesson } from "services";
import { schema } from "./schema";
import { QuestionType } from "types";
import { SelectField, TextField } from "components/common/Fields";
import {
  getQuestionTypeFromValue,
  getValueFromQuestionType,
  renderInputsForQuestionType,
} from "./LessonQuestions";
import { ArrowLeft, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { Lesson } from "types";

const LessonForm: React.FC = () => {
  const lessonDetail = useLoaderData() as Lesson;
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleQuestions, setVisibleQuestions] = useState<{
    [key: number]: boolean;
  }>({});

  const { control, handleSubmit, setValue, formState } =
    useForm({
      defaultValues: lessonDetail
        ? {
            ...lessonDetail,
            questions:
              lessonDetail?.questions?.map((question: any) => ({
                ...question,
                questionType: getQuestionTypeFromValue(question.questionType),
              })) || [],
          }
        : {
            contentType: 3,
            createdAt: new Date(),
            module: null,
            moduleId: location?.state.moduleId ,
            order: null,
            questions: [],
            ratings: [],
            title: "",
          },
      resolver: yupResolver(schema),
    });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const watchedQuestions = useWatch({ control, name: "questions" });
  const watchTitle = useWatch({ control, name: "title" });

  const toggleVisibility = (index: number) => {
    setVisibleQuestions((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleQuestionTypeChange = useCallback(
    (questionIndex: number, questionType: QuestionType) => {
      setValue(`questions.${questionIndex}.questionType`, questionType);
    },
    [setValue]
  );

  const handleAddQuestion = () => {
    appendQuestion({
      text: "",
      answer: "",
      // questionType: QuestionType.Text,
      question: "",
      lesson: { title: watchTitle },
      lessonId: 3,
      options: [],
    });
  };

  const onSubmit = async (data: any) => {
    try {
      const finalData = {
        ...data,
        questions: data.questions.map((question: any) => ({
          ...question,
          questionType: getValueFromQuestionType(question.questionType),
        })),
      };
      lessonDetail
        ? await updateLesson(finalData)
        : await createLesson(finalData);
      navigate(`/module/${finalData.moduleId}`);
    } catch (error: any) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex-shrink-0 p-2 rounded-full hover:bg-gray-100"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h1 className="text-2xl font-bold mb-4">Lesson Form</h1>
          <TextField name="title" control={control} label="Title" />

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Questions</label>
            {formState.errors.questions && (
              <p className="text-red-500 text-sm p-2">
                {formState.errors.questions.message}
              </p>
            )}
            {questionFields.map((question, questionIndex) => (
              <div
                key={question.id}
                className={`border p-4 mb-4 rounded-md shadow-sm bg-gray-50 ${
                  !visibleQuestions[questionIndex] ? "flex justify-between" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleVisibility(questionIndex)}
                  className="flex items-center text-blue-500"
                >
                  {visibleQuestions[questionIndex] ? (
                    <ChevronDown className="mr-2" />
                  ) : (
                    <ChevronRight className="mr-2" />
                  )}
                  {visibleQuestions[questionIndex]
                    ? `Hide Question ${questionIndex + 1}`
                    : `Show Question ${questionIndex + 1}`}
                </button>

                {visibleQuestions[questionIndex] && (
                  <>
                    <SelectField
                      name={`questions.${questionIndex}.questionType`}
                      control={control}
                      label="Question Type"
                      options={Object.values(QuestionType).map((type) => ({
                        value: type,
                        label: type,
                      }))}
                      onChange={(e) =>
                        handleQuestionTypeChange(
                          questionIndex,
                          e.target.value as QuestionType
                        )
                      }
                    />
                    {renderInputsForQuestionType({
                      questionType:
                        watchedQuestions[questionIndex]?.questionType,
                      questionIndex,
                      control,
                      formState,
                    })}
                    <TextField
                      name={`questions.${questionIndex}.answer`}
                      control={control}
                      label="Answer"
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="flex items-center p-1 text-black rounded-md"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add Question
            </button>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Save Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;

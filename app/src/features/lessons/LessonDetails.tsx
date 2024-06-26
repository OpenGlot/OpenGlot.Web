import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Lesson } from "./lesson";

const LessonDetail: React.FC = () => {
  const lessonDetail = useLoaderData() as Lesson;

  if (!lessonDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Title: {lessonDetail.title}</h1>
      <p>
        Module:{" "}
        <Link to={`/module/${lessonDetail.moduleId}`}>
          Module {lessonDetail.moduleId}
        </Link>
      </p>
      <div>
        Questions:
        <ul>
          {lessonDetail.questions?.map((question) => (
            <li key={question.id}>
              {question.text} - {question.answer}
              {question.options?.map((option) => (
                <div key={option.id}>
                  {option.text}
                  {option.audio && (
                    <audio controls>
                      <source src={option.audio.urlKey} type="audio/mpeg" />
                    </audio>
                  )}
                  {option.image && (
                    <img
                      src={option.image.urlKey}
                      alt={option.image.description}
                    />
                  )}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonDetail;

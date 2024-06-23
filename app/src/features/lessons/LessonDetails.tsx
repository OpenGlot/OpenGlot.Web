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
      <h1>title: {lessonDetail.title}</h1>
      <p>
        Module:{" "}
        <Link to={`/module/${lessonDetail.moduleId}`}>
          Module {lessonDetail.moduleId}
        </Link>
      </p>
    </div>
  );
};

export default LessonDetail;

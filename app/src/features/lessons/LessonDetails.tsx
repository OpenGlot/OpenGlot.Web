import React from "react";
import { useLoaderData } from "react-router-dom";
import { Lesson } from "./lesson";

const LessonDetail: React.FC = () => {
  const lessonDetail = useLoaderData() as Lesson;

  if (!lessonDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{lessonDetail.title}</h1>
      <p>{lessonDetail.moduleId}</p>
    </div>
  );
};

export default LessonDetail;

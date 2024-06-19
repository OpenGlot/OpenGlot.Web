import React from "react";
import { useLoaderData } from "react-router-dom";
import { Course } from "./course";
import { Module } from "../modules/module";

const CourseDetail: React.FC = () => {
  const courseDetail = useLoaderData() as Course;

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{courseDetail.title}</h1>
      <div>
        {courseDetail.modules &&
          courseDetail.modules.map((module: Module) => (
            <p key={module.id}>{module.title}</p>
          ))}
      </div>
      <div>{courseDetail.language && courseDetail.language.name}</div>
    </div>
  );
};

export default CourseDetail;

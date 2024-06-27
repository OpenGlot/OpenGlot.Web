import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Course, Module } from "types";

const CourseDetail: React.FC = () => {
  const courseDetail = useLoaderData() as Course;

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>title: {courseDetail.title}</h1>
      <div>
        <div>
          language:{" "}
          <Link to={`/language/${courseDetail.languageId}`}>
            {courseDetail.language?.name}
          </Link>
        </div>
        <div>
          Modules:
          <ul>
            {courseDetail.modules?.map((module: Module) => (
              <li key={module.id}>
                <Link to={`/module/${module.id}`}>{module.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

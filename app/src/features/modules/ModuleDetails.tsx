import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Module, Lesson } from "types";

const ModuleDetail: React.FC = () => {
  const moduleDetail = useLoaderData() as Module;

  if (!moduleDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>title: {moduleDetail.title}</h1>
      Lessons:
      {moduleDetail.lessons ? (
        <ul>
          {moduleDetail.lessons.map((lesson: Lesson) => (
            <li key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons available</p>
      )}
    </div>
  );
};

export default ModuleDetail;

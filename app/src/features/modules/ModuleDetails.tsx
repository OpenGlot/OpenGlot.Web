import React from "react";
import { useLoaderData } from "react-router-dom";
import { Module } from "./module";
import { Lesson } from "../lessons/lesson";

const ModuleDetail: React.FC = () => {
  const moduleDetail = useLoaderData() as Module;

  if (!moduleDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{moduleDetail.title}</h1>
      {moduleDetail.lessons ? (
        <div>
          {moduleDetail.lessons.map((lesson: Lesson) => (
            <p key={lesson.id}>{lesson.title}</p>
          ))}
        </div>
      ) : (
        <p>No lessons available</p>
      )}
    </div>
  );
};

export default ModuleDetail;

import ListCard from "components/common/ListComponent";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Module } from "types";

const ModuleDetail: React.FC = () => {
  const moduleDetail = useLoaderData() as Module;
  const navigate = useNavigate();

  if (!moduleDetail) {
    return <div>Loading...</div>;
  }

  const handleLessonClick = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  const handleCreateLessonClick = () => {
    navigate(`/create-lesson`,{state:{moduleId:moduleDetail.id}});
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={handleCreateLessonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Lesson
        </button>
      </div>
      <ListCard
        title={moduleDetail.title}
        description={moduleDetail.description}
        items={moduleDetail.lessons}
        renderItem={(lesson) => <span>{lesson.title}</span>}
        onItemClick={(lesson) => handleLessonClick(lesson.id)}
      componentName={"Module"}
      edit={true}
      />
    </div>
  );
};

export default ModuleDetail;

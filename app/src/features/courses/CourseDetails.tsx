import ListCard from "components/common/ListComponent";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Course } from "types";

const CourseDetail: React.FC = () => {
  const courseDetail = useLoaderData() as Course;
  const navigate = useNavigate();
  if (!courseDetail) {
    return <div>Loading...</div>;
  }
  const handleModuleClick = (moduleId: string) => {
    navigate(`/module/${moduleId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ListCard
        title={courseDetail.title}
        description={courseDetail.description}
        items={courseDetail.modules}
        renderItem={(module) => <span>{module.title}</span>}
        onItemClick={(module) => handleModuleClick(module.id)}
        componentName={"Course"}
      />
    </div>
  );
};

export default CourseDetail;

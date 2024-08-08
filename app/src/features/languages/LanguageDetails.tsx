import ListCard from "components/common/ListComponent";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Language } from "types";

const LanguageDetail: React.FC = () => {
  const languageDetail = useLoaderData() as Language;
  const navigate = useNavigate();

  if (!languageDetail) {
    return <div>Loading...</div>;
  }
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ListCard
        title={languageDetail.name}
        description={languageDetail.description}
        items={languageDetail.courses}
        renderItem={(course) => <span>{course.title}</span>}
        onItemClick={(course) => handleCourseClick(course.id)}
        componentName="Language"
      />
    </div>
  );
};

export default LanguageDetail;

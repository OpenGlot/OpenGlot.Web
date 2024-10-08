import ListCard from "components/common/ListComponent";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { LessonType } from "types";

const LessonDetail: React.FC = () => {
  const lessonDetail = useLoaderData() as LessonType;

  if (!lessonDetail) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ListCard
        description=''
        title={lessonDetail.title}
        items={lessonDetail.questions}
        renderItem={(item) => <div>{item.name}</div>}
        onItemClick={(item) => console.log(item)}
        isLessonOpen={true} 
        lessonDetail={lessonDetail}
        componentName="Lesson"
      />
    </div>
  );
};

export default LessonDetail;

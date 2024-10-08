import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/styles/myCourses.scss";

const MyCourses: React.FC = () => {
  const { t } = useTranslation();

  const courses = [
    {
      id: 1,
      title: "Course 1",
      description: "This is the description for course 1 hskajdhkajh asjdkjas asdkasj,adsmnas,mdna,m cvkjdlv",
      language: "English",
      level: "Beginner",
      progress: 50,
    },
    {
      id: 2,
      title: "Course 2",
      description: "This is the description for course 2",
      language: "Spanish",
      level: "Intermediate",
      progress: 75,
    },
    {
      id: 3,
      title: "Course 3",
      description: "This is the description for course 3",
      language: "French",
      level: "Advanced",
      progress: 75,
    },
    {
      id: 1,
      title: "Course 1",
      description: "This is the description for course 1 hskajdhkajh asjdkjas asdkasj,adsmnas,mdna,m cvkjdlv",
      language: "English",
      level: "Beginner",
      progress: 50,
    },
    {
      id: 2,
      title: "Course 2",
      description: "This is the description for course 2",
      language: "Spanish",
      level: "Intermediate",
      progress: 75,
    },
    {
      id: 3,
      title: "Course 3",
      description: "This is the description for course 3",
      language: "French",
      level: "Advanced",
      progress: 75,
    },
    {
      id: 1,
      title: "Course 1",
      description: "This is the description for course 1 hskajdhkajh asjdkjas asdkasj,adsmnas,mdna,m cvkjdlv",
      language: "English",
      level: "Beginner",
      progress: 50,
    },
    {
      id: 2,
      title: "Course 2",
      description: "This is the description for course 2",
      language: "Spanish",
      level: "Intermediate",
      progress: 75,
    },
    {
      id: 3,
      title: "Course 3",
      description: "This is the description for course 3",
      language: "French",
      level: "Advanced",
      progress: 75,
    },
  ];

  return (
    <>
      <h2 className="myCourses text-2xl font-semibold">{t("My Courses")}</h2>
      <div className="CourseList">
        {courses.map((course) => (
          <div className="CourseItem" key={course.id}>
            <div className="language">
              Language: <span className="languageText">{course.language}</span>
            </div>
            <div className="title">{course.title}</div>
            <div className="description">
              <p className="descriptionText">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCourses;

import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Course } from "./course";

const CourseList: React.FC = () => {
  const { courses } = useLoaderData() as { courses: Course[] };

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

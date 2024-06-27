import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Lesson } from "types";

const LessonList: React.FC = () => {
  const { lessons } = useLoaderData() as { lessons: Lesson[] };

  return (
    <div>
      <h1>Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;

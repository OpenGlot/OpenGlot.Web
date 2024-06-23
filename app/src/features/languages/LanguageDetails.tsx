import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Language } from "./language";

const LanguageDetail: React.FC = () => {
  const languageDetail = useLoaderData() as Language;

  if (!languageDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>title: {languageDetail.name}</h1>
      <p>description: {languageDetail.description}</p>
      <div>
        Courses:{" "}
        <ul>
          {languageDetail.courses?.map((course) => (
            <li key={course.id}>
              <Link to={`/course/${course.id}`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageDetail;

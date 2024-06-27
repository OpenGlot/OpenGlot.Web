import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Language } from "types";

const LanguageList: React.FC = () => {
  const { languages } = useLoaderData() as { languages: Language[] };

  return (
    <div>
      <h1>Languages</h1>
      <ul>
        {languages.map((language) => (
          <li key={language.id}>
            <Link to={`/language/${language.id}`}>{language.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;

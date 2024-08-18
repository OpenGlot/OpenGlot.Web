import ListCard from "components/common/ListComponent";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Language } from "types";

const LanguageList: React.FC = () => {
  const { languages } = useLoaderData() as { languages: Language[] };
  const navigate = useNavigate();

  const handleLanguageClick = (languageId: string) => {
    navigate(`/language/${languageId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ListCard
        title="Languages"
        description="Click on a language to see its details."
        items={languages}
        renderItem={(language) => <span>{language.name}</span>}
        onItemClick={(language) => handleLanguageClick(language.id)}
        componentName="Languages"
      />
    </div>
  );
};

export default LanguageList;

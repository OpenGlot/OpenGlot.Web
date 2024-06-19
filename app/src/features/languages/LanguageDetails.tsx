import React from "react";
import { useLoaderData } from "react-router-dom";
import { Language } from "./language";

const LanguageDetail: React.FC = () => {
  const languageDetail = useLoaderData() as Language;

  if (!languageDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{languageDetail.name}</h1>
      <p>{languageDetail.description}</p>
    </div>
  );
};

export default LanguageDetail;

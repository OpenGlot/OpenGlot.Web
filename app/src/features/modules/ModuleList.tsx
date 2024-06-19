import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Module } from "./module";

const ModuleList: React.FC = () => {
  const { modules } = useLoaderData() as { modules: Module[] };

  return (
    <div>
      <h1>modules</h1>
      <ul>
        {modules.map((module) => (
          <li key={module.id}>
            {module.title}
            <Link to={`/modules/${module.id}`}>{module.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleList;

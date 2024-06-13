import React from "react";

const MyCourses: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Language and Regions</h2>
      <select className="p-2 border rounded dark:bg-customBlack">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default MyCourses;

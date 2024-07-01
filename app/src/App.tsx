import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import VoiceRecorder from "pages/VoiceRecorder";

const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

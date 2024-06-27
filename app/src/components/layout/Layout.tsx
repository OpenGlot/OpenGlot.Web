import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

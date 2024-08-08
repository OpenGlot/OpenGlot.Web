import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router";
import { Header } from "../components/header";
import { Sidebar } from "../components/side-bar";

export const DefaultLayout = () => {
  return (
    <div className="flex dark:text-gray-300 dark:bg-gray-800 min-h-screen">
      {/* Sidebar */}
      <div className="hidden sm:block fixed top-0 left-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="grow sm:ml-64">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

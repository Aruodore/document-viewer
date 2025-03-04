import { useState } from "react";
import { NavLink } from "react-router";
import { Home, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen p-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white flex flex-col overflow-hidden"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:bg-blue-500 hover:text-white flex items-center justify-center"
        tabIndex={0}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-2 rounded hover:bg-blue-500 hover:text-white ${
              isActive ? "bg-blue-500 text-white" : ""
            }`
          }
        >
          <Home size={20} />
          {!isCollapsed && (
            <motion.span
              key="dashboard-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              Dashboard
            </motion.span>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center p-2 rounded hover:bg-blue-500 hover:text-white ${
              isActive ? "bg-blue-500 text-white" : ""
            }`
          }
        >
          <User size={20} />
          {!isCollapsed && (
            <motion.span
              key="profile-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              Profile
            </motion.span>
          )}
        </NavLink>
      </nav>
    </motion.aside>
  );
};

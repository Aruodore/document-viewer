import { useThemeStore } from "../stores/theme-store"; 
import { Moon, Sun } from "lucide-react";

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore(); 

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
      aria-label={isDarkMode ? "Enable light mode" : "Enable dark mode"} // Dynamic label
      role="switch"
      aria-checked={isDarkMode}
    >
      {isDarkMode ? (
        <Moon className="w-5 h-5 text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

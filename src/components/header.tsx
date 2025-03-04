import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { DarkModeToggle } from "./darkmode-toggle";
import { motion, AnimatePresence } from "framer-motion";
import * as Portal from "@radix-ui/react-portal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation(); // Get current route

  // Close menu on "Esc" key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling
      firstMenuItemRef.current?.focus(); // Focus first item in menu
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-b-black/15 relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-orange-600 dark:text-orange-400 text-2xl font-bold">
          IntellDoc
        </div>

        {/* Desktop Icons & Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-3">
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 cursor-pointer p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Overlay */}
        <Portal.Root>
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Mobile Menu */}
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute right-4 top-14 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg flex flex-col gap-3 z-50 md:hidden"
                >
                  <Link
                    to="/"
                    ref={firstMenuItemRef}
                    className={`text-gray-700 dark:text-gray-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                      location.pathname === "/dashboard"
                        ? "text-orange-500 font-semibold"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className={`text-gray-700 dark:text-gray-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                      location.pathname === "/profile"
                        ? "text-orange-500 font-semibold"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Portal.Root>
      </div>
    </header>
  );
};

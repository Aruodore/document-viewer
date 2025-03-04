import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
};

// Helper function to update the DOM
const updateTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Initialize theme based on system preference
const initializeTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  updateTheme(isDark);
  return isDark;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: initializeTheme(),
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          updateTheme(newDarkMode);
          return { isDarkMode: newDarkMode };
        });
      },
      setDarkMode: (isDark) => {
        updateTheme(isDark);
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: "theme-storage", // unique name for the localStorage key
    }
  )
);

import React from "react";
import { cn } from "../../utils/utils";
// import { cn } from "../utils/utils"; // Utility for conditional class names

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "red" | "green" | "yellow" | "purple";
  text?: string;
}

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

const colorClasses = {
  blue: "border-blue-500 border-t-transparent",
  gray: "border-gray-500 border-t-transparent",
  red: "border-red-500 border-t-transparent",
  green: "border-green-500 border-t-transparent",
  yellow: "border-yellow-500 border-t-transparent",
  purple: "border-purple-500 border-t-transparent",
};

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  color = "blue",
  text,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={cn(
          "animate-spin rounded-full border-solid",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  );
};

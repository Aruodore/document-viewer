import React from "react";
import { SignatureCanvasDraw } from "./signature-canvas-draw";
import { SignatureList } from "./signature-list";

export const SignatureManager: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <SignatureCanvasDraw />
      <SignatureList />
    </div>
  );
};

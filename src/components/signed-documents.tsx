import React from "react";
import { useUserStore } from "../stores/user";

export const SignedDocuments: React.FC = () => {
  const { signedDocuments } = useUserStore();

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold ">Signed Documents</h2>
      {signedDocuments.length === 0 ? (
        <p className="text-gray-500">No signed documents.</p>
      ) : (
        <div className="space-y-4">
          {signedDocuments.map((file) => (
            <div
              key={file.id}
              className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold ">
                {file.documentName}
              </h3>
              <p className="text-sm text-gray-500">
                Signed on {file.signingDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { useSignatureStore } from "../stores/signature";
import { Button } from "./ui/button";

export const SignatureList: React.FC = () => {
  const { signatures, setCurrentSignature, deleteSignature } =
    useSignatureStore();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this signature?")) {
      deleteSignature(id);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center sm:text-left">
        Saved Signatures
      </h2>

      {signatures.length === 0 ? (
        <p className="text-gray-500 text-center">No signatures saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {signatures.map((signature) => (
            <div
              key={signature.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col items-center bg-gray-50 dark:bg-gray-900 shadow-md"
            >
              <img
                src={signature.imageUrl}
                alt={signature.name}
                className="max-w-[150px] sm:max-w-[200px] h-20 object-contain mb-3"
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {signature.name}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                <Button
                  onClick={() => setCurrentSignature(signature.imageUrl)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
                >
                  Select
                </Button>
                <Button
                  onClick={() => handleDelete(signature.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

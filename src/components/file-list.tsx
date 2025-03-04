import React, { useEffect } from "react";
import { useDocumentStore } from "../stores/document";
import { useUpdateSearchParams } from "../hooks/use-update-searchparams";
import { Modal } from "./ui/modal";
import { FileDetails } from "./file-details";
import { Button } from "./ui/button";
import { Loading } from "./ui/loader";

export const FileList: React.FC = () => {
  const {
    files,
    updateFileStatus,
    fetchFiles,
    deleteFile,
    setSelectedFile,
    selectedFile,
    signDocument,
    isLoading,
    error,
    clearError,
  } = useDocumentStore();
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]); // Fetch files on mount

  return (
    <div className="mt-6">
      <div className="space-y-4">
        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            {/* <div className="text-gray-500 dark:text-gray-400 text-lg">
              Loading files...
            </div> */}
            <Loading text="Loading files..."/>
          </div>
        ) : files.length > 0 ? (
          files.map((file) => (
            <div
              key={file.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                {/* File Info */}
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      file.status === "Pending Processing"
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                        : file.status === "Processed"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                        : file.status === "Completed"
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                        : file.status === "Signed"
                        ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {file.status}
                  </span>

                  {/* Action Buttons */}
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedFile(file)}
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    View Details
                  </Button>
                  {file.status !== "Signed" && (
                    <Button
                      variant="ghost"
                      onClick={() => updateFileStatus(file.id, "Completed")}
                      disabled={isLoading}
                      className={`${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
                      }`}
                    >
                      {isLoading ? "Updating..." : "Mark Complete"}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => deleteFile(file.id)}
                    disabled={isLoading}
                    className={`${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
                    }`}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty State
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No files available
            </div>
            <Button
              onClick={() => updateSearchParams({ upload: "file" })}
              variant="primary"
              className="mt-4"
            >
              Upload New File
            </Button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mt-4">
            {error}
            <button onClick={clearError} className="ml-2 text-sm text-blue-500">
              Dismiss
            </button>
          </div>
        )}

        {/* File Details Modal */}
        <Modal
          isOpen={!!selectedFile}
          onClose={() => setSelectedFile(null)}
          title={selectedFile?.name || "File Details"}
        >
          {selectedFile && (
            <FileDetails
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
              onSign={(id, signature, position) =>
                signDocument(id, signature, position)
              }
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

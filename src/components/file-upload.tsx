import React, { useState, useRef } from "react";
import { useDocumentStore } from "../stores/document";

export const FileUpload: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { uploadFile } = useDocumentStore();
  const successRef = useRef<HTMLParagraphElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        if (selectedFile.size <= 10 * 1024 * 1024) {
          // 10MB limit
          setError(null);
          setSuccess(false);
          simulateUpload(selectedFile);
        } else {
          setError("File size must be less than 10MB.");
          setSuccess(false);
        }
      } else {
        setError("Only PDF and DOCX files are allowed.");
        setSuccess(false);
      }
    }
  };

  const simulateUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        uploadFile(file); // Add file to the store
        setSuccess(true);
        setTimeout(() => {
          setUploadProgress(0); // Reset progress bar after a short delay
          successRef.current?.focus(); // Move focus to success message
        }, 1000); // Delay to show the progress bar at 100% before resetting
      }
    }, 200);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700"
      >
        Upload a file (PDF or DOCX, max 10MB)
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        aria-describedby="file-upload-help"
      />
      <p id="file-upload-help" className="sr-only">
        Only PDF and DOCX files are allowed. Max size: 10MB.
      </p>

      {error && (
        <p
          className="text-red-500 text-sm mt-2"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          ref={successRef}
          className="text-green-500 text-sm mt-2"
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          File uploaded successfully!
        </p>
      )}

      {uploadProgress > 0 && (
        <div
          className="w-full bg-gray-200 rounded-full h-2.5 mt-4"
          role="progressbar"
          aria-valuenow={uploadProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

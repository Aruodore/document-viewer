import { useEffect, useRef } from "react";
import { useUpdateSearchParams } from "../hooks/use-update-searchparams";
import { FileUpload } from "./file-upload";
import { Modal } from "./ui/modal";

export const FileUploadModal = () => {
  const { searchParams, removeSearchParams } = useUpdateSearchParams();
  const open = searchParams.upload === "file";
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => removeSearchParams(["upload"]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Manage focus when modal opens
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onClose={closeModal}
      title="Upload File"
      aria-labelledby="file-upload-title"
      aria-describedby="file-upload-description"
    >
      <div ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
        <h2 id="file-upload-title" className="sr-only">
          Upload File
        </h2>
        <p id="file-upload-description" className="sr-only">
          Select a file to upload.
        </p>
        <FileUpload />
      </div>
    </Modal>
  );
};

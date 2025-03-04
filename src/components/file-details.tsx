import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";
import { Document as DocType } from "../stores/document";
import { useSignatureStore } from "../stores/signature";
import { Button } from "./ui/button";

// Set up the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type FileDetailsProps = {
  file: DocType;
  onClose: () => void;
  onSign: (
    id: number,
    signature: string,
    position: { x: number; y: number }
  ) => void;
};

export const FileDetails: React.FC<FileDetailsProps> = ({
  file,
  onClose,
  onSign,
}) => {
  const { currentSignature } = useSignatureStore();
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNumPages] = useState<number | null>(null);
  const [docxContent, setDocxContent] = useState<string | null>(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [qaList, setQaList] = useState(file.qa || []);
  const dragRef = useRef<HTMLDivElement>(null);
  const documentContainerRef = useRef<HTMLDivElement>(null);

  

  // Load DOCX content safely
  useEffect(() => {
    if (file.fileUrl?.endsWith(".docx")) {
      fetch(file.fileUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          mammoth
            .extractRawText({ arrayBuffer })
            .then((result) => setDocxContent(result.value))
            .catch((error) => console.error("Error parsing DOCX:", error));
        });
    }
  }, [file.fileUrl]);

  // Dragging logic for signature positioning
  const handleMouseDown = () => {
    setIsDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && documentContainerRef.current) {
      const rect = documentContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSignaturePosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleSignDocument = () => {
    if (currentSignature) {
      onSign(file.id, currentSignature, signaturePosition);
    } else {
      alert("Please select or draw a signature first.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleAskQuestion = () => {
    if (userQuestion.trim()) {
      const newQa = {
        question: userQuestion,
        answer: "This is a mock response.",
      };
      setQaList([...qaList, newQa]);
      setUserQuestion("");
    }
  };

  return (
    <div className="p-4">
      <Button onClick={onClose} variant="ghost" aria-label="Go back">
        &larr; Back to List
      </Button>
      <h2 className="text-2xl font-bold mb-4">{file.name}</h2>
      <p className="text-gray-700 dark:text-gray-500">
        <strong>Upload Date:</strong>{" "}
        {new Date(file.uploadDate).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-500">
        <strong>Status:</strong> {file.status}
      </p>

      {/* Summary Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p className="text-gray-600">
          {file.summary || "No summary available."}
        </p>
      </div>

      {/* Q&A Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Q&A</h3>
        <div className="space-y-4">
          {qaList.map((qa, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 dark:text-gray-500">
                <strong>Q:</strong> {qa.question}
              </p>
              <p className="text-gray-600">
                <strong>A:</strong> {qa.answer}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Ask a question about the document..."
            className="w-full p-2 border rounded-lg"
          />
          <Button
            onClick={handleAskQuestion}
            className="mt-4"
            disabled={!userQuestion.trim()}
            aria-label="Submit question"
          >
            Ask
          </Button>
        </div>
      </div>

      {/* File Preview Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Document Preview</h3>
        <div
          ref={documentContainerRef}
          className="border rounded-lg p-4 bg-gray-50 relative"
        >
          {file.fileUrl?.endsWith(".pdf") ? (
            <Document file={file.fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} />
            </Document>
          ) : file.fileUrl?.endsWith(".docx") ? (
            <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-500">
              {docxContent || "Loading..."}
            </pre>
          ) : (
            <p className="text-gray-500">Unsupported file format.</p>
          )}
        </div>
      </div>

      {/* Signature Section */}
      {file.status !== "Signed" ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Sign Document</h3>
          {currentSignature ? (
            <div className="relative">
              <div
                ref={dragRef}
                onMouseDown={handleMouseDown}
                style={{
                  position: "absolute",
                  left: signaturePosition.x,
                  top: signaturePosition.y,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                aria-label="Draggable signature"
              >
                <img
                  src={currentSignature}
                  alt="Selected Signature"
                  className="w-24 h-12 object-contain"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No signature selected.</p>
          )}
          <Button
            onClick={handleSignDocument}
            variant="success"
            className="mt-4"
            aria-label="Sign Document"
          >
            Sign Document
          </Button>
        </div>
      ) : (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Signed Document</h3>
          <div className="relative border rounded-lg p-4 bg-gray-50">
            {file.signatureUrl && (
              <img
                src={file.signatureUrl}
                alt="Signed Signature"
                className="absolute w-24 h-12 object-contain"
                style={{
                  left: file.signaturePosition?.x || 0,
                  top: file.signaturePosition?.y || 0,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

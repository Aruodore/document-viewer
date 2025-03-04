// Simulate a delay for API calls
export const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock data for uploaded files
const mockFiles = [
  {
    id: 1,
    name: "Project Plan",
    uploadDate: "2023-10-01",
    status: "Pending Processing",
    summary: "This document outlines the project timeline...",
    qa: [
      { question: "What is the deadline?", answer: "December 2023" },
      { question: "Who is the project lead?", answer: "John Doe" },
    ],
    audioUrl: "/audio/project_plan_explanation.mp3",
  },
  {
    id: 2,
    name: "Budget Report",
    uploadDate: "2023-10-02",
    status: "Processed",
    summary: "This document details the budget allocation...",
    qa: [
      { question: "What is the total budget?", answer: "$100,000" },
      { question: "Is there a contingency?", answer: "Yes, 10%" },
    ],
    audioUrl: "/audio/budget_report_explanation.mp3",
  },
];

// Mock data for user profile
const mockUserProfile = {
  signatures: [
    { id: 1, name: "Signature 1", imageUrl: "/signatures/signature1.png" },
    { id: 2, name: "Signature 2", imageUrl: "/signatures/signature2.png" },
  ],
  pendingRequests: [
    { id: 1, documentName: "Contract A", requestedDate: "2023-10-03" },
    { id: 2, documentName: "Agreement B", requestedDate: "2023-10-04" },
  ],
  signedDocuments: [
    { id: 1, documentName: "NDA", signingDate: "2023-09-15" },
    { id: 2, documentName: "Employment Contract", signingDate: "2023-09-20" },
  ],
};

// Mock function to upload a file
export const uploadFile = async (file: File) => {
  await simulateDelay(1000); // Simulate network delay
  const newFile = {
    id: Date.now(),
    name: file.name,
    uploadDate: new Date().toISOString(),
    status: "Pending Processing",
    summary: "This is a new file summary.",
    qa: [],
    audioUrl: "",
  };
  mockFiles.push(newFile);
  return newFile;
};

// Mock function to fetch document summary and Q&A
export const fetchDocumentSummary = async (id: number) => {
  await simulateDelay(1000); // Simulate network delay
  const document = mockFiles.find((file) => file.id === id);
  if (!document) {
    throw new Error("Document not found");
  }
  return {
    summary: document.summary,
    qa: document.qa,
  };
};

// Mock function to fetch all uploaded files
export const fetchAllFiles = async () => {
  await simulateDelay(1000); // Simulate network delay
  return mockFiles;
};

// Mock function to fetch user profile data
export const fetchUserProfile = async () => {
  await simulateDelay(1000); // Simulate network delay
  return mockUserProfile;
};

// Mock function to update document status
export const updateDocumentStatus = async (id: number, status: string) => {
  await simulateDelay(500); // Simulate network delay
  const document = mockFiles.find((file) => file.id === id);
  if (document) {
    document.status = status;
  }
  return document;
};

// Mock function to delete a document
export const deleteDocument = async (id: number) => {
  await simulateDelay(500); // Simulate network delay
  const index = mockFiles.findIndex((file) => file.id === id);
  if (index !== -1) {
    mockFiles.splice(index, 1);
  }
  return { success: true };
};

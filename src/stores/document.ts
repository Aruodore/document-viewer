/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import {
  uploadFile as mockUploadFile,
  fetchDocumentSummary,
  updateDocumentStatus,
  deleteDocument as mockDeleteDocument,
  fetchAllFiles,
} from "../utils/mock-api"; // Adjust the path as needed

export type Document = {
  signatureUrl?: string;
  signaturePosition?: { x: number; y: number };
  id: number;
  name: string;
  uploadDate: string;
  status: "Pending Processing" | "Processed" | "Completed" | "Signed";
  summary?: string;
  qa?: { question: string; answer: string }[];
  fileUrl?: string;
};

type DocumentStore = {
  files: Document[];
  selectedFile: Document | null;
  isLoading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<void>;
  setSelectedFile: (file: Document | null) => void;
  updateFileStatus: (id: number, status: Document["status"]) => Promise<void>;
  deleteFile: (id: number) => Promise<void>;
  fetchSummary: (id: number) => Promise<void>;
  fetchFiles: () => Promise<void>;
  signDocument: (
    id: number,
    signature: string,
    position: { x: number; y: number }
  ) => void;
  clearError: () => void;
};

export const useDocumentStore = create<DocumentStore>((set, _get) => ({
  files: [],
  selectedFile: null,
  isLoading: false,
  error: null,

  uploadFile: async (file) => {
    set({ isLoading: true, error: null }); // 🔄 Reset error before request
    try {
      const newFile = await mockUploadFile(file);
      set((state) => ({ files: [...state.files, newFile as Document] }));
    } catch (error) {
      set({ error: "File upload failed. Please try again." });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedFile: (file) => set({ selectedFile: file }),

  updateFileStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const updatedFile = await updateDocumentStatus(id, status);
      if (updatedFile) {
        set((state) => ({
          files: state.files.map((file) =>
            file.id === id ? { ...file, status } : file
          ),
        }));
      }
    } catch (error) {
      set({ error: "Failed to update document status." });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteFile: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockDeleteDocument(id);
      if (response.success) {
        set((state) => ({
          files: state.files.filter((file) => file.id !== id),
        }));
      }
    } catch (error) {
      set({ error: "Error deleting the document. Try again later." });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSummary: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { summary, qa } = await fetchDocumentSummary(id);
      set((state) => ({
        files: state.files.map((file) =>
          file.id === id ? { ...file, summary, qa } : file
        ),
      }));
    } catch (error) {
      set({ error: "Failed to fetch document summary." });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const files = await fetchAllFiles();
      set((_state) => ({
        files: files.map(file => ({
          ...file,
          status: file.status as Document["status"]
        }))
      }));
    } catch (error) {
      set({ error: "Failed to fetch document summary." });
    } finally {
      set({ isLoading: false });
    }
  },
  signDocument: (id, signature, position) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id
          ? {
              ...file,
              status: "Signed",
              signatureUrl: signature,
              signaturePosition: position,
            }
          : file
      ),
    })),

  clearError: () => set({ error: null }), // ✅ Clear error manually if needed
}));

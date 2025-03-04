import { create } from "zustand";
import { fetchUserProfile, simulateDelay } from "../utils/mock-api"; // Import the mock API functions

type PendingRequest = {
  id: number;
  documentName: string;
  requestedDate: string;
};

type SignedDocument = {
  id: number;
  documentName: string;
  signingDate: string;
};

type Signature = {
  id: number;
  name: string;
  imageUrl: string;
};

type UserStore = {
  savedSignatures: Signature[];
  pendingRequests: PendingRequest[];
  signedDocuments: SignedDocument[];
  isLoading: boolean;
  fetchUserData: () => Promise<void>;
  addPendingRequest: (request: PendingRequest) => void;
  addSignedDocument: (document: SignedDocument) => void;
  deletePendingRequest: (id: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  savedSignatures: [],
  pendingRequests: [],
  signedDocuments: [],
  isLoading: false,

  // Fetch user data from the mock API
  fetchUserData: async () => {
    set({ isLoading: true });
    await simulateDelay(1000); // Simulate delay
    const userProfile = await fetchUserProfile();
    set({
      savedSignatures: userProfile.signatures,
      pendingRequests: userProfile.pendingRequests,
      signedDocuments: userProfile.signedDocuments,
      isLoading: false,
    });
  },

  // Add a pending request (local update)
  addPendingRequest: (request) => {
    set((state) => ({
      pendingRequests: [...state.pendingRequests, request],
    }));
  },

  // Add a signed document (local update)
  addSignedDocument: (document) => {
    set((state) => ({
      signedDocuments: [...state.signedDocuments, document],
    }));
  },

  // Delete a pending request (local update)
  deletePendingRequest: (id) => {
    set((state) => ({
      pendingRequests: state.pendingRequests.filter(
        (request) => request.id !== id
      ),
    }));
  },
}));

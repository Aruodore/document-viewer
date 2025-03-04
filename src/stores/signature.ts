import { create } from "zustand";

type Signature = {
  id: number;
  name: string;
  imageUrl: string;
};

type SignatureStore = {
  signatures: Signature[];
  currentSignature: string | null;
  addSignature: (signature: Signature) => void;
  updateSignature: (id: number, updatedSignature: Partial<Signature>) => void;
  deleteSignature: (id: number) => void;
  setCurrentSignature: (signature: string | null) => void;
};

export const useSignatureStore = create<SignatureStore>((set) => ({
  signatures: [
    { id: 1, name: "Signature 1", imageUrl: "/signatures/signature1.png" },
    { id: 2, name: "Signature 2", imageUrl: "/signatures/signature2.png" },
  ],
  currentSignature: null,
  addSignature: (signature) =>
    set((state) => ({ signatures: [...state.signatures, signature] })),
  updateSignature: (id, updatedSignature) =>
    set((state) => ({
      signatures: state.signatures.map((signature) =>
        signature.id === id ? { ...signature, ...updatedSignature } : signature
      ),
    })),
  deleteSignature: (id) =>
    set((state) => ({
      signatures: state.signatures.filter((signature) => signature.id !== id),
    })),
  setCurrentSignature: (signature) => set({ currentSignature: signature }),
}));

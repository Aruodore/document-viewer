# Intelligent Document Viewer & Signing Flow

## Overview
This project is a **React-based document management dashboard** built with **Vite, TypeScript, and TailwindCSS**. It allows users to upload, view, and interact with documents (PDF/DOCX) while simulating an AI-powered processing system. The app includes features for file management, document signing, and user profile management, leveraging mock API data.

## Features
### 1. File Upload & List View
- Users can **upload PDF or DOCX** files.
- Uploaded files appear in a list with details:
  - File Name
  - Upload Date
  - Status (Pending, Processed, Completed)
  - Actions (View Details, Mark Complete, Delete)

### 2. File Details & Interaction
- Clicking "View Details" opens a modal/page showing:
  - **File Summary** (mock AI-generated text)
  - **Q&A Section** (mock AI-generated responses to user questions)

### 3. Signature Flow
- Users can **sign a document** using:
  - **Canvas drawing**
  - **Typed signature**
- Signature placement via **drag-and-drop**.
- Status updates to "Signed" after confirmation.

### 4. User Profile & Signature Management
- Users can:
  - Manage **saved signatures** (mock data)
  - View **pending signature requests**
  - See **signed documents** history

### 5. UI/UX Enhancements
- **Dark mode toggle**
- **Smooth animations & micro-interactions**
- **Floating Action Button (FAB)** for quick access
- **Mobile-responsive design**

---

## Tech Stack
- **Frontend:** React (Vite + TypeScript)
- **State Management:** Context API / Zustand
- **Styling:** TailwindCSS
- **Document Handling:** react-pdf, mammoth (for DOCX parsing)
- **Mock API & Data:** JSON-based mock services

---

## Installation & Setup
### Prerequisites
- Node.js (v16+)
- npm or yarn

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/aruodore/document-viewer.git
   cd document-viewer
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Start the development server**
   ```sh
   npm run dev  # or yarn dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173` (default Vite port)

---

## Mock Data Structure
```ts
const mockFiles = [
  {
    id: 1,
    name: "Project Plan",
    uploadDate: "2023-10-01",
    status: "Pending Processing",
    summary: "This document outlines the project timeline...",
    qa: [
      { question: "What is the deadline?", answer: "December 2023" },
    ],
  },
];

const mockUserProfile = {
  signatures: [{ id: 1, name: "Signature 1", imageUrl: "/sign1.png" }],
  pendingRequests: [{ id: 1, documentName: "Contract A" }],
  signedDocuments: [{ id: 1, documentName: "NDA", signingDate: "2023-09-15" }],
};
```

---

## Key Design Decisions
1. **Vite for fast builds & hot reloads**
2. **React-PDF for efficient PDF rendering**
3. **Mammoth.js for extracting text from DOCX**
4. **Zustand for simple & efficient state management**
5. **TailwindCSS for consistent, scalable styling**

---

## Additional Features & Optimizations
✅ **Drag-and-Drop File Upload**
✅ **Dark Mode Support**
✅ **Search & Pagination for File List**
✅ **Accessibility Enhancements (ARIA, keyboard navigation)**
✅ **Error Handling for Upload & API Requests**

---

## How to Contribute
1. **Fork the repository**
2. **Create a new feature branch** (`feature-name`)
3. **Commit your changes**
4. **Push to GitHub & create a Pull Request (PR)**

---

## License
This project is licensed under the MIT License.

---

## Contact
For inquiries, contact [lucasadomi@gmail.com](mailto:lucasadomi@gmail.com) or visit the [GitHub Repository](https://github.com/aruodore/document-viewer).


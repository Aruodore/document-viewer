import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useSignatureStore } from "../stores/signature";

export const SignatureCanvasDraw: React.FC = () => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [signatureName, setSignatureName] = useState("");
  const { addSignature, setCurrentSignature } = useSignatureStore();

  const handleClear = () => {
    sigCanvasRef.current?.clear();
  };

  const handleSave = () => {
    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      alert("Please draw your signature before saving.");
      return;
    }
    if (!signatureName.trim()) {
      alert("Please enter a name for your signature.");
      return;
    }

    const signatureData = sigCanvasRef.current.toDataURL();
    const newSignature = {
      id: Date.now(),
      name: signatureName,
      imageUrl: signatureData,
    };

    addSignature(newSignature);
    setCurrentSignature(signatureData);
    setSignatureName("");
    handleClear();
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center sm:text-left">
        Create Your Signature
      </h2>

      {/* Canvas Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">
          Draw Your Signature
        </h3>
        <div className="w-full max-w-md sm:max-w-lg mx-auto">
          <SignatureCanvas
            ref={sigCanvasRef}
            canvasProps={{
              width: 500,
              height: 200,
              className: "border rounded-lg bg-white dark:bg-gray-800 w-full",
            }}
          />
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={signatureName}
          onChange={(e) => setSignatureName(e.target.value)}
          placeholder="Name your signature..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
        />
        <div className="flex gap-2 justify-center sm:justify-start">
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            disabled={!signatureName.trim() || sigCanvasRef.current?.isEmpty()}
            className={`px-6 py-3 rounded-lg transition-colors w-full sm:w-auto ${
              !signatureName.trim() || sigCanvasRef.current?.isEmpty()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

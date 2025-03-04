import { Upload } from "lucide-react";
import { useUpdateSearchParams } from "../hooks/use-update-searchparams";
import { Button } from "./ui/button";

export const QuickActions = () => {
  const { updateSearchParams } = useUpdateSearchParams();

  return (
    <div>
      <Button
        className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={() => updateSearchParams({ upload: "file" })}
        aria-label="Upload a document"
        role="button"
        tabIndex={0}
      >
        <Upload size={20} className="mr-2" aria-hidden="true" />
        Upload Document
      </Button>
    </div>
  );
};

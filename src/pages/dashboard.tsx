import { QuickActions } from "../components/quick-actions";
import { FileList } from "../components/file-list";
import { FileUploadModal } from "../components/file-upload-modal";

export const Dashboard = () => {
  return (
    <div
      className={`p-6 dark:text-white  text-gray-800`}
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Quick Actions */}
      <QuickActions />

      {/* File Upload Modal */}
      <FileUploadModal />

      {/* Recent Documents Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
        <FileList />
      </div>

    </div>
  );
};

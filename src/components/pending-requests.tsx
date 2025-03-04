import React from "react";
import { useUserStore } from "../stores/user";

export const PendingRequests: React.FC = () => {
  const { pendingRequests } = useUserStore();

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700">
      <h2 className="text-2xl font-bold">Pending Signature Requests</h2>

      <div aria-live="polite">
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No pending requests.
          </p>
        ) : (
          <div className="space-y-4" role="list">
            {pendingRequests.map((file) => (
              <div
                key={file.id}
                role="listitem"
                className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold">
                  <button className="focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    {file.documentName}
                  </button>
                </h3>
                <p className="text-sm text-gray-500">
                  Requested on {file.requestedDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

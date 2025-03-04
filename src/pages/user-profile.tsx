import React, { useEffect, useState } from "react";
import { SignatureManager } from "../components/signature-manager";
import { PendingRequests } from "../components/pending-requests";
import { SignedDocuments } from "../components/signed-documents";
import { Button } from "../components/ui/button";
import { useUserStore } from "../stores/user";
import { Loading } from "../components/ui/loader";

export const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "signatures" | "pending" | "signed"
  >("signatures");
  const tabList = ["signatures", "pending", "signed"] as const;

  const {

    fetchUserData,
    isLoading,
  } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabList.indexOf(activeTab);
    let newIndex = currentIndex;

    if (event.key === "ArrowRight") {
      newIndex = (currentIndex + 1) % tabList.length;
    } else if (event.key === "ArrowLeft") {
      newIndex = (currentIndex - 1 + tabList.length) % tabList.length;
    }

    setActiveTab(tabList[newIndex]);
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        User Profile
      </h1>

      <div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6"
        role="tablist"
        aria-label="User profile sections"
        onKeyDown={handleKeyDown}
      >
        {tabList.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "outline"}
            onClick={() => setActiveTab(tab)}
            className="w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-content`}
          >
            {tab === "signatures"
              ? "Manage Signatures"
              : tab === "pending"
              ? "Pending Requests"
              : "Signed Documents"}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <Loading text="Loading user data..." />
      ) : (
        <div
          id={`${activeTab}-content`}
          role="tabpanel"
          aria-labelledby={activeTab}
        >
          {activeTab === "signatures" && (
            <SignatureManager  />
          )}
          {activeTab === "pending" && (
            <PendingRequests/>
          )}
          {activeTab === "signed" && (
            <SignedDocuments />
          )}
        </div>
      )}
    </div>
  );
};

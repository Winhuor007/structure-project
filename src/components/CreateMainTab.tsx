import React, { useState } from "react";
import CreateTabContent from "./CreateTabContent";
import { HeaderTabs } from "./HeaderTabs";
import CheckTransaction from "@/pages/CheckTransaction";

const MainTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [subTab, setSubTab] = useState("result");

  return (
    <div>
      <div className="space-y-2 bg-white rounded-md px-4 py-2 border-1">
        <HeaderTabs active={activeTab} onChange={setActiveTab} />
        
        {activeTab === "create" && (
          <CreateTabContent subTab={subTab} onSubTabChange={setSubTab} />
        )}
        
        {activeTab === "check" && <CheckTransaction />}
      </div>
    </div>
  );
};

export { MainTabs };

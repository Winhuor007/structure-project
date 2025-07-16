import React, { useState } from "react";
import SubTabs from "./SubTabs";
import BuyVoucherPanel from "../../pages/SettingPage";
import OperatorInput from "../../pages/NotFoundPage";
import CrossBank from "@/features/crossbank/component/CrossBank"; 

interface CreateTabContentProps {
  subTab: string;
  onSubTabChange: (value: string) => void;
}

const CreateTabContent: React.FC<CreateTabContentProps> = ({ subTab, onSubTabChange }) => {
  const [phone, setPhone] = useState("create");

  return (
    <div className="bg-white rounded-md border border-gray-200">
      <div className="p-6 space-y-6">
        <SubTabs active={subTab} onChange={onSubTabChange} />

        <div>
          {subTab === "pinless" && (
            <OperatorInput value={phone} onChange={setPhone} subTab={subTab} />
          )}
          {subTab === "voucher" && <BuyVoucherPanel />}
          {subTab === "result" && <CrossBank />}
        </div>
      </div>
    </div>
  );
};

export default CreateTabContent;

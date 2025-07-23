import React from "react";
import { CreditCard, Search } from "lucide-react";

interface HeaderTabsProps {
  active: string;
  onChange: (tab: string) => void;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ active, onChange }) => {
  return (
    <div className="inline-flex p-1 gap-2 bg-white">
      <button
        onClick={() => onChange("create")}
        className={`flex items-center justify-center gap-2 px-2 lg:px-4 py-3 rounded-lg font-medium text-sm md:text-base cursor-pointer ${
          active === "create"
            ? "bg-[#AAC936] text-white"
            : "text-gray-600 hover:text-gray-800 border border-gray-200"
        }`}
      >
        <CreditCard size={20} />
        Create Transaction
      </button>

      <button
        onClick={() => onChange("check")}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm md:text-base cursor-pointer ${
          active === "check"
            ? "bg-[#AAC936] text-white"
            : "text-gray-600 hover:text-gray-800 border border-gray-200"
        }`}
      >
        <Search size={20} />
        Check Transaction
      </button>
    </div>
  );
};

export { HeaderTabs };
 
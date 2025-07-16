import React from "react";
import { Globe, ShoppingCart, ClipboardList } from "lucide-react";

interface SubTabsProps {
  active: string;
  onChange: (tab: string) => void;
}

const SubTabs: React.FC<SubTabsProps> = ({ active, onChange }) => {
  console.log("fghjkl",onChange.name);
  
  return (
    <div>
      <div className="flex flex-row p-1 gap-4 rounded-lg">
        {/* Result Tab - 🆕 */}
        <button
          onClick={() => onChange("result")}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            active === "result"
              ? "bg-[#AAC936] text-white"
              : "text-gray-600 hover:text-gray-800 border-gray-200 border"
          }`}
        >
          <ClipboardList size={20} />
          CROSS BANK
        </button>

        {/* Buy Voucher Tab */}
        <button
          onClick={() => onChange("voucher")}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer  ${
            active === "voucher"
              ? "bg-[#AAC936] text-white"
              : "text-gray-600 hover:text-gray-800 border-gray-200 border"
          }`}
        >
          <ShoppingCart size={20} />
          PICK UP
        </button>
        <button
          onClick={() => onChange("pinless")}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer  ${
            active === "pinless"
              ? "bg-[#AAC936] text-white"
              : "text-gray-600 hover:text-gray-800 border-gray-200 border"
          }`}
        >
          <Globe size={20} />
          A2A
        </button>
      </div>
    </div>
  );
};

export default SubTabs;

{
  /* PIN Less Tab */
}

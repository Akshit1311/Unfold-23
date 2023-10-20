import { TActiveTab } from "@/app/page";
import { cn } from "@/utils/helpers";
import React, { Dispatch, SetStateAction } from "react";

type TabsProps = {
  activeTab: TActiveTab;
  setActiveTab: Dispatch<SetStateAction<TActiveTab>>;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-4 w-1/2 mx-auto">
      <div className=" bg-[#90D5CA]/60 p-4 rounded-2xl grid grid-cols-3 shadow-inner">
        {["24", "Season", "All"].map((val) => (
          <button
            onClick={() => setActiveTab(val as TActiveTab)}
            type="button"
            key={val}
            className={cn(
              activeTab === val ? "text-white bg-[#90D5CA] " : "text-[#777]",
              "text-xl font-raleway font-semibold p-2 rounded-xl transition-all duration-500 ease-in-out"
            )}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
};
export default React.memo(Tabs);

import { cn } from "@/lib/utils";
import React from "react";

type CategoryTabType = "Active" | "Completed";

type Props = {
  tabs: CategoryTabType;
  setTabs: React.Dispatch<React.SetStateAction<CategoryTabType>>;
};

const TASK_CATEGORY: CategoryTabType[] = ["Active", "Completed"];

export default function SelectTaskScope(props: Props) {
  return (
    <div className="flex gap-2 font-medium text-[#7B849E] md:gap-5">
      {TASK_CATEGORY.map((tab) => (
        <button
          key={tab}
          className={cn("py-2", props.tabs === tab && "border-b border-black font-bold text-black")}
          onClick={() => props.setTabs(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

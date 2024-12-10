import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import React from "react";

type CategoryTabType = "Active" | "Completed";

type Props = {
  tabs: CategoryTabType;
  setTabs: React.Dispatch<React.SetStateAction<CategoryTabType>>;
};

const TASK_CATEGORY: CategoryTabType[] = ["Active", "Completed"];

export default function SelectTaskScope(props: Props) {
  return (
    <>
      <div className="flex gap-2 font-medium text-[#7B849E] md:gap-5">
        {TASK_CATEGORY.map((tab) => (
          <button
            key={tab}
            className={cn(
              "py-2",
              props.tabs === tab && "border-b border-black font-bold text-black"
            )}
            onClick={() => props.setTabs(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <Select defaultValue="thisWeek">
        <SelectTrigger className="flex-1 max-w-[200px]">
          <Calendar />
          <SelectValue placeholder="Theme" className="text-sm font-medium" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="thisWeek">This Week</SelectItem>
          <SelectItem value="thisMonth">This Month</SelectItem>
          <SelectItem value="thisYear">This Year</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

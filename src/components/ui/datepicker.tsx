import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dispatch, SetStateAction } from "react";

type Props = {
  placeholder?: string;
  disablePast?: boolean;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};
export function DatePicker({
  placeholder = "Pick a date",
  disablePast = false,
  date,
  setDate,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={disablePast && { before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}

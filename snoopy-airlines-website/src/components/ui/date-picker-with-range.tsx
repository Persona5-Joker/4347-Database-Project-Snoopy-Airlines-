"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedDate: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  selectedDate,
  onDateChange,
}: DatePickerWithRangeProps) {

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                {format(selectedDate.from, "yyyy-MM-dd")} -{" "}
                {format(selectedDate.to, "yyyy-MM-dd")}
              </>
              ) : (
                format(selectedDate.from, "yyyy-MM-dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={selectedDate}
            onSelect={onDateChange}
            numberOfMonths={2}
            disabled={(date) => {
              const filterDate = new Date();
              filterDate.setDate(filterDate.getDate() - 1)

              return date < filterDate;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

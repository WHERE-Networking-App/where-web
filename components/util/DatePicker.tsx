"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value?: string; // Expects "YYYY-MM-DD"
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  // Convert string value back to Date object for the Calendar component
  const date = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;

  return (
    <Popover>
      <PopoverTrigger render={
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      } />
      <PopoverContent className="w-auto p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onChange(format(selectedDate, "yyyy-MM-dd"));
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area" // Ensure you have this ShadCN component

interface TimePickerProps {
  value?: string; // Expects "HH:mm"
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TimePicker({ value, onChange, placeholder = "Select time" }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  const [selectedHour, selectedMinute] = value ? value.split(':') : ["12", "00"];

  const handleTimeChange = (type: 'hour' | 'minute', val: string) => {
    const newTime = type === 'hour' ? `${val}:${selectedMinute}` : `${selectedHour}:${val}`;
    onChange(newTime);
  };

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
          <Clock className="mr-2 h-4 w-4" />
          {value ? value : <span>{placeholder}</span>}
        </Button>
      } />
      <PopoverContent className="w-[160px] p-0">
        <div className="flex h-64 divide-x">
          <ScrollArea className="w-full">
            <div className="flex flex-col p-2">
              <span className="text-[10px] uppercase text-muted-foreground mb-1 ml-1">Hour</span>
              {hours.map((h) => (
                <Button
                  key={h}
                  variant={selectedHour === h ? "default" : "ghost"}
                  size="sm"
                  className="justify-center"
                  onClick={() => handleTimeChange('hour', h)}
                >
                  {h}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="w-full">
            <div className="flex flex-col p-2">
              <span className="text-[10px] uppercase text-muted-foreground mb-1 ml-1">Min</span>
              {minutes.map((m) => (
                <Button
                  key={m}
                  variant={selectedMinute === m ? "default" : "ghost"}
                  size="sm"
                  className="justify-center"
                  onClick={() => handleTimeChange('minute', m)}
                >
                  {m}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
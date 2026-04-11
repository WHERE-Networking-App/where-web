"use client";

import { dayNames } from "@/data/mockup_data";
import { CreateMeetupStepOneInput, CreateMeetupStepOneSchema } from "@/lib/validations/meetup";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "../util/DatePicker";
import { Calendar1Icon, Clock } from "lucide-react";
import { TimePicker } from "../util/TimePicker";

type FieldErrors = Partial<Record<"title" | "scheduled_time" | "scheduled_date", string[]>>

type StepOneProps = {
    defaultValues?: CreateMeetupStepOneInput;
    onComplete: (data: CreateMeetupStepOneInput) => void;
}

export const MeetupStepOne: React.FC<StepOneProps> = ({ defaultValues, onComplete }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(defaultValues?.schedule_date);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(defaultValues?.scheduled_time);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});

        const form = new FormData(e.currentTarget);
        const raw = {
            title: form.get("title") as string,
            scheduled_time: selectedTime as string,
            schedule_date: selectedDate as string,
        }

        const parsed = CreateMeetupStepOneSchema.safeParse(raw);
        if (!parsed.success) {
            setFieldErrors(parsed.error.flatten().fieldErrors);
            return;
        }

        onComplete(parsed.data);
    }

    return (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <CardHeader>
              <CardTitle className="text-center">Create a Meetup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Meetup Title</Label>
                    <Input 
                        id="title" 
                        name="title"
                        placeholder="Meetup Title" 
                        defaultValue={defaultValues?.title} 
                        required/>
                    {fieldErrors.title && (
                        <p className="text-red-500 text-sm">{fieldErrors.title[0]}</p>
                    )}
                </div>
                
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="scheduled_date">
                      <Calendar1Icon /> Date</Label>
                    <DatePicker 
                      value={selectedDate} 
                      onChange={(date) => setSelectedDate(date)} 
                      placeholder="Select a date" 
                    />
                    {fieldErrors.scheduled_date && (
                        <p className="text-red-500 text-sm">{fieldErrors.scheduled_date[0]}</p>
                    )}
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="scheduled_time">
                      <Clock /> Time</Label>
                    <TimePicker 
                      value={selectedTime} 
                      onChange={(time) => setSelectedTime(time)} 
                      placeholder="Select a time" 
                    />
                    {fieldErrors.scheduled_time && (
                        <p className="text-red-500 text-sm">{fieldErrors.scheduled_time[0]}</p>
                    )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="flex-1 p-6">Next</Button>
            </CardFooter>
          </form>
        </Card>
    )
}
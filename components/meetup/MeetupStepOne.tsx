"use client";

import {
  CreateMeetupStepOneInput,
  CreateMeetupStepOneSchema,
  timeSlotOptions,
} from "@/lib/validations/meetup";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "../util/DatePicker";
import { Calendar1Icon, Clock, MapPin, LocateIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FieldErrors = Partial<
  Record<"title" | "date" | "timeSlot" | "city" | "location", string[]>
>;

type StepOneProps = {
  defaultValues?: CreateMeetupStepOneInput;
  onComplete: (data: CreateMeetupStepOneInput) => void;
};

export const MeetupStepOne: React.FC<StepOneProps> = ({
  defaultValues,
  onComplete,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    defaultValues?.date,
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    defaultValues?.timeSlot ?? "",
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const raw = {
      title: form.get("title") as string,
      date: selectedDate as string,
      timeSlot: selectedTimeSlot as string,
      city: form.get("city") as string,
      location: (form.get("location") as string) || undefined,
    };

    const parsed = CreateMeetupStepOneSchema.safeParse(raw);
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    onComplete(parsed.data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardHeader>
          <CardTitle className="text-center">Create a Meetup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* Title */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Meetup Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Meetup Title"
                defaultValue={defaultValues?.title}
                required
              />
              {fieldErrors.title && (
                <p className="text-red-500 text-sm">{fieldErrors.title[0]}</p>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">
                <Calendar1Icon className="inline h-4 w-4 mr-1" /> Date
              </Label>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholder="Select a date"
              />
              {fieldErrors.date && (
                <p className="text-red-500 text-sm">{fieldErrors.date[0]}</p>
              )}
            </div>

            {/* Time Slot */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="timeSlot">
                <Clock className="inline h-4 w-4 mr-1" /> Time Slot
              </Label>
              <Select
                value={selectedTimeSlot}
                onValueChange={(val) => { if (val !== null) setSelectedTimeSlot(val); }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Slots</SelectLabel>
                    {timeSlotOptions.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldErrors.timeSlot && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.timeSlot[0]}
                </p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="city">
                <MapPin className="inline h-4 w-4 mr-1" /> City
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="e.g. New York"
                defaultValue={defaultValues?.city}
                required
              />
              {fieldErrors.city && (
                <p className="text-red-500 text-sm">{fieldErrors.city[0]}</p>
              )}
            </div>

            {/* Location (optional) */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">
                <LocateIcon className="inline h-4 w-4 mr-1" /> Location{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Central Park Cafe"
                defaultValue={defaultValues?.location}
              />
              {fieldErrors.location && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.location[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="flex-1 p-6">
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
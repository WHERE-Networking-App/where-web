"use client";

import { CreateMeetupStepTwoInput, CreateMeetupStepTwoSchema } from "@/lib/validations/meetup";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { cities } from "@/data/mockup_data";

type FieldErrors = Partial<Record<"location_name" | "participant_limit", string[]>>

type StepTwoProps = {
    defaultValues?: CreateMeetupStepTwoInput;
    onBack: () => void;
    onComplete: (data: CreateMeetupStepTwoInput) => void;
}
export const MeetupStepTwo: React.FC<StepTwoProps> = ({ defaultValues, onBack, onComplete }) => {
    const [location, setLocation] = useState<string>(defaultValues?.location_name || "");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});
        const form = new FormData(e.currentTarget);
        const raw = {
            location_name: location as string,
            participant_limit: Number(form.get("participant_limit")),
        }
        const parsed = CreateMeetupStepTwoSchema.safeParse(raw);
        if (!parsed.success) {
            setFieldErrors(parsed.error.flatten().fieldErrors);
            return;
        }
        onComplete(parsed.data);
    }

    return(
        <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
                <CardHeader>
                    <CardTitle>Choose Location and Participant Limit</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="location_name">Location</Label>
                            <Select items={cities} value={location} onValueChange={setLocation}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a location"  />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Locations</SelectLabel>
                                    {cities.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {fieldErrors.location_name && (
                                <p className="text-red-500 text-sm">{fieldErrors.location_name[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="participant_limit">Participant Limit</Label>
                            <Input 
                                id="participant_limit" 
                                name="participant_limit"
                                type="number"
                                placeholder="Participant limit" 
                                defaultValue={defaultValues?.participant_limit} 
                            />
                                {fieldErrors.participant_limit && fieldErrors.participant_limit.map((error) => (
                                    <p key={error} className="text-xs text-red-500">{error}</p>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button type="button" onClick={onBack} className="flex-1 p-6">
                        Back
                    </Button>
                    <Button type="submit" className="flex-1 p-6">
                        Next
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
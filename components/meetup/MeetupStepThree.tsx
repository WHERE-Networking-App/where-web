import { CreateMeetupStepThreeInput, CreateMeetupStepThreeSchema } from "@/lib/validations/meetup";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { vibes } from "@/data/mockup_data";
import { Button } from "../ui/button";

type FieldErrors = Partial<Record<"vibe", string[]>>

interface StepThreeProps {
    defaultValues?: CreateMeetupStepThreeInput;
    loading: boolean;
    onBack: () => void;
    onComplete: (data: CreateMeetupStepThreeInput) => void;
}
export const MeetupStepThree: React.FC<StepThreeProps> = ({ defaultValues, loading, onBack, onComplete }) => {
    const [vibe, setVibe] = useState<string>(defaultValues?.vibe || "");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});
        const form = new FormData(e.currentTarget);
        const raw = {
            vibe: vibe as string,
        }
        const parsed = CreateMeetupStepThreeSchema.safeParse(raw);
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
                    <CardTitle>Describe the Vibe</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="vibe">Vibe</Label>
                            <Select items={vibes} value={vibe} onValueChange={setVibe}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a vibe"  />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    {vibes.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {fieldErrors.vibe && (
                        <p className="text-red-500 text-sm">{fieldErrors.vibe[0]}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 p-6"
                        onClick={onBack}
                        disabled={loading}
                    >
                        Back
                    </Button>
                    <Button type="submit" className="flex-1 p-6" disabled={loading}>
                        {loading ? "Saving..." : "Create Meetup"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
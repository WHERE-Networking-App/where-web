"use client";

import {
  CreateMeetupStepTwoInput,
  CreateMeetupStepTwoSchema,
} from "@/lib/validations/meetup";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FieldErrors = Partial<Record<"participantsLimit", string[]>>;

type StepTwoProps = {
  defaultValues?: CreateMeetupStepTwoInput;
  onBack: () => void;
  onComplete: (data: CreateMeetupStepTwoInput) => void;
};

export const MeetupStepTwo: React.FC<StepTwoProps> = ({
  defaultValues,
  onBack,
  onComplete,
}) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const raw = {
      participantsLimit: Number(form.get("participantsLimit")),
    };

    const parsed = CreateMeetupStepTwoSchema.safeParse(raw);
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
          <CardTitle>Set Participant Limit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="participantsLimit">Participant Limit</Label>
              <Input
                id="participantsLimit"
                name="participantsLimit"
                type="number"
                min={2}
                max={50}
                placeholder="e.g. 5"
                defaultValue={defaultValues?.participantsLimit}
              />
              {fieldErrors.participantsLimit &&
                fieldErrors.participantsLimit.map((error) => (
                  <p key={error} className="text-xs text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 p-6">
            Back
          </Button>
          <Button type="submit" className="flex-1 p-6">
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
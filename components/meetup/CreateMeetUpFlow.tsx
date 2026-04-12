"use client";

import { useRouter } from "next/navigation";
import {
  CreateMeetupStepOneInput,
  CreateMeetupStepThreeInput,
  CreateMeetupStepTwoInput,
} from "../../lib/validations/meetup";
import { useState } from "react";
import { StepIndicator } from "../common/StepIndicator";
import { MeetupStepOne } from "./MeetupStepOne";
import { MeetupStepTwo } from "./MeetupStepTwo";
import { MeetupStepThree } from "./MeetupStepThree";
import { apiClient } from "@/lib/api-client";
import type { CreateMeetupRequest } from "@/lib/types";

type FlowData = {
  stepOne?: CreateMeetupStepOneInput;
  stepTwo?: CreateMeetupStepTwoInput;
  stepThree?: CreateMeetupStepThreeInput;
};

export const CreateMeetupFlow: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FlowData>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStepOneComplete = (stepOneData: CreateMeetupStepOneInput) => {
    setData((prev) => ({ ...prev, stepOne: stepOneData }));
    setStep(2);
  };

  const handleStepTwoComplete = (stepTwoData: CreateMeetupStepTwoInput) => {
    setData((prev) => ({ ...prev, stepTwo: stepTwoData }));
    setStep(3);
  };

  const handleStepThreeComplete = async (
    stepThreeData: CreateMeetupStepThreeInput,
  ) => {
    setServerError(null);
    setLoading(true);

    // Combine all steps and map to API contract
    const body: CreateMeetupRequest = {
      title: data.stepOne!.title,
      date: data.stepOne!.date,
      timeSlot: data.stepOne!.timeSlot as CreateMeetupRequest["timeSlot"],
      city: data.stepOne!.city,
      location: data.stepOne!.location,
      participantsLimit: data.stepTwo!.participantsLimit,
      vibe: stepThreeData.vibe as CreateMeetupRequest["vibe"],
    };

    const { error } = await apiClient("/api/meetups/create", {
      method: "POST",
      body,
      authenticated: true,
    });

    if (error) {
      setServerError(error);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <StepIndicator current={step} total={3} />

      {step === 1 && (
        <MeetupStepOne
          defaultValues={data.stepOne}
          onComplete={handleStepOneComplete}
        />
      )}
      {step === 2 && (
        <MeetupStepTwo
          defaultValues={data.stepTwo}
          onBack={() => setStep(1)}
          onComplete={handleStepTwoComplete}
        />
      )}
      {step === 3 && (
        <MeetupStepThree
          defaultValues={data.stepThree}
          loading={loading}
          onBack={() => setStep(2)}
          onComplete={handleStepThreeComplete}
        />
      )}

      {serverError && (
        <p className="text-red-500 text-sm text-center">{serverError}</p>
      )}
    </div>
  );
};
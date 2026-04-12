"use client";

import { useState } from "react";
import type { AccountSetupStepOneInput, AccountSetupStepTwoInput } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { AccountSetupStepOne } from "./AccountSetupStepOne";
import { AccountSetupStepTwo } from "./AccountSetupStepTwo";
import { StepIndicator } from "../common/StepIndicator";
import { apiClient } from "@/lib/api-client";
import type { InterestItem } from "@/lib/types";

type FlowData = {
  stepOne?: AccountSetupStepOneInput;
  stepTwo?: AccountSetupStepTwoInput;
};

export const AccountSetupFlow: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FlowData>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStepOneComplete = async (stepOneData: AccountSetupStepOneInput) => {
    setServerError(null);
    setLoading(true);

    // Call step 1 API
    const { error } = await apiClient("/api/users/setup/step1", {
      method: "POST",
      body: stepOneData,
      authenticated: true,
    });

    if (error) {
      setServerError(error);
      setLoading(false);
      return;
    }

    setData((prev) => ({ ...prev, stepOne: stepOneData }));
    setLoading(false);
    setStep(2);
  };

  const handleStepTwoComplete = async (stepTwoData: AccountSetupStepTwoInput) => {
    setServerError(null);
    setLoading(true);

    // Transform flat interests to {category, interest} format for the API
    const interests: InterestItem[] = stepTwoData.interests.map((item) => ({
      category: item,
      interest: item,
    }));

    // Call step 2 API
    const { error } = await apiClient("/api/users/setup/step2", {
      method: "POST",
      body: { interests },
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
      <StepIndicator current={step} total={2} />

      {step === 1 && (
        <AccountSetupStepOne
          defaultValues={data.stepOne}
          onComplete={handleStepOneComplete}
          loading={loading}
        />
      )}

      {step === 2 && (
        <AccountSetupStepTwo
          defaultValues={data.stepTwo}
          onBack={() => setStep(1)}
          onComplete={handleStepTwoComplete}
          loading={loading}
        />
      )}

      {serverError && (
        <p className="text-red-500 text-sm text-center">{serverError}</p>
      )}
    </div>
  );
};

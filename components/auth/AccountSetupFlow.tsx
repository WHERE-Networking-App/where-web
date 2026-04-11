"use client";
import { useState } from "react";
import type { AccountSetupStepOneInput, AccountSetupStepTwoInput } from '@/lib/validations/auth';
import { useRouter } from "next/navigation";
import { AccountSetupStepOne } from "./AccountSetupStepOne";
import { AccountSetupStepTwo } from "./AccountSetupStepTwo";
import { StepIndicator } from "../common/StepIndicator";

interface AccountSetupFlowProps {
    userId: string;
}

type FlowData = {
    stepOne?: Omit<AccountSetupStepOneInput, "userId">;
    stepTwo?: Omit<AccountSetupStepTwoInput, "userId">;
}

export const AccountSetupFlow: React.FC<AccountSetupFlowProps> = ({ userId }) => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<FlowData>({});
    const [serverError, setServerError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleStepOneComplete = (stepOneData: Omit<AccountSetupStepOneInput, "userId">) => {
        setData((prev) => ({ ...prev, stepOne: stepOneData }));
        setStep(2);
    }

    const handleStepTwoComplete = async (stepTwoData: Omit<AccountSetupStepTwoInput, "userId">) => {
        setServerError(null);
        setLoading(true);

        // api call to complete account setup
        // const result = await accountFetch();
        // if(result.error) {
        //     setServerError(result.error);
        //     setLoading(false);
        //     return;
        // }
        
        router.push("/dashboard");
    }

    return (
        <div className="w-full max-w-sm space-y-6">
            <StepIndicator current={step} total={2} />

            {step === 1 && (
                <AccountSetupStepOne
                userId={userId}
                defaultValues={data.stepOne}
                onComplete={handleStepOneComplete}
                />
            )}

            {step === 2 && (
                <AccountSetupStepTwo
                userId={userId}
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
    )
}


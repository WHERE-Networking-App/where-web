"use client";
import { useState } from "react";
import type { AccountSetupStepOneInput, AccountSetupStepTwoInput } from '@/lib/validations/auth';
import { useRouter } from "next/navigation";
import { AccountSetupStepOne } from "./AccountSetupStepOne";
import { AccountSetupStepTwo } from "./AccountSetupStepTwo";

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

function StepIndicator({current, total}: { current: number, total: number }) {
    return (
        <div className="flex items-center justify-center gap-3">
            {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center gap-3">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step < current
                        ? "bg-purple-600 text-white"           // completed
                        : step === current
                        ? "bg-purple-600 text-white ring-4 ring-purple-200" // active
                        : "bg-gray-200 text-gray-500"           // upcoming
                    }`}
                >
                    {step < current ? "✓" : step}
                </div>
                {step < total && (
                    <div
                    className={`w-12 h-0.5 transition-colors ${
                        step < current ? "bg-purple-600" : "bg-gray-200"
                    }`}
                    />
                )}
                </div>
            ))}
        </div>
    )
}
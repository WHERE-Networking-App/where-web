"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountSetupStepOneInput, AccountSteupStepOneSchema } from "@/lib/validations/auth";
import { useState } from "react";

type FieldErrors = Partial<Record<"username" | "inAppName" | "profession", string[]>>

type StepOneProps = {
   userId: string;
   defaultValues?: Omit<AccountSetupStepOneInput, "userId">;
   onComplete: (data: Omit<AccountSetupStepOneInput, "userId">) => void;
}

export const AccountSetupStepOne: React.FC<StepOneProps> = ({ userId, defaultValues, onComplete }) => {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});

        const form = new FormData(e.currentTarget);
        const raw = {
            userId,
            username: form.get("username") as string,
            inAppName: form.get("inAppName") as string,
            profession: form.get("profession") as string,
        }

        const parsed = AccountSteupStepOneSchema.safeParse(raw);
        if (!parsed.success) {
            setFieldErrors(parsed.error.flatten().fieldErrors);
            return;
        }

        const { userId: _, ...rest } = parsed.data;
        onComplete(rest);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
                <CardHeader>
                    <CardTitle>Account Setup</CardTitle>
                    <CardDescription>Step 1: Basic Information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                                id="username" 
                                name="username"
                                placeholder="Username" 
                                defaultValue={defaultValues?.username} 
                                required/>
                            {fieldErrors.username && (
                                <p className="text-red-500 text-sm">{fieldErrors.username[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="inAppName">In-app name</Label>
                            <Input 
                                id="inAppName" 
                                name="inAppName"
                                placeholder="In-app name" 
                                defaultValue={defaultValues?.inAppName} 
                            />
                                {fieldErrors.inAppName && fieldErrors.inAppName.map((error) => (
                                    <p key={error} className="text-xs text-red-500">{error}</p>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="profession">Profession</Label>
                            <Input 
                                id="profession" 
                                name="profession"
                                placeholder="Profession" 
                                defaultValue={defaultValues?.profession} 
                                required
                            />
                            {fieldErrors.profession && (
                                <p className="text-red-500 text-sm">{fieldErrors.profession[0]}</p>
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
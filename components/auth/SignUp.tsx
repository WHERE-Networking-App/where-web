"use client";

import { useRouter } from "next/navigation"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignUpSchema } from "@/lib/validations/auth";

type FieldErrors = Partial<Record<"email" | "password" | "confirmPassword", string[]>>;

export const SignUp: React.FC = () => {
    const router = useRouter();
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});
        setServerError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const raw = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        }

        const parsed = SignUpSchema.safeParse(raw)
            if (!parsed.success) {
            setFieldErrors(parsed.error.flatten().fieldErrors)
            setLoading(false);
            return
        }

        setLoading(true);

        const userId = crypto.randomUUID();
        console.log(userId)
        router.push(`/account-setup?userId=${userId}`);
    }
    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Create Your Account</CardTitle>
                    <CardDescription className="font-bold text-center">
                        Join WHERE and start networking today.
                    </CardDescription>
                </CardHeader>
                <CardContent className="my-4">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            {fieldErrors.email && (
                                <p className="text-red-500 text-sm">{fieldErrors.email[0]}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                name="password"
                                type="password" 
                                required />
                            {fieldErrors.password && (
                                <p className="text-red-500 text-sm">{fieldErrors.password[0]}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input 
                                id="confirmPassword" 
                                name="confirmPassword"
                                type="password" 
                                required />
                        </div>
                        {fieldErrors.confirmPassword && (
                            <p className="text-red-500 text-sm">{fieldErrors.confirmPassword[0]}</p>
                        )}
                    </div>
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button variant={"default"} className="w-full p-6" type="submit" disabled={loading}>
                        <span className="text-xl font-bold">
                            {loading ? "Creating account..." : "Sign Up"}
                        </span>
                    </Button>
                    <p className="text-center">
                        Already have an account? <span className="text-purple-600 font-bold"><Link href="/login">Login</Link></span>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FieldErrors = Partial<Record<"email" | "password", string[]>>;

export const Login: React.FC = () => {
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
        }

        const parsed = LoginSchema.safeParse(raw);
        if (!parsed.success) {
            setFieldErrors(parsed.error.flatten().fieldErrors);
            setLoading(false);
            return
        }

        setLoading(true);

        // api call to login user
        // const result = await loginFetch(raw);
        // if (result.error) {
        //     setServerError(result.error);
        //     setLoading(false);
        //     return;
        // }
        
        router.push("/dashboard");
    }

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="font-bold text-center">
                        Login to find your next connection.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    name="password"
                                    type="password" 
                                    required />
                            </div>
                        </div>
                    
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button variant={"default"} className="w-full p-6" type="submit"  disabled={loading}>
                        <span className="text-xl font-bold">Login</span>
                    </Button>
                    <p className="text-center">
                        Don&apos;t have an account? <span className="text-purple-600 font-bold"><Link href="/signup">Sign Up</Link></span>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}
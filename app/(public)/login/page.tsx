import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
    return (
        <>
        <div className="flex justify-center items-center min-h-[70vh]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="font-bold text-center">
                        Login to find your next connection.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button variant={"default"} className="w-full p-6">
                        <span className="text-xl font-bold">Login</span>
                    </Button>
                    <p className="text-center">
                        Don't have an account? <span className="text-purple-600 font-bold"><Link href="/signup">Sign Up</Link></span>
                    </p>
                </CardFooter>
            </Card>
        </div>
        </>
    )
}
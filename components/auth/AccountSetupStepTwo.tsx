"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AccountSetupStepTwoInput, AccountSetupStepTwoSchema } from "@/lib/validations/auth";
import { useState } from "react";

const INTERESTS_OPTIONS = [
    "Coffee", "Street Food", "Beer", "Night Markets",
    "Anime", "K-drama", "Drama", "Games",
    "Indie", "Hip-hop", "Rock", "K-pop",
    "Photography", "Drawing", "Content-creation", "Tech",]


type FieldErrors = Partial<Record<"interests", string[]>>

interface StepTwoProps {
    userId: string;
    defaultValues?: Omit<AccountSetupStepTwoInput, "userId">;
    loading: boolean;
    onBack: () => void;
    onComplete: (data: Omit<AccountSetupStepTwoInput, "userId">) => void;
}

export const AccountSetupStepTwo: React.FC<StepTwoProps> = ({ userId, defaultValues, loading, onBack, onComplete }) => {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
    const [showAll, setShowAll] = useState(false);
    const [interests, setInterests] = useState<string[]>(
        defaultValues?.interests || []
    );

    const displayedInterests = showAll ? INTERESTS_OPTIONS : INTERESTS_OPTIONS.slice(0, 5);

    const toggle = (list: string[], item: string) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        setFieldErrors({});

        if(interests.length === 0) {
            setFieldErrors({ interests: ["Select at least one interest"] });
            return;
        }

        const raw = {userId, interests }

        const parsed = AccountSetupStepTwoSchema.safeParse(raw);
        if(!parsed.success) {
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
                    <CardDescription>Step 2: Interests</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <p className="text-sm font-semibold">
                        Interests
                        <span className="text-gray-400 font-normal ml-1">
                            ({interests.length} selected)
                        </span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {displayedInterests.map((item) => (
                                <Badge
                                key={item}
                                variant={interests.includes(item) ? "default" : "outline"}
                                className="cursor-pointer select-none px-3 py-1 text-sm"
                                onClick={() => setInterests((prev) => toggle(prev, item))}
                                >
                                {item}
                                </Badge>
                            ))}

                            
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {INTERESTS_OPTIONS.length > 10 && (
                                <button
                                    type="button"
                                    onClick={() => setShowAll((prev) => !prev)}
                                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 px-2 py-1 transition-colors cursor-pointer"
                                >
                                    {showAll ? "Show less" : "Show all"}
                                </button>
                            )}
                        </div>
                        {fieldErrors.interests && (
                        <p className="text-red-500 text-sm">{fieldErrors.interests[0]}</p>
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
                    <Button
                        type="submit"
                        className="flex-1 p-6"
                        disabled={loading}
                    >
                        <span className="font-bold">
                            {loading ? "Saving..." : "Finish"}
                        </span>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
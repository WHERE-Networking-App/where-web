"use client";

import { UserProfileApiResponse } from "@/lib/types";
import { 
  UserCircleIcon, 
  Mail, 
  Briefcase, 
  Sparkles, 
  ArrowLeft, 
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";


interface ProfileProps {
  profile?: UserProfileApiResponse | null;
}

export const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const user = profile?.user;
  const interests = profile?.interests ?? [];
  const router = useRouter();

  return (
    <main className="container mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <Button
            variant={"ghost"}
            size={"xl"}
            nativeButton={false}
            render={<Link href="/dashboard" />}
        >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
     
      <Card className="overflow-hidden border-none shadow-lg ring-1 ring-border">
        {/* Decorative Header */}
        <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary to-background" />
        
        <CardHeader className="relative px-8 pb-4">
          <div className="relative -mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            {/* Avatar Component */}
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarFallback className="bg-background text-primary">
                <UserCircleIcon className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {user?.inAppName ?? user?.username ?? "Anonymous User"}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 opacity-70" />
                  {user?.email ?? "No email"}
                </div>
                {user?.profession && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 opacity-70" />
                    {user.profession}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pt-6 pb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight">Interests</h2>
            </div>
            
            <Separator className="opacity-50" />
            
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <Badge 
                    key={item.id} 
                    variant="secondary" 
                    className="px-3 py-1 text-sm font-medium hover:bg-secondary/80 transition-colors cursor-default"
                  >
                    {item.interest}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground italic">
                  No interests listed yet. Add some to personalize your profile.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
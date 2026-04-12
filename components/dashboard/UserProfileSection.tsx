"use client";

import { UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { UserProfile } from "@/lib/types";

interface UserProfileSectionProps {
  profile: UserProfile | null;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  profile,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="relative">
          <UserCircleIcon className="h-16 w-16 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display">
            Hi, {profile?.inAppName ?? profile?.username ?? "User"}!
          </h1>
          <p className="text-gray-400 pt-2">
            {profile?.email ?? ""}
          </p>
        </div>
      </div>
      <div>
        <Button
          variant={"default"}
          className={"p-6 text-md"}
          nativeButton={false}
          render={<Link href="/create-meetup" />}
        >
          + New Meetup
        </Button>
      </div>
    </div>
  );
};
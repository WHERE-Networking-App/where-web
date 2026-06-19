import Header from "@/components/common/header";
import { UpcomingMeetups } from "@/components/dashboard/UpcomingMeetups";
import { UserProfileSection } from "@/components/dashboard/UserProfileSection";
import { getUpcomingMeetups } from "@/lib/api/meetups.server";
import { apiServer } from "@/lib/api-server";
import type { UserProfileApiResponse } from "@/lib/types";

// This page reads the auth cookie at request time — must be dynamic
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [profileRes, meetupsRes] = await Promise.all([
    apiServer<UserProfileApiResponse>("/api/users/profile"),
    getUpcomingMeetups(),
  ]);

  const meetup = meetupsRes.data?.meetups ?? [];
  const profile = profileRes.data?.user ?? null;

  return (
    <>
      <Header profile={profile} />
      <main className="container mx-auto p-6 text-center space-y-12">
        <UserProfileSection profile={profile} />
        <UpcomingMeetups meetups={meetup} />
      </main>
    </>
  );
}
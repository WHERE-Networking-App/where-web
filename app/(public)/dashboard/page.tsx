import Header from "@/components/common/header";
import { UpcomingMeetups } from "@/components/dashboard/UpcomingMeetups";
import { UserProfileSection } from "@/components/dashboard/UserProfileSection";
import { apiServer } from "@/lib/api-server";
import type { Meetup, UserProfile } from "@/lib/types";

export default async function DashboardPage() {
  const [profileRes, meetupsRes] = await Promise.all([
    apiServer<UserProfile>("/api/users/profile"),
    apiServer<Meetup[]>("/api/meetups/upcoming"),
  ]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 text-center space-y-12">
        <UserProfileSection profile={profileRes.data} />
        <UpcomingMeetups meetups={meetupsRes.data ?? []} />
      </main>
    </>
  );
}
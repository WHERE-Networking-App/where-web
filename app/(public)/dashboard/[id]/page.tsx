import { MeetupDetail } from "@/components/dashboard/MeetupDetail";
import { getMeetupById } from "@/lib/api/meetups.server";
import { apiServer } from "@/lib/api-server";
import type { UserProfileApiResponse } from "@/lib/types";

// This page reads the auth cookie at request time — must be dynamic
export const dynamic = "force-dynamic";

interface MeetupDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetupDetailPage({ params }: MeetupDetailPageProps) {
  const { id } = await params;

  // Fetch meetup details and current user profile in parallel
  const [meetupRes, profileRes] = await Promise.all([
    getMeetupById(id),
    apiServer<UserProfileApiResponse>("/api/users/profile"),
  ]);

  const { data: meetup, error } = meetupRes;

  if (error || !meetup) {
    return (
      <div className="text-center mt-20 text-2xl">
        {error ?? "Meetup not found"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen p-6">
      <MeetupDetail
        meetup={meetup}
        currentUserId={profileRes.data?.user.id}
      />
    </div>
  );
}
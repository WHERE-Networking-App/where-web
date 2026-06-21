import { MeetupDetail } from "@/components/dashboard/MeetupDetail";
import { getMeetupById } from "@/lib/api/meetups.server";
import { apiServer } from "@/lib/api-server";
import type { UserProfileApiResponse } from "@/lib/types";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 mb-6 text-sm text-gray-400 hover:text-white transition-colors group"
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Dashboard
      </Link>

      <MeetupDetail
        meetup={meetup}
        currentUserId={profileRes.data?.user.id}
      />
    </div>
  );
}
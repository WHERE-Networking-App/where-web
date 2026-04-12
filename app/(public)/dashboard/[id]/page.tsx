import { MeetupDetail } from "@/components/dashboard/MeetupDetail";
import { apiServer } from "@/lib/api-server";
import type { Meetup } from "@/lib/types";

interface MeetupDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetupDetailPage({ params }: MeetupDetailPageProps) {
  const { id } = await params;

  const { data: meetup, error } = await apiServer<Meetup>(
    `/api/meetups/${id}`,
  );

  if (error || !meetup) {
    return (
      <div className="text-center mt-20 text-2xl">
        {error ?? "Meetup not found"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen p-6">
      <MeetupDetail meetup={meetup} />
    </div>
  );
}
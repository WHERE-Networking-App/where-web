import { MeetupDetail } from "@/components/dashboard/MeetupDetail";
import { mockEvents } from "@/data/mockup_data";

interface MeetupDetailPageProps {
    params: Promise<{ id: string }>;
}
export default async function MeetupDetailPage({params}: MeetupDetailPageProps) {
    const {id} = await params;

    const meetup = mockEvents.find(event => event.id === id);

    if (!meetup) {
        return <div className="text-center mt-20 text-2xl">Meetup not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto min-h-screen p-6">
            <MeetupDetail meetup={meetup} />
        </div>
    )
}
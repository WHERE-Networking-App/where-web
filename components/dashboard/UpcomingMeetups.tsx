import { mockEvents } from "@/data/mockup_data"
import { MeetupCard } from "./MeetUpCard"

export const UpcomingMeetups: React.FC = () => {
    return (
        <div>
            <h2 className="text-4xl font-display mb-6">Upcoming Meetups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    mockEvents.map((event) => {
                        return <MeetupCard key={event.id} meetup={event} />;
                    })
                }
            </div>
        </div>
    )
}
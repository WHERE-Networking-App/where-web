import { MeetupCard } from "./MeetUpCard";
import type { Meetup } from "@/lib/types";

interface UpcomingMeetupsProps {
  meetups: Meetup[];
}

export const UpcomingMeetups: React.FC<UpcomingMeetupsProps> = ({ meetups }) => {
  return (
    <div>
      <h2 className="text-4xl font-display mb-6">Upcoming Meetups</h2>

      {meetups.length === 0 ? (
        <p className="text-gray-400 text-lg py-12">
          No upcoming meetups yet. Create one to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meetups.map((meetup) => (
            <MeetupCard key={meetup.id} meetup={meetup} />
          ))}
        </div>
      )}
    </div>
  );
};
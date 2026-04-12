"use client";

import type { Meetup } from "@/lib/types";
import { Card } from "../ui/card";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { apiClient } from "@/lib/api-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MeetupDetailProps {
  meetup: Meetup;
}

export const MeetupDetail: React.FC<MeetupDetailProps> = ({ meetup }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleJoin = async () => {
    setActionError(null);
    setLoading(true);

    const { error } = await apiClient(`/api/meetups/${meetup.id}/join`, {
      method: "POST",
      authenticated: true,
    });

    if (error) {
      setActionError(error);
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  };

  const handleLeave = async () => {
    setActionError(null);
    setLoading(true);

    const { error } = await apiClient(`/api/meetups/${meetup.id}/leave`, {
      method: "POST",
      authenticated: true,
    });

    if (error) {
      setActionError(error);
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h1 className="text-4xl font-bold mb-4">{meetup.title}</h1>

      {meetup.description && (
        <p className="text-gray-400 mb-4">{meetup.description}</p>
      )}

      <div className="space-y-4 text-gray-400 mb-8 border-b-2 border-purple-800 pb-8">
        <div className="flex items-center text-lg">
          <CalendarIcon className="h-6 w-6 mr-4 text-purple-400" />
          <span>{meetup.date}</span>
        </div>
        <div className="flex items-center text-lg">
          <ClockIcon className="h-6 w-6 mr-4 text-purple-400" />
          <span>{meetup.timeSlot}</span>
        </div>
        <div className="flex items-center text-lg">
          <MapPinIcon className="h-6 w-6 mr-4 text-purple-400" />
          <span>
            {meetup.city}
            {meetup.location ? ` — ${meetup.location}` : ""}
          </span>
        </div>
        <div className="flex items-center text-lg">
          <UsersIcon className="h-6 w-6 mr-4 text-purple-400" />
          <span>
            {meetup.participants.length} / {meetup.participantsLimit}{" "}
            participants
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-display text-3xl mb-6">Participants</h2>
        <div className="space-y-4">
          {meetup.participants.length > 0 ? (
            meetup.participants.map((p, index) => (
              <div
                key={p.id ?? index}
                className="flex items-center justify-between p-4 bg-purple-900 bg-opacity-30 rounded-lg"
              >
                <span className="text-lg font-bold">
                  {p.inAppName ?? p.name ?? `Participant ${index + 1}`}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    alert(`Adding ${p.inAppName ?? p.name} as a friend!`)
                  }
                >
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  Add Friend
                </Button>
              </div>
            ))
          ) : (
            <div className="p-4 bg-purple-900 bg-opacity-30 rounded-lg text-lg text-gray-400">
              No participants yet. Be the first to join!
            </div>
          )}
        </div>
      </div>

      {actionError && (
        <div className="text-center p-4 bg-red-500 bg-opacity-20 text-red-300 rounded-lg mb-8">
          {actionError}
        </div>
      )}

      <div className="flex justify-center space-x-6">
        <Button size="lg" onClick={handleJoin} disabled={loading}>
          {loading ? "Processing..." : "I'm going"}
        </Button>
        <Button
          variant="danger"
          size="lg"
          onClick={handleLeave}
          disabled={loading}
        >
          {loading ? "Processing..." : "I'm not going"}
        </Button>
      </div>
    </Card>
  );
};
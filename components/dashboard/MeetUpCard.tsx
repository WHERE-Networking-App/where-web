"use client";

import type { Meetup } from "@/lib/types";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CalendarIcon, ClockIcon, MapPin, UsersIcon } from "lucide-react";
import Link from "next/link";

interface MeetupCardProps {
  meetup: Meetup;
}

export const MeetupCard: React.FC<MeetupCardProps> = ({ meetup }) => {
  return (
    <Card
      key={meetup.id}
      className="flex flex-col justify-between p-4 transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-2xl font-display">{meetup.title}</h3>
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full ${
              meetup.status === "cancelled"
                ? "bg-red-500 bg-opacity-20 text-red-300"
                : "bg-green-500 bg-opacity-20 text-green-300"
            }`}
          >
            {meetup.status === "cancelled" ? "Cancelled" : "Active"}
          </span>
        </div>
        {/* Event Details */}
        <div className="space-y-3 text-gray-400">
          {/* Date */}
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-3 text-purple-400" />
            <span>{meetup.date}</span>
          </div>
          {/* Time slot */}
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-3 text-purple-400" />
            <span>{meetup.timeSlot}</span>
          </div>
          {/* Location */}
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-purple-400" />
            <span>
              {meetup.city}
              {meetup.location ? ` — ${meetup.location}` : ""}
            </span>
          </div>
          {/* Participants */}
          <div className="flex items-start text-left">
            <UsersIcon className="h-5 w-5 mr-3 text-purple-400 shrink-0 mt-1" />
            <div className="text-sm text-gray-400 leading-relaxed">
              {meetup.participants.length > 0
                ? meetup.participants.map((p, index) => (
                    <span key={p.id ?? index}>
                      {p.inAppName ?? p.name}
                      {index < meetup.participants.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "No participants yet"}
            </div>
          </div>
        </div>
      </div>
      {/* View Details Button */}
      <div className="mt-6">
        <Button
          variant={"default"}
          size={"lg"}
          className={"w-full"}
          nativeButton={false}
          render={<Link href={`/dashboard/${meetup.id}`} />}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};
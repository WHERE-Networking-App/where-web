"use client";

import { UpcomingMeetupType } from "@/lib/validations/meetup"
import { Card } from "../ui/card";
import { ClockIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";

interface MeetupDetailProps {
    meetup: UpcomingMeetupType;
}

export const MeetupDetail: React.FC<MeetupDetailProps> = ({meetup}) => {
     const isRevealed = meetup.reveal_status && meetup.participants;
     
    return (
        <Card className="p-6">
            <h1 className="text-4xl font-bold mb-4">{meetup.title}</h1>
            <div className="space-y-4 text-gray-400 mb-8 border-b-2 border-purple-800 pb-8">
                <div className="flex items-center text-lg">
                    <ClockIcon className="h-6 w-6 mr-4 text-purple-400" />
                    <span>{new Date(meetup.scheduled_time).toLocaleString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center text-lg">
                    <MapPinIcon className="h-6 w-6 mr-4 text-purple-400" />
                    <span>{meetup.location_name}</span>
                </div>
                <div className="flex items-center text-lg">
                    <UsersIcon className="h-6 w-6 mr-4 text-purple-400" />
                    <span>
                        {isRevealed ? `${meetup.participants} participants` : `${meetup.participant_aliases.length} participants (anonymous)`}
                    </span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-display text-3xl mb-6">Participants</h2>
                <div className="space-y-4">
                    {isRevealed ? (
                        meetup.participant_aliases?.map(p => (
                            <div key={p.name} className="flex items-center justify-between p-4 bg-purple-900 bg-opacity-30 rounded-lg">
                                <span className="text-lg font-bold">{p.name}</span>
                                <Button size="sm" variant="secondary" onClick={() => alert(`Adding ${p.name} as a friend!`)}>
                                    <UserPlusIcon className="h-5 w-5 mr-2" />
                                    Add Friend
                                </Button>
                            </div>
                        ))
                    ) : (
                        meetup.participant_aliases.map((alias, index) => (
                            <div key={index} className="p-4 bg-purple-900 bg-opacity-30 rounded-lg text-lg font-bold text-white">
                                {alias.name}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {!isRevealed && (
                <div className="text-center p-4 bg-yellow-500 bg-opacity-20 text-yellow-300 rounded-lg mb-8">
                    Participant names will be revealed after the meetup time has passed.
                </div>
            )}

            <div className="flex justify-center space-x-6">
                <Button size="lg">
                    thwr ma lrr (I`&apos;m going)
                </Button>
                <Button variant="danger" size="lg">
                    ma thwr boo (I`&apos;m not going)
                </Button>
            </div>
        </Card>
    )
}
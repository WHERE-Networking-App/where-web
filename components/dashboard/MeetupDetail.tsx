"use client";

import type { Meetup } from "@/lib/types";
import { Card } from "../ui/card";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  XCircleIcon,
  CheckCircleIcon,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { joinMeetup, leaveMeetup, cancelMeetup, reachMeetup } from "@/lib/api/meetups";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MeetupReachSchema } from "@/lib/validations/meetup";

interface MeetupDetailProps {
  meetup: Meetup;
  /** The currently authenticated user's ID — used to determine host/participant roles */
  currentUserId?: number;
}

export const MeetupDetail: React.FC<MeetupDetailProps> = ({
  meetup,
  currentUserId,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Reach note state
  const [showReachNote, setShowReachNote] = useState(false);
  const [reachNote, setReachNote] = useState("");
  const [reachNoteError, setReachNoteError] = useState<string | null>(null);

  // Use API-provided flags when available, fall back to client-side derivation
  const isHost =
    meetup.isHost ??
    (currentUserId != null && meetup.hostId === currentUserId);
  const isParticipant =
    meetup.isParticipant ??
    (currentUserId != null &&
      (meetup.participants ?? []).some((p) => p.userId === currentUserId));
  const isCancelled = meetup.status === "cancelled" || meetup.cancelled;

  // Determine if the current user has already marked themselves as reached.
  // In the API response, participants[].id is the userId (not a join-table id).
  const currentParticipant = (meetup.participants ?? []).find(
    (p) => p.id === currentUserId,
  );
  const [hasReached, setHasReached] = useState<boolean>(
    currentParticipant?.reached ?? false,
  );

  // ─── Handlers ───────────────────────────────────────────────────────

  const handleJoin = async () => {
    setActionError(null);
    setLoading(true);
    const { error } = await joinMeetup(meetup.id);
    if (error) {
      setActionError(error);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  const handleLeave = async () => {
    setActionError(null);
    setLoading(true);
    const { error } = await leaveMeetup(meetup.id);
    if (error) {
      setActionError(error);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this meetup?")) return;
    setActionError(null);
    setLoading(true);
    const { error } = await cancelMeetup(meetup.id);
    if (error) {
      setActionError(error);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  const handleReach = async () => {
    setReachNoteError(null);

    // Validate optional note
    const parsed = MeetupReachSchema.safeParse({ note: reachNote || undefined });
    if (!parsed.success) {
      setReachNoteError(
        parsed.error.flatten().fieldErrors.note?.[0] ?? "Invalid note",
      );
      return;
    }

    setLoading(true);
    const { error } = await reachMeetup(meetup.id, parsed.data);
    if (error) {
      setActionError(error);
    } else {
      setHasReached(true);
      setShowReachNote(false);
      setReachNote("");
      router.refresh();
    }
    setLoading(false);
  };

  const handleUnreach = async () => {
    if (!confirm("Cancel your 'reached' status for this meetup?")) return;
    setActionError(null);
    setLoading(true);
    // The reach endpoint toggles when called again
    const { error } = await reachMeetup(meetup.id, {});
    if (error) {
      setActionError(error);
    } else {
      setHasReached(false);
      router.refresh();
    }
    setLoading(false);
  };

  // ─── Render ──────────────────────────────────────────────────────────

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-4xl font-bold">{meetup.title}</h1>
        {isCancelled && (
          <span className="px-3 py-1 text-sm font-bold rounded-full bg-red-500 bg-opacity-20 text-red-300">
            Cancelled
          </span>
        )}
      </div>

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
            {meetup.participantCount ?? (meetup.participants ?? []).length} / {meetup.participantsLimit}{" "}
            participants
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className="mb-8">
        <h2 className="font-display text-3xl mb-6">Participants</h2>
        <div className="space-y-4">
          {(meetup.participants ?? []).length > 0 ? (
            (meetup.participants ?? []).map((p, index) => (
              <div
                key={p.id ?? index}
                className="flex items-center justify-between p-4 bg-purple-900 bg-opacity-30 rounded-lg"
              >
                <div>
                  <span className="text-lg font-bold">
                    {p.inAppName ?? p.name ?? `Participant ${index + 1}`}
                  </span>
                  {p.reached && (
                    <span className="ml-3 text-xs px-2 py-0.5 bg-green-900/40 text-green-300 rounded-full">
                      Reached
                    </span>
                  )}
                </div>
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

      {/* Error display */}
      {actionError && (
        <div className="text-center p-4 bg-red-500 bg-opacity-20 text-red-300 rounded-lg mb-8">
          {actionError}
        </div>
      )}

      {/* Reach note input */}
      {showReachNote && (
        <div className="mb-6 space-y-2">
          <label className="text-sm text-gray-400">
            Optional arrival note
          </label>
          <input
            type="text"
            value={reachNote}
            onChange={(e) => setReachNote(e.target.value)}
            placeholder="e.g. I'll arrive around 4:10"
            maxLength={500}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {reachNoteError && (
            <p className="text-red-400 text-xs">{reachNoteError}</p>
          )}
          <div className="flex gap-3">
            <Button
              size="sm"
              onClick={handleReach}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Saving…" : "Confirm I'm Here"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowReachNote(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!isCancelled && (
        <div className="flex flex-wrap justify-center gap-4">
          {/* Non-participant: show join */}
          {!isParticipant && !isHost && (
            <Button size="lg" onClick={handleJoin} disabled={loading}>
              {loading ? "Processing…" : "I'm going"}
            </Button>
          )}

          {/* Participant: show leave + mark as reached (toggleable) */}
          {isParticipant && !isHost && (
            <>
              {hasReached ? (
                // Already reached — show cancel button
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleUnreach}
                  disabled={loading}
                  className="border-amber-500 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                >
                  <XIcon className="h-5 w-5 mr-2" />
                  {loading ? "Processing…" : "Cancel Mark as Reached"}
                </Button>
              ) : (
                // Not yet reached — show mark button
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowReachNote(true)}
                  disabled={loading || showReachNote}
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Mark as Reached
                </Button>
              )}
              <Button
                variant="danger"
                size="lg"
                onClick={handleLeave}
                disabled={loading}
              >
                {loading ? "Processing…" : "I'm not going"}
              </Button>
            </>
          )}

          {/* Host: show cancel */}
          {isHost && (
            <Button
              variant="danger"
              size="lg"
              onClick={handleCancel}
              disabled={loading}
            >
              <XCircleIcon className="h-5 w-5 mr-2" />
              {loading ? "Cancelling…" : "Cancel Meetup"}
            </Button>
          )}

          {/* Fallback for when currentUserId is not provided (unauthenticated view) */}
          {currentUserId == null && (
            <>
              <Button size="lg" onClick={handleJoin} disabled={loading}>
                {loading ? "Processing…" : "I'm going"}
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={handleLeave}
                disabled={loading}
              >
                {loading ? "Processing…" : "I'm not going"}
              </Button>
            </>
          )}
        </div>
      )}
    </Card>
  );
};